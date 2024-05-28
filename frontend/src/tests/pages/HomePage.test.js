import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import HomePage from "main/pages/HomePage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
const testId = "homePage";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        commonsId: 1
    }),
    useNavigate: () => mockNavigate
}));

describe("HomePage tests", () => {
    
    const queryClient = new QueryClient();
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    afterEach(() => {
        axiosMock.reset();
      });

    test("expected CSS properties", () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const title = screen.getByTestId(`${testId}-title`);
        expect(title).toHaveStyle(`
        font-size: 75px;
        border-radius: 7px;
        background-color: white;
        opacity: 0.9;
        padding: 10px;
        text-align: center;
        margin: 3rem 0;
    `);
       const info = screen.getByTestId(`${testId}-info`);
        expect(info).toHaveStyle(`
        padding: 20px;
        borderRadius: 7px;
        margin: 20px 0;
    `);
    const main = screen.getByTestId(`${testId}-main-div`);
        expect(main).toHaveStyle(`
        padding: 15px;
    `);
    });

    test('shows greeting for logged-in users with dynamic time of day', () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly); // Adjust this if needed
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        const greetingElement = screen.getByTestId(`${testId}-title`);
        expect(
          greetingElement.textContent
        ).toMatch(/Good (morning|afternoon|evening), Please Sign In First to Proceed/);
        const homePageInfoElement = screen.getByTestId(`${testId}-info`);
        expect(homePageInfoElement).toBeInTheDocument();
        

  // Check if the home page info is rendered correctly
        expect(homePageInfoElement).toHaveTextContent(
          "This app is intended as a replacement for the ucsb-cs-github-linker app used in many courses at UCSB, as well as some courses at other universities."
        );
    });
});

describe('HomePage greetings for not logged in users at different times of the day', () => {
    const originalDate = global.Date;
    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();

    const mockDateWithHour = (hour) => {
      global.Date = class extends Date {

        getHours() {
          return hour;
        }
        getDate() { return originalDate.now(); }
        getMonth() { return originalDate.now(); }
        getFullYear() { return originalDate.now(); }
      };
    };
  
    afterEach(() => {
      global.Date = originalDate;
      axiosMock.reset();
        });
    const testCases = [
      { hour: 9, expectedGreeting: "Good morning, Please Sign In First to Proceed" },
      { hour: 14, expectedGreeting: "Good afternoon, Please Sign In First to Proceed" },
      { hour: 19, expectedGreeting: "Good evening, Please Sign In First to Proceed" },
      { hour: 12, expectedGreeting: "Good morning, Please Sign In First to Proceed" },
      { hour: 18, expectedGreeting: "Good afternoon, Please Sign In First to Proceed" },
    ];
  
    testCases.forEach(({ hour, expectedGreeting }) => {
      test(`shows "${expectedGreeting}" for not logged-in user at ${hour} hours`, () => {
        mockDateWithHour(hour);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <HomePage />
            </MemoryRouter>
          </QueryClientProvider>
        );
        expect(screen.getByTestId(`${testId}-main-div`)).toBeInTheDocument();

        const greetingElement = screen.getByTestId(`${testId}-title`);
        expect(greetingElement.textContent).toMatch(new RegExp(expectedGreeting, 'i'));
        expect(
          greetingElement.textContent
        ).toMatch(/Good (morning|afternoon|evening)/); 
        const homePageInfoElement = screen.getByTestId(`${testId}-info`);
        expect(homePageInfoElement).toBeInTheDocument();

  // Check if the home page info is rendered correctly
        expect(homePageInfoElement).toHaveTextContent(
          "This app is intended as a replacement for the ucsb-cs-github-linker app used in many courses at UCSB, as well as some courses at other universities."
        );
      });
    });
  });

  describe('HomePage greetings for not logged in users at specific time', () => {
    const originalDate = global.Date;
    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();

    const mockDateWithHour = (hour) => {
      global.Date = class extends Date {

        getHours() {
          return hour;
        }
        getDate() { return originalDate.now(); }
        getMonth() { return originalDate.now(); }
        getFullYear() { return originalDate.now(); }
      };
    };
  
    afterEach(() => {
      global.Date = originalDate;
      axiosMock.reset();
        });
    const testCases = [
      { hour: 9, expectedGreeting: "Good morning" },
    ];
  
    testCases.forEach(({ hour, expectedGreeting }) => {
      test(`shows "${expectedGreeting}" for not logged-in user at ${hour} hours`, () => {
        mockDateWithHour(hour);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <HomePage />
            </MemoryRouter>
          </QueryClientProvider>
        );
        expect(screen.getByTestId(`${testId}-main-div`)).toBeInTheDocument();

        const greetingElement = screen.getByTestId(`${testId}-title`);
        //expect(greetingElement.textContent).toMatch(new RegExp(expectedGreeting, 'i'));
        expect(greetingElement).toHaveTextContent(
          "Good morning"
        );
        expect(
          greetingElement.textContent
        ).toMatch(/Good (morning|afternoon|evening)/); 
        const homePageInfoElement = screen.getByTestId(`${testId}-info`);
        expect(homePageInfoElement).toBeInTheDocument();

  // Check if the home page info is rendered correctly
        expect(homePageInfoElement).toHaveTextContent(
          "This app is intended as a replacement for the ucsb-cs-github-linker app used in many courses at UCSB, as well as some courses at other universities."
        );
      });
    });
  });

  describe('HomePage greetings for logged-in users at different times of the day', () => {
    const originalDate = global.Date;
    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();


    const mockDateWithHour = (hour) => {
      global.Date = class extends Date {

        getHours() {
          return hour;
        }
        getDate() { return originalDate.now(); }
        getMonth() { return originalDate.now(); }
        getFullYear() { return originalDate.now(); }
      };
    };
  

    beforeEach(() => {
        global.Date = originalDate;
        axiosMock.reset();
        axiosMock.resetHistory();
        //axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingAll);

    });


    const testCases = [
      { hour: 4, expectedGreeting: "Good morning, pconrad" },
      { hour: 14, expectedGreeting: "Good afternoon, pconrad" },
      { hour: 19, expectedGreeting: "Good evening, pconrad" },
      { hour: 12, expectedGreeting: "Good morning, pconrad" },
      { hour: 18, expectedGreeting: "Good afternoon, pconrad" },
    ];
  
    testCases.forEach(({ hour, expectedGreeting }) =>  {
      test(`shows "${expectedGreeting}" for logged-in user at ${hour} hours`, async () => {
          axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        mockDateWithHour(hour);
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <HomePage />
            </MemoryRouter>
          </QueryClientProvider>
        );

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        expect(screen.getByTestId(`${testId}-main-div`)).toBeInTheDocument();

        const greetingElement = screen.getByTestId(`${testId}-title`);
        expect(greetingElement.textContent).toMatch(new RegExp(expectedGreeting, 'i'));
        const homePageInfoElement = screen.getByTestId(`${testId}-info`);
        expect(homePageInfoElement).toBeInTheDocument();

  // Check if the home page info is rendered correctly
        expect(homePageInfoElement).toHaveTextContent(
          "This app is intended as a replacement for the ucsb-cs-github-linker app used in many courses at UCSB, as well as some courses at other universities."
        );
      });
    });
  });
   
