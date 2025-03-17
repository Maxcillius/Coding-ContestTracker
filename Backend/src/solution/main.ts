import { Request, Response } from "express"
const puppeteer = require("puppeteer")

const playlistMap = new Map<string, string>()
playlistMap.set("leetcode", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr")
playlistMap.set("codeforces", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB")
playlistMap.set("codechef", "https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr")

export  default async function getSolution(req: Request, res: Response) {
    var { contestName, platform } = req.body

    contestName = contestName.split(' ').slice(0, 3).join(" ")
    console.log(contestName)

    try {
        const scrapeYouTubePlaylist = async () => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
        
            const url = playlistMap.get(platform)

            await page.goto(url, {
                waitUntil: "networkidle2"
            });
        
            const videos = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a#video-title')).map((el: any) => ({
                    title: el.textContent.trim(),
                    link: "https://www.youtube.com" + el.getAttribute("href")
                }));
            })

            videos.map((video: any) => {
                if(video.title.includes(contestName)) {
                    console.log("Found")
                    return res.json({
                        Title: video.title,
                        Link: video.link
                    })
                }
            })

            await browser.close()

            return res.status(404).json({
                message: "No solution found"
            })
        }
        
        scrapeYouTubePlaylist();
    } catch(error) {
        console.log(error)
    }
}