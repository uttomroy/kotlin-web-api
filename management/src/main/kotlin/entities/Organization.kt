package com.education.entities

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.datetime

object Organization : Table("organizations") {
    val organizationId = integer("organization_id").autoIncrement()
    val name = varchar("name", 255)
    val isActive = bool("is_active").default(true)
    val status = varchar("status", 50).default("pending")
    val createdAt = datetime("created_at").defaultExpression(CurrentDateTime)
    val updatedAt = datetime("updated_at").defaultExpression(CurrentDateTime)

    override val primaryKey = PrimaryKey(organizationId)
} 