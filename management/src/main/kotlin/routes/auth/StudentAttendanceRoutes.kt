package com.education.routes.auth

import com.education.models.*
import com.education.repositories.StudentAttendanceRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.github.smiley4.ktorswaggerui.dsl.routing.get
import io.github.smiley4.ktorswaggerui.dsl.routing.post
import io.github.smiley4.ktorswaggerui.dsl.routing.put
import io.github.smiley4.ktorswaggerui.dsl.routing.delete
import java.time.LocalDate

fun Route.studentAttendanceRoutes(studentAttendanceRepository: StudentAttendanceRepository) {
    
    route("/attendance") {
        
        // Get attendance by filters
        get("", {
            summary = "Get student attendance by filters"
            description = "Retrieve student attendance records filtered by classId, subjectId, and date range (startDate and endDate are required)"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                queryParameter<Int>("classId") {
                    description = "Filter by class ID"
                    required = false
                    example("Example Class ID") { value = 1 }
                }
                queryParameter<Int>("subjectId") {
                    description = "Filter by subject ID"
                    required = false
                    example("Example Subject ID") { value = 1 }
                }
                queryParameter<String>("startDate") {
                    description = "Filter by start date (YYYY-MM-DD format)"
                    required = true
                    example("Example Start Date") { value = "2024-01-01" }
                }
                queryParameter<String>("endDate") {
                    description = "Filter by end date (YYYY-MM-DD format)"
                    required = true
                    example("Example End Date") { value = "2024-01-31" }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved attendance records"
                    body<List<StudentAttendanceDTO>> {
                        description = "List of student attendance records"
                        example("Attendance List") {
                            value = listOf(
                                StudentAttendanceDTO(
                                    id = 1,
                                    classSubjectMappingId = 1,
                                    studentId = 1,
                                    attendanceDate = "2024-01-15",
                                    present = true,
                                    remarks = "Present in class",
                                    updatedAt = "2024-01-15T10:00:00",
                                    studentFirstName = "John",
                                    studentLastName = "Doe",
                                    subjectName = "Mathematics",
                                )
                            )
                        }
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid request parameters"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val classId = call.request.queryParameters["classId"]?.toIntOrNull()
            val subjectId = call.request.queryParameters["subjectId"]?.toIntOrNull()
            val startDateStr = call.request.queryParameters["startDate"]
                ?: return@get call.respond(HttpStatusCode.BadRequest, "startDate parameter is required")
            val endDateStr = call.request.queryParameters["endDate"]
                ?: return@get call.respond(HttpStatusCode.BadRequest, "endDate parameter is required")
            
            val startDate = try {
                LocalDate.parse(startDateStr)
            } catch (e: Exception) {
                return@get call.respond(HttpStatusCode.BadRequest, "Invalid startDate format. Use YYYY-MM-DD")
            }
            
            val endDate = try {
                LocalDate.parse(endDateStr)
            } catch (e: Exception) {
                return@get call.respond(HttpStatusCode.BadRequest, "Invalid endDate format. Use YYYY-MM-DD")
            }
            
            val attendanceRecords = studentAttendanceRepository.getAttendanceByFilters(
                classId = classId,
                subjectId = subjectId,
                startDate = startDate,
                endDate = endDate
            )
            
            call.respond(HttpStatusCode.OK, attendanceRecords)
        }
        
        // Get attendance by ID
        get("/{attendanceId}", {
            summary = "Get attendance record by ID"
            description = "Retrieve a specific attendance record by its ID"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("attendanceId") {
                    description = "Attendance record ID"
                    required = true
                    example("Example Attendance ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Successfully retrieved attendance record"
                    body<StudentAttendanceDAO> {
                        description = "Student attendance record"
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Attendance record not found"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val attendanceId = call.parameters["attendanceId"]?.toIntOrNull()
                ?: return@get call.respond(HttpStatusCode.BadRequest, "Invalid attendance ID")
            
            val attendance = studentAttendanceRepository.getAttendanceById(attendanceId)
            if (attendance != null) {
                call.respond(HttpStatusCode.OK, attendance)
            } else {
                call.respond(HttpStatusCode.NotFound, "Attendance record not found")
            }
        }
        
        // Create single attendance record
        post("", {
            summary = "Create attendance record"
            description = "Create a new student attendance record"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<CreateStudentAttendanceRequest> {
                    description = "Attendance creation request"
                    example("Create Attendance Request") {
                        value = CreateStudentAttendanceRequest(
                            classSubjectMappingId = 1,
                            studentId = 1,
                            attendanceDate = "2024-01-15",
                            present = true,
                            remarks = "Present in class"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Attendance record created successfully"
                    body<Map<String, Int>> {
                        description = "Created attendance record ID"
                        example("Success Response") {
                            value = mapOf("attendanceId" to 1)
                        }
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid request data"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val request = call.receive<CreateStudentAttendanceRequest>()
            val attendanceId = studentAttendanceRepository.createAttendance(request)
            call.respond(HttpStatusCode.Created, mapOf("attendanceId" to attendanceId))
        }
        
        // Create bulk attendance records
        post("/bulk", {
            summary = "Create bulk attendance records"
            description = "Create multiple attendance records for a class and subject on a specific date"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                body<BulkAttendanceRequest> {
                    description = "Bulk attendance creation request"
                    example("Bulk Attendance Request") {
                        value = BulkAttendanceRequest(
                            classId = 1,
                            subjectId = 1,
                            attendanceDate = "2024-01-15",
                            attendanceRecords = listOf(
                                StudentAttendanceRecord(studentId = 1, present = true, remarks = "Present"),
                                StudentAttendanceRecord(studentId = 2, present = false, remarks = "Absent")
                            )
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.Created to {
                    description = "Bulk attendance records created successfully"
                    body<Map<String, List<Int>>> {
                        description = "Created attendance record IDs"
                        example("Success Response") {
                            value = mapOf("attendanceIds" to listOf(1, 2))
                        }
                    }
                }
                HttpStatusCode.BadRequest to {
                    description = "Invalid request data"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val request = call.receive<BulkAttendanceRequest>()
            val attendanceIds = studentAttendanceRepository.createBulkAttendance(request)
            call.respond(HttpStatusCode.Created, mapOf("attendanceIds" to attendanceIds))
        }
        
        // Update attendance record
        put("/{attendanceId}", {
            summary = "Update attendance record"
            description = "Update an existing attendance record"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("attendanceId") {
                    description = "Attendance record ID"
                    required = true
                    example("Example Attendance ID") { value = 1 }
                }
                body<UpdateStudentAttendanceRequest> {
                    description = "Attendance update request"
                    example("Update Attendance Request") {
                        value = UpdateStudentAttendanceRequest(
                            present = false,
                            remarks = "Absent due to illness"
                        )
                    }
                    required = true
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Attendance record updated successfully"
                    body<Map<String, String>> {
                        description = "Update confirmation"
                        example("Success Response") {
                            value = mapOf("message" to "Attendance updated successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Attendance record not found"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val attendanceId = call.parameters["attendanceId"]?.toIntOrNull()
                ?: return@put call.respond(HttpStatusCode.BadRequest, "Invalid attendance ID")
            
            val request = call.receive<UpdateStudentAttendanceRequest>()
            val updated = studentAttendanceRepository.updateAttendance(attendanceId, request)
            
            if (updated) {
                call.respond(HttpStatusCode.OK, mapOf("message" to "Attendance updated successfully"))
            } else {
                call.respond(HttpStatusCode.NotFound, "Attendance record not found")
            }
        }
        
        // Delete attendance record
        delete("/{attendanceId}", {
            summary = "Delete attendance record"
            description = "Delete an attendance record by ID"
            request {
                pathParameter<Int>("orgId") {
                    description = "Organization ID"
                    required = true
                    example("Example Org ID") { value = 1 }
                }
                pathParameter<Int>("attendanceId") {
                    description = "Attendance record ID"
                    required = true
                    example("Example Attendance ID") { value = 1 }
                }
            }
            response {
                HttpStatusCode.OK to {
                    description = "Attendance record deleted successfully"
                    body<Map<String, String>> {
                        description = "Delete confirmation"
                        example("Success Response") {
                            value = mapOf("message" to "Attendance deleted successfully")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Attendance record not found"
                }
            }
            tags = listOf("Student Attendance")
        }) {
            val attendanceId = call.parameters["attendanceId"]?.toIntOrNull()
                ?: return@delete call.respond(HttpStatusCode.BadRequest, "Invalid attendance ID")
            
            val deleted = studentAttendanceRepository.deleteAttendance(attendanceId)
            
            if (deleted) {
                call.respond(HttpStatusCode.OK, mapOf("message" to "Attendance deleted successfully"))
            } else {
                call.respond(HttpStatusCode.NotFound, "Attendance record not found")
            }
        }
    }
} 