import fs from 'fs'
function User(req,resp){
    try{
        const {userId,name,type}=req.body;
        let user=[];
        let ob={
            userId,
            name,type
        }
        if(fs.existsSync("user.json")){
            const data=JSON.parse(fs.readFileSync("user.json","utf-8"))
            let Isuser=data.some((value)=>value.userId==userId)
            if(Isuser){
                return resp.render('userExist')
            }
            else{
              user=data;
            }
        }
        user.push(ob)
        fs.writeFileSync("user.json",JSON.stringify(user,null,2))
        resp.send("<h1>New User Is Registered</h1>")

    }
    catch(error){
        resp.status(500).send("there is a problem in your code")
    }

}export default User;