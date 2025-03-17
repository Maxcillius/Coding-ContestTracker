"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../leetcode/main");
const main_2 = require("../codeforces/main");
const main_3 = __importDefault(require("../solution/main"));
const router = (0, express_1.Router)();
router.get("/leetcode", main_1.fetchLeetcode);
router.get("/codeforces", main_2.fetchCodeforces);
router.post("/getSolution", main_3.default);
exports.default = router;
