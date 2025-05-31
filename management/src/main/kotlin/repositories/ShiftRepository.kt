package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.Shift
import com.education.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.LocalTime

interface ShiftRepository {
    suspend fun getAllShifts(organizationId: Int): List<ShiftDTO>
    suspend fun getShiftById(shiftId: Int): ShiftDAO?
    suspend fun createShift(request: CreateShiftRequest): Int
    suspend fun updateShift(shiftId: Int, request: UpdateShiftRequest): Boolean
    suspend fun deleteShift(shiftId: Int): Boolean
}

class ShiftRepositoryImpl(private val dataSource: DataSource) : ShiftRepository {

    private fun ResultRow.toShiftDAO() = ShiftDAO(
        shiftId = this[Shift.shiftId],
        organizationId = this[Shift.organizationId],
        shiftName = this[Shift.shiftName],
        startTime = this[Shift.startTime].toString(),
        endTime = this[Shift.endTime].toString(),
        description = this[Shift.description]
    )

    private fun ResultRow.toShiftDTO() = ShiftDTO(
        shiftId = this[Shift.shiftId],
        organizationId = this[Shift.organizationId],
        shiftName = this[Shift.shiftName],
        startTime = this[Shift.startTime].toString(),
        endTime = this[Shift.endTime].toString(),
        description = this[Shift.description]
    )

    override suspend fun getAllShifts(organizationId: Int): List<ShiftDTO> {
        return dataSource.dbQuery {
            Shift.select { Shift.organizationId eq organizationId }
                .map { it.toShiftDTO() }
        }
    }

    override suspend fun getShiftById(shiftId: Int): ShiftDAO? {
        return dataSource.dbQuery {
            Shift.select { Shift.shiftId eq shiftId }
                .map { it.toShiftDAO() }
                .singleOrNull()
        }
    }

    override suspend fun createShift(request: CreateShiftRequest): Int {
        return dataSource.dbQuery {
            Shift.insert {
                it[organizationId] = request.organizationId
                it[shiftName] = request.shiftName
                it[startTime] = LocalTime.parse(request.startTime)
                it[endTime] = LocalTime.parse(request.endTime)
                it[description] = request.description
            }[Shift.shiftId]
        }
    }

    override suspend fun updateShift(shiftId: Int, request: UpdateShiftRequest): Boolean {
        return dataSource.dbQuery {
            Shift.update({ Shift.shiftId eq shiftId }) {
                it[shiftName] = request.shiftName
                it[startTime] = LocalTime.parse(request.startTime)
                it[endTime] = LocalTime.parse(request.endTime)
                it[description] = request.description
            } > 0
        }
    }

    override suspend fun deleteShift(shiftId: Int): Boolean {
        return dataSource.dbQuery {
            Shift.deleteWhere { Shift.shiftId eq shiftId } > 0
        }
    }
} 