package com.education.entities
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date


object Student: Table("students") {
    val studentId = integer("student_id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val classId = integer("class_id").references(Class.classId)
    val userId = integer("user_id").references(User.userId)
    val fatherName = varchar("father_name", 100).nullable()
    val motherName = varchar("mother_name", 100).nullable()
    val parentContact = varchar("parent_contact", 100).nullable()
    val address = varchar("address", 300).nullable()
    val enrollmentDate = date("enrollment_date")
    val photoUrl = varchar("photo_url", 300).nullable()
    val emergencyContact = varchar("emergency_contact", 15).nullable()
    val status = varchar("status", 15).nullable()

    override val primaryKey = PrimaryKey(studentId)
}