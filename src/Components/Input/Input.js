import React from 'react'
const style = {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: 'solid 1px white',
    padding: '16px',
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600'
}
const Input = ({ placeholder, type, className, onBlur, value, name, onChange }) => {
    return (
        <input
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            style={style}
            name={name}
            className={className}
            type={type}
            value={value}
            placeholder={placeholder} />
    )
}

export default Input
