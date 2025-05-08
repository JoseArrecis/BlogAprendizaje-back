import User from "../user/user.model"
import { checkPassword, encrypt } from "../../utils/encrypt"
import { generateJwt } from "../../utils/jwt.js"

export const register = async(req, res)=>{
    try {
        let data = req.body

        let user = new User(data)
        user.password = await encrypt(user.password)
        
        user.role = data.role || 'ADMIN'

        await user.save()
        return res.send(
            {
                message: 'Registerd successfully, you can log in with username :'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error registering user',
                ErrorEvent
            }
        )
    }
}

export const login = async(req, res)=>{
    try {
        let { userLoggin, password } = req.body
        let user = await User.findone(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        if(user && checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )

            if(data.role && data.role === 'USER'){
                return res.status(403).send(
                    {
                        success: false,
                        messsage: 'You cannot register as an ADMIN'
                    }
                )
            }

            user.role = data.role || 'USER'
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General eror with login function'
            }
        )
    }
}