package com.education.entities

import org.jetbrains.exposed.sql.Table

object Class: Table("classes") {

    val classId = integer("class_id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val classLevelId = integer("class_level_id").references(ClassLevel.id)
    val section = varchar("section",10)
    val classTeacherId = integer("class_teacher_id").references(Teacher.teacherId)

    override val primaryKey = PrimaryKey(classId)

}