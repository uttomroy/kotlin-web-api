package com.education.entities

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.time

object Shift : Table("shifts") {
    val shiftId = integer("shift_id").autoIncrement()
    val organizationId = integer("organization_id").references(Organization.organizationId)
    val shiftName = varchar("shift_name", 50)
    val startTime = time("start_time")
    val endTime = time("end_time")
    val description = varchar("description", 200).nullable()

    override val primaryKey = PrimaryKey(shiftId)
} 