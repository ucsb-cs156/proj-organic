import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import StaffForm from "main/components/Staff/StaffForm";
import { staffFixture } from "fixtures/staffFixture";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));



describe("StaffForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <StaffForm />
            </Router>
        );
        await screen.findByText(/Add/);
    });


    test("renders correctly when passing in a Staff", async () => {

        render(
            <Router  >
                <StaffForm initialContents={staffFixture.oneStaff} />
            </Router>
        );
        await screen.findByTestId(/StaffForm-id/);
        expect(screen.getByTestId(/StaffForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <StaffForm />
            </Router>
        );
        await screen.findByTestId("StaffForm-submit");
        const submitButton = screen.getByTestId("StaffForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/githubLogin is required./);
        expect(screen.getByText(/githubLogin is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <StaffForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("StaffForm-githubLogin");

        const githubField = screen.getByTestId("StaffForm-githubLogin");
        const submitButton = screen.getByTestId("StaffForm-submit");

        fireEvent.change(githubField, { target: { value: "cgaucho" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    });
});