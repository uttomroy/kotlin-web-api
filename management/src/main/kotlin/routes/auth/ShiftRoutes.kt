package com.education.routes.auth

import com.education.models.ShiftDAO
import com.education.models.ShiftDTO
import com.education.models.CreateShiftRequest
import com.education.models.UpdateShiftRequest
import com.education.services.ShiftService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.put
import io.github.smiley4.ktorswaggerui.dsl.routing.delete

fun Route.shiftRoutes(
    shiftService: ShiftService
) {
    route("shifts") {
        // Get all shifts for an organization
        get("", {
            summary = "Get Shift list"
            description = "Get all shifts in the organization"
            operationId = "getShifts"
            tags = listOf("Shift")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved shift list"
                    body<List<ShiftDTO>> {
                        description = "List of shifts"
                    }
                }
                HttpStatusCode.Unauthorized to {
                    description = "Authentication required"
                }
                HttpStatusCode.Forbidden to {
                    description = "Insufficient permissions"
                }
            }
        }) {
            try {
                val orgId = call.parameters["orgId"]?.toIntOrNull()
                if (orgId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid organization ID"))
                    return@get
                }
                
                val shifts = shiftService.getAllShifts(orgId)
                call.respond(HttpStatusCode.OK, shifts)
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch shifts",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Get specific shift by ID
        get("/{shiftId}", {
            summary = "Get Shift by ID"
            description = "Get a specific shift by its ID"
            operationId = "getShiftById"
            tags = listOf("Shift")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("shiftId") {
                    description = "Shift ID"
                    required = true
                    example("Example Shift ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved shift"
                    body<ShiftDAO> {
                        description = "Shift information"
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Shift not found"
                }
                HttpStatusCode.Unauthorized to {
                    description = "Authentication required"
                }
                HttpStatusCode.Forbidden to {
                    description = "Insufficient permissions"
                }
            }
        }) {
            try {
                val shiftId = call.parameters["shiftId"]?.toIntOrNull()
                if (shiftId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid shift ID"))
                    return@get
                }
                
                val shift = shiftService.getShiftById(shiftId)
                if (shift != null) {
                    call.respond(HttpStatusCode.OK, shift)
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Shift not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch shift",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Create new shift
        post("", {
            summary = "Create new shift"
            description = "Creates a new shift"
            operationId = "createShift"
            tags = listOf("Shift")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<CreateShiftRequest> {
                    description = "Shift creation request"
                    example("Create Shift Request") {
                        value = CreateShiftRequest(
                            organizationId = 1,
                            shiftName = "Morning Shift",
                            startTime = "08:00",
                            endTime = "12:00",
                            description = "Morning classes"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Shift has been created successfully"
                    body<Map<String, Int>> {
                        description = "Created shift ID"
                        example("Success Response") {
                            value = mapOf("shiftId" to 123)
                        }
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid request data"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Server error occurred"
                }
            }
        }) {
            try {
                val shiftRequest = call.receive<CreateShiftRequest>()
                val shiftId = shiftService.createShift(shiftRequest)
                call.respond(HttpStatusCode.Created, mapOf("shiftId" to shiftId))
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to create shift",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Update shift
        put("/{shiftId}", {
            summary = "Update shift information"
            description = "Updates the information of an existing shift"
            operationId = "updateShift"
            tags = listOf("Shift")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("shiftId") {
                    description = "Shift ID"
                    required = true
                    example("Example Shift ID") { value = 1 }
                }
                body<UpdateShiftRequest> {
                    description = "Shift update request"
                    example("Update Shift Request") {
                        value = UpdateShiftRequest(
                            organizationId = 1,
                            shiftName = "Evening Shift",
                            startTime = "13:00",
                            endTime = "17:00",
                            description = "Afternoon classes"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Shift updated successfully"
                    body<Map<String, String>> {
                        description = "Success response"
                        example("Success Response") {
                            value = mapOf("message" to "Shift updated successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Shift not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Error occurred"
                }
            }
        }) {
            try {
                val shiftId = call.parameters["shiftId"]?.toIntOrNull()
                if (shiftId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid shift ID"))
                    return@put
                }
                
                val updateShiftRequest = call.receive<UpdateShiftRequest>()
                val isUpdated = shiftService.updateShift(shiftId, updateShiftRequest)
                if (isUpdated) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Shift updated successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Shift not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to update shift",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Delete shift
        delete("/{shiftId}", {
            summary = "Delete shift"
            description = "Deletes an existing shift"
            operationId = "deleteShift"
            tags = listOf("Shift")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("shiftId") {
                    description = "Shift ID"
                    required = true
                    example("Example Shift ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Shift deleted successfully"
                    body<Map<String, String>> {
                        description = "Success response"
                        example("Success Response") {
                            value = mapOf("message" to "Shift deleted successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Shift not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Error occurred"
                }
            }
        }) {
            try {
                val shiftId = call.parameters["shiftId"]?.toIntOrNull()
                if (shiftId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid shift ID"))
                    return@delete
                }
                
                val isDeleted = shiftService.deleteShift(shiftId)
                if (isDeleted) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Shift deleted successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Shift not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to delete shift",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }
    }
} 