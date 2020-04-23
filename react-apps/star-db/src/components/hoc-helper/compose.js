const compose = (...funcs) => (component) => 
    funcs.reduceRight(
        (prevResult, func) => func(prevResult),
        component
    );

export default compose;