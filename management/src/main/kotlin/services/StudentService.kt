package com.education.services

import com.education.models.Student
import com.education.models.CreateStudentRequest

class StudentService {
    private val students = mutableListOf(
        Student(1, "Araf", "araf@email.com"),
        Student(2, "Tania", "tania@email.com"),
        Student(3,"madhab","examp@gmail.com")
    )

    fun getAllStudents(): List<Student> = students

    fun addStudent(request: CreateStudentRequest): Student {
        // Generate a new ID (max existing ID + 1)
        val newId = students.maxOfOrNull { it.id }?.plus(1) ?: 1
        val newStudent = Student(
            id = newId,
            name = request.name,
            email = request.email
        )
        students.add(newStudent)
        return newStudent
    }

    fun getStudentById(id: Int): Student? {
        return students.find { it.id == id }
    }
}
