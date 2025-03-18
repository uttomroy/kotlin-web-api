package com.education

import com.education.repositories.UserRepository
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting( userRepository: UserRepository ) {
    routing {
        get("/adfdaf", {
            response {
                HttpStatusCode.OK to {
                    description = "successful response"
                    body<String>(){ description = "adadf"}
                }
            }
        }) {
            call.respondText("Hello World!")
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
            }
        }) {
            val userInfo = userRepository.getUserInfo(1)
            call.respondText(userInfo.toString())
        }
    }
}
