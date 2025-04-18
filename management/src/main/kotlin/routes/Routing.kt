package com.education.routes

import com.education.repositories.TeacherRepository
import com.education.repositories.UserRepository
import com.education.routes.auth.authenticatedRoutes
import com.education.routes.auth.teacherRoutes
import com.education.services.IdentityService
import com.education.services.UserService
import configs.JWTConfig
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import com.education.routes.public.loginRoute

@Serializable
data class UserProfileResponse(
    val id: Int,
    val username: String,
    val email: String
)

fun Application.configureRouting(userRepository: UserRepository, jwtConfig: JWTConfig,
                                 teacherRepository: TeacherRepository,
                                 userService: UserService, identityService: IdentityService) {
    routing {
        route("/api") {
            loginRoute(identityService)
            authenticatedRoutes(identityService, teacherRepository)
            get("/defualt-user-passwordhash", {
                response {
                    HttpStatusCode.OK to {
                        description = "Public endpoint"
                        body<String> { description = "Public message" }
                    }
                }
            }) {
                call.respondText(userService.generatePasswordHash("1234"))
            }
        }
    }
}
 