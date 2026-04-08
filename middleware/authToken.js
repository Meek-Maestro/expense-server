export async function validateToken(req, res, next){
    const token = req.headers['token']
    try {
        if(!token) return res.status(404).send("No token")
        if (token === "1234")
        next()
    } catch (error) {
        res.status(400).send("Unauthorized")
    }
}