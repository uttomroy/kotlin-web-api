package com.education.routes

import com.education.entities.Test
import com.education.models.TestModel
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.testRoutes() {

    route("/test") {

        // Swagger-supported GET
        get({
            summary = ""
            description = ""
            response {
                HttpStatusCode.OK to {
                    description = ""
                    body<List<TestModel>> { description = "Test data list" }
                }
            }
        }) {
            val tests = transaction {
                Test.selectAll().map {
                    TestModel(
                        id = it[Test.id1],
                        name = it[Test.name],
                        age = it[Test.age]
                    )
                }
            }
            call.respond(tests)
        }

        // Swagger-supported POST
        post({
            summary = ""
            request {
                body<TestModel> {
                    description = "new data update"
                    required = true
                    example("উদাহরণ") {
                        value = TestModel(name = "Madhab", age = 25)
                    }
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "new table"
                    body<TestModel> { description = "" }
                }
                HttpStatusCode.BadRequest to {
                    description = ""
                }
            }
        }) {
            val requestData = call.receive<TestModel>()

            if (requestData.name.isBlank() || requestData.age <= 0) {
                call.respond(HttpStatusCode.BadRequest, "")
                return@post
            }

            val generatedId = transaction {
                Test.insert {
                    it[name] = requestData.name
                    it[age] = requestData.age
                } get Test.id1
            }

            call.respond(HttpStatusCode.Created, requestData.copy(id = generatedId))
        }
    }
}
