package com.education.services
import com.education.models.CreateTeacherRequest
import com.education.models.TeacherDAO
import com.education.models.TeacherDTO
import com.education.models.toDTO

import com.education.repositories.TeacherRepository

interface  TeacherService{
    suspend fun getTeacherById(teacherId: Int): TeacherDAO?
    suspend fun getTeacherByUserId(userId: Int): TeacherDAO?
    suspend fun getAllTeachers(): List<TeacherDTO>
    suspend fun createTeacher(
        teacherRequest: CreateTeacherRequest,
    ): Int
}

class TeacherServiceImp(
    private val teacherRepository: TeacherRepository
) : TeacherService {

    override suspend fun getAllTeachers(): List<TeacherDTO> {
        return teacherRepository.getAllTeachers().map { it.toDTO() }
    }
    override suspend fun getTeacherById(teacherId: Int): TeacherDAO? {
        return teacherRepository.getTeacherById(teacherId)
    }

    override suspend fun getTeacherByUserId(userId: Int): TeacherDAO? {
        return teacherRepository.getTeacherByUserId(userId)
    }

    override suspend fun createTeacher(
        teacherRequest: CreateTeacherRequest,
    ): Int {
        return teacherRepository.createTeacher(teacherRequest)
    }
}