package com.education.entities

import kotlinx.serialization.descriptors.PrimitiveKind
import org.jetbrains.exposed.sql.*

object Test: Table("test") {
    val id1   = integer("id").autoIncrement()
    val name = varchar("name", 20)
    val age  = integer("age")

    override val primaryKey= PrimaryKey(id1)
}