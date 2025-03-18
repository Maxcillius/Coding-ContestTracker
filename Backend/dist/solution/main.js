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
const puppeteer = require("puppeteer");
const playlistMap = new Map();
playlistMap.set("leetcode", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr");
playlistMap.set("codeforces", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB");
playlistMap.set("codechef", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr");
function getSolution(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var { contestName, platform } = req.body;
        contestName = contestName.split(' ').slice(0, 3).join(" ");
        // console.log(contestName)
        try {
            const scrapeYouTubePlaylist = () => __awaiter(this, void 0, void 0, function* () {
                const browser = yield puppeteer.launch({ headless: true });
                const page = yield browser.newPage();
                const url = playlistMap.get(platform);
                yield page.goto(url, {
                    waitUntil: "networkidle2"
                });
                const videos = yield page.evaluate(() => {
                    return Array.from(document.querySelectorAll('a#video-title')).map((el) => ({
                        title: el.textContent.trim(),
                        link: "https://www.youtube.com" + el.getAttribute("href")
                    }));
                });
                const videoDetail = {
                    Title: "",
                    Link: ""
                };
                videos.map((video) => {
                    if (video.title.includes(contestName)) {
                        // console.log("Found")
                        videoDetail.Title = video.Title,
                            videoDetail.Link = video.link;
                    }
                });
                yield browser.close();
                if (videoDetail.Title) {
                    return res.json(videoDetail);
                }
                else {
                    return res.status(404).json({
                        message: "No solution found"
                    });
                }
            });
            scrapeYouTubePlaylist();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = getSolution;
