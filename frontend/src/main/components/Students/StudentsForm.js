import {useForm} from "react-hook-form";
import {Button, Form, Row} from "react-bootstrap";
import React from "react";

function StudentsForm({submitAction}){
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm()

    return(
        <Form onSubmit={handleSubmit(submitAction)}>
            <Row>
                <Form.Group className="mb-2">
                    <Form.Label htmlFor="upload">Upload Student Roster</Form.Label>
                    <Form.Control data-testid="StudentsForm-upload"
                                  id="upload"
                                  type="file"
                                  accept=".csv"
                                  isInvalid={Boolean(errors.upload)}
                        {...register("upload", {required:true})} />
                    <Form.Control.Feedback type="invalid">
                        {errors.upload && 'Roster is required. '}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Button type="submit"
                        data-testid="StudentsForm-submit"
                        className="mb-3"
                >
                    Upload
                </Button>
            </Row>
        </Form>
    );
}

export default StudentsForm