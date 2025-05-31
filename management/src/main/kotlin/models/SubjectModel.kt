package com.education.models

import kotlinx.serialization.Serializable

@Serializable
data class SubjectDAO(
    val subjectId: Int,
    val subjectName: String,
    val subjectCode: String,
    val isCompulsory: Boolean
)

@Serializable
data class SubjectDTO(
    val subjectId: Int,
    val subjectName: String,
    val subjectCode: String,
    val isCompulsory: Boolean
)

@Serializable
data class CreateSubjectRequest(
    val subjectName: String,
    val subjectCode: String,
    val isCompulsory: Boolean = true
)

@Serializable
data class UpdateSubjectRequest(
    val subjectName: String,
    val subjectCode: String,
    val isCompulsory: Boolean
) 