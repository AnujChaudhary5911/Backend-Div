import fs from 'fs'

function borrow(memberId,bookId) {
    try {
        let arr=[];
        let ob={
            memberId,bookId
        }
        let data = JSON.parse(fs.readFileSync("member.json", "utf-8"));
        let member = data.find((value) => value.memberId == memberId);
        let type = member ? member.membershipType : "Member not found";
        
       
     let data1= JSON.parse(fs.readFileSync("book.json", "utf-8"));
        let book = data1.find((value) => value.bookId == bookId);
        let type1 = book ? book.price : "book not found";
       if(type=="gold"){
        let result =type1*15/100
        let final=Math.ceil(type1-result);
       arr.push(ob)
      arr.push("type  : "+type)
       arr.push("final price  : "+final)
       }
       if(type=="normal"){
        let result=type1*5/100
        let final=Math.ceil(type1-result)
       arr.push(ob)
       arr.push("type  : "+type)
       arr.push("final price  : "+final)
       }
       fs.writeFileSync("history.json",JSON.stringify(arr,null,2))
        

    } catch (error) {

        console.log("Error");
    }
}

export default borrow;