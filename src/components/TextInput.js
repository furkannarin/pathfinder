import React, { useState } from 'react';

const TextInput = props => {
    const { label, style, value, setter } = props;

    return (
        <div style={{ display: 'flex', ...style }}>
            <label for="name">{label}</label>
            <input type="text" value={value} onChange={(e => { console.log(e)})} required />
        </div>
    )
};

export default TextInput;
