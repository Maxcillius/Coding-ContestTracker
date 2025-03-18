import { Request, Response } from "express";

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
}`

async function fetchLeetcode(req: Request, res: Response): Promise<any> {
    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json()

        const contests = data.data.allContests

        if(contests) {
            res.send({
                contests
            })
        return
    }
    
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error)
        res.status(400).send({
            success: 1,
            message: "Error while fetching leetcode contests"
        })
        return
    }
}

export { fetchLeetcode }