package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Department
import com.education.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

interface DepartmentRepository {
    suspend fun getAllDepartments(organizationId: Int): List<DepartmentDTO>
    suspend fun getDepartmentById(id: Int): DepartmentDAO?
    suspend fun createDepartment(request: CreateDepartmentRequest): Int
    suspend fun updateDepartment(id: Int, request: UpdateDepartmentRequest): Boolean
    suspend fun deleteDepartment(id: Int): Boolean
}

class DepartmentRepositoryImpl(private val dataSource: DataSource) : DepartmentRepository {

    private fun ResultRow.toDepartmentDAO() = DepartmentDAO(
        id = this[Department.id],
        organizationId = this[Department.organizationId],
        name = this[Department.name],
        description = this[Department.description]
    )

    private fun ResultRow.toDepartmentDTO() = DepartmentDTO(
        id = this[Department.id],
        organizationId = this[Department.organizationId],
        name = this[Department.name],
        description = this[Department.description]
    )

    override suspend fun getAllDepartments(organizationId: Int): List<DepartmentDTO> {
        return dataSource.dbQuery {
            Department.select { Department.organizationId eq organizationId }
                .map { it.toDepartmentDTO() }
        }
    }

    override suspend fun getDepartmentById(id: Int): DepartmentDAO? {
        return dataSource.dbQuery {
            Department.select { Department.id eq id }
                .map { it.toDepartmentDAO() }
                .singleOrNull()
        }
    }

    override suspend fun createDepartment(request: CreateDepartmentRequest): Int {
        return dataSource.dbQuery {
            Department.insert {
                it[organizationId] = request.organizationId
                it[name] = request.name
                it[description] = request.description
            }[Department.id]
        }
    }

    override suspend fun updateDepartment(id: Int, request: UpdateDepartmentRequest): Boolean {
        return dataSource.dbQuery {
            Department.update({ Department.id eq id }) {
                it[organizationId] = request.organizationId
                it[name] = request.name
                it[description] = request.description
            } > 0
        }
    }

    override suspend fun deleteDepartment(id: Int): Boolean {
        return dataSource.dbQuery {
            Department.deleteWhere { Department.id eq id } > 0
        }
    }
} 