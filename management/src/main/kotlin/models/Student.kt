package com.education.models
import kotlinx.serialization.Serializable

@Serializable
data class Student(
    val id: Int,
    val name: String,
    val email: String
)

@Serializable
data class CreateStudentRequest(
    val name: String,
    val email: String
)
