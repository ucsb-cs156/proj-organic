import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OurAddDropdownForm from 'main/components/OurAddDropdownForm';

describe('OurAddDropdownForm Tests', () => {
    const threeOptions = [
        { label: 'choose me', key: 'choose me' },
        { label: 'pick me!', key: 'pick me!' },
        { label: 'click me', key: 'click me' },
    ];
    const twoOptions = [
        { label: 'c', key: 'c' },
        { label: 'b', key: 'b' },   
    ];
    const sameTwoOptions = [
        { label: 'a', key: 'a1' },
        { label: 'a', key: 'a2' },   
    ];

    test('renders an empty dropdown element without crashing', () => {
        render(
            <OurAddDropdownForm
                content={[]}
                label="empty"
                testId="test-dropdown"
            />
        );
    });

    test('renders an dropdown element without showing options if not selected', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);

        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();
        expect(screen.queryByTestId('testid-wrapper')).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('testid-dropdown-form-option-0')
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('testid-dropdown-form-option-1')
        ).not.toBeInTheDocument();
    });

    test('renders an correctly selected initalElement', async () => {
        render(
            <OurAddDropdownForm
                content={threeOptions}
                label="empty"
                basis={threeOptions[1]}
            />
        );
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId('testid-test-dropdown-form')
        ).toHaveAttribute('value', 'click me');

        const submitField = screen.getByTestId('testid-test-dropdown-form');
        fireEvent.select(submitField);

        expect(
            await screen.findByTestId('testid-wrapper')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveStyle({backgroundColor: "green"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toHaveStyle({backgroundColor: "white"});



    });

    test('renders on no inital selected element', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);

        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId('testid-test-dropdown-form')
        ).toHaveAttribute('value', '');
    });

    test('renders an empty dropdown element with no options', async () => {
        render(<OurAddDropdownForm content={[]} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();

        expect(
            screen.queryByTestId('testid-dropdown-form-option-0')
        ).not.toBeInTheDocument();
    });

    test('default testid is testId', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();
    });

    test('testid is working', async () => {
        render(
            <OurAddDropdownForm
                content={threeOptions}
                label="empty"
                testId={'metronome'}
            />
        );
        expect(
            await screen.findByTestId('metronome-test-dropdown-form')
        ).toBeInTheDocument();
    });

    test('onChangeFunc is called on typing', async () => {
        const changeFunc = jest.fn();
        render(
            <OurAddDropdownForm
                content={threeOptions}
                label="empty"
                onChangeFunc={changeFunc}
            ></OurAddDropdownForm>
        );

        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();
        const submitField = screen.getByTestId('testid-test-dropdown-form');

        fireEvent.change(submitField, { target: { value: 'A' } });

        await waitFor(() => expect(changeFunc).toHaveBeenCalled());
    });

    test('renders correctly with null onChangeFunc', async () => {
        await waitFor(() =>
            expect(() => {
                render(
                    <OurAddDropdownForm
                        content={threeOptions}
                        label="empty"
                        onChangeFunc={null}
                    ></OurAddDropdownForm>
                );
            }).not.toThrow()
        );
        const submitField = screen.getByTestId('testid-test-dropdown-form');

        fireEvent.change(submitField, { target: { value: 'A' } });
    });

    test('options are rendered correctly', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();

        const submitField = screen.getByTestId('testid-test-dropdown-form');

        fireEvent.select(submitField);

        expect(
            await screen.findByTestId('testid-wrapper')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toBeInTheDocument();
    });

    test('options are not rendered after selection', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();

        const submitField = screen.getByTestId('testid-test-dropdown-form');

        fireEvent.select(submitField);

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toBeInTheDocument();

        const selectOption = screen.getByTestId('testid-dropdown-form-option-1');

        fireEvent.click(selectOption);

        expect(screen.queryByTestId('testid-wrapper')
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('testid-dropdown-form-option-0')
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('testid-dropdown-form-option-1')
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('testid-dropdown-form-option-2')
        ).not.toBeInTheDocument();
    });

    test('selection changes after click', async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();

        const submitField = screen.getByTestId('testid-test-dropdown-form');
        fireEvent.select(submitField);
        

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toBeInTheDocument();

        const selectOption = screen.getByTestId('testid-dropdown-form-option-1');

        fireEvent.click(selectOption);
        fireEvent.select(submitField);

        expect(
            await screen.findByTestId('testid-wrapper')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveStyle({backgroundColor: "green"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toHaveStyle({backgroundColor: "white"});
    });

    test("selection color changes over hovering", async () => {
        render(<OurAddDropdownForm content={threeOptions} label="empty" />);
        expect(
            await screen.findByTestId('testid-test-dropdown-form')
        ).toBeInTheDocument();

        const submitField = screen.getByTestId('testid-test-dropdown-form');
        fireEvent.select(submitField);
        

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toBeInTheDocument();

        const selectOption = screen.getByTestId('testid-dropdown-form-option-2');
        fireEvent.mouseOver(selectOption);

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toHaveStyle({backgroundColor: "lightgreen"});

        fireEvent.mouseOut(selectOption);
        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveStyle({backgroundColor: "white"});
        expect(
            await screen.findByTestId('testid-dropdown-form-option-2')
        ).toHaveStyle({backgroundColor: "white"});
    });

    test("options are rendered in alphabetical order", async () => {
        render(<OurAddDropdownForm content={twoOptions} label="empty" />);
        const submitField = screen.getByTestId('testid-test-dropdown-form');
        fireEvent.select(submitField);
        

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveTextContent("b");
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveTextContent("c");
        
    });

    test("same label options are rendered", async () => {
        render(<OurAddDropdownForm content={sameTwoOptions} label="empty" />);
        const submitField = screen.getByTestId('testid-test-dropdown-form');
        fireEvent.select(submitField);
        

        expect(
            await screen.findByTestId('testid-dropdown-form-option-0')
        ).toHaveTextContent("a");
        expect(
            await screen.findByTestId('testid-dropdown-form-option-1')
        ).toHaveTextContent("a");
        
    });
});
