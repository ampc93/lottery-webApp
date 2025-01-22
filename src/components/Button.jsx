import React from 'react';

const Button = ({children, variant = 'primary', onClick, className }) =>{

    const variants ={
        primary: 'bg-primary text-white hover:bg-primary-dark',
        success: 'bg-success text-white hover:bg-green-700',
        warning: 'bg-warning text-black hover:bg-yellow-500',
        error: 'bg-error text-white hover:bg-red-600',
        neutral: 'bg-neutral text-black hover:bg-neutral-dark',
    };

    return(
        <Button
            className={`px-4 py-2 rounded font-sans ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default Button;