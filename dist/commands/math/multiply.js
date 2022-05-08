"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let product = 0;
        product = parseInt(args[0]) * parseInt(args[1]);
        message
            .reply(`The product is ${product}`)
            .then(() => console.log(`Replied to message "${message.content}"`))
            .catch(console.error);
        message.react('🧮').then(console.log).catch(console.error);
    },
};
