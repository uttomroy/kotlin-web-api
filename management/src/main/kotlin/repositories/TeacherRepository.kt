package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Teacher
import com.education.entities.User
import com.education.models.CreateTeacherRequest
import com.education.models.TeacherDAO
import com.education.models.UpdateTeacherRequest
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
    suspend fun updateTeacherRequest(updateTeacherRequest: UpdateTeacherRequest): Boolean
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

    override suspend fun updateTeacherRequest(updateTeacherRequest: UpdateTeacherRequest): Boolean {
        return dataSource.dbQuery {
            val userId = Teacher.select{ Teacher.teacherId eq updateTeacherRequest.teacherId}
                .map { it[Teacher.teacherId] }
                .singleOrNull()
            if(userId == null )
                return@dbQuery false
            val userupdate = User.update({User.userId eq userId}){
                it[firstName] = updateTeacherRequest.firstName
                it[lastName] = updateTeacherRequest.lastName
                it[email] = updateTeacherRequest.email
                it[phoneNumber] = updateTeacherRequest.phoneNumber
                it[gender] = updateTeacherRequest.gender
                it[dateOfBirth] = LocalDate.parse(updateTeacherRequest.dateOfBirth)
                it[isActive] = updateTeacherRequest.isActive
            }
            val teacherudate = Teacher.update({ Teacher.teacherId eq updateTeacherRequest.teacherId }) {
                it[department] = updateTeacherRequest.department
                it[designation] = updateTeacherRequest.designation
                it[joiningDate] = LocalDate.parse(updateTeacherRequest.joiningDate)
                it[photoUrl] = updateTeacherRequest.photoUrl
                it[isActive] = updateTeacherRequest.isActive
            }
            return@dbQuery userupdate > 0 || teacherudate > 0
        }

    }


}
