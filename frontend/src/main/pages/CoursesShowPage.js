
import React from 'react';
import { useParams } from 'react-router-dom';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ShowTable from 'main/components/Courses/ShowTable';
import { useBackend } from 'main/utils/useBackend';
import { useCurrentUser } from 'main/utils/currentUser';

export default function CoursesShowPage() {
    let { id } = useParams();
    const { data: currentUser } = useCurrentUser();

    const { data: courses, error: _error, status: _status } =
        // Stryker disable all 
        useBackend(
            [],
            {
                method: "GET", url: "/api/courses/get",
                params: {
                    id
                },
            },
            []
        );
         // Stryker restore all

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Individual Course Information</h1>
                <ShowTable courses={[courses]} currentUser={currentUser} />
                <br></br>
                <p>As an admin or instructor, you can navigate from the main courses page to a specific page for each course. This allows you to see a page dedicated to your specific course, which includes functionalities such as uploading the student roster, adding students or staff, and other course-related tasks. </p>
                <br></br>
                {/* Course Roster Upload Link */}
                <p>
                    <strong>Course Roster:</strong>
                    <a>Upload Roster</a>
                </p>
                {/* Staff Roster */}
                <p>
                    <strong>Staff Roster:</strong>
                    <a>View Staff</a>
                </p>
                {/* Student Roster */}
                <p>
                    <strong>Student Roster:</strong>
                    <a>View Students</a>
                </p>
            </div>
        </BasicLayout>
    );
}
