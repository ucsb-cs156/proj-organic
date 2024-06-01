import React from 'react';
import StudentsTable from 'main/components/Students/StudentsTable';
import { studentFixture } from 'fixtures/studentFixture';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/Student/StudentsTable',
    component: StudentsTable
};

const Template = (args) => {
    return (
        <StudentsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    student: []
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
    student: studentFixture.threeStudent,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
    student: studentFixture.threeStudent,
    currentUser: currentUserFixtures.adminUser,
}

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.delete('/api/course/student/all', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};