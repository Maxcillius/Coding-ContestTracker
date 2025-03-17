import { Router } from "express"
import { fetchLeetcode } from "../leetcode/main"
import { fetchCodeforces } from "../codeforces/main"
import getSolution from "../solution/main"

const router = Router()

router.get("/leetcode", fetchLeetcode)
router.get("/codeforces", fetchCodeforces)
router.post("/getSolution", getSolution)

export default router