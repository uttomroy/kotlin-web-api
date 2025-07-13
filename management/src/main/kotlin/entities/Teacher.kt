package com.education.entities
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date


object Teacher : Table("teachers") {
    val teacherId = integer("teacher_id").autoIncrement()
    val userId = integer("user_id").references(User.userId)
    val department = varchar("department", 50)
    val joiningDate = date("joining_date")
    val photoUrl = varchar("photo_url", 300)
    val designation = varchar("designation", 50)
    val isActive = bool("is_active")

    override val primaryKey = PrimaryKey(teacherId)
}