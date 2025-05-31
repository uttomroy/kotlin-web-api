package com.education.models

import kotlinx.serialization.Serializable

@Serializable
data class ClassDAO(
    val classId: Int,
    val organizationId: Int,
    val classLevelId: Int,
    val shiftId: Int,
    val classTeacherId: Int
)

@Serializable
data class ClassDTO(
    val classId: Int,
    val organizationId: Int,
    val classLevelId: Int,
    val classLevelName: String,
    val shiftId: Int,
    val shiftName: String,
    val classTeacherId: Int,
    val teacherName: String?
)

@Serializable
data class CreateClassRequest(
    val organizationId: Int,
    val classLevelId: Int,
    val shiftId: Int,
    val classTeacherId: Int
)

@Serializable
data class UpdateClassRequest(
    val classLevelId: Int,
    val shiftId: Int,
    val classTeacherId: Int
)

@Serializable
data class ClassSubjectMappingDAO(
    val id: Int,
    val classId: Int,
    val subjectId: Int,
    val teacherId: Int
)

@Serializable
data class ClassSubjectMappingDTO(
    val id: Int,
    val classId: Int,
    val className: String,
    val subjectId: Int,
    val subjectName: String,
    val teacherId: Int,
    val teacherName: String
)

@Serializable
data class CreateClassSubjectMappingRequest(
    val classId: Int,
    val subjectId: Int,
    val teacherId: Int
)

@Serializable
data class UpdateClassSubjectMappingRequest(
    val subjectId: Int,
    val teacherId: Int
) 