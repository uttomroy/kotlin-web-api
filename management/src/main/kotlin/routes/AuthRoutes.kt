package routes

import com.education.services.UserService
import configs.JWTConfig
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import io.github.smiley4.ktorswaggerui.dsl.routing.post

@Serializable
data class LoginRequest(
    val username: String,
    val password: String
)

@Serializable
data class TokenResponse(
    val token: String
)

@Serializable
data class ErrorResponse(
    val message: String
)

suspend fun ApplicationCall.requireRole(jwtConfig: JWTConfig, requiredRole: String) {
    val principal = principal<JWTPrincipal>()
    if (principal == null || !jwtConfig.isUserInRole(principal, requiredRole)) {
        respond(HttpStatusCode.Forbidden, ErrorResponse("Access denied. Required role: $requiredRole"))
        return
    }
}

fun Route.authRoutes(jwtConfig: JWTConfig, userService: UserService) {
    post("/login", {
        summary = "Authenticate user and get JWT token"
        description = "Authenticates a user with username and password, returns JWT token on success"
        request {
            body<LoginRequest> {
                description = "User credentials"
                example("Login Request") {
                    value = LoginRequest(
                        username = "admin",
                        password = "admin"
                    )
                }
                required = true
            }
        }
        response {
            HttpStatusCode.OK to {
                description = "Successfully authenticated"
                body<TokenResponse> {
                    description = "JWT token response"
                    example("Success Response") {
                        value = TokenResponse(token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
                    }
                }
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
        tags = listOf("Authentication")
    }) {
        val loginRequest = call.receive<LoginRequest>()
        if(userService.isValidUser(loginRequest)){
            val token = jwtConfig.generateToken(loginRequest.username)
            call.response.cookies.append(
                name = "jwt_token",
                value = token,
                httpOnly = true,
                path = "/",
                maxAge = 1800
            )
            call.respond(TokenResponse(token))
        } else {
            call.respond(HttpStatusCode.Unauthorized, ErrorResponse("Invalid credentials"))
        }
    }
} 