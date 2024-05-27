// import { Button, Form, Row, Col } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import OurAddDropdownForm from '../OurAddDropdownForm';

function SchoolDropdown({ initialSchool, schools}){

    return (
        <OurAddDropdownForm
            content={schools}
            label="Name"
            basis={initialSchool}
            testId="SchoolDropdown-name"
            id="school_name_fix"
        />
    )
}

export default SchoolDropdown;