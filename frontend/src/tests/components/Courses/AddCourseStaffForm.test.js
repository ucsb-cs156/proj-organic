import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import AddCourseStaffForm from "main/components/Courses/AddCourseStaffForm";
import { BrowserRouter as Router } from "react-router-dom";
import { staffFixture } from "fixtures/staffFixture";
import {QueryClient, QueryClientProvider} from "react-query"; // Import the function to test

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("AddCourseStaffForm tests", () => {
    const queryClient = new QueryClient();

    test("renders correctly", async () => {

        render(
            <QueryClientProvider client={queryClient}>
            <Router>
                <AddCourseStaffForm/>
            </Router>
            </QueryClientProvider>
        );
        await screen.findByText(/Github Login/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a course staff", async () => {

        render(
            <Router  >
                <AddCourseStaffForm initialContents={staffFixture.oneStaff} />
            </Router>
        );
        await screen.findByTestId(/AddCourseStaffForm-id/);
        expect(screen.getByTestId(/AddCourseStaffForm-id/)).toHaveValue("1");
        expect(screen.getByText(/Id/)).toBeInTheDocument();
    });


    test("Correct Error messsages on missing input", async () => {

        render(
            <QueryClientProvider client={queryClient}>
            <Router  >
                <AddCourseStaffForm />
            </Router>
            </QueryClientProvider>
        );
        await screen.findByTestId("AddCourseStaffForm-submit");
        const submitButton = screen.getByTestId("AddCourseStaffForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Github Login is required/);
        expect(screen.getByText(/Github Login is required/)).toBeInTheDocument();
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <QueryClientProvider client={queryClient}>
            <Router  >
                <AddCourseStaffForm submitAction={mockSubmitAction} />
            </Router>
            </QueryClientProvider>
        );
        await screen.findByTestId("AddCourseStaffForm-githubLogin");

        const githubLogin = screen.getByTestId("AddCourseStaffForm-githubLogin");
        const submitButton = screen.getByTestId("AddCourseStaffForm-submit");

        fireEvent.change(githubLogin, { target: { value: "pconrad" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Github Login is required./)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <QueryClientProvider client={queryClient}>
            <Router  >
                <AddCourseStaffForm />
            </Router>
            </QueryClientProvider>
        );
        await screen.findByTestId("AddCourseStaffForm-cancel");
        const cancelButton = screen.getByTestId("AddCourseStaffForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});