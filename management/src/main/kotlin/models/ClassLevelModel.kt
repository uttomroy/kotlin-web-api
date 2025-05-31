package com.education.models

import kotlinx.serialization.Serializable

@Serializable
data class ClassLevelDAO(
    val id: Int,
    val organizationId: Int,
    val name: String
)

@Serializable
data class ClassLevelDTO(
    val id: Int,
    val organizationId: Int,
    val name: String
)

@Serializable
data class CreateClassLevelRequest(
    val organizationId: Int,
    val name: String
)

@Serializable
data class UpdateClassLevelRequest(
    val organizationId: Int,
    val name: String
) 