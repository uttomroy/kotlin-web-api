package com.education

import io.github.smiley4.ktorswaggerui.SwaggerUI
import io.github.smiley4.ktorswaggerui.data.OutputFormat
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(SwaggerUI) {
        outputFormat = OutputFormat.JSON
        info {
            version = "1.0.0"
        }
        externalDocs {
            url = "https://github.com/education/kotlin-swagger-ui"
        }

    }
    configureHTTP()
    configureSerialization()
    configureFrameworks()
    configureRouting()
}
