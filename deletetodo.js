import fs from 'fs';
function create1(name,task,status){
    try{
        let ob={
            createtime:new Date(),
            task,status:false

        }
        if(fs.existsSync("todo.json")){
            let data=JSON.parse(fs.readFileSync("todo.json","utf-8"));
            for(let i=0;i<data.length;i++){
                if(data[i].name===name){
                    data[i].todo.pop()
                }
            }
            fs.writeFileSync("todo.json",JSON.stringify(data,null,2));
            return "yes data add";
        }
    }catch(error){
        console.log("error");
    }
}export default create1;