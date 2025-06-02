package com.education.entities

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.timestamp

object User : Table("users") {
    val userId = integer("user_id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val firstName = varchar("first_name", 255)
    val lastName = varchar("last_name", 255)
    val email = varchar("email", 255).uniqueIndex()
    val phoneNumber = varchar("phone_number", 25).uniqueIndex()
    val password = varchar("password", 255)
    val gender = varchar("gender", 25)
    val dateOfBirth = varchar("date_of_birth", 10)  // Format: "YYYY-MM-DD"
    val isActive = bool("is_active").default(true)
    val createdAt = datetime("created_at").defaultExpression(CurrentDateTime)
    val updatedAt = datetime("updated_at").defaultExpression(CurrentDateTime)

    override val primaryKey = PrimaryKey(userId)
}