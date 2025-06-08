package com.education.models

import kotlinx.serialization.Serializable
import java.time.LocalTime

@Serializable
data class ShiftDAO(
    val shiftId: Int,
    val organizationId: Int,
    val shiftName: String,
    val startTime: String, // Will be formatted as "HH:mm"
    val endTime: String,   // Will be formatted as "HH:mm"
    val description: String?
)

@Serializable
data class ShiftDTO(
    val shiftId: Int,
    val organizationId: Int,
    val shiftName: String,
    val startTime: String,
    val endTime: String,
    val description: String?
)

@Serializable
data class CreateShiftRequest(
    val organizationId: Int,
    val shiftName: String,
    val startTime: String, // Format: "HH:mm"
    val endTime: String,   // Format: "HH:mm"
    val description: String?
)

@Serializable
data class UpdateShiftRequest(
    val organizationId: Int,
    val shiftName: String,
    val startTime: String,
    val endTime: String,
    val description: String?
) 