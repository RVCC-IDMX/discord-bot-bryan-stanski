"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = tslib_1.__importStar(require("cowsay"));
const random_1 = tslib_1.__importDefault(require("./random"));
const quotes_json_1 = tslib_1.__importDefault(require("./quotes.json"));
function default_1(params) {
    let random = false;
    let animal = 'whale';
    if (params === 'true' || params === 'false') {
        random = params === 'true';
    }
    else {
        animal = params;
    }
    const randomInt = (0, random_1.default)(0, 100);
    const quoteLocation = quotes_json_1.default[randomInt];
    const quoteMessage = quoteLocation.quote;
    const quoteAuthor = quoteLocation.author;
    let opts = {
        text: `${quoteMessage} - ${quoteAuthor}`,
        e: '00',
        T: 'U',
        f: animal,
        r: random,
        y: false,
    };
    try {
        let output = cowsay.say(opts);
        output = output.replace(/```/g, "'''");
        if (output.length > 1996) {
            output = "Exceeded Discord's 2000 character limit";
        }
        console.log(output);
        return `\`\`\`${output}\`\`\``;
    }
    catch (error) {
        console.log(error);
        let output;
        output = 'Cowsay does not exist';
        return output;
    }
}
exports.default = default_1;
