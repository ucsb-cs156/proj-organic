import React from "react";
import OurTable from "main/components/OurTable"


 export default function StudentTable({ students }) {

     // Stryker disable next-line all : TODO try to make a good test for this

     const columns = [
         {
             Header: 'id',
             accessor: 'id',
         },
         {
             Header: 'courseId',
             accessor: 'courseId',
         },
         {
            Header: 'studentId',
            accessor:'studentId',
         },
         {
             Header: 'fname',
             accessor: 'fname',
         },
         {
            Header: 'lname',
            accessor: 'lname',
         },
         {
            Header: 'email',
            accessor: 'email',
         },
         {
            Header: 'githubId',
            accessor: 'githubId',
        }
     ];

     return <OurTable
         data={students}
         columns={columns}
         testid={"StudentTable"} />;
    };