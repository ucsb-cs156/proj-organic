import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StaffForm from "main/components/Staff/StaffForm";
import { staffFixture } from "fixtures/staffFixture";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("StaffForm tests", () => {

    test("renders correctly", async () => {
        render(
            <Router  >
                <StaffForm/>
            </Router>
        );
        await screen.findByText(/course ID/);
        await screen.findByText(/Create/);
    });

    test("renders correctly when passing in a Staff", async () => {
        render(
            <Router  >
                <StaffForm initialContents={staffFixture.oneStaff} />
            </Router>
        );
        await screen.findByTestId(/StaffForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/StaffForm-id/)).toHaveValue("1");
        expect(screen.getByTestId(/StaffForm-courseId/)).toHaveValue("1");
        expect(screen.getByTestId(/StaffForm-githubId/)).toHaveValue("scottpchow23");
    });

    // test("Correct Error messsages on bad input", async () => {
    //     render(
    //         <Router  >
    //             <StaffForm/>
    //         </Router>
    //     );
    //     await screen.findByTestId("StaffForm-courseId");
    //     const idField = screen.getByTestId("StaffForm-courseId");
    //     const submitButton = screen.getByTestId("StaffForm-submit");

    //     fireEvent.change(courIdField, { target: { value: 'Bad-Input' } });
    //     fireEvent.click(submitButton);

    //     await screen.findByText(/CourseId must be .../);
    // });

    test("Correct Error messsages on missing input", async () => {
        render(
            <Router  >
                <StaffForm/>
            </Router>
        );
        await screen.findByTestId("StaffForm-submit");
        const submitButton = screen.getByTestId("StaffForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/courseId is required./);
        expect(screen.getByText(/githubId is required./)).toBeInTheDocument();
    });

    test("No Error messsages on good input", async () => {
        const mockSubmitAction = jest.fn();
        render(
            <Router  >
                <StaffForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("StaffForm-courseId");

        const courseIdField = screen.getByTestId("StaffForm-courseId");
        const githubIdField = screen.getByTestId("StaffForm-githubId");
        const submitButton = screen.getByTestId("StaffForm-submit");

        fireEvent.change(courseIdField, { target: { value: '2' } });
        fireEvent.change(githubIdField, { target: { value: 'richardfang999' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());
        
        await screen.findByTestId(/StaffForm-id/);
        expect(screen.queryByText(/courseId is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/githubId is required./)).not.toBeInTheDocument();
    });

    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <Router  >
                <StaffForm/>
            </Router>
        );
        await screen.findByTestId("StaffForm-cancel");
        const cancelButton = screen.getByTestId("StaffForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });
});