package com.education.entities

import org.jetbrains.exposed.sql.Table

object ClassLevel : Table("class_level") {
    val id = integer("id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val name = varchar("name", 10)

    override val primaryKey = PrimaryKey(id)
} 