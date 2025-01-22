import React from 'react';

const Input = ({label, type = 'text', value, onChange, placeholder, className}) =>{

    return(
        <div className="mb-4">
        {label && (
            <label className="block text-sm font-sans text-neutral-dark mb-2">{label}</label>
        )}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary font-sans ${className}`}
        />
        </div>
    );

};

export default Input;