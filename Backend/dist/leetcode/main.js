"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLeetcode = void 0;
const query = `
query getUpcomingContests {
  allContests {
    containsPremium
    description
    duration
    startTime
    title
    titleSlug
    cardImg
  }
}`;
function fetchLeetcode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });
            const data = yield response.json();
            const contests = data.data.allContests;
            if (contests) {
                res.send({
                    contests
                });
                return;
            }
        }
        catch (error) {
            console.error("Error fetching LeetCode contests:", error);
            res.status(400).send({
                success: 1,
                message: "Error while fetching leetcode contests"
            });
            return;
        }
    });
}
exports.fetchLeetcode = fetchLeetcode;
