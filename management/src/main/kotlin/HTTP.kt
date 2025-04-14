package com.education

import io.github.smiley4.ktorswaggerui.routing.openApiSpec
import io.github.smiley4.ktorswaggerui.routing.swaggerUI
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureHTTP() {
    routing {
        route("/openapi") {
            openApiSpec()
        }
        route("/swagger") {
            swaggerUI("/openapi")
        }
    }
}
