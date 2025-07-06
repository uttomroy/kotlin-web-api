package com.education.entities

import org.jetbrains.exposed.sql.Table

object Department : Table("departments") {
    val id = integer("id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val name = varchar("name", 100)
    val description = varchar("description", 500).nullable()

    override val primaryKey = PrimaryKey(id)
} 