package com.education.repositories

import com.education.configs.DataSource
import com.education.entities.*
import com.education.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.LocalDate

interface StudentAttendanceRepository {
    suspend fun getAttendanceByFilters(
        classId: Int? = null,
        subjectId: Int? = null,
        startDate: LocalDate,
        endDate: LocalDate
    ): List<StudentAttendanceDTO>
    
    suspend fun getAttendanceById(attendanceId: Int): StudentAttendanceDAO?
    suspend fun createAttendance(request: CreateStudentAttendanceRequest): Int
    suspend fun updateAttendance(attendanceId: Int, request: UpdateStudentAttendanceRequest): Boolean
    suspend fun deleteAttendance(attendanceId: Int): Boolean
    suspend fun createBulkAttendance(request: BulkAttendanceRequest): List<Int>
}

class StudentAttendanceRepositoryImpl(private val dataSource: DataSource) : StudentAttendanceRepository {
    
    private fun ResultRow.toStudentAttendanceDAO() = StudentAttendanceDAO(
        studentAttendanceId = this[StudentAttendance.studentAttendanceId],
        classSubjectMappingId = this[StudentAttendance.classSubjectMappingId],
        studentId = this[StudentAttendance.studentId],
        attendanceDate = this[StudentAttendance.attendanceDate],
        present = this[StudentAttendance.present],
        remarks = this[StudentAttendance.remarks],
        updatedAt = this[StudentAttendance.updatedAt]
    )
    
    private fun ResultRow.toStudentAttendanceDTO() = StudentAttendanceDTO(
        id = this[StudentAttendance.studentAttendanceId],
        classSubjectMappingId = this[StudentAttendance.classSubjectMappingId],
        studentId = this[StudentAttendance.studentId],
        attendanceDate = this[StudentAttendance.attendanceDate].toString(),
        present = this[StudentAttendance.present],
        remarks = this[StudentAttendance.remarks],
        updatedAt = this[StudentAttendance.updatedAt].toString(),
        studentFirstName = this.getOrNull(User.firstName),
        studentLastName = this.getOrNull(User.lastName),
        subjectName = this.getOrNull(Subject.subjectName)
    )
    
    override suspend fun getAttendanceByFilters(
        classId: Int?,
        subjectId: Int?,
        startDate: LocalDate,
        endDate: LocalDate
    ): List<StudentAttendanceDTO> {
        return dataSource.dbQuery {
            StudentAttendance
                .join(ClassSubjectMapping, JoinType.INNER, StudentAttendance.classSubjectMappingId, ClassSubjectMapping.id)
                .join(Subject, JoinType.INNER, ClassSubjectMapping.subjectId, Subject.subjectId)
                .join(Student, JoinType.INNER, StudentAttendance.studentId, Student.studentId)
                .join(User, JoinType.INNER, Student.userId, User.userId)
                .select {
                    val conditions = mutableListOf<Op<Boolean>>()
                    
                    classId?.let { conditions.add(ClassSubjectMapping.classId eq it) }
                    subjectId?.let { conditions.add(ClassSubjectMapping.subjectId eq it) }
                    conditions.add(StudentAttendance.attendanceDate greaterEq startDate)
                    conditions.add(StudentAttendance.attendanceDate lessEq endDate)
                    
                    if (conditions.isNotEmpty()) {
                        conditions.reduce { acc, condition -> acc and condition }
                    } else {
                        Op.TRUE
                    }
                }
                .map { it.toStudentAttendanceDTO() }
        }
    }
    
    override suspend fun getAttendanceById(attendanceId: Int): StudentAttendanceDAO? {
        return dataSource.dbQuery {
            StudentAttendance.select { StudentAttendance.studentAttendanceId eq attendanceId }
                .map { it.toStudentAttendanceDAO() }
                .singleOrNull()
        }
    }
    
    override suspend fun createAttendance(request: CreateStudentAttendanceRequest): Int {
        return dataSource.dbQuery {
            StudentAttendance.insert {
                it[classSubjectMappingId] = request.classSubjectMappingId
                it[studentId] = request.studentId
                it[attendanceDate] = LocalDate.parse(request.attendanceDate)
                it[present] = request.present
                it[remarks] = request.remarks
            }[StudentAttendance.studentAttendanceId]
        }
    }
    
    override suspend fun updateAttendance(attendanceId: Int, request: UpdateStudentAttendanceRequest): Boolean {
        return dataSource.dbQuery {
            StudentAttendance.update({ StudentAttendance.studentAttendanceId eq attendanceId }) {
                request.present?.let { present -> it[StudentAttendance.present] = present }
                request.remarks?.let { remarks -> it[StudentAttendance.remarks] = remarks }
            } > 0
        }
    }
    
    override suspend fun deleteAttendance(attendanceId: Int): Boolean {
        return dataSource.dbQuery {
            StudentAttendance.deleteWhere { studentAttendanceId eq attendanceId } > 0
        }
    }
    
    override suspend fun createBulkAttendance(request: BulkAttendanceRequest): List<Int> {
        return dataSource.dbQuery {
            // First, get the class_subject_mapping_id
            val classSubjectMappingId = ClassSubjectMapping
                .select { 
                    (ClassSubjectMapping.classId eq request.classId) and 
                    (ClassSubjectMapping.subjectId eq request.subjectId) 
                }
                .map { it[ClassSubjectMapping.id] }
                .singleOrNull() ?: throw IllegalArgumentException("Class-Subject mapping not found")
            
            // Insert bulk attendance records
            val attendanceDate = LocalDate.parse(request.attendanceDate)
            request.attendanceRecords.map { record ->
                StudentAttendance.insert {
                    it[StudentAttendance.classSubjectMappingId] = classSubjectMappingId
                    it[studentId] = record.studentId
                    it[StudentAttendance.attendanceDate] = attendanceDate
                    it[present] = record.present
                    it[remarks] = record.remarks
                }[StudentAttendance.studentAttendanceId]
            }
        }
    }
} 