"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let sum = 0;
        for (const arg of args) {
            sum += parseInt(arg);
        }
        message
            .reply(`The sum is ${sum}`)
            .then(() => console.log(`Replied to message "${message.content}"`))
            .catch(console.error);
        message.react('🧮').then(console.log).catch(console.error);
    },
};
