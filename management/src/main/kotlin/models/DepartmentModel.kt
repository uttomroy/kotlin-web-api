package com.education.models

import kotlinx.serialization.Serializable

@Serializable
data class DepartmentDAO(
    val id: Int,
    val organizationId: Int,
    val name: String,
    val description: String?
)

@Serializable
data class DepartmentDTO(
    val id: Int,
    val organizationId: Int,
    val name: String,
    val description: String?
)

@Serializable
data class CreateDepartmentRequest(
    val organizationId: Int,
    val name: String,
    val description: String?
)

@Serializable
data class UpdateDepartmentRequest(
    val organizationId: Int,
    val name: String,
    val description: String?
) 