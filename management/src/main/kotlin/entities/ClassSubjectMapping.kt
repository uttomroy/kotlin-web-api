package com.education.entities

import org.jetbrains.exposed.sql.Table

object ClassSubjectMapping: Table("class_subject_mapping") {
    val id = integer("id").autoIncrement()
    val classId = integer("class_id").references(Class.classId)
    val subjectId = integer("subject_id").references(Subject.subjectId)
    val teacherId = integer("teacher_id").references(Teacher.teacherId)

    override val primaryKey = PrimaryKey(id)
}