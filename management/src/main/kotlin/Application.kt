package com.education

import configs.JWTConfig
import io.github.smiley4.ktorswaggerui.SwaggerUI
import io.github.smiley4.ktorswaggerui.data.OutputFormat
import io.ktor.http.*
import io.ktor.http.auth.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import org.koin.core.context.GlobalContext

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    val jwtConfig = JWTConfig(environment)
    
    install(Authentication) {
        jwt {
            jwtConfig.configureJWT(this)
            challenge { _, _ ->
                call.respondText("Token is not valid or has expired", status = HttpStatusCode.Unauthorized)
            }
            validate { credential ->
                if (credential.payload.audience.contains(jwtConfig.audience)) {
                    JWTPrincipal(credential.payload)
                } else null
            }
            authHeader callback@ { call -> 
                call.request.cookies["jwt_token"]?.let { token ->
                    HttpAuthHeader.Single("Bearer", token)
                }
            }
        }
    }

    install(SwaggerUI) {
        outputFormat = OutputFormat.JSON
        swagger {
            withCredentials = true
        }
        info {
            title = "API Documentation"
            version = "1.0.0"
            description = "API Documentation for the application"
        }
        server {
            url = "http://127.0.0.1:8080/"
            description = "Global server for the API"
        }
    }
    configureHTTP()
    configureSerialization()
    configureFrameworks()
    configureRouting(GlobalContext.get().get(), jwtConfig, GlobalContext.get().get(), GlobalContext.get().get())
}
