import { Request, Response } from "express";

async function fetchCodeforces(req: Request, res: Response): Promise<any> {
    try {
        await fetch('https://codeforces.com/api/contest.list', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            res.send({
                contests: data.result
            })
            return
        })

    } catch (error) {
        console.error("Error fetching codeforces contests:", error)
        res.status(400).send({
            success: 1,
            message: "Error while fetching codeforces contests"
        })
        return
    }
}

export { fetchCodeforces }