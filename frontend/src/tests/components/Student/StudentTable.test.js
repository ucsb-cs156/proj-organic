import StudentTable from "main/components/Student/StudentTable"
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import {  render, screen } from "@testing-library/react";
import { studentFixtures } from "fixtures/studentFixtures";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("StudentTable tests", () => {
  const queryClient = new QueryClient();
  const expectedHeaders = ["id", "courseId", "studentId", "firstName", "lastName", "email", "githubId"];
  const expectedFields = ["id", "courseId", "studentId", "firstName", "lastName", "email", "githubId"]; 
  const testId = "StudentTable";

  test("Has the expected column headers and content", () => {

    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentTable students={studentFixtures.threeStudents} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedStudentcourse = studentFixtures.threeStudents;
    expectedStudentcourse.forEach((studentMember, index) => {
      const courseIdC = screen.getByTestId(`StudentTable-cell-row-${index}-col-courseId`);
      expect(courseIdC).toHaveTextContent(studentMember.courseId);
    });

    const expectedStudentId = studentFixtures.threeStudents;
    expectedStudentId.forEach((studentMember, index) => {
      const studentIdC = screen.getByTestId(`StudentTable-cell-row-${index}-col-studentId`);
      expect(studentIdC).toHaveTextContent(studentMember.studentId);
    });

    const expectedStudentFname = studentFixtures.threeStudents;
    expectedStudentFname.forEach((studentMember, index) => {
      const fnameC = screen.getByTestId(`StudentTable-cell-row-${index}-col-firstName`);
      expect(fnameC).toHaveTextContent(studentMember.firstName);
    });

    const expectedStudentLname = studentFixtures.threeStudents;
    expectedStudentLname.forEach((studentMember, index) => {
      const lnameC = screen.getByTestId(`StudentTable-cell-row-${index}-col-lastName`);
      expect(lnameC).toHaveTextContent(studentMember.lastName);
    });

    const expectedStudentemail = studentFixtures.threeStudents;
    expectedStudentemail.forEach((studentMember, index) => {
      const emailC = screen.getByTestId(`StudentTable-cell-row-${index}-col-email`);
      expect(emailC).toHaveTextContent(studentMember.email);
    });

    const expectedStudentgithub = studentFixtures.threeStudents;
    expectedStudentgithub.forEach((studentMember, index) => {
      const githubIdC = screen.getByTestId(`StudentTable-cell-row-${index}-col-githubId`);
      expect(githubIdC).toHaveTextContent(studentMember.githubId);
    });

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

    const editButton = screen.queryByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).not.toBeInTheDocument();

    const deleteButton = screen.queryByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).not.toBeInTheDocument();

  });

  test("renders empty table correctly", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
          <StudentTable students={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const fieldElement = screen.queryByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(fieldElement).not.toBeInTheDocument();
    });
  });


  test("admin has expected values", () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <StudentTable students={studentFixtures.threeStudents} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

  });

});