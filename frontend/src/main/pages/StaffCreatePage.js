import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import StaffForm from "main/components/Staff/StaffForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function StaffCreatePage({storybook=false}) {
    let { id } = useParams();

    const objectToAxiosParams = (staff) => ({
        url: "/api/courses/addStaff",
        method: "POST",
        params: {
        courseId: id,
        githubLogin: staff.githubLogin
        }
    });

    const onSuccess = (staff) => {
        toast(`New staff added - id: ${staff.id}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess }, 
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/courses/getStaff"] // mutation makes this key stale so that pages relying on it reload
        );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess && !storybook) {
        return <Navigate to={`/courses/${id}/staff`} />
    }

    return (
        <BasicLayout>
        <div className="pt-2">
            <h1>Add New Staff</h1>

            <StaffForm submitAction={onSubmit} />

        </div>
        </BasicLayout>
    )
}