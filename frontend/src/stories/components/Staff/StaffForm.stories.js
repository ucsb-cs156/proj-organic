import React from 'react';
import StaffForm from "main/components/Staff/StaffForm";
import { staffFixture } from 'fixtures/staffFixture';

export default {
    title: 'components/Staff/StaffForm',
    component: StaffForm
};


const Template = (args) => {
    return (
        <StaffForm {...args} />
    )
};

export const Create = Template.bind({});

Create.args = {
    buttonLabel: "Create",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data); 
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
   }
};

export const Update = Template.bind({});

Update.args = {
    initialContents: staffFixture.oneStaff,
    buttonLabel: "Update",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data); 
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
   }
};