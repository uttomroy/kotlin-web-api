package com.education.models

import kotlinx.serialization.Serializable
import kotlinx.datetime.LocalDate

// DAO - Represents database structure
data class TeacherDAO(
    val teacherId: Int,
    val userId: Int,
    val department: String?,
    val joiningDate: LocalDate?,
    val photoUrl: String?,
    val designation: String,
    val isActive: Boolean
)

// DTO - For API responses/requests
@Serializable
data class TeacherDTO(
    val id: Int,
    val userId: Int,
    val department: String?,
    val joiningDate: LocalDate?,
    val photoUrl: String?,
    val designation: String,
    val isActive: Boolean
)

// Request DTOs
@Serializable
data class CreateTeacherRequest(
    val userId: Int,
    val department: String?,
    val joiningDate: LocalDate?,
    val photoUrl: String?,
    val designation: String
)

@Serializable
data class UpdateTeacherRequest(
    val department: String?,
    val joiningDate: LocalDate?,
    val photoUrl: String?,
    val designation: String?
)

// Extension function to convert between DAO and DTO
fun TeacherDAO.toDTO() = TeacherDTO(
    id = teacherId,
    userId = userId,
    department = department,
    joiningDate = joiningDate,
    photoUrl = photoUrl,
    designation = designation,
    isActive = isActive
) 