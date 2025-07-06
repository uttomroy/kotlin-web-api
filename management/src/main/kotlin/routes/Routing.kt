package com.education.routes

import com.education.repositories.TeacherRepository
import com.education.repositories.StudentAttendanceRepository
import com.education.repositories.UserRepository
import com.education.routes.auth.authenticatedRoutes
import com.education.routes.auth.teacherRoutes
import com.education.services.IdentityService
import com.education.services.UserService
import com.education.services.ClassLevelService
import com.education.services.ShiftService
import com.education.services.DepartmentService
import configs.JWTConfig
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import com.education.routes.public.loginRoute
import com.education.services.StudentService

@Serializable
data class UserProfileResponse(
    val id: Int,
    val username: String,
    val email: String
)

fun Application.configureRouting(userRepository: UserRepository, jwtConfig: JWTConfig,
                                 teacherRepository: TeacherRepository,
                                 userService: UserService, identityService: IdentityService, 
                                 studentService: StudentService, studentAttendanceRepository: StudentAttendanceRepository,
                                 classLevelService: ClassLevelService, shiftService: ShiftService, departmentService: DepartmentService) {
    routing {
        route("/api") {
            loginRoute(identityService)
            authenticatedRoutes(identityService, teacherRepository, studentService, studentAttendanceRepository, classLevelService, shiftService, departmentService)

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
 