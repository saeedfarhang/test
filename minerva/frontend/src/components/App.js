import React, { Fragment, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

// import components
import BlogList from './blog/BlogList'

import CoursesList from './courses/CoursesList';

export default function App() {
    useEffect(()=>{
    })
    return (
        <Fragment>
        <CssBaseline />
        <BlogList />
        <CoursesList/>
        </Fragment>
    )
}
