import fs from 'fs'
function movie(req,resp){
    try{
        const {movieId, name, ticketPrice}=req.body
        let user=[]
        if(fs.existsSync("movie.json","utf-8")){
            const data=fs.readFileSync("movie.json","utf-8")
            let mov=JSON.parse(data)
            let isUser=mov.some((value)=> value.movieId==movieId)
            if(isUser){
                return resp.status(400).send("Movie already exist")
            }

        }
        let ob={
            movieId, name, ticketPrice
        }
        user.push(ob)
        fs.writeFileSync("movie.json",JSON.stringify(user,null,2))
        resp.status(201).send('new Movie data is created')

    }
    catch(error){
        resp.status(500).send("there are some error in your movie registration")
    }
}export default movie