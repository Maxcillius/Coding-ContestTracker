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

async function fetchContests(req: Request, res: Response) {
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
            return res.json({
                contests
            })
    }
    
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error)
        return res.status(400).json({
            success: 1,
            message: "Error while fetching leetcode contests"
        })
    }
}

export { fetchContests }