package com.education.services

import com.education.models.*
import com.education.repositories.DepartmentRepository

interface DepartmentService {
    suspend fun getAllDepartments(organizationId: Int): List<DepartmentDTO>
    suspend fun getDepartmentById(id: Int): DepartmentDTO?
    suspend fun createDepartment(request: CreateDepartmentRequest): DepartmentDTO
    suspend fun updateDepartment(id: Int, request: UpdateDepartmentRequest): DepartmentDTO?
    suspend fun deleteDepartment(id: Int): Boolean
}

class DepartmentServiceImpl(private val departmentRepository: DepartmentRepository) : DepartmentService {

    override suspend fun getAllDepartments(organizationId: Int): List<DepartmentDTO> {
        return departmentRepository.getAllDepartments(organizationId)
    }

    override suspend fun getDepartmentById(id: Int): DepartmentDTO? {
        val department = departmentRepository.getDepartmentById(id)
        return department?.let { 
            DepartmentDTO(
                id = it.id,
                organizationId = it.organizationId,
                name = it.name,
                description = it.description
            )
        }
    }

    override suspend fun createDepartment(request: CreateDepartmentRequest): DepartmentDTO {
        val departmentId = departmentRepository.createDepartment(request)
        return DepartmentDTO(
            id = departmentId,
            organizationId = request.organizationId,
            name = request.name,
            description = request.description
        )
    }

    override suspend fun updateDepartment(id: Int, request: UpdateDepartmentRequest): DepartmentDTO? {
        val success = departmentRepository.updateDepartment(id, request)
        return if (success) {
            DepartmentDTO(
                id = id,
                organizationId = request.organizationId,
                name = request.name,
                description = request.description
            )
        } else null
    }

    override suspend fun deleteDepartment(id: Int): Boolean {
        return departmentRepository.deleteDepartment(id)
    }
} 