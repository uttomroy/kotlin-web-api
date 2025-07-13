package com.education.routes.auth

import com.education.models.CreateTeacherRequest
import com.education.models.TeacherDTO
import com.education.repositories.TeacherRepository
import com.education.services.TeacherService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import java.time.LocalDate



fun Route.teacherRoutes( teacherService: TeacherService) {
    route("teachers") {
        post("/add", {
            summary = "Create new teacher"
            description = "Creates a new teacher with user account and teacher profile"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<CreateTeacherRequest> {
                    description = "Teacher creation request with user details"
                    example("Create Teacher Request") {
                        value = CreateTeacherRequest(
                            department = "Computer Science",
                            joiningDate = "2023-09-01",
                            photoUrl = "https://example.com/photos/teacher.jpg",
                            designation = "Senior Professor",
                            organizationId = 1,
                            firstName = "John",
                            lastName = "Doe",
                            email = "john.doe@university.edu",
                            phoneNumber = "+1-555-123-4567",
                            gender = "Male",
                            dateOfBirth = "1980-05-15",
                            password = "****"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Teacher has been created successfully"
                    body<Map<String, Int>> {
                        description = "Created teacher ID"
                        example("Success Response") {
                            value = mapOf("teacherId" to 123)
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
            tags = listOf("Teacher")
        }) {
            try {
                val teacherRequest = call.receive<CreateTeacherRequest>()
                val teacherId = teacherService.createTeacher(teacherRequest)
                call.respond(HttpStatusCode.Created, mapOf("teacherId" to teacherId))
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to create teacher",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        get("/view", {
            summary = "List all teachers"
            description = "Retrieves all teachers for the given organization"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved teachers"
                    body<List<TeacherDTO>> {
                        description = "List of Teachers"
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid organization ID"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Server error occurred"
                }
            }
            tags = listOf("Teacher")
        }) {
            try {
                val orgId = call.parameters["orgId"]?.toIntOrNull()
                if (orgId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid or missing orgId"))
                    return@get
                }
                val teachers = teacherService.getAllTeachers(orgId)
                call.respond(HttpStatusCode.OK, teachers)
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to retrieve teachers",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }


    } }
