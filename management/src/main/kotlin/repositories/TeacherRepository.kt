package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Teacher
import com.education.entities.User
import com.education.models.CreateTeacherRequest
import com.education.models.TeacherDAO
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.date
import java.time.LocalDate

interface TeacherRepository {
    suspend fun getTeacherById(teacherId: Int): TeacherDAO?
    suspend fun getTeacherByUserId(userId: Int): TeacherDAO?
    suspend fun getAllTeachers(orgId: Int): List<TeacherDAO>
    suspend fun createTeacher(
        teacherRequest: CreateTeacherRequest,
    ): Int
}

class TeacherRepositoryImpl(private val dataSource: DataSource) : TeacherRepository {

    private fun ResultRow.toTeacherDAO() = TeacherDAO(
        id = this[Teacher.teacherId],
        userId = this[Teacher.userId],
        firstName = this[User.firstName],
        lastName = this[User.lastName],
        department = this[Teacher.department],
        joiningDate = this[Teacher.joiningDate].toString(),
        photoUrl = this[Teacher.photoUrl],
        designation = this[Teacher.designation],
        isActive = this[Teacher.isActive]
    )

    override suspend fun getTeacherById(teacherId: Int): TeacherDAO? {
        return dataSource.dbQuery {
            (Teacher innerJoin User)
                .select { Teacher.teacherId eq teacherId }
                .map { it.toTeacherDAO() }
                .singleOrNull()
        }
    }

    override suspend fun getTeacherByUserId(userId: Int): TeacherDAO? {
        return dataSource.dbQuery {
            (Teacher innerJoin User)
                .select { Teacher.userId eq userId }
                .map { it.toTeacherDAO() }
                .singleOrNull()
        }
    }

    override suspend fun getAllTeachers(orgId: Int): List<TeacherDAO> {
        return dataSource.dbQuery {
            (Teacher innerJoin User)
                .select { User.organizationId eq orgId }
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
                it[password] = teacherRequest.password // Ideally hashed
                it[gender] = teacherRequest.gender
                it[dateOfBirth] = LocalDate.parse(teacherRequest.dateOfBirth)
                it[isActive] = teacherRequest.isActive
            } get User.userId

            // ২. Making Teacher
            Teacher.insert {
                it[Teacher.userId] = userId
                it[department] = teacherRequest.department
                it[joiningDate] = LocalDate.parse(teacherRequest.joiningDate)
                it[photoUrl] = teacherRequest.photoUrl
                it[designation] = teacherRequest.designation
                it[isActive] = teacherRequest.isActive
            }

            userId // teacherId return
        }
    }
}
