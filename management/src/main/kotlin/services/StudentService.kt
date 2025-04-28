package com.education.services

import com.education.models.CreateStudentRequest
import com.education.models.StudentDTO
import com.education.models.UpdateStudentRequest
import com.education.models.toDTO
import com.education.repositories.StudentRepository

interface StudentService {
    suspend fun getStudentById(studentId: Int): StudentDTO?
    suspend fun createStudent(studentRequest: CreateStudentRequest): Int
    suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean
}

class StudentServiceImpl(
    private val studentRepository: StudentRepository,
) : StudentService {

    override suspend fun getStudentById(studentId: Int): StudentDTO? {
        val student = studentRepository.getStudentById(studentId) ?: return null
        return student.toDTO()
    }

    override suspend fun createStudent(studentRequest: CreateStudentRequest): Int {
        return studentRepository.createStudent(studentRequest)
    }

    override suspend fun updateStudent(updateStudentRequest: UpdateStudentRequest): Boolean {
        return studentRepository.updateStudent(updateStudentRequest)
    }
}
