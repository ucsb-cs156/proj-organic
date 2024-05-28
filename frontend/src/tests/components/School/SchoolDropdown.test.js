import SchoolDropdown from "main/components/School/SchoolDropdown";
import { render } from "@testing-library/react";

describe("School DropdownTests", () => {
    const schools = [
        {
            label: 'UC Santa Barbara',
            key: 'UC Santa Barbara',
        },
        {
            label: 'UC Los Angeles',
            key: 'UC Los Angeles',
        },
        {
            label: 'UC Riverside',
            key: 'UC Riverside',
        },
        {
            label: 'UC Berkely',
            key: 'UC Berkely',
        },
        {
            label: 'UC San Diego',
            key: 'UC San Diego',
        },
        {
            label: 'UC Santa Cruz',
            key: 'UC Santa Cruz',
        },
        {
            label: 'UC Davis',
            key: 'UC Davis',
        },
        {
            label: 'UC Irvine',
            key: 'UC Irvine',
        },
        {
            label: 'UC Merced',
            key: 'UC Merced',
        },
        {
            label: 'Carneige Mellon',
            key: 'Carneige Mellon',
        },
    ]
    test("school dropdown renders with default name and testId", async () => {
        render(
            <SchoolDropdown schools={schools}></SchoolDropdown>
        )
    });
})