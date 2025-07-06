package com.education.routes.auth

import com.education.models.*
import com.education.services.DepartmentService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.put
import io.github.smiley4.ktorswaggerui.dsl.routing.delete

fun Route.departmentRoutes(departmentService: DepartmentService) {
    route("departments") {
        // Get all departments for an organization
        get("", {
            summary = "Get Department list"
            description = "Get all departments in the organization"
            operationId = "getDepartments"
            tags = listOf("Department")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved department list"
                    body<List<DepartmentDTO>> {
                        description = "List of departments"
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
                
                val departments = departmentService.getAllDepartments(orgId)
                call.respond(HttpStatusCode.OK, departments)
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch departments",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Get specific department by ID
        get("/{departmentId}", {
            summary = "Get Department by ID"
            description = "Get a specific department by its ID"
            operationId = "getDepartmentById"
            tags = listOf("Department")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("departmentId") {
                    description = "Department ID"
                    required = true
                    example("Example Department ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved department"
                    body<DepartmentDAO> {
                        description = "Department information"
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Department not found"
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
                val departmentId = call.parameters["departmentId"]?.toIntOrNull()
                if (departmentId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid department ID"))
                    return@get
                }
                
                val department = departmentService.getDepartmentById(departmentId)
                if (department != null) {
                    call.respond(HttpStatusCode.OK, department)
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Department not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch department",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Create new department
        post("", {
            summary = "Create new department"
            description = "Creates a new department"
            operationId = "createDepartment"
            tags = listOf("Department")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<CreateDepartmentRequest> {
                    description = "Department creation request"
                    example("Create Department Request") {
                        value = CreateDepartmentRequest(
                            organizationId = 1,
                            name = "Computer Science",
                            description = "Department of Computer Science"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Department has been created successfully"
                    body<Map<String, Int>> {
                        description = "Created department ID"
                        example("Success Response") {
                            value = mapOf("departmentId" to 123)
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
                val departmentRequest = call.receive<CreateDepartmentRequest>()
                val departmentId = departmentService.createDepartment(departmentRequest)
                call.respond(HttpStatusCode.Created, mapOf("departmentId" to departmentId.id))
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to create department",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Update department
        put("/{departmentId}", {
            summary = "Update department information"
            description = "Updates the information of an existing department"
            operationId = "updateDepartment"
            tags = listOf("Department")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("departmentId") {
                    description = "Department ID"
                    required = true
                    example("Example Department ID") { value = 1 }
                }
                body<UpdateDepartmentRequest> {
                    description = "Department update request"
                    example("Update Department Request") {
                        value = UpdateDepartmentRequest(
                            organizationId = 1,
                            name = "Computer Science",
                            description = "Department of Computer Science"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Department has been updated successfully"
                    body<DepartmentDTO> {
                        description = "Updated department information"
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Department not found"
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
                val departmentId = call.parameters["departmentId"]?.toIntOrNull()
                if (departmentId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid department ID"))
                    return@put
                }
                
                val departmentRequest = call.receive<UpdateDepartmentRequest>()
                val department = departmentService.updateDepartment(departmentId, departmentRequest)
                if (department != null) {
                    call.respond(HttpStatusCode.OK, department)
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Department not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to update department",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Delete department
        delete("/{departmentId}", {
            summary = "Delete department"
            description = "Deletes a department by its ID"
            operationId = "deleteDepartment"
            tags = listOf("Department")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("departmentId") {
                    description = "Department ID"
                    required = true
                    example("Example Department ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Department has been deleted successfully"
                    body<Map<String, String>> {
                        description = "Success message"
                        example("Success Response") {
                            value = mapOf("message" to "Department deleted successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Department not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Server error occurred"
                }
            }
        }) {
            try {
                val departmentId = call.parameters["departmentId"]?.toIntOrNull()
                if (departmentId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid department ID"))
                    return@delete
                }
                
                val success = departmentService.deleteDepartment(departmentId)
                if (success) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Department deleted successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Department not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to delete department",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }
    }
} 