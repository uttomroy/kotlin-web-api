package com.education.routes.auth

import com.education.routes.UserProfileResponse
import com.education.enums.ROLE
import com.education.repositories.TeacherRepository
import com.education.repositories.StudentAttendanceRepository
import com.education.services.IdentityService
import com.education.services.StudentService
import com.education.services.ClassLevelService
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.authenticatedRoutes(identityService: IdentityService, teacherRepository: TeacherRepository,
                              studentService: StudentService, studentAttendanceRepository: StudentAttendanceRepository,
                              classLevelService: ClassLevelService) {

    authenticate {
        route("/orgs/{orgId}") {
            get("/profile", {
                summary = "Get user profile"
                description = "Get the profile of the authenticated user"
                operationId = "getUserProfile"
                tags = listOf("Profile")
                request {
                    pathParameter<Int>("orgId") {
                        description = "Organization ID"
                        required = true
                        example("Example Org ID") { value = 1 }
                    }
                }
                response {
                    HttpStatusCode.OK to {
                        description = "Successfully retrieved profile"
                        body<UserProfileResponse> {
                            description = "User profile information"
                            example("User Profile") {
                                value = UserProfileResponse(
                                    id = 1,
                                    username = "john_doe",
                                    email = "john@example.com"
                                )
                            }
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
                // Get and validate orgId
                val orgId = call.parameters["orgId"]?.toIntOrNull()
                    ?: throw IllegalArgumentException("Invalid organization ID")
                
                call.respond(
                    UserProfileResponse(
                        id = 1,
                        username = "john_doe",
                        email = "john@example.com"
                    )
                )
            }

            studentRoutes(studentService)
            teacherRoutes(teacherRepository)
            studentAttendanceRoutes(studentAttendanceRepository)
            classLevelRoutes(classLevelService)
        }
    }
}