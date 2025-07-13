package com.education.models

import kotlinx.serialization.Serializable
import kotlinx.serialization.Contextual
import java.time.LocalDate  // ✅ Correct import for LocalDate

// DAO - Represents database structure
data class TeacherDAO(
    val id: Int,
    val userId: Int,
    val firstName: String,
    val lastName: String,
    val department: String,
    val joiningDate: String,
    val photoUrl: String?,
    val designation: String,
    val isActive: Boolean
)

// DTO - For API responses/requests
@Serializable
data class TeacherDTO(
    val id: Int,
    val userId: Int,
    val firstName: String,
    val lastName: String,
    val department: String,
    val joiningDate: String,
    val photoUrl: String?,
    val designation: String,
    val isActive: Boolean
)

// Request DTOs
@Serializable
data class CreateTeacherRequest(
    val organizationId: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val password: String,
    val gender: String,
    val dateOfBirth: String, // Format: "YYYY-MM-DD"

    val department: String,
    val joiningDate: String, // Format: "YYYY-MM-DD"
    val photoUrl: String,
    val designation: String,
    val isActive: Boolean = true
)

@Serializable
data class UpdateTeacherRequest(
    val department: String,
    val joiningDate: String,
    val photoUrl: String,
    val designation: String
)

// Extension function to convert DAO to DTO
fun TeacherDAO.toDTO() = TeacherDTO(
    id = id,
    userId = userId,
    firstName = firstName,
    lastName = lastName,
    department = department,
    joiningDate = joiningDate,
    photoUrl = photoUrl,
    designation = designation,
    isActive = isActive
)
