import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

// Stryker disable all
function DropdownOption({ label, isSelected, onClickFunc, testid, rawKey }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const divStyle = {
        backgroundColor: isHovered ? 'lightgreen' : 'white',
        transition: 'backgroundColor 0.25s ease',
        'paddingLeft': '2px',
        'paddingRight': '2px',
    };
    let mainOption;
    if (!isSelected) {
        mainOption = (
            <div
                key={rawKey}
                data-testid={testid}
                style={divStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClickFunc}
            >
                {label}
            </div>
        );
    } else {
        let altStyle = divStyle;
        altStyle['backgroundColor'] = 'green';
        altStyle['color'] = 'white';
        mainOption = (
            <div key={rawKey} data-testid={testid} style={altStyle} onClick={onClickFunc}>
                {label}
            </div>
        );
    }
    return <div>{mainOption}</div>;
}
// Stryker restore all

export default function OurAddDropdownForm({
    content,
    label,
    basis,
    testId = 'testid',
    onChangeFunc = null,
}) {
    // Stryker disable all
    // make it the so content is in alphabetical order
    content.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
    });
     // Stryker restore all
    const [selectedContent, changeSelectedContent] = useState(basis);
    const [showingDropdown, changeShowingDropdown] = useState(false);

    // Stryker disable all
    const optionWrapperStyle = {
        position: 'absolute',
        left: '26px',
        'marginTop': '4px',
        'borderRadius': '2px',
        'overflowY': 'scroll',
        height: '200px',
    };
    // Stryker restore all

    let count = 0;

    const internalOnChange = (event) => {
        if (onChangeFunc) {
            onChangeFunc(event);
        }
    };
    return (
        <div>
            {label}
            {content.length != 0 && (
                <div>
                    <Form.Control
                        data-testid={`${testId}-test-dropdown-form`}
                        type="text"
                        value={selectedContent ? selectedContent.label : ''}
                        onChange={internalOnChange}
                        onSelect={() => {
                            changeShowingDropdown(true);
                        }}
                    />
                    {showingDropdown && (
                        <div data-testid = {`${testId}-wrapper`} style={optionWrapperStyle}>
                            {content.map((obj) => {
                                const key = obj.key;
                     
                                const innerLabel = obj.label;
                                const select = () => {
                                    changeSelectedContent(obj);
                                    changeShowingDropdown(false);
                                };
                                return (
                                    <DropdownOption
                                        testid={`${testId}-dropdown-form-option-${count++}`}
                                        label={innerLabel}
                                        isSelected={
                                            selectedContent &&
                                            key == selectedContent.key
                                        }
                                        rawKey = {key}
                                        // Stryker disable next-line all
                                        key ={`${key}-dropdown-option`}
                                        onClickFunc={select}
                                    ></DropdownOption>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {content.length == 0 && (
                <div>
                    <Form.Control
                        data-testid={`${testId}-test-dropdown-form`}
                        type="text"
                        // Stryker disable all
                        disabled={true}
                        style={{ cursor: 'not-allowed' }}
                        // Stryker enable all
                    />
                </div>
            )}
        </div>
    );
}
