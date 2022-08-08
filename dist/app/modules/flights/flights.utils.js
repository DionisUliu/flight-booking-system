"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeatNumbers = void 0;
function generateSeatNumbers(capacity) {
    const array = [];
    for (let i = 1; i <= capacity; i++) {
        array.push(i);
    }
    return array;
}
exports.generateSeatNumbers = generateSeatNumbers;
