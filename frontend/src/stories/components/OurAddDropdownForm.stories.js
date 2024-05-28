import React from 'react';
import OurAddDropdownForm from 'main/components/OurAddDropdownForm';
import { schoolsListFixtures } from 'fixtures/schoolsListFixtures';

export default {
    title: 'components/OurAddDropdownForm',
    component: OurAddDropdownForm,
};

const Template = (args) => {
    return <OurAddDropdownForm {...args} />;
};

export const Sample = Template.bind({});

Sample.args = {
    content: [
        { label: 'option 1', key: 'option 1' },
        { label: 'option 2', key: 'option 2' },
        { label: 'option 3', key: 'option 3' }
    ],
    label : "Sample Dropdown",
    basis : {},
    testId : "test-sample-dropdown",
};

export const Empty = Template.bind({});

Empty.args = {
    content: [],
    label : "Sample Empty Dropdown",
    basis : {},
    testId : "test-sample-dropdown",
};

export const OneSchoolRender = Template.bind({});

OneSchoolRender.args = {
    basis: {},
    content: schoolsListFixtures.oneSchool,
    testId : "test-sample-dropdown",
    label : "Sample One Dropdown",
};

export const TenSchoolRender = Template.bind({});

TenSchoolRender.args = {
    basis: schoolsListFixtures.tenSchool,
    content: schoolsListFixtures.tenSchool,
    testId : "test-sample-dropdown",
    label : "Sample Ten Dropdown",
}