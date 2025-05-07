const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
}

const routes = (app)=>{
    
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server rugging in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}