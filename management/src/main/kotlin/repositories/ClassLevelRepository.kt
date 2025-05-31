package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.ClassLevel
import com.education.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

interface ClassLevelRepository {
    suspend fun getAllClassLevels(organizationId: Int): List<ClassLevelDTO>
    suspend fun getClassLevelById(id: Int): ClassLevelDAO?
    suspend fun createClassLevel(request: CreateClassLevelRequest): Int
    suspend fun updateClassLevel(id: Int, request: UpdateClassLevelRequest): Boolean
    suspend fun deleteClassLevel(id: Int): Boolean
}

class ClassLevelRepositoryImpl(private val dataSource: DataSource) : ClassLevelRepository {

    private fun ResultRow.toClassLevelDAO() = ClassLevelDAO(
        id = this[ClassLevel.id],
        organizationId = this[ClassLevel.organizationId],
        name = this[ClassLevel.name]
    )

    private fun ResultRow.toClassLevelDTO() = ClassLevelDTO(
        id = this[ClassLevel.id],
        organizationId = this[ClassLevel.organizationId],
        name = this[ClassLevel.name]
    )

    override suspend fun getAllClassLevels(organizationId: Int): List<ClassLevelDTO> {
        return dataSource.dbQuery {
            ClassLevel.select { ClassLevel.organizationId eq organizationId }
                .map { it.toClassLevelDTO() }
        }
    }

    override suspend fun getClassLevelById(id: Int): ClassLevelDAO? {
        return dataSource.dbQuery {
            ClassLevel.select { ClassLevel.id eq id }
                .map { it.toClassLevelDAO() }
                .singleOrNull()
        }
    }

    override suspend fun createClassLevel(request: CreateClassLevelRequest): Int {
        return dataSource.dbQuery {
            ClassLevel.insert {
                it[organizationId] = request.organizationId
                it[name] = request.name
            }[ClassLevel.id]
        }
    }

    override suspend fun updateClassLevel(id: Int, request: UpdateClassLevelRequest): Boolean {
        return dataSource.dbQuery {
            ClassLevel.update({ ClassLevel.id eq id }) {
                it[organizationId] = request.organizationId
                it[name] = request.name
            } > 0
        }
    }

    override suspend fun deleteClassLevel(id: Int): Boolean {
        return dataSource.dbQuery {
            ClassLevel.deleteWhere { ClassLevel.id eq id } > 0
        }
    }
} 