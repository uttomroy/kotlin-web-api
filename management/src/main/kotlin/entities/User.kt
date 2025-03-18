package com.education.entities

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime


object User : Table("user") {
    val id = integer("id").autoIncrement()
    val username = varchar("username", 50)
    val email = varchar("email", 100)
    val created_at = datetime("created_at")
    override val primaryKey = PrimaryKey(id)
}