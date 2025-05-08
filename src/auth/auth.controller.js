export const register = async(req, res)=>{
    try {
        let data = req.body

        let user = new UserActivation(data)
        user.password = await 

    } catch (err) {
        console.error(err)
        return res.status(500).send({w})
    }
}