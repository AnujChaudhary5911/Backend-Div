import fs from 'fs'
function booking(req,resp){
    try{
        let arr=[]
        const { userId, movieId}=req.body
        let ob={
            userId, movieId
        }
        let data=JSON.parse(fs.readFileSync("user.json","utf-8"))
        let user=data.some((value)=> value.userId==userId)
        let type = user ? user.userType : "Member not found";
       

        let data1=JSON.parse(fs.readFileSync("movie.json","utf-8"))
        let user1=data1.some((value)=> value.movieId==movieId)
        let type1 = user1 ? user1.ticketPrice: "movie data is not found";
      if(type=="VIP user"){
              let result =type1*12/100
              let final=Math.ceil(type1-result);
             arr.push(ob)
            arr.push("type  : "+type)
             arr.push("final price  : "+final)
             }
             if(type=="Standard user"){
              let result=type1*5/100
              let final=Math.ceil(type1-result)
             arr.push(ob)
             arr.push("type  : "+type)
             arr.push("final price  : "+final)
             }
             fs.writeFileSync("MovieHist.json",JSON.stringify(arr,null,2))
             resp.status(401).send("your history is created")

    }catch(error){
        resp.status(500).send('there are some error in your booking')
    }

}export default booking