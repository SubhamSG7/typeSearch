export const HandleKey = (e) => {
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
            setTracker(-1); 
        }
    }
};
