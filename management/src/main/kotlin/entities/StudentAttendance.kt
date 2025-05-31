package com.education.entities

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.CurrentDateTime

object StudentAttendance: Table("student_attendance") {
    val studentAttendanceId = integer("student_attendance_id").autoIncrement()
    val classSubjectMappingId = integer("class_subject_mapping_id").references(ClassSubjectMapping.id)
    val studentId = integer("student_id").references(Student.studentId)
    val attendanceDate = date("attendance_date")
    val present = bool("present").nullable()
    val remarks = varchar("remarks", 100).nullable()
    val updatedAt = datetime("updated_at").defaultExpression(CurrentDateTime)

    override val primaryKey = PrimaryKey(studentAttendanceId)
} 