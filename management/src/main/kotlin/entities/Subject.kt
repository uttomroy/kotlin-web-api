package com.education.entities

import org.jetbrains.exposed.sql.Table

object Subject: Table("subjects") {
    val subjectId = integer("subject_id").autoIncrement()
    val subjectName = varchar("subject_name", 100)
    val subjectCode = varchar("subject_code", 20)
    val isCompulsory = bool("is_compulsory").default(true)

    override val primaryKey = PrimaryKey(subjectId)
} 