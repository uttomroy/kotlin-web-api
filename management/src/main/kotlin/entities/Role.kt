package com.education.entities

import org.jetbrains.exposed.sql.Table

object Role : Table("roles") {
    val roleId = integer("role_id").autoIncrement()
    val roleName = varchar("role_name", 50).uniqueIndex()

    override val primaryKey = PrimaryKey(roleId)
} 