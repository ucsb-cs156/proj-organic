import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StaffCreatePage from "main/pages/StaffCreatePage";

describe("StaffCreatePage tests", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/staff/1/create"]}>
                <Routes>
                    <Route path="/staff/:id/create" element={<StaffCreatePage />} />
                </Routes>
            </MemoryRouter>
        );
    });

    test("displays the correct placeholder text", () => {
        render(
            <MemoryRouter initialEntries={["/staff/1/create"]}>
                <Routes>
                    <Route path="/staff/:id/create" element={<StaffCreatePage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Placeholder for Staff Creation Page for Course 1")).toBeInTheDocument();
        expect(screen.getByText("This page will be finished soon.")).toBeInTheDocument();
    });

    test("displays the correct course id", () => {
        const testId = "12345";
        render(
            <MemoryRouter initialEntries={[`/staff/${testId}/create`]}>
                <Routes>
                    <Route path="/staff/:id/create" element={<StaffCreatePage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(`Placeholder for Staff Creation Page for Course ${testId}`)).toBeInTheDocument();
    });
});
