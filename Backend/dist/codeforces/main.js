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
exports.fetchCodeforces = void 0;
function fetchCodeforces(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch('https://codeforces.com/api/contest.list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                res.send({
                    contests: data.result
                });
                return;
            });
        }
        catch (error) {
            console.error("Error fetching codeforces contests:", error);
            res.status(400).send({
                success: 1,
                message: "Error while fetching codeforces contests"
            });
            return;
        }
    });
}
exports.fetchCodeforces = fetchCodeforces;
