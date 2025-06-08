package com.education.services

import com.education.models.ShiftDAO
import com.education.models.ShiftDTO
import com.education.models.CreateShiftRequest
import com.education.models.UpdateShiftRequest
import com.education.repositories.ShiftRepository

interface ShiftService {
    suspend fun getAllShifts(organizationId: Int): List<ShiftDTO>
    suspend fun getShiftById(shiftId: Int): ShiftDAO?
    suspend fun createShift(shiftRequest: CreateShiftRequest): Int
    suspend fun updateShift(shiftId: Int, updateShiftRequest: UpdateShiftRequest): Boolean
    suspend fun deleteShift(shiftId: Int): Boolean
}

class ShiftServiceImpl(
    private val shiftRepository: ShiftRepository,
) : ShiftService {

    override suspend fun getAllShifts(organizationId: Int): List<ShiftDTO> {
        return shiftRepository.getAllShifts(organizationId)
    }

    override suspend fun getShiftById(shiftId: Int): ShiftDAO? {
        return shiftRepository.getShiftById(shiftId)
    }

    override suspend fun createShift(shiftRequest: CreateShiftRequest): Int {
        return shiftRepository.createShift(shiftRequest)
    }

    override suspend fun updateShift(shiftId: Int, updateShiftRequest: UpdateShiftRequest): Boolean {
        return shiftRepository.updateShift(shiftId, updateShiftRequest)
    }

    override suspend fun deleteShift(shiftId: Int): Boolean {
        return shiftRepository.deleteShift(shiftId)
    }
} 