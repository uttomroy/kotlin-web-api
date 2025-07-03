'use client'
import { useParam,useRouter } from 'next/router';
import {getStudentById} from '@/services'

const StudentDetails = () {
      const studentId = useParam().studentId;
      useEffect( ()=> {
            const fetchStudentDetails = async () => await ()
          },
      [studentId])

}