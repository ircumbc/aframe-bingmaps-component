'use strict';

// See https://rwaldron.github.io/proposal-math-extensions/#sec-math.clamp
function clamp ( x, lower, upper ) {

    if ( Number.isNaN( x ) ) return NaN;
    if ( Number.isNaN( lower ) ) return NaN;
    if ( Number.isNaN( upper ) ) return NaN;

    const max = Math.max(x, lower);
    const min = Math.min(max, upper);

    return min;

}

if ( Math["clamp"] === undefined ) {

    Object.defineProperty( Math, "clamp", {
        value: clamp
    });

}

export default clamp;
