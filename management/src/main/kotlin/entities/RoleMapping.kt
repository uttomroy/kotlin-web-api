package com.education.entities

import org.jetbrains.exposed.sql.Table

object RoleMapping : Table("role_mapping") {
    val roleId = integer("role_id").references(Role.roleId)
    val userId = integer("user_id").references(User.userId)

    override val primaryKey = PrimaryKey(arrayOf(roleId, userId))
} 