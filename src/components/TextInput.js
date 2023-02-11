import React from 'react';
import InputStyle from '../styles/InputStyle';

const { container, input, labelStyle } = InputStyle;

const TextInput = props => {
    const { label, value, setter, isCol, hidRender, disabled } = props;

    const handleChange = (e) => {
        const updateField = isCol ? "col" : "row";
        const fieldVal = !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 0;
        if(fieldVal === 0) return;
        setter(p => ({ ...p, [updateField]: fieldVal }));
    };

    return (
        <div style={container}>
            <label style={labelStyle}>{label}</label>
            <input disabled={disabled} style={input} type="text" value={value} onClick={hidRender} onChange={handleChange} maxLength={3} />
        </div>
    )
};

export default TextInput;
