package com.education.repository

import com.education.database.Users
import com.education.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class UserRepository {
    fun createUser(request: CreateUserRequest): UserDTO = transaction {
        val userId = Users.insert {
            it[organizationId] = request.organizationId
            it[firstName] = request.firstName
            it[lastName] = request.lastName
            it[email] = request.email
            it[phoneNumber] = request.phoneNumber
            it[password] = request.password
            it[gender] = request.gender
            it[dateOfBirth] = request.dateOfBirth
            it[isActive] = true
            it[createdAt] = LocalDateTime.now()
            it[updatedAt] = LocalDateTime.now()
        } get Users.userId

        getUserById(userId)
    }

    fun updateUser(userId: Int, request: UpdateUserRequest): UserDTO = transaction {
        Users.update({ Users.userId eq userId }) {
            request.organizationId?.let { orgId -> it[organizationId] = orgId }
            request.firstName?.let { fname -> it[firstName] = fname }
            request.lastName?.let { lname -> it[lastName] = lname }
            request.email?.let { mail -> it[email] = mail }
            request.phoneNumber?.let { phone -> it[phoneNumber] = phone }
            request.password?.let { pwd -> it[password] = pwd }
            request.gender?.let { gen -> it[gender] = gen }
            request.dateOfBirth?.let { dob -> it[dateOfBirth] = dob }
            request.isActive?.let { active -> it[isActive] = active }
            it[updatedAt] = LocalDateTime.now()
        }

        getUserById(userId)
    }

    fun getUserById(userId: Int): UserDTO = transaction {
        Users.select { Users.userId eq userId }
            .map {
                UserDTO(
                    userId = it[Users.userId],
                    organizationId = it[Users.organizationId],
                    firstName = it[Users.firstName],
                    lastName = it[Users.lastName],
                    email = it[Users.email],
                    phoneNumber = it[Users.phoneNumber],
                    gender = it[Users.gender],
                    dateOfBirth = it[Users.dateOfBirth],
                    isActive = it[Users.isActive],
                    createdAt = it[Users.createdAt],
                    updatedAt = it[Users.updatedAt]
                )
            }
            .firstOrNull() ?: throw Exception("User not found")
    }

    fun getAllUsers(): List<UserDTO> = transaction {
        Users.selectAll()
            .map {
                UserDTO(
                    userId = it[Users.userId],
                    organizationId = it[Users.organizationId],
                    firstName = it[Users.firstName],
                    lastName = it[Users.lastName],
                    email = it[Users.email],
                    phoneNumber = it[Users.phoneNumber],
                    gender = it[Users.gender],
                    dateOfBirth = it[Users.dateOfBirth],
                    isActive = it[Users.isActive],
                    createdAt = it[Users.createdAt],
                    updatedAt = it[Users.updatedAt]
                )
            }
    }

    fun deleteUser(userId: Int) = transaction {
        Users.deleteWhere { Users.userId eq userId }
    }
} 