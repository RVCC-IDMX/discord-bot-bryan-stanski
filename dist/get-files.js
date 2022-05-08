"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const getFiles = (src, dir, suffix) => {
    const files = fs_1.default.readdirSync(`${src}/${dir}`, {
        withFileTypes: true,
    });
    let commandFiles = [];
    files.forEach((file) => {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(src, `${dir}/${file.name}`, suffix),
            ];
        }
        else if (file.name.endsWith(suffix)) {
            commandFiles.push(`./${dir}/${file.name}`.replace(suffix, ''));
        }
    });
    return commandFiles;
};
exports.default = getFiles;
