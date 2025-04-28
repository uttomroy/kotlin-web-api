package com.education.routes.auth

import com.education.routes.UserProfileResponse
import com.education.enums.ROLE
import com.education.repositories.TeacherRepository
import com.education.services.IdentityService
import com.education.services.StudentService
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.authenticatedRoutes(identityService: IdentityService, teacherRepository: TeacherRepository,
                              studentService: StudentService) {
    authenticate {
        // Student routes at /api/students

        route("/orgs/{orgId}"){
            studentRoutes(studentService)

            get("/profile", {
                request {
                    pathParameter<Int>("orgId") {
                        description = "Organization ID"
                        required = true
                    }
                }
                response {
                    HttpStatusCode.OK to {
                        description = "Get user profile"
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
                if(!identityService.userHasRequiredPermission(call, call.parameters["orgId"]!!.toInt(), listOf(ROLE.TEACHER))){
                    call.respond(HttpStatusCode.Forbidden, "You do not have permission to access this resource.")
                }
                call.respond(
                    UserProfileResponse(
                    id = 1,
                    username = "john_doe",
                    email = "john@example.com"
                    )
                )
            }

            get("/admin-panel", {
                request {
                    pathParameter<Int>("orgId") {
                        description = "Organization ID"
                        required = true
                    }
                }
                response {
                    HttpStatusCode.OK to {
                        description = "Access admin panel"
                        body<String> {
                            description = "Admin panel data"
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
                if(!identityService.userHasRequiredPermission(call, call.parameters["orgId"]!!.toInt(), listOf(ROLE.ADMIN))){
                    call.respond(HttpStatusCode.Forbidden, "You do not have permission to access this resource.")
                }
                call.respondText("Welcome to admin panel")
            }
            teacherRoutes(teacherRepository)
        }
    }
}