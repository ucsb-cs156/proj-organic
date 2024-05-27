import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

function DropdownOption({ label, isSelected, onClickFunc }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const divStyle = {
        backgroundColor: isHovered ? 'lightgreen' : 'white',
        transition: 'background-color 0.25s ease',
        "padding-left": '2px',
        "padding-right": '2px',
    };
    let mainOption;
    if (!isSelected) {
        mainOption = (
            <div
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
        altStyle['background-color'] = 'green';
        altStyle['color'] = 'white';
        mainOption = (
            <div style={altStyle} onClick={onClickFunc}>
                {label}
            </div>
        );
    }
    return <div>{mainOption}</div>;
}

export default function OurAddDropdownForm({
    content,
    label,
    basis,
    testId,
    id,
    onChangeFunc = null,
    missingContentMsg = "",
}) {
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
    const [selectedContent, changeSelectedContent] = useState(basis);
    const [showingDropdown, changeShowingDropdown] = useState(false);

    const optionWrapperStyle = {
        position:"absolute",
        left:"26px",
        "margin-top": "4px",
        "border-radius": "2px",
        "overflow-y": "scroll",
        "height": "200px",
    }

    const internalOnChange = (event) => {
        if (onChangeFunc) {
            onChangeFunc(event);
        }
    };
    return (
        <div>
            {label}
            {(content.length != 0) && <div>
                <Form.Control
                    data-testid={testId}
                    id={id}
                    type="text"
                    value={selectedContent ? selectedContent.label : ""}
                    onChange={internalOnChange}
                    onSelect={() => {
                        changeShowingDropdown(true);
                    }}
                    
                />
                {showingDropdown && (
                    <div style={optionWrapperStyle}>
                        {content.map((obj) => {
                            const key = obj.key;
                            const innerLabel = obj.label;
                            const select = () => {
                                changeSelectedContent(obj);
                                changeShowingDropdown(false);
                            };
                            return (
                                <DropdownOption
                                    label={innerLabel}
                                    isSelected={selectedContent && key == selectedContent.key}
                                    onClickFunc={select}
                                ></DropdownOption>
                            );
                        })}
                    </div>
                )}
            </div>
            }
            {content.length == 0 && <div>
                <Form.Control
                    data-testid={testId}
                    id={id}
                    type="text"
                    value={missingContentMsg}
                    disabled={true}
                    style = {{cursor: "not-allowed"}}
                    
                />
                </div>}
        </div>
    );
}
