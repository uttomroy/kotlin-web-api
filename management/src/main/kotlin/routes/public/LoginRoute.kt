package com.education.routes.public

import com.education.services.IdentityService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import io.github.smiley4.ktorswaggerui.dsl.routing.post

@Serializable
data class LoginRequest(
    val username: String,
    val password: String,
    val organizationId: Int
)

@Serializable
data class LoginResponse(
    val token: String
)

@Serializable
data class ErrorResponse(
    val message: String
)

fun Route.loginRoute(identityService: IdentityService) {
    post("/login", {
        summary = "Authenticate user and get JWT token"
        description = "Authenticates a user with username and password, returns JWT token on success"
        tags = listOf("Authentication")
        request {
            body<LoginRequest> {
                description = "User credentials"
                example("Login Request") {
                    value = LoginRequest(
                        username = "admin@gmail.com",
                        password = "1234",
                        organizationId = 1
                    )
                }
                required = true
            }
        }
        response {
            HttpStatusCode.OK to {
                description = "Successfully authenticated"
            }
            HttpStatusCode.Unauthorized to {
                description = "Authentication failed"
                body<ErrorResponse> {
                    description = "Error details"
                    example("Invalid Credentials") {
                        value = ErrorResponse(message = "Invalid credentials")
                    }
                }
            }
        }
    }) {
        val loginRequest = call.receive<LoginRequest>()
        val token = identityService.generateTokenForValidUser(loginRequest)
        if(!token.isNullOrEmpty()){
            call.response.cookies.append(
                name = "jwt_token",
                value = token,
                httpOnly = true,
                path = "/",
                maxAge = 1800
            )
            call.respond(HttpStatusCode.OK)
        } else {
            call.respond(HttpStatusCode.Unauthorized, ErrorResponse("Invalid credentials"))
        }
    }
} 