import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable"
import { formatTime } from "main/utils/dateUtils";
import { useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser"; 


export default function UsersTable({ users, showToggleButtons = false }) {
    const currentUser = useCurrentUser();

    // toggleAdmin
    function cellToAxiosParamsToggleAdmin(cell) {
        return {
            url: "/api/admin/users/toggleAdmin",
            method: "POST",
            params: {
                githubId: cell.row.values.githubId
            }
        }
    }

    // Stryker disable all : hard to test for query caching
    const toggleAdminMutation = useBackendMutation(
        cellToAxiosParamsToggleAdmin,
        {},
        ["/api/admin/users"]
    );
    // Stryker restore all 
   
	// Stryker disable next-line all : TODO try to make a good test for this
    const toggleAdminCallback = async (cell) => {
        const userGithubLogin = cell.row.values.githubLogin;

        if (userGithubLogin === currentUser.githubLogin) {
            const promptResponse = window.prompt("You are toggling admin status for yourself. Please type your GitHub login to confirm:");
            if (promptResponse !== currentUser.githubLogin) {
                alert("Confirmation failed. Admin status not changed.");
                return;
            }
            toggleAdminMutation.mutate(cell);
            return;
        }
        if (window.confirm("Are you sure you want to toggle the admin status for this user?")) {
            toggleAdminMutation.mutate(cell);
        }
    };
    // toggleInstructor
    function cellToAxiosParamsToggleInstructor(cell) {
        return {
            url: "/api/admin/users/toggleInstructor",
            method: "POST",
            params: {
                githubId: cell.row.values.githubId
            }
        }
    }

    // Stryker disable all : hard to test for query caching
    const toggleInstructorMutation = useBackendMutation(
        cellToAxiosParamsToggleInstructor,
        {},
        ["/api/admin/users"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this

    const toggleInstructorCallback = async(cell) => {
        if (window.confirm("Are you sure you want to toggle the instructor status for this user?")) {
            toggleInstructorMutation.mutate(cell);
        }
    };
    

    const columns = [
        {
            Header: 'githubId',
            accessor: 'githubId', // accessor is the "key" in the data
        },
        {
            Header: 'githubLogin',
            accessor: 'githubLogin', // accessor is the "key" in the data
        },
        {
            Header: 'fullName',
            accessor: 'fullName',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Last Online',
            id: 'lastOnline',
            accessor: (row) => formatTime(row.lastOnline),
        },
        {
            Header: 'Admin',
            id: 'admin',
            accessor: (row, _rowIndex) => String(row.admin) // hack needed for boolean values to show up
        },
        {
            Header: 'Instructor',
            id: 'instructor',
            accessor: (row, _rowIndex) => String(row.instructor) // hack needed for boolean values to show up
        },
    ];

    const buttonColumn = [
        ...columns,
        ButtonColumn("toggle-admin", "primary", toggleAdminCallback, "UsersTable"),
        ButtonColumn("toggle-instructor", "primary", toggleInstructorCallback, "UsersTable")
    ]
    return <OurTable
        data={users}
        columns={showToggleButtons ? buttonColumn : columns}
        testid={"UsersTable"} />;
};
