export function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

export function getColorText(message, object, color) {
    const Reset = "\x1b[0m";
    /* const Bright = "\x1b[1m";
    const Dim = "\x1b[2m";
    const Underscore = "\x1b[4m";
    const Blink = "\x1b[5m";
    const Reverse = "\x1b[7m";
    const Hidden = "\x1b[8m";

    const FgBlack = "\x1b[30m";
    
    const BgBlack = "\x1b[40m";
    const BgRed = "\x1b[41m";
    const BgGreen = "\x1b[42m";
    const BgYellow = "\x1b[43m";
    const BgBlue = "\x1b[44m";
    const BgMagenta = "\x1b[45m";
    const BgCyan = "\x1b[46m";
    const BgWhite = "\x1b[47m"; */

    const colors = {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m"
    };

    return colors[color] + `${message} ${JSON.stringify(object, getCircularReplacer(), 2)}` + Reset;
}

// Generate unique IDs for use as pseudo-private/protected names.
// Similar in concept to
// <http://wiki.ecmascript.org/doku.php?id=strawman:names>.
//
// The goals of this function are twofold:
// 
// * Provide a way to generate a string guaranteed to be unique when compared
//   to other strings generated by this function.
// * Make the string complex enough that it is highly unlikely to be
//   accidentally duplicated by hand (this is key if you're using `ID`
//   as a private/protected name on an object).
//
// Use:
//
//     var privateName = ID();
//     var o = { 'public': 'foo' };
//     o[privateName] = 'bar';
export function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
        Math.random().toString(36).substr(2, 3) + 
        Math.random().toString(36).substr(2, 3).toUpperCase()//.substr(2, 7);
    );
}

export function tempID() {
    return (
        Math.random().toString(36).substr(2, 4) + 
        Math.random().toString(36).substr(2, 4).toUpperCase()//.substr(2, 7);
    );
}

// I suggeste it will be not more then 1000 users - it's alredy good
export function generateUniqName(usersNames) {
    let uniqNewName = ID();
    while(usersNames?.includes(uniqNewName)) {
        uniqNewName = ID();
    }
    return uniqNewName;
}