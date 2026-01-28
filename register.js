import { error } from 'console';
import fs from 'fs';

 function register(name,email,password){
    try{
        let user=[];
        let ob={
            name,email,password,todo:[]
        }
        if(fs.existsSync("todo.json")){
            let data=JSON.parse(fs.readFileSync("todo.json","utf-8"));
            let isuser=data.some((value)=>value.name===name);
            if(isuser){
                return "user exist"
            }
            

        }
        user.push(ob);
        fs.writeFileSync("todo.json",JSON.stringify(user,null,2))
        console.log("your data created");

    }catch(error){
        console.log("error");
    }
    

}export default register;