export interface ClassLevel {
  id: number;
  organizationId: number;
  name: string;
}

export interface Shift {
  shiftId: number;
  organizationId: number;
  shiftName: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface Class {
  classId: number;
  organizationId: number;
  classLevelId: number;
  classLevelName: string;
  shiftId: number;
  shiftName: string;
  classTeacherId: number;
  teacherName?: string;
}

export interface Subject {
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  isCompulsory: boolean;
}

export interface ClassSubjectMapping {
  mappingId: number;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
}

export interface Teacher {
  id: number;
  name: string;
} 