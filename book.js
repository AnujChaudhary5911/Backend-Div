import fs from 'fs';
function book( bookId, title, author, price ){
        let book=[];
        let ob={
            bookId,title,author,price
        }
    try{
        if(fs.existsSync("book.json","utf-8")){
          let data=JSON.parse(fs.readFileSync("book.json","utf-8"))
          let user=data.some((value)=> value.bookId==bookId);
          if(user){
            return "already exist"
          }

        }
        book.push(ob);
        fs.writeFileSync("book.json",JSON.stringify(book,null,2));
   console.log("book data is created")
    }
    catch(error){
        return error;
    }
} export default book;