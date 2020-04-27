const compose = (...funcs) => (component) => {
    return funcs.reduceRight(
        (wrapped, func) => func(wrapped), 
        component
    );
};

export default compose;