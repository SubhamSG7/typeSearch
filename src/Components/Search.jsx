import React, { useRef, useState } from 'react';
import { UpiOptions } from './UpiOptions';
import { Validation } from './Validation';
import PaymentLoading from './PaymentLoading';

const Search = () => {
    let upiArr = UpiOptions;
    const smallLeterCheck=new RegExp("^[a-z]+$")
    const [inputData, setInputData] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [name, setName] = useState("");
    const [tracker, setTracker] = useState(-1);
    const validate = new RegExp("^[^@]*@[^@]*$");
    const selectorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        alert:"",
        sucess:""
    });
    const [hide,setHide]=useState(false);
    const handleChange = (e) => {
        setInputData(e.target.value);
        const query = e.target.value.split("@")[1] || ""; 
        const getName = e.target.value.split("@")[0] || ""; 
        setName(getName);
        setSearchQuery(query);
        setTracker(-1); 
        setHide(false);
       if(e?.target?.value?.length>0){
        setMessage({...message,alert:Validation(e.target.value)});
       }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Validation(inputData)==="") {
            setLoading(true);
            setTimeout(() => {
                setMessage({...message,sucess:"Payment Done"});
                setLoading(false);
            }, 2000);
        }
    };

    const handleKeyPressed = (e) => {
        const optionsCount = selectorRef.current ? selectorRef.current.children.length : 0;

        if (e.key === "ArrowDown") {
            setTracker((prev) => (optionsCount > 0 ? (prev + 1) % optionsCount : -1));
        }
        if (e.key === "ArrowUp") {
            setTracker((prev) => (optionsCount > 0 ? (prev - 1 + optionsCount) % optionsCount : -1)); 
        }
        if (e.key === "Enter" || e.key === "ArrowRight") {
            if (tracker >= 0 && tracker < optionsCount) {
                const selectedOption = selectorRef.current.children[tracker].textContent;
                setInputData(`${selectedOption}`);
                setSearchQuery("");
               setHide(true)
                
            }
        }
    };

    if (loading) {
        return <PaymentLoading />;
    }

    const filteredOptions = validate.test(inputData) 
        ? upiArr.filter(val => val.toLowerCase().includes(searchQuery.toLowerCase())) 
        : [];
    
    const suggestion = (validate.test(inputData) && name.length) > 0
        ? `${name}@${filteredOptions[tracker] || ''}`
        : '';
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 p-4 bg-[#F5F5F5] rounded-lg shadow-md relative">
            <div className="relative w-full">
                <input 
                    type="text" 
                    autoFocus
                    onKeyDown={handleKeyPressed}
                    placeholder='Enter Your UPI ID' 
                    value={inputData} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-[#424242] rounded-md focus:outline-none focus:ring-2 z-0 focus:ring-[#48CFCB]"
                />
                {suggestion && (
                    <span 
                        className="absolute left-3 top-3 text-gray-500 pointer-events-none"
                        style={{ opacity: 0.5 }}
                    >
                        {suggestion}
                    </span>
                )}
                {validate.test(inputData) && name.length > 0 && (
                    <div style={hide?{display:"none"}:{}}
                        ref={selectorRef} 
                        className="absolute z-10 bg-white border border-[#424242] rounded-md mt-1 w-full max-h-60 overflow-y-auto"
                    >
                        {(searchQuery.length === 0 ? upiArr : filteredOptions).map((val, index) => (
                            <p 
                                key={index} 
                                onClick={() => {
                                    setInputData(`${name}@${val}`);
                                    setSearchQuery("");
                                    setTracker(-1); 
                                }}
                                className={`cursor-pointer p-2 ${tracker === index ? 'bg-[#48CFCB]' : 'hover:bg-[#229799]'}`}
                            >
                                {name}@{val}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <input 
                type="submit" 
                value="Pay Now" 
                className="w-full bg-[#229799] text-white font-semibold py-2 rounded-md hover:bg-[#48CFCB] transition"
            />
            <p>{message.alert}</p>
            <b>{message.sucess}</b>
        </form>
    );
};

export default Search;
