import React from 'react'
import { useBackend } from 'main/utils/useBackend';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CoursesTable from 'main/components/Courses/CoursesTable';
import { useCurrentUser} from 'main/utils/currentUser';
import {useParams} from "react-router-dom";
import StudentTable from "../components/Student/StudentTable";

export default function CoursesShowPage() {
    let { id } = useParams();
    const { data: currentUser } = useCurrentUser();

    const { data: courses, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/courses?id=${id}`],

            { // Stryker disable next-line all : GET is the default
                method: "GET", url: "/api/courses/get",
                params: {
                    id
                },
            },
    []
        );

    const { data: students, error: _studenterror, status: _studentStatus } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/students/all?courseId=${id}`],

            { // Stryker disable next-line all : GET is the default
                method: "GET", url: "/api/students/all",
                params: {
                    courseId:id
                },
            },
            []
        );
    //this ensures the table row doesn't show up when there's no backend
    let passIn;
    if(courses.length !== 0){
        passIn = [courses]
    }else{
        passIn = courses;
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Course</h1>
                <CoursesTable courses={passIn} currentUser={currentUser}/>
            </div>
            <div className="row">
                <div className="col col-8">
                    <StudentTable student={students} />
                </div>
                <div className="col col-4">
                    This is a placeholder for the not yet implemented roster upload form.
                </div>
            </div>
        </BasicLayout>
    )
}
