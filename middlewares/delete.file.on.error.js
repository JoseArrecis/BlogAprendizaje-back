import { error } from "console"
import { unlink } from "fs/promises"
import { join } from "path"

export const deleteFileOnError = async(error, req, res, next)=>{
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.filename)
        try{
            await unlink(filePath)
            return next()
        }catch(unLinkErr){
            console.error('Error deleting file: ', unLinkErr)
        }
    }
    if(error.status === 400 || error.errors){
        return res.status(400).send({message: 'Error registering image', error})
    }
    return res.status(500).send({message: error.message})
}
