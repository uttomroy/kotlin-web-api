package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Teacher
import com.education.entities.User
import com.education.models.CreateTeacherRequest
import com.education.models.TeacherDAO
import com.education.models.CreateUserRequest
import org.jetbrains.exposed.sql.*
import kotlinx.datetime.LocalDate

interface TeacherRepository {
    suspend fun getTeacherById(teacherId: Int): TeacherDAO?
    suspend fun getTeacherByUserId(userId: Int): TeacherDAO?
    suspend fun getAllTeachers(): List<TeacherDAO>
    suspend fun createTeacher(
        teacherRequest: CreateTeacherRequest,
    ): Int
}

class TeacherRepositoryImpl(private val dataSource: DataSource) : TeacherRepository {
    
    private fun ResultRow.toTeacherDAO() = TeacherDAO(
        teacherId = this[Teacher.teacherId],
        userId = this[Teacher.userId],
        department = this[Teacher.department],
        joiningDate = this[Teacher.joiningDate],
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
        teacherRequest: CreateTeacherRequest
    ): Int {
        return dataSource.dbQuery {
            val userId = User.insert {
                it[organizationId] = teacherRequest.organizationId
                it[firstName] = teacherRequest.firstName
                it[lastName] = teacherRequest.lastName
                it[email] = teacherRequest.email
                it[phoneNumber] = teacherRequest.phoneNumber
                it[password] = "1234"
                it[gender] = teacherRequest.gender
                it[dateOfBirth] = teacherRequest.dateOfBirth
                it[isActive] = true
                it[createdAt] = java.time.LocalDateTime.now()
                it[updatedAt] = java.time.LocalDateTime.now()
            } get User.userId

            Teacher.insert {
                it[Teacher.userId] = userId
                it[department] = teacherRequest.department
                it[joiningDate] = teacherRequest.joiningDate
                it[photoUrl] = teacherRequest.photoUrl
                it[designation] = teacherRequest.designation
                it[isActive] = true
            }[Teacher.teacherId]
        }
    }
} 