package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Student
import com.education.entities.User
import com.education.models.CreateStudentRequest
import com.education.models.StudentDAO
import com.education.models.UpdateStudentRequest
import io.ktor.client.request.*
import io.ktor.http.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.LocalDate

interface StudentRepository {
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
            fatherName = this[Student.fatherName],
            motherName = this[Student.motherName],
            parentContact = this[Student.parentContact],
            address = this[Student.address],
            enrollmentDate = this[Student.enrollmentDate],
            photoUrl = this[Student.photoUrl],
            emergencyContact = this[Student.emergencyContact],
            status = this[Student.status]
        )

    
    override suspend fun getStudentById(studentId: Int) : StudentDAO? {
        return try {
            dataSource.dbQuery {
                (Student innerJoin User)
                    .select { Student.studentId eq studentId }
                    .map { it.toStudentDAO() }
                    .singleOrNull()
            }
        } catch (e: Exception) {
            println("Error fetching student: ${e.message}")
            println("Stack trace: ${e.stackTraceToString()}")
            null
        }
    }

    override suspend fun createStudent(studentRequest: CreateStudentRequest): Int {
        return try {
            dataSource.dbQuery {
                // First create the user
                val userId = User.insert {
                    it[organizationId] = studentRequest.organizationId
                    it[firstName] = studentRequest.firstName
                    it[lastName] = studentRequest.lastName
                    it[email] = studentRequest.email
                    it[phoneNumber] = studentRequest.phoneNumber
                    it[password] = studentRequest.password
                    it[gender] = studentRequest.gender
                    it[dateOfBirth] = studentRequest.dateOfBirth
                    it[isActive] = true
                    it[createdAt] = java.time.LocalDateTime.now()
                    it[updatedAt] = java.time.LocalDateTime.now()
                } get User.userId

                // Then create the student record
                Student.insert {
                    it[Student.organizationId] = studentRequest.organizationId
                    it[Student.classId] = studentRequest.classId
                    it[Student.userId] = userId
                    it[Student.fatherName] = studentRequest.fatherName
                    it[Student.motherName] = studentRequest.motherName
                    it[Student.parentContact] = studentRequest.parentContact
                    it[Student.address] = studentRequest.address
                    it[Student.enrollmentDate] = java.time.LocalDate.now()
                    it[Student.photoUrl] = studentRequest.photoUrl
                    it[Student.emergencyContact] = studentRequest.emergencyContact
                    it[Student.status] = "ACTIVE"
                } get Student.studentId
            }
        } catch (e: Exception) {
            println("Error creating student: ${e.message}")
            println("Stack trace: ${e.stackTraceToString()}")
            throw e
        }
    }

    override suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest) : Boolean{
        return try {
            dataSource.dbQuery {
                val updatedRows  = Student.update({Student.studentId eq updateStudentRequest.studentId}) {
                    updateStudentRequest.classId?.let { classId -> it[Student.classId] = classId }
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
        }  catch (e : Exception){
            println(" Error Student Update : ${e.message}")
            false
        }
    }
}

