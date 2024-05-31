import React from "react";
import OurTable from "main/components/OurTable"


 export default function StudentTable({ student }) {

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
             Header: 'githubId',
             accessor: 'githubId',
         },
   
     ];

     return <OurTable
         data={student}
         columns={columns}
         testid={"StudentTable"} />;
    };