"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(output) {
    let emoji = '🐄';
    if (output === `\`\`\`Exceeded Discord's 2000 character limit\`\`\``) {
        emoji = '🚫';
    }
    else if (output === 'Cowsay does not exist') {
        emoji = '🚫';
    }
    return emoji;
}
exports.default = default_1;
