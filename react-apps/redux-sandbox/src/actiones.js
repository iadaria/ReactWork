export const inc = () => ({ type: 'INC' });
export const dec = () => ({ type: 'DEC' });
export const rnd = () => {
    const randomValue = Math.floor(Math.random()*10);
    return { 
        type: 'RANDOM', 
        payload: randomValue
    };
};