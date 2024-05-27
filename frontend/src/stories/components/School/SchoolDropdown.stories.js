import React from "react";
import SchoolDropdown from "main/components/School/SchoolDropdown";
import { schoolsListFixtures } from "fixtures/schoolsListFixtures";

export default {
    title: 'components/School/SchoolDropdown',
    component: SchoolDropdown
};

const Template = (args) => {
    return (
        <SchoolDropdown {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    initialSelection: {},
    schools: []
};

export const OneSchoolRender = Template.bind({});

OneSchoolRender.args = {
    initialSchool: {},
    schools: schoolsListFixtures.oneSchool,
};

export const TenSchoolRender = Template.bind({});

TenSchoolRender.args = {
    initialSchool: schoolsListFixtures.tenSchool[4],
    schools: schoolsListFixtures.tenSchool,
}