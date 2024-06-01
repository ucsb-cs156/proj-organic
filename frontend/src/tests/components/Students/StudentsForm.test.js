import {render, fireEvent, screen} from "@testing-library/react";
import StudentsForm from "../../../main/components/Students/StudentsForm";
import userEvent from "@testing-library/user-event";

describe("StudentsForm Tests", () => {
    /*
    Thank you stack overflow for this tip
    https://stackoverflow.com/questions/61104842/react-testing-library-how
    -to-simulate-file-upload-to-a-input-type-file-e
    Told me how to upload a file, and the simulation of comparing it on lines 32 and 39, and 40
    */
    const file = new File(['there'], 'roster.csv', {type: '.csv'})
    test("Required fires when there's no input", async () => {
        render(
            <StudentsForm/>
        );
        await screen.findByTestId("StudentsForm-submit");

        const submitButton = screen.getByTestId("StudentsForm-submit");
        fireEvent.click(submitButton);
        await screen.findByText(/Roster is required/);
    });

    test("No errors on good submit", async () => {
        render(
            <StudentsForm/>
        );
        await screen.findByTestId("StudentsForm-submit");

        const upload = screen.getByTestId("StudentsForm-upload");
        const submitButton = screen.getByTestId("StudentsForm-submit");
        userEvent.upload(upload, file);
        fireEvent.click(submitButton);
        expect(screen.queryByText(/Roster is required/)).not.toBeInTheDocument();

        expect(upload.files).toHaveLength(1);
        expect(upload.files[0]).toStrictEqual(file);
    });

});