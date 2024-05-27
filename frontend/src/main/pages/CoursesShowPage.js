import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CoursesForm from "main/components/Courses/CoursesForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CoursesShowPage({storybook=false}) {
  let { id } = useParams();

  const { data: course, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/courses?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/courses/get`,
        params: {
          id
        }
      }
    );

  if (isSuccess && !storybook) {
    return <Navigate to="/courses" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Course Information</h1>
        {
          course && <CoursesForm initialContents={course}/>
        }
        <p>This is the place to upload student roster, add student or staff, and to show course details</p>
      </div>
    </BasicLayout>
  )
}
