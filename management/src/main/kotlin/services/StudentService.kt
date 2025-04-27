package com.education.services

import com.education.models.CreateStudentRequest
import com.education.models.StudentDAO
import com.education.models.StudentDTO
import com.education.models.UpdateStudentRequest
import com.education.models.UserDAO
import com.education.models.toDTO
import com.education.repositories.StudentRepository
import com.education.repositories.UserRepository

interface StudentService {
    suspend fun getStudentById(studentId: Int): StudentDTO?
    suspend fun createStudent(studentRequest: CreateStudentRequest): Int
    suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean
}

class StudentServiceImpl(
    private val studentRepository: StudentRepository,
    private val userRepository: UserRepository
) : StudentService {
    


    override suspend fun getStudentById(studentId: Int): StudentDTO? {
        return try {
            val student = studentRepository.getStudentById(studentId) ?: return null
            student.toDTO()
        } catch (e: Exception) {
            println("Error in StudentService: ${e.message}")
            println("Stack trace: ${e.stackTraceToString()}")
            throw e
        }
    }

    override suspend fun createStudent(studentRequest: CreateStudentRequest): Int {
        return try {
            studentRepository.createStudent(studentRequest)
        } catch (e: Exception) {
            println("Error in StudentService: ${e.message}")
            println("Stack trace: ${e.stackTraceToString()}")
            throw e
        }
    }

    override suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean {
        return  try {
             studentRepository.updateStudent(updateStudentRequest)

        } catch (e: Exception){
            println("Error updating in StudentService: ${e.message}")
            false
        }
    }
}