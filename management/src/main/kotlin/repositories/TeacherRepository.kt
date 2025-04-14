package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Teacher
import com.education.models.TeacherDAO
import org.jetbrains.exposed.sql.*
import kotlinx.datetime.LocalDate

interface TeacherRepository {
    suspend fun getTeacherById(teacherId: Int): TeacherDAO?
    suspend fun getTeacherByUserId(userId: Int): TeacherDAO?
    suspend fun getAllTeachers(): List<TeacherDAO>
    suspend fun createTeacher(
        userId: Int,
        department: String?,
        joiningDate: LocalDate?,
        photoUrl: String?,
        designation: String,
        isActive: Boolean
    ): Int
    suspend fun updateTeacher(
        teacherId: Int,
        department: String?,
        joiningDate: LocalDate?,
        photoUrl: String?,
        designation: String?,
        isActive: Boolean?
    ): Boolean
}

class TeacherRepositoryImpl(private val dataSource: DataSource) : TeacherRepository {
    
    private fun ResultRow.toTeacherDAO() = TeacherDAO(
        teacherId = this[Teacher.teacherId],
        userId = this[Teacher.userId],
        department = this[Teacher.department],
        joiningDate = this[Teacher.joiningDate]?.let { kotlinx.datetime.LocalDate(it.year, it.monthValue, it.dayOfMonth) },
        photoUrl = this[Teacher.photoUrl],
        designation = this[Teacher.designation],
        isActive = this[Teacher.isActive]
    )
    
    override suspend fun getTeacherById(teacherId: Int): TeacherDAO? {
        return dataSource.dbQuery {
            Teacher.select { Teacher.teacherId eq teacherId }
                .map { it.toTeacherDAO() }
                .singleOrNull()
        }
    }

    override suspend fun getTeacherByUserId(userId: Int): TeacherDAO? {
        return dataSource.dbQuery {
            Teacher.select { Teacher.userId eq userId }
                .map { it.toTeacherDAO() }
                .singleOrNull()
        }
    }

    override suspend fun getAllTeachers(): List<TeacherDAO> {
        return dataSource.dbQuery {
            Teacher.selectAll()
                .map { it.toTeacherDAO() }
        }
    }

    override suspend fun createTeacher(
        userId: Int,
        department: String?,
        joiningDate: LocalDate?,
        photoUrl: String?,
        designation: String,
        isActive: Boolean
    ): Int {
        return dataSource.dbQuery {
            Teacher.insert {
                it[Teacher.userId] = userId
                it[Teacher.department] = department
                it[Teacher.joiningDate] = joiningDate?.let { date -> java.time.LocalDate.of(date.year, date.monthNumber, date.dayOfMonth) }
                it[Teacher.photoUrl] = photoUrl
                it[Teacher.designation] = designation
                it[Teacher.isActive] = isActive
            }[Teacher.teacherId]
        }
    }

    override suspend fun updateTeacher(
        teacherId: Int,
        department: String?,
        joiningDate: LocalDate?,
        photoUrl: String?,
        designation: String?,
        isActive: Boolean?
    ): Boolean {
        return dataSource.dbQuery {
            val updateStatement = Teacher.update({ Teacher.teacherId eq teacherId }) { statement ->
                department?.let { statement[Teacher.department] = it }
                joiningDate?.let { date -> statement[Teacher.joiningDate] = java.time.LocalDate.of(date.year, date.monthNumber, date.dayOfMonth) }
                photoUrl?.let { statement[Teacher.photoUrl] = it }
                designation?.let { statement[Teacher.designation] = it }
                isActive?.let { statement[Teacher.isActive] = it }
            }
            updateStatement > 0
        }
    }
} 