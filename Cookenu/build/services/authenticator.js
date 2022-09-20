"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenData = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { JWT_KEY } = process.env;
const generateToken = (payload) => (0, jsonwebtoken_1.sign)(payload, JWT_KEY, { expiresIn: "1h" });
exports.generateToken = generateToken;
const getTokenData = (token) => {
    try {
        const { id } = (0, jsonwebtoken_1.verify)(token, JWT_KEY);
        return { id };
    }
    catch (error) {
        return null;
    }
};
exports.getTokenData = getTokenData;
