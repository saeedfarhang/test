import React , {useState, useEffect, Fragment} from 'react'
import { axiosInstance } from '../../axios'
import CourseCard from './CourseCard'
import Grid from '@material-ui/core/Grid'

export default function CoursesList() {
    const [courses, setCourse] = useState([{"description":""}])

    useEffect(()=>{
        async function fetchData(){
            const request = await axiosInstance.get(`courses/`)
            setCourse(request.data)
        }
        fetchData()
    },[])
    console.log(courses);
    return (
        <Grid container spacing={2}>
            {courses.map(course => 
                <Grid item><CourseCard title={course.title} description={course.description}/></Grid>
                )}
        </Grid>
    )
}
