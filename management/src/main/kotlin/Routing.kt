package com.education

import com.education.repositories.UserRepository
import configs.JWTConfig
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import routes.authRoutes
import routes.requireRole

@Serializable
data class UserProfileResponse(
    val id: Int,
    val username: String,
    val email: String
)

fun Application.configureRouting(userRepository: UserRepository, jwtConfig: JWTConfig) {
    routing {
        route("/api") {
            // Public routes
            authRoutes(jwtConfig)
            
            get("/public", {
                response {
                    HttpStatusCode.OK to {
                        description = "Public endpoint"
                        body<String> { description = "Public message" }
                    }
                }
            }) {
                call.respondText("This is a public endpoint")
            }

            // Protected routes
            authenticate {
                get("/profile", {
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
                    // Require USER role for profile access
                    call.requireRole(jwtConfig, "USER")
                    call.respond(UserProfileResponse(
                        id = 1,
                        username = "john_doe",
                        email = "john@example.com"
                    ))
                }

                get("/admin-panel", {
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
                    // Require ADMIN role for admin panel
                    call.requireRole(jwtConfig, "ADMIN")
                    call.respondText("Welcome to admin panel")
                }

                get("/secure-data", {
                    response {
                        HttpStatusCode.OK to {
                            description = "Get secure data"
                            body<String> { 
                                description = "Sensitive information"
                                example("Secure Data") {
                                    value = "This is sensitive data that requires authentication"
                                }
                            }
                        }
                        HttpStatusCode.Unauthorized to {
                            description = "Authentication required"
                        }
                    }
                }) {
                    call.respondText("This is sensitive data that requires authentication")
                }

                get("/test", {
                    response {
                        HttpStatusCode.OK to {
                            description = "Successful response"
                            body<String> { description = "The greeting message" }
                        }
                        HttpStatusCode.BadRequest to {
                            description = "Bad request"
                        }
                        HttpStatusCode.Unauthorized to {
                            description = "Authentication required"
                        }
                    }
                }) {
                    val userInfo = userRepository.getUserInfo(1)
                    call.respondText(userInfo.toString())
                }
            }
        }
    }
}
 