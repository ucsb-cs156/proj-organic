import React from 'react';
import OurAddDropdownForm from 'main/components/OurAddDropdownForm';

export default {
    title: 'components/OurAddDropdownForm',
    component: OurAddDropdownForm,
};

const Template = (args) => {
    //console.log(args);
    return <OurAddDropdownForm {...args} />;
    //return <OurAddDropdownForm content = {[]} label = "empty"/>
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
