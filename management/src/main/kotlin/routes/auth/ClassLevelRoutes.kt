package com.education.routes.auth

import com.education.models.ClassLevelDAO
import com.education.models.ClassLevelDTO
import com.education.models.CreateClassLevelRequest
import com.education.models.UpdateClassLevelRequest
import com.education.services.ClassLevelService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.put
import io.github.smiley4.ktorswaggerui.dsl.routing.delete

fun Route.classLevelRoutes(
    classLevelService: ClassLevelService
) {
    route("class-levels") {
        // Get all class levels for an organization
        get("", {
            summary = "Get Class Level list"
            description = "Get all class levels in the organization"
            operationId = "getClassLevels"
            tags = listOf("ClassLevel")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved class level list"
                    body<List<ClassLevelDTO>> {
                        description = "List of class levels"
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
                
                val classLevels = classLevelService.getAllClassLevels(orgId)
                call.respond(HttpStatusCode.OK, classLevels)
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch class levels",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Get specific class level by ID
        get("/{classLevelId}", {
            summary = "Get Class Level by ID"
            description = "Get a specific class level by its ID"
            operationId = "getClassLevelById"
            tags = listOf("ClassLevel")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("classLevelId") {
                    description = "Class Level ID"
                    required = true
                    example("Example Class Level ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved class level"
                    body<ClassLevelDAO> {
                        description = "Class level information"
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Class level not found"
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
                val classLevelId = call.parameters["classLevelId"]?.toIntOrNull()
                if (classLevelId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid class level ID"))
                    return@get
                }
                
                val classLevel = classLevelService.getClassLevelById(classLevelId)
                if (classLevel != null) {
                    call.respond(HttpStatusCode.OK, classLevel)
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Class level not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch class level",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Create new class level
        post("", {
            summary = "Create new class level"
            description = "Creates a new class level"
            operationId = "createClassLevel"
            tags = listOf("ClassLevel")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<CreateClassLevelRequest> {
                    description = "Class level creation request"
                    example("Create Class Level Request") {
                        value = CreateClassLevelRequest(
                            organizationId = 1,
                            name = "Grade 1"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Class level has been created successfully"
                    body<Map<String, Int>> {
                        description = "Created class level ID"
                        example("Success Response") {
                            value = mapOf("classLevelId" to 123)
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
                val classLevelRequest = call.receive<CreateClassLevelRequest>()
                val classLevelId = classLevelService.createClassLevel(classLevelRequest)
                call.respond(HttpStatusCode.Created, mapOf("classLevelId" to classLevelId))
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to create class level",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Update class level
        put("/{classLevelId}", {
            summary = "Update class level information"
            description = "Updates the information of an existing class level"
            operationId = "updateClassLevel"
            tags = listOf("ClassLevel")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("classLevelId") {
                    description = "Class Level ID"
                    required = true
                    example("Example Class Level ID") { value = 1 }
                }
                body<UpdateClassLevelRequest> {
                    description = "Class level update request"
                    example("Update Class Level Request") {
                        value = UpdateClassLevelRequest(
                            organizationId = 1,
                            name = "Grade 1 - Updated"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Class level updated successfully"
                    body<Map<String, String>> {
                        description = "Success response"
                        example("Success Response") {
                            value = mapOf("message" to "Class level updated successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Class level not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Error occurred"
                }
            }
        }) {
            try {
                val classLevelId = call.parameters["classLevelId"]?.toIntOrNull()
                if (classLevelId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid class level ID"))
                    return@put
                }
                
                val updateClassLevelRequest = call.receive<UpdateClassLevelRequest>()
                val isUpdated = classLevelService.updateClassLevel(classLevelId, updateClassLevelRequest)
                if (isUpdated) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Class level updated successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Class level not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to update class level",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Delete class level
        delete("/{classLevelId}", {
            summary = "Delete class level"
            description = "Deletes an existing class level"
            operationId = "deleteClassLevel"
            tags = listOf("ClassLevel")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("classLevelId") {
                    description = "Class Level ID"
                    required = true
                    example("Example Class Level ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Class level deleted successfully"
                    body<Map<String, String>> {
                        description = "Success response"
                        example("Success Response") {
                            value = mapOf("message" to "Class level deleted successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Class level not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Error occurred"
                }
            }
        }) {
            try {
                val classLevelId = call.parameters["classLevelId"]?.toIntOrNull()
                if (classLevelId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid class level ID"))
                    return@delete
                }
                
                val isDeleted = classLevelService.deleteClassLevel(classLevelId)
                if (isDeleted) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Class level deleted successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Class level not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to delete class level",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }
    }
} 