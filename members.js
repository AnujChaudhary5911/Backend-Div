import fs from 'fs';
function member(memberId, name, membershipType){
    try{
    let user=[];
    let ob={
        memberId,name,membershipType
    }
    if(fs.existsSync("member.json","utf-8")){
        let data=JSON.parse(fs.readFileSync("member.json","utf-8"))
        let isUser=data.some((value)=>value.memberId==memberId);
        if(isUser){
            return "member already exist"
        }
        else {
            user=data;
        }

    }
    user.push(ob);
    fs.writeFileSync("member.json",JSON.stringify(user,null,2));
    console.log("new member is add")
    }catch(error){
console.log("error");
}

}export default member;