"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateHash = (plainText) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = (0, bcryptjs_1.genSaltSync)(rounds);
    return (0, bcryptjs_1.hashSync)(plainText, salt);
};
exports.generateHash = generateHash;
const compareHash = (plainText, cypherText) => (0, bcryptjs_1.compareSync)(plainText, cypherText);
exports.compareHash = compareHash;
