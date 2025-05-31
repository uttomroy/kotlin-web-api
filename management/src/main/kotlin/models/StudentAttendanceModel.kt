package com.education.models

import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.time.LocalDateTime

// DAO - Represents database structure
data class StudentAttendanceDAO(
    val studentAttendanceId: Int,
    val classSubjectMappingId: Int,
    val studentId: Int,
    val attendanceDate: LocalDate,
    val present: Boolean?,
    val remarks: String?,
    val updatedAt: LocalDateTime
)

// DTO - For API responses/requests
@Serializable
data class StudentAttendanceDTO(
    val id: Int,
    val classSubjectMappingId: Int,
    val studentId: Int,
    val attendanceDate: String,
    val present: Boolean?,
    val remarks: String?,
    val updatedAt: String,
    // Additional fields for better API response
    val studentFirstName: String? = null,
    val studentLastName: String? = null,
    val subjectName: String? = null
)

// Request DTOs
@Serializable
data class StudentAttendanceFilterRequest(
    val classId: Int? = null,
    val subjectId: Int? = null,
    val startDate: String,  // Format: "YYYY-MM-DD" - Required
    val endDate: String     // Format: "YYYY-MM-DD" - Required
)

@Serializable
data class CreateStudentAttendanceRequest(
    val classSubjectMappingId: Int,
    val studentId: Int,
    val attendanceDate: String,
    val present: Boolean?,
    val remarks: String? = null
)

@Serializable
data class UpdateStudentAttendanceRequest(
    val present: Boolean?,
    val remarks: String? = null
)

@Serializable
data class BulkAttendanceRequest(
    val classId: Int,
    val subjectId: Int,
    val attendanceDate: String,
    val attendanceRecords: List<StudentAttendanceRecord>
)

@Serializable
data class StudentAttendanceRecord(
    val studentId: Int,
    val present: Boolean?,
    val remarks: String? = null
)

// Extension function to convert between DAO and DTO
fun StudentAttendanceDAO.toDTO() = StudentAttendanceDTO(
    id = studentAttendanceId,
    classSubjectMappingId = classSubjectMappingId,
    studentId = studentId,
    attendanceDate = attendanceDate.toString(),
    present = present,
    remarks = remarks,
    updatedAt = updatedAt.toString()
) 