package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.User
import com.education.entities.RoleMapping
import com.education.models.UserDAO
import com.education.models.RoleMappingDAO
import org.jetbrains.exposed.sql.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

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
        gender: String,
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
    suspend fun getUserByEmailAndOrgId(email: String, organizationId: Int): UserDAO?
}

class UserRepositoryImpl(private val dataSource: DataSource) : UserRepository {

    private fun ResultRow.toRoleMappingDAO() = RoleMappingDAO(
        roleId = this[RoleMapping.roleId]
    )

    private fun ResultRow.toUserDAO(roleMappings: List<RoleMappingDAO> = emptyList()) = UserDAO(
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
        updatedAt = this[User.updatedAt],
        roles = roleMappings
    )

    override suspend fun getUserById(userId: Int): UserDAO? {
        return dataSource.dbQuery {
            val user = User.select { User.userId eq userId }
                .singleOrNull()
                ?.let { row ->
                    val roleMappings = RoleMapping
                        .select { RoleMapping.userId eq userId }
                        .map { it.toRoleMappingDAO() }
                    row.toUserDAO(roleMappings)
                }
            user
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
        gender: String,
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
                it[User.dateOfBirth] = LocalDate.parse(dateOfBirth, DateTimeFormatter.ISO_LOCAL_DATE)
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
                dateOfBirth?.let { statement[User.dateOfBirth] = LocalDate.parse(it, DateTimeFormatter.ISO_LOCAL_DATE) }
            }
            updateStatement > 0
        }
    }

    override suspend fun getUserByEmailAndOrgId(email: String, organizationId: Int): UserDAO? {
        return dataSource.dbQuery {
            val user = User.select { User.email eq email and (User.organizationId eq organizationId) }
                .singleOrNull()
                ?.let { row ->
                    val roleMappings = RoleMapping
                        .select { RoleMapping.userId eq row[User.userId] }
                        .map { it.toRoleMappingDAO() }
                    row.toUserDAO(roleMappings)
                }
            user
        }
    }
}