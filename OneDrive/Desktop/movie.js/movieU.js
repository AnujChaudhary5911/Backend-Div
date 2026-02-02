import fs from 'fs'
function movieU(req,resp){
    try{
        const {userId, name, userType}=req.body
        let user=[]
        if(fs.existsSync("User.json","utf-8")){
            const data=fs.readFileSync("movie.json","utf-8")
            let mov=JSON.parse(data)
            let isUser=mov.some((value)=> value.userId==userId)
            if(isUser){
                return resp.status(400).send("User already exist")
            }

        }
        let ob={
           userId, name, userType
        }
        user.push(ob)
        fs.writeFileSync("User.json",JSON.stringify(user,null,2))
        resp.status(201).send('new User data is created')

    }
    catch(error){
        resp.status(500).send("there are some error in your User registration")
    }
}export default movieU