package com.education.routes.auth

import com.education.models.CreateTeacherRequest
import com.education.repositories.TeacherRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import com.education.routes.public.TokenResponse


fun Route.teacherRoutes( teacherRepository: TeacherRepository) {
    post("/teacher", {
        summary = "Create new teacher"
        description = "Authenticates a user with username and password, returns JWT token on success"
        request {
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
                        dateOfBirth = "1980-05-15"
                    )
                }
                required = true
            }
        }
        response {
            HttpStatusCode.OK to {
                description = "Teacher has been created successfully"
                body<TokenResponse> {
                    description = "Teacher create request response"
                    example("Success Response") {
                        value = TokenResponse(token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
                    }
                }
            }
        }
        tags = listOf("Authentication")
    }) {
        val teacherRequest = call.receive<CreateTeacherRequest>()
        call.respond(teacherRepository.createTeacher(teacherRequest))
    }
} 