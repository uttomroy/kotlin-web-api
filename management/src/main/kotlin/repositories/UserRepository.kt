package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.User
import org.jetbrains.exposed.sql.select

interface UserRepository {
    suspend fun getUserInfo(studentId: Int): List<Map<String, Any>>
}

class UserRepositoryImpl (private val dataSource: DataSource) : UserRepository {
    override suspend fun getUserInfo(studentId: Int): List<Map<String, Any>> {
        val result  = dataSource.dbQuery {
            User.select{ User.id eq studentId }.map {
                mapOf(
                    "id" to it[User.id],
                    "username" to it[User.username],
                    "email" to it[User.email],
                    "created_at" to it[User.created_at]
                )
            }
        }
        return result
    }
}