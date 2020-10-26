const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    Reverse: "\x1b[7m",
};
const Reset = "\x1b[0m";

const cs = "yellow.BgRed";
const array_cs = cs.split('.');

/* type test = "Dasha" | "Masha";

const name1: test = "Dasha"; */

let name;
console.log("name", name);
console.log("!name", !name);
console.log("!!name", !!name);

console.warn("-----------");

name = "Dasha";
console.log("name", name);
console.log("!name", !name);
console.log("!!name", !!name);

console.warn("-----------");

name = null;
console.log("name", name);
console.log("Boolean(name)", Boolean(name));
console.log("!name", !name);
console.log("!!name", !!name);