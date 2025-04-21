package com.education.routes
import com.education.models.Student
import com.education.models.CreateStudentRequest
import com.education.services.StudentService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.post

fun Route.studentRoutes(){
    val studentService = StudentService()
    route("/students"){
        get({
            summary = "Get all students"
            description = "Retrieves a list of all students"
            response {
                HttpStatusCode.OK to {
                    description = "List of students"
                    body<List<Student>> { description = "List of all students" }
                }
            }
            tags = listOf("Students")
        }) {
            val students = studentService.getAllStudents()
            call.respond(students)
        }

        get("/{id}", {
            summary = "Get student by ID"
            description = "Retrieves a student by their ID"
            request {
                pathParameter<Int>("id") {
                    description = "Student ID"
                    example("Student ID") {
                        value = 1
                    }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Student found"
                    body<Student> { description = "Student details" }
                }
                HttpStatusCode.NotFound to {
                    description = "Student not found"
                    body<String> { description = "Error message" }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid ID format"
                    body<String> { description = "Error message" }
                }
            }
            tags = listOf("Students")
        }) {
            val id = call.pathParameters["id"]?.toIntOrNull()
            if(id == null) {
                call.respond(HttpStatusCode.BadRequest, "invalid id")
                return@get
            }
            val student = studentService.getStudentById(id)

            if(student != null){
                call.respond(student)
            }
            else{
                call.respond(HttpStatusCode.NotFound, "Student not found")
            }
        }

        post({
            summary = "Create new student"
            description = "Creates a new student with the provided details"
            request {
                body<CreateStudentRequest> {
                    description = "Student creation request"
                    example("Create Student Request") {
                        value = CreateStudentRequest(
                            name = "John Doe",
                            email = "john.doe@example.com"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Student created successfully"
                    body<Student> { description = "Created student details" }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid student data"
                    body<String> { description = "Error message" }
                }
            }
            tags = listOf("Students")
        }) {
            try {
                val request = call.receive<CreateStudentRequest>()
                
                // Validate student data
                if (request.name.isBlank()) {
                    call.respond(HttpStatusCode.BadRequest, "Name cannot be empty")
                    return@post
                }
                if (request.email.isBlank() || !request.email.contains("@")) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid email format")
                    return@post
                }
                
                val createdStudent = studentService.addStudent(request)
                call.respond(HttpStatusCode.Created, createdStudent)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, "Invalid student data: ${e.message}")
            }
        }
    }
}