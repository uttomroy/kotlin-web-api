package com.education.database

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object Users : Table() {
    val userId = integer("user_id").autoIncrement()
    val organizationId = integer("organization_id")
    val firstName = varchar("first_name", 50)
    val lastName = varchar("last_name", 50)
    val email = varchar("email", 100)
    val phoneNumber = varchar("phone_number", 20)
    val password = varchar("password", 255)
    val gender = varchar("gender", 10)
    val dateOfBirth = varchar("date_of_birth", 10)
    val isActive = bool("is_active").default(true)
    val createdAt = datetime("created_at")
    val updatedAt = datetime("updated_at")

    override val primaryKey = PrimaryKey(userId)
} 