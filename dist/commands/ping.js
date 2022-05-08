"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        console.log(args);
        message
            .reply('pong')
            .then(() => console.log(`Replied to message "${message.content}"`))
            .catch(console.error);
        message.react('🏓').then(console.log).catch(console.error);
    },
};
