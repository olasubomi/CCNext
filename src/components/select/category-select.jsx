import React, { useState } from 'react';
import Select from 'react-select';


const options = [
    { value: 'categories', label: 'All categories' },
    { value: 'stores', label: 'Stores' },
    { value: 'meal', label: 'Meals' },
    { value: 'products', label: 'Products' },
    { value: 'utensils', label: 'Kitchen Utensils' },
];
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#6D6D6D',
        fontSize: '15px',
        fontWeight: '200',
        marginTop: '1.2rem',
        marginBottom: '1.2rem',
        backgroundColor: state.isSelected ? "#FFFFFF" : "#FFFFFF",
    }),

    control: (provided, state) => ({
        ...provided,
        borderRadius: '41px',
        outline: state.isFocused ? '1px solid rgba(0,0,0,0.9)' : '1px solid rgba(0,0,0,0.9)',
        border: state.isFocused ? '2px solid rgba(0,0,0,0.9)' : '1px solid rgba(0,0,0,0.9)',
        height: '91px',
        color: '#6D6D6D',
        textAlign: 'justify',
        paddingLeft: '.5rem',
        "&:hover": {
            border: '1px solid rgba(0,0,0,0.9)',
        },
    }),
};
function SelectDropDown({ onChange, onSelect, placeholder }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    return (
        <Select
            className='custom-select'
            classNamePrefix='custom'
            value={selectedOption}
            onChange={(e) => handleChange()}
            options={options}
            customStyles={customStyles}
            placeholder={placeholder}
        />
    );
}

export default SelectDropDown;