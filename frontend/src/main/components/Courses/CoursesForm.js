import { Button, Form, Row, Col } from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { enableEndDateValidation } from './dateValidation'; // Import the JavaScript file
import React, { useEffect } from 'react';
import {useBackend} from "../../utils/useBackend";
import SchoolDropdown from "./SchoolDropdown";

function CoursesForm({ initialContents, submitAction, buttonLabel = "Create" }) {
    useEffect(() => {
        enableEndDateValidation(); // Call the function to enable end date validation
    },); // Run only once after component mounts
    // Stryker disable all
    const formState = useForm({defaultValues:initialContents || {},})

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = formState;

    const { data: schools, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/schools/all"],
            // Stryker disable next-line all : GET is the default
            { method: "GET", url: "/api/schools/all" },
            []
        );


    const navigate = useNavigate();
    
    // Stryker restore all
    
    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    
    return (
        <FormProvider {...formState}>
            <Form onSubmit={handleSubmit(submitAction)}>


                <Row>

                    {initialContents && (
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="id">Id</Form.Label>
                                <Form.Control
                                    data-testid="CoursesForm-id"
                                    id="id"
                                    type="text"
                                    {...register("id")}
                                    value={initialContents.id}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    )}

                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                data-testid="CoursesForm-name"
                                id="name"
                                type="text"
                                isInvalid={Boolean(errors.name)}
                                {...register("name", { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name && 'Name is required. '}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <SchoolDropdown testId="CoursesForm" schools={schools}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="term">Term</Form.Label>
                            <Form.Control
                                data-testid="CoursesForm-term"
                                id="term"
                                type="text"
                                isInvalid={Boolean(errors.term)}
                                {...register("term", { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.term && 'Term is required. '}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="startDate">StartDate(iso format)</Form.Label>
                            <Form.Control
                                data-testid="CoursesForm-startDate"
                                id="startDate"
                                type="datetime-local"
                                isInvalid={Boolean(errors.startDate)}
                                {...register("startDate", { required: true, pattern: isodate_regex })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.startDate && 'StartDate date is required. '}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="">EndDate(iso format)</Form.Label>
                            <Form.Control
                                data-testid="CoursesForm-endDate"
                                id="endDate"
                                type="datetime-local"
                                isInvalid={Boolean(errors.endDate)}
                                {...register("endDate", {required: true, pattern: isodate_regex })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.endDate && 'EndDate date is required. '}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="githubOrg">GithubOrg</Form.Label>
                            <Form.Control
                                data-testid="CoursesForm-githubOrg"
                                id="githubOrg"
                                type="text"
                                isInvalid={Boolean(errors.githubOrg)}
                                {...register("githubOrg", { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.githubOrg && 'GithubOrg is required. '}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button
                            type="submit"
                            data-testid="CoursesForm-submit"
                        >
                            {buttonLabel}
                        </Button>
                        <Button
                            variant="Secondary"
                            onClick={() => navigate(-1)}
                            data-testid="CoursesForm-cancel"
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FormProvider>
    )
}

export default CoursesForm