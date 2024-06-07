import CoursesTable from "main/components/Courses/CoursesTable"
import { fireEvent, render, waitFor, screen, within } from "@testing-library/react";
import { coursesFixtures } from "fixtures/coursesFixtures";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UserTable tests", () => {
  const queryClient = new QueryClient();

  test("Has the expected column headers and content for ordinary user", () => {

    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "Name", "School", "Term", "StartDate", "EndDate", "GitHub Org"];
    const expectedFields = ["id", "name", "school", "term", "startDate", "endDate", "githubOrg"];
    const testId = "CoursesTable";

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

    const joinButton = screen.queryByTestId(`${testId}-cell-row-0-col-Join-button`);
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toHaveClass("btn-primary");


    const editButton = screen.queryByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).not.toBeInTheDocument();

    const deleteButton = screen.queryByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).not.toBeInTheDocument();

    const totalCoursesElement = screen.getByText("Total Courses: 3"); 
    expect(totalCoursesElement).toBeInTheDocument();

  });


  
  test("renders empty table correctly", () => {

    const currentUser = currentUserFixtures.adminUser;
    const expectedHeaders = ["id", "Name", "School", "Term", "StartDate", "EndDate", "GitHub Org"];
    const expectedFields = ["id", "name", "school", "term", "startDate", "endDate", "githubOrg"];
    const testId = "CoursesTable";
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesTable courses={[]} currentUser={currentUser} />
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

    const totalCoursesElement = screen.getByText("Total Courses: 0");
    expect(totalCoursesElement).toBeInTheDocument();
  });


  test("Has the expected colum headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "Name", "School", "Term", "StartDate", "EndDate", "GitHub Org"];
    const expectedFields = ["id", "name", "school", "term", "startDate", "endDate", "githubOrg"];
    const testId = "CoursesTable";

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

    const joinButton = screen.queryByTestId(`${testId}-cell-row-0-col-Join-button`);
    expect(joinButton).toBeInTheDocument(); 

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

    const totalCoursesElement = screen.getByText("Total Courses: 3");  
    expect(totalCoursesElement).toBeInTheDocument();
  });

  test("Has the expected colum headers and content for instructorUser", () => {

    const currentUser = currentUserFixtures.instructorUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "Name", "School", "Term", "StartDate", "EndDate", "GitHub Org"];
    const expectedFields = ["id", "name", "school", "term", "startDate", "endDate", "githubOrg"];
    const testId = "CoursesTable";

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

    const joinButton = screen.queryByTestId(`${testId}-cell-row-0-col-Join-button`);
    expect(joinButton).toBeInTheDocument(); 

    const staffButton = screen.getByTestId(`${testId}-cell-row-0-col-Staff-button`);
    expect(staffButton).toBeInTheDocument();
    expect(staffButton).toHaveClass("btn-primary");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Join button navigates to the join page for a user", async () => {

    const currentUser = currentUserFixtures.userOnly;


    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(screen.getByTestId(`CoursesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });
   const joinButton = screen.getByTestId(`CoursesTable-cell-row-0-col-Join-button`);
    expect(joinButton).toBeInTheDocument();

    fireEvent.click(joinButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/courses/join/1'));

  });


  test("Staff button navigates to the staff page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;


    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(screen.getByTestId(`CoursesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });



    const staffButton = screen.getByTestId(`CoursesTable-cell-row-0-col-Staff-button`);
    expect(staffButton).toBeInTheDocument();

    fireEvent.click(staffButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/courses/1/staff'));

  });


  test("Edit button navigates to the edit page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(screen.getByTestId(`CoursesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

    const editButton = screen.getByTestId(`CoursesTable-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/courses/edit/1'));
    
    const totalCoursesElement = screen.getByText("Total Courses: 3"); 
    expect(totalCoursesElement).toBeInTheDocument();
  });


  test("Delete button calls the callback", async () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(screen.getByTestId(`CoursesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

    const deleteButton = screen.getByTestId(`CoursesTable-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const totalCoursesElement = screen.getByText("Total Courses: 3");
    expect(totalCoursesElement).toBeInTheDocument();
  });

  test("Has the expected column headers and renders hyperlinks for course IDs", () => {
    const currentUser = currentUserFixtures.userOnly;
  
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  
    coursesFixtures.threeCourses.forEach((course, index) => {
      const idCell = screen.getByTestId(`CoursesTable-cell-row-${index}-col-id`);
      const idLink = within(idCell).getByRole('link'); 
  
      expect(idLink).toHaveAttribute('href', `/courses/${course.id}`);
    });
  });
  
  test('ID link navigation occurs correctly', () => {
    const currentUser = currentUserFixtures.userOnly;
    render(
      <QueryClientProvider client={new QueryClient()}>
          <MemoryRouter>
              <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
          </MemoryRouter>
      </QueryClientProvider>
    );

    const firstIdCell = screen.getByTestId(`CoursesTable-cell-row-0-col-id`);
    const idLink = within(firstIdCell).getByRole('link');

    fireEvent.click(idLink); 
    expect(mockedNavigate).toHaveBeenCalledWith(`/courses/${coursesFixtures.threeCourses[0].id}`);
  });
  
  test('ID link has correct styles', () => {
    const currentUser = currentUserFixtures.userOnly;
    render(
      <QueryClientProvider client={new QueryClient()}>
          <MemoryRouter>
              <CoursesTable courses={coursesFixtures.threeCourses} currentUser={currentUser} />
          </MemoryRouter>
      </QueryClientProvider>
    );

    const idCell = screen.getByTestId(`CoursesTable-cell-row-0-col-id`);
    const idLink = within(idCell).getByRole('link');

    expect(idLink).toHaveStyle({
        cursor: "pointer",
        color: "#007bff",
        textDecoration: "underline"
    });
  });


});