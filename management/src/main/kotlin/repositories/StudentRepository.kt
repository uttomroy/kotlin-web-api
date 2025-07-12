package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Student
import com.education.entities.User
import com.education.models.CreateStudentRequest
import com.education.models.StudentDAO
import com.education.models.UpdateStudentRequest
import org.jetbrains.exposed.sql.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

interface StudentRepository {
    suspend fun getAllStudents(orgId: Int): List<StudentDAO>
    suspend fun getStudentById(studentId: Int): StudentDAO?
    suspend fun createStudent(studentRequest: CreateStudentRequest): Int
    suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean
}

class StudentRepositoryImpl(private val dataSource: DataSource) : StudentRepository {

    private fun ResultRow.toStudentDAO() =
        StudentDAO(
            studentId = this[Student.studentId],
            organizationId = this[Student.organizationId],
            classId = this[Student.classId],
            userId = this[Student.userId],
            firstName = this[User.firstName],
            lastName = this[User.lastName],
            gender = this[User.gender],
            fatherName = this[Student.fatherName],
            motherName = this[Student.motherName],
            parentContact = this[Student.parentContact],
            address = this[Student.address],
            enrollmentDate = this[Student.enrollmentDate],
            photoUrl = this[Student.photoUrl],
            emergencyContact = this[Student.emergencyContact],
            status = this[Student.status]
        )

    override suspend fun getAllStudents(orgId: Int): List<StudentDAO> {
        return dataSource.dbQuery {
            (Student innerJoin User)
                .select { Student.organizationId eq orgId }
                .map { it.toStudentDAO() }
        }
    }

    override suspend fun getStudentById(studentId: Int): StudentDAO? {
        return dataSource.dbQuery {
            (Student innerJoin User)
                .select { Student.studentId eq studentId }
                .map { it.toStudentDAO() }
                .singleOrNull()
        }
    }

    override suspend fun createStudent(studentRequest: CreateStudentRequest): Int {
        return dataSource.dbQuery {
            // First create the user
            val userId = User.insert {
                it[organizationId] = studentRequest.organizationId
                it[firstName] = studentRequest.firstName
                it[lastName] = studentRequest.lastName
                it[email] = studentRequest.email
                it[phoneNumber] = studentRequest.phoneNumber
                it[password] = studentRequest.password
                it[gender] = studentRequest.gender
                it[dateOfBirth] = LocalDate.parse(studentRequest.dateOfBirth, DateTimeFormatter.ISO_LOCAL_DATE)
                it[isActive] = true
                it[createdAt] = java.time.LocalDateTime.now()
                it[updatedAt] = java.time.LocalDateTime.now()
            } get User.userId

            // Then create the student record
            Student.insert {
                it[organizationId] = studentRequest.organizationId
                it[classId] = studentRequest.classId
                it[Student.userId] = userId
                it[fatherName] = studentRequest.fatherName
                it[motherName] = studentRequest.motherName
                it[parentContact] = studentRequest.parentContact
                it[address] = studentRequest.address
                it[enrollmentDate] = java.time.LocalDate.now()
                it[photoUrl] = studentRequest.photoUrl
                it[emergencyContact] = studentRequest.emergencyContact
                it[status] = "ACTIVE"
            } get Student.studentId
        }
    }

    override suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean {
        return dataSource.dbQuery {
            val updatedRows = Student.update({ Student.studentId eq updateStudentRequest.studentId }) {
                val classId = updateStudentRequest.classId
                if (classId != null) {
                    it[Student.classId] = classId
                }
                it[fatherName] = updateStudentRequest.fatherName
                it[motherName] = updateStudentRequest.motherName
                it[parentContact] = updateStudentRequest.parentContact
                it[address] = updateStudentRequest.address
                it[photoUrl] = updateStudentRequest.photoUrl
                it[emergencyContact] = updateStudentRequest.emergencyContact
                it[status] = updateStudentRequest.status
            }
            updatedRows > 0
        }
    }
}
