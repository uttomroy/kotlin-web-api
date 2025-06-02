package com.education.routes.auth

import com.education.models.CreateStudentRequest
import com.education.models.StudentDTO
import com.education.models.StudentSummaryDTO
import com.education.models.UpdateStudentRequest
import com.education.services.StudentService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.post

fun Route.studentRoutes(
    studentService: StudentService
) {
    route("student") {

        // Get all students in an organization
        get("/all", {
            summary = "Get Student list"
            description = "Get all students in the organization"
            operationId = "getStudents"
            tags = listOf("Student")
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved student list"
                    body<List<StudentSummaryDTO>> {
                        description = "List of student summaries"
                    }
                }
                HttpStatusCode.Unauthorized to {
                    description = "Authentication required"
                }
                HttpStatusCode.Forbidden to {
                    description = "Insufficient permissions"
                }
            }
        }) {
            try {
                val orgId = call.parameters["orgId"]?.toIntOrNull()
                if (orgId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid organization ID"))
                    return@get
                }
                val students = studentService.getAllStudents(orgId)
                if (students != null) {
                    call.respond(HttpStatusCode.OK, students)
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Student not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to fetch students",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        get("/{studentId}",{
            summary = "Student details"
            description = "Get a single student details"
            tags = listOf("Student")
            request {
                pathParameter<Int>("studentId"){
                    description = "Student Id"
                    required = true
                    example( " Exqample Org ID") {value =  1}
                }
            }
            response {
                HttpStatusCode.OK to {
                    description= "Student details retriev successfull"
                    body<StudentDTO>{
                        description = " Student details is"
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid student ID"
                }
                HttpStatusCode.NotFound to {
                    description = "Student not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Internal server error"
                }
            }
        }){
            try {

                val studentId = call.parameters["studentId"]?.toIntOrNull()
                if (studentId == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid student ID"))
                    return@get
                }
                val studentDetails = studentService.getStudentById(studentId)
                if (studentDetails != null){
                    call.respond(HttpStatusCode.OK , studentDetails)
                }
                else{  call.respond(HttpStatusCode.NotFound, "Student not found")}

            } catch ( e: Exception ){
                call.respond(HttpStatusCode.InternalServerError, "Server error: ${e.message}")
            }
        }

        // Create a new student
        post("/create", {
            summary = "Create new student"
            description = "Creates a new student with user details"
            request {
                body<CreateStudentRequest> {
                    description = "Student creation request with user details"
                    example("Create Student Request") {
                        value = CreateStudentRequest(
                            organizationId = 1,
                            classId = 1,
                            firstName = "John",
                            lastName = "Doe",
                            email = "john.doe@school.com",
                            phoneNumber = "+1-555-123-4567",
                            password = "1234",
                            gender = "Male",
                            dateOfBirth = "2005-05-15",
                            fatherName = "James Doe",
                            motherName = "Jane Doe",
                            parentContact = "+1-555-987-6543",
                            address = "123 School St, City, Country",
                            photoUrl = "https://example.com/photos/student.jpg",
                            emergencyContact = "+1-555-999-8888"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Student has been created successfully"
                    body<Map<String, Int>> {
                        description = "Created student ID"
                        example("Success Response") {
                            value = mapOf("studentId" to 123)
                        }
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid request data"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Server error occurred"
                }
            }
            tags = listOf("Student")
        }) {
            try {
                val studentRequest = call.receive<CreateStudentRequest>()
                val studentId = studentService.createStudent(studentRequest)
                call.respond(HttpStatusCode.OK, mapOf("studentId" to studentId))
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to create student",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }

        // Update student info
        post("/update", {
            summary = "Update student information"
            description = "Updates the information of an existing student"
            request {
                body<UpdateStudentRequest> {
                    description = "Student update request"
                    example("Update Student Request") {
                        value = UpdateStudentRequest(
                            studentId = 2,
                            classId = 1,
                            fatherName = "James Doe",
                            motherName = "Jane Doe",
                            parentContact = "+1-555-987-6543",
                            address = "123 School St, City, Country",
                            photoUrl = "https://example.com/photos/student.jpg",
                            emergencyContact = "+1-555-999-8888",
                            status = "ACTIVE"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Student updated successfully"
                    body<Map<String, String>> {
                        description = "Success response"
                        example("Success Response") {
                            value = mapOf("message" to "Student updated successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Student not found"
                }
                HttpStatusCode.InternalServerError to {
                    description = "Error occurred"
                    body<Map<String, String>> {
                        description = "Error response"
                        example("Error Response") {
                            value = mapOf(
                                "error" to "Failed to update student",
                                "details" to "Error message details"
                            )
                        }
                    }
                }
            }
            tags = listOf("Student")
        }) {
            try {
                val updateStudentRequest = call.receive<UpdateStudentRequest>()
                val isUpdated = studentService.updateStudent(updateStudentRequest)
                if (isUpdated) {
                    call.respond(HttpStatusCode.OK, mapOf("message" to "Student updated successfully"))
                } else {
                    call.respond(HttpStatusCode.NotFound, mapOf("error" to "Student not found"))
                }
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    mapOf(
                        "error" to "Failed to update student",
                        "details" to (e.message ?: "Unknown error")
                    )
                )
            }
        }
    }
}
