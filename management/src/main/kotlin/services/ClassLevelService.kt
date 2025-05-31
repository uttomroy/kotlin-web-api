package com.education.services

import com.education.models.ClassLevelDAO
import com.education.models.ClassLevelDTO
import com.education.models.CreateClassLevelRequest
import com.education.models.UpdateClassLevelRequest
import com.education.repositories.ClassLevelRepository

interface ClassLevelService {
    suspend fun getAllClassLevels(organizationId: Int): List<ClassLevelDTO>
    suspend fun getClassLevelById(classLevelId: Int): ClassLevelDAO?
    suspend fun createClassLevel(classLevelRequest: CreateClassLevelRequest): Int
    suspend fun updateClassLevel(classLevelId: Int, updateClassLevelRequest: UpdateClassLevelRequest): Boolean
    suspend fun deleteClassLevel(classLevelId: Int): Boolean
}

class ClassLevelServiceImpl(
    private val classLevelRepository: ClassLevelRepository,
) : ClassLevelService {

    override suspend fun getAllClassLevels(organizationId: Int): List<ClassLevelDTO> {
        return classLevelRepository.getAllClassLevels(organizationId)
    }

    override suspend fun getClassLevelById(classLevelId: Int): ClassLevelDAO? {
        return classLevelRepository.getClassLevelById(classLevelId)
    }

    override suspend fun createClassLevel(classLevelRequest: CreateClassLevelRequest): Int {
        return classLevelRepository.createClassLevel(classLevelRequest)
    }

    override suspend fun updateClassLevel(classLevelId: Int, updateClassLevelRequest: UpdateClassLevelRequest): Boolean {
        return classLevelRepository.updateClassLevel(classLevelId, updateClassLevelRequest)
    }

    override suspend fun deleteClassLevel(classLevelId: Int): Boolean {
        return classLevelRepository.deleteClassLevel(classLevelId)
    }
} 