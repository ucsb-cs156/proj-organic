import { render, screen } from "@testing-library/react";
import UsersTable from "main/components/Users/UsersTable";
import { formatTime } from "main/utils/dateUtils";
import usersFixtures from "fixtures/usersFixtures";

describe("UserTable tests", () => {
    test("renders without crashing for empty table", () => {
        render(
            <UsersTable users={[]} />
        );
    });

    test("renders without crashing for three users", () => {
        render(
            <UsersTable users={usersFixtures.threeUsers} />
        );
    });

    test("Has the expected colum headers and content", () => {
        render(
          <UsersTable users={usersFixtures.threeUsers}/>
        );
    
        const expectedHeaders = ["githubId", "githubLogin", "fullName", "Email", "Last Online", "Admin"];
        const expectedFields = ["githubId", "githubLogin", "fullName", "email", "lastOnline", "admin"];
        const testId = "UsersTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(screen.getByTestId(`${testId}-cell-row-0-col-githubId`)).toHaveTextContent("11111");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-admin`)).toHaveTextContent("true");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-fullName`)).toHaveTextContent("Phill Conrad");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-lastOnline`)).toHaveTextContent(formatTime(usersFixtures.threeUsers[0].lastOnline));
        expect(screen.getByTestId(`${testId}-cell-row-1-col-githubLogin`)).toHaveTextContent("cgaucho");
        expect(screen.getByTestId(`${testId}-cell-row-1-col-admin`)).toHaveTextContent("false");
      });
});
