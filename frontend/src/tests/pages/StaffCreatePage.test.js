import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import StaffCreatePage from "main/pages/StaffCreatePage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import usersFixtures from "fixtures/usersFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("StaffCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StaffCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend", async () => {

        const queryClient = new QueryClient();
        const staff = {
            id: 1,
            "courseId": 17,
            "githubLogin": "pconrad"
        };

        axiosMock.onPost("/api/courses/addStaff").reply(202, staff);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StaffCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("AddCourseStaffForm-githubLogin")).toBeInTheDocument();
        });

        const githubLoginField = screen.getByTestId("AddCourseStaffForm-githubLogin");
        const submitButton = screen.getByTestId("AddCourseStaffForm-submit");

        fireEvent.change(githubLoginField, { target: { value: 'pconrad' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "courseId": 17,
                "githubLogin": "pconrad"
        });

        expect(mockToast).toBeCalledWith("New staff created - id: 1");
        expect(mockNavigate).toBeCalledWith({ "to": "/courses/17/staff" });
    });


});