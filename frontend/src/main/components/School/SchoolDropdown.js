import OurAddDropdownForm from '../OurAddDropdownForm';

function SchoolDropdown({ initialSchool, schools}){

    return (
        <OurAddDropdownForm
            content={schools}
            label="Name"
            basis={initialSchool}
            testId="SchoolDropdown-name"
        />
    )
}

export default SchoolDropdown;