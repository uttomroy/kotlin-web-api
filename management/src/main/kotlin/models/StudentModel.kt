package com.education.models

import kotlinx.serialization.Serializable
import kotlinx.serialization.Contextual
import java.time.LocalDate
import java.time.format.DateTimeFormatter

// DAO - Represents database structure
@Serializable
data class StudentDAO(
    val studentId: Int,
    val organizationId: Int,
    val classId: Int,
    val userId: Int,
    val firstName: String,
    val lastName: String,
    val fatherName: String?,
    val motherName: String?,
    val parentContact: String?,
    val address: String?,
    @Contextual
    val enrollmentDate: LocalDate,
    val photoUrl: String?,
    val emergencyContact: String?,
    val status: String?,
)

// DTO - For API responses
@Serializable
data class StudentDTO(
    val id: Int,
    val organizationId: Int,
    val classId: Int,
    val userId: Int,
    val firstName: String,
    val lastName: String,
    val fatherName: String?,
    val motherName: String?,
    val parentContact: String?,
    val address: String?,
    val enrollmentDate: String,
    val photoUrl: String?,
    val emergencyContact: String?,
    val status: String?,
)

// Request DTOs
@Serializable
data class CreateStudentRequest(
    val organizationId: Int,
    val classId: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val password: String,
    val gender: String,
    val dateOfBirth: String,
    val fatherName: String?,
    val motherName: String?,
    val parentContact: String?,
    val address: String?,
    val photoUrl: String?,
    val emergencyContact: String?
)

@Serializable
data class UpdateStudentRequest(
    val studentId: Int,
    val classId: Int? = null,
    val fatherName: String? = null,
    val motherName: String? = null,
    val parentContact: String? = null,
    val address: String? = null,
    val photoUrl: String? = null,
    val emergencyContact: String? = null,
    val status: String? = null,
)

// Extension function to convert between DAO and DTO
fun StudentDAO.toDTO() = StudentDTO(
    id = studentId,
    organizationId = organizationId,
    classId = classId,
    userId = userId,
    firstName = firstName,
    lastName = lastName,
    fatherName = fatherName,
    motherName = motherName,
    parentContact = parentContact,
    address = address,
    enrollmentDate = enrollmentDate.toString(),
    photoUrl = photoUrl,
    emergencyContact = emergencyContact,
    status = status,
)
