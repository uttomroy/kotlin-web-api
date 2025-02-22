package com.education

import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
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
            call.respondText("test")
        }
    }
}
