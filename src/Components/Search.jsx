import React, { useState } from 'react';
import { UpiOptions } from './UpiOptions';

const Search = () => {
    const upiArr = UpiOptions;
    const [inputData, setInputData] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const validate = new RegExp("^[^@]*@[^@]*$");

    function handleChange(e) {
        setInputData(e.target.value);
        const query = e.target.value.split("@")[1] || ""; 
        setSearchQuery(query);
    }

    function handleSubmit(e) {
        e.preventDefault();
       
    }

    const filteredOptions = validate.test(inputData) ? upiArr.filter(val => val.includes(searchQuery)) : [];

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Enter Your UPI id' 
                value={inputData} 
                onChange={handleChange} 
            />
            <input type="submit" value="Pay Now" />
            {validate.test(inputData) && (
                <ul>
                    {searchQuery.length === 0 ? (
                        upiArr.map((val, index) => <p key={index}>{val}</p>)
                    ) : (
                        filteredOptions.map((val, index) => <p key={index}>{val}</p>)
                    )}
                </ul>
            )}
        </form>
    );
};

export default Search;
