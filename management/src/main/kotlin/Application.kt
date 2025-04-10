package com.education

import configs.JWTConfig
import io.github.smiley4.ktorswaggerui.SwaggerUI
import io.github.smiley4.ktorswaggerui.data.OutputFormat
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import org.koin.core.context.GlobalContext
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    val jwtConfig = JWTConfig(environment)
    
    install(Authentication) {
        jwt {
            jwtConfig.configureJWT(this)
        }
    }

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
    configureRouting(GlobalContext.get().get(), jwtConfig)
}
