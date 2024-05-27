import React from 'react';
import { useParams } from 'react-router-dom';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CoursesTable from 'main/components/Courses/CoursesTable';
import { useBackend } from 'main/utils/useBackend';
import { useCurrentUser } from 'main/utils/currentUser';

export default function CoursesShowPage() {
    let { id } = useParams();
    const { data: currentUser } = useCurrentUser();

    const { data: course, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/courses/show?id=${id}`],

            { // Stryker disable next-line all : GET is the default
                method: "GET", url: "/api/courses/get",
                params: {
                    id
                },
            },
    []
        );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Course Information</h1>
        {course && (
          <>
            <CoursesTable initialContents={course} currentUser={currentUser}/>
            <div>
              {/* Course Roster Upload Link */}
              <p>
                <strong>Course Roster Upload:</strong>{" "}
                <a href={`/courses/${id}/roster-upload`}>Upload Roster</a>
              </p>
              {/* Staff Roster */}
              <p>
                <strong>Staff Roster:</strong>{" "}
                <a href={`/courses/${id}/staff-roster`}>View Staff</a>
              </p>
              {/* Student Roster */}
              <p>
                <strong>Student Roster:</strong>{" "}
                <a href={`/courses/${id}/student-roster`}>View Students</a>
              </p>
            </div>
          </>
        )}
      </div>
    </BasicLayout>
  );
}
