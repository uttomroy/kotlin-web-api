package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.User
import com.education.models.UserDAO
import org.jetbrains.exposed.sql.*

interface UserRepository {
    suspend fun getUserById(userId: Int): UserDAO?
    suspend fun getAllUsers(): List<UserDAO>
    suspend fun createUser(
        organizationId: Int,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        password: String,
        gender: String?,
        dateOfBirth: String,  // Format: "YYYY-MM-DD"
        isActive: Boolean = true
    ): Int
    suspend fun updateUser(
        userId: Int,
        firstName: String?,
        lastName: String?,
        email: String?,
        phoneNumber: String?,
        gender: String?,
        dateOfBirth: String?  // Format: "YYYY-MM-DD"
    ): Boolean
    suspend fun getUserByEmail(email: String): UserDAO?
}

class UserRepositoryImpl(private val dataSource: DataSource) : UserRepository {
    
    private fun ResultRow.toUserDAO() = UserDAO(
        userId = this[User.userId],
        organizationId = this[User.organizationId],
        firstName = this[User.firstName],
        lastName = this[User.lastName],
        email = this[User.email],
        phoneNumber = this[User.phoneNumber],
        password = this[User.password],
        gender = this[User.gender],
        dateOfBirth = this[User.dateOfBirth],
        isActive = this[User.isActive],
        createdAt = this[User.createdAt],
        updatedAt = this[User.updatedAt]
    )
    
    override suspend fun getUserById(userId: Int): UserDAO? {
        return dataSource.dbQuery {
            User.select { User.userId eq userId }
                .map { it.toUserDAO() }
                .singleOrNull()
        }
    }

    override suspend fun getAllUsers(): List<UserDAO> {
        return dataSource.dbQuery {
            User.selectAll()
                .map { it.toUserDAO() }
        }
    }

    override suspend fun createUser(
        organizationId: Int,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        password: String,
        gender: String?,
        dateOfBirth: String,
        isActive: Boolean
    ): Int {
        return dataSource.dbQuery {
            User.insert {
                it[User.organizationId] = organizationId
                it[User.firstName] = firstName
                it[User.lastName] = lastName
                it[User.email] = email
                it[User.phoneNumber] = phoneNumber
                it[User.password] = password
                it[User.gender] = gender
                it[User.dateOfBirth] = dateOfBirth
                it[User.isActive] = isActive
            }[User.userId]
        }
    }

    override suspend fun updateUser(
        userId: Int,
        firstName: String?,
        lastName: String?,
        email: String?,
        phoneNumber: String?,
        gender: String?,
        dateOfBirth: String?
    ): Boolean {
        return dataSource.dbQuery {
            val updateStatement = User.update({ User.userId eq userId }) { statement ->
                firstName?.let { statement[User.firstName] = it }
                lastName?.let { statement[User.lastName] = it }
                email?.let { statement[User.email] = it }
                phoneNumber?.let { statement[User.phoneNumber] = it }
                gender?.let { statement[User.gender] = it }
                dateOfBirth?.let { statement[User.dateOfBirth] = it }
            }
            updateStatement > 0
        }
    }

    override suspend fun getUserByEmail(email: String): UserDAO? {
        return dataSource.dbQuery {
            User.select { User.email eq email }
                .map { it.toUserDAO() }
                .singleOrNull()
        }
    }
}