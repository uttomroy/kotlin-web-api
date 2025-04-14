package com.education.models

import java.time.LocalDateTime

data class UserDAO(
    val userId: Int,
    val organizationId: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val password: String,
    val gender: String?,
    val dateOfBirth: String,  // Format: "YYYY-MM-DD"
    val isActive: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)

data class UserDTO(
    val userId: Int,  // Using userId for consistency
    val organizationId: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val gender: String?,
    val dateOfBirth: String,  // Format: "YYYY-MM-DD"
    val isActive: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)

data class CreateUserRequest(
    val organizationId: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val password: String,
    val gender: String,
    val dateOfBirth: String  // Format: "YYYY-MM-DD"
)

data class UpdateUserRequest(
    val organizationId: Int? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    val email: String? = null,
    val phoneNumber: String? = null,
    val password: String? = null,
    val gender: String,
    val dateOfBirth: String? = null,  // Format: "YYYY-MM-DD"
    val isActive: Boolean? = null
)

fun UserDAO.toDTO() = UserDTO(
    userId = userId,
    organizationId = organizationId,
    firstName = firstName,
    lastName = lastName,
    email = email,
    phoneNumber = phoneNumber,
    gender = gender,
    dateOfBirth = dateOfBirth,
    isActive = isActive,
    createdAt = createdAt,
    updatedAt = updatedAt
) 