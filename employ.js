import fs from'fs'
export function Registor(req,resp){
     try{
       const { id, Name, Department, Salary, profilePic, gender, startDay, startMonth, startYear, notes,type } = req.body;
        let user=[];
        let newSalary= Salary * 0.12
        let BasicSalary=Salary-newSalary
       
        if(fs.existsSync("user.json")){
            const data=JSON.parse(fs.readFileSync("user.json","utf-8"))
            let Isuser=data.some((value)=>value.id==id)
            if(Isuser){
                return resp.send("user exist")
            }
            else{
              user=data;
            }
        }
         let ob={
            id, Name, Department, BasicSalary,Salary, profilePic, gender, startDay, startMonth, startYear, notes,type
            
        }
        user.push(ob)
        fs.writeFileSync("user.json",JSON.stringify(user,null,2))
        return resp.send("new employ registered")
        // resp.render('login')

    }
    catch(error){
        resp.status(500).send("there is a problem in your code")
    }

    
}
export function update(req,res){
     try {
           
    const {id, Name, Department, BasicSalary, profilePic, gender, startDay, startMonth, startYear, notes} = req.body;  
   
    if (!fs.existsSync("user.json")) {
      return res.status(404).send("No users found");
    }
    const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));
    const userIndex = users.findIndex(user => user.id == id);
    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }
   users[userIndex].Name = Name || users[userIndex].Name;
    users[userIndex].Department = Department || users[userIndex].Department;
    users[userIndex].BasicSalary = BasicSalary || users[userIndex].BasicSalary;
    users[userIndex].gender = gender || users[userIndex].gender;
    users[userIndex].profilePic = profilePic || users[userIndex].profilePic;
    users[userIndex].notes = notes || users[userIndex].notes;
    users[userIndex].startDay = startDay || users[userIndex].startDay;
    users[userIndex].startMonth = startMonth || users[userIndex].startMonth;
    users[userIndex].notes = startYear || users[userIndex].startYear;
    fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

   return res.render('home')

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}
export function delete1(req,resp){
      try{
        const {id}=req.body
        if(!fs.existsSync("user.json")){
         res.send("there is no data")   
        }
        if(fs.existsSync("user.json",)){
            const data=JSON.parse(fs.readFileSync("user.json","utf-8"))
            let isUSer=data.filter(val=> val.id!=id)
            fs.writeFileSync("user.json",JSON.stringify(isUSer,null,2))
            resp.send("your person was delete")
        }
         
    }catch(error) {
            console.log(error)
           
}

}
export function loginExist(req,resp){
    try{
        const {id,Name}=req.body;
        if(fs.existsSync("user.json")){
            const data=JSON.parse(fs.readFileSync("user.json","utf-8"))
            let Isuser=data.some((value)=>value.id==id&&value.Name==Name)
            if(Isuser){
                return resp.render('home')
            }
            else{
              resp.send("user is not registered")
            }
        }
       
    }
    catch(error){
        resp.status(500).send("there is a problem in your code")
    }
}
export function findU(req,resp){
    try{
        const{id}=req.body
        if(!fs.existsSync("user.json")){
            resp.send("Employ not find")
        }
        const user=JSON.parse(fs.readFileSync("user.json","utf-8"))
        let index=user.findIndex(val=> val.id==id)
        if(index===-1){
           return resp.send("user not found")
        }
    //     <h1> name <%=Name%></h1>
    // <h1> Department is <%=Department%></h1>
    // <h1> BasicSalary is<%=BasicSalary%></h1>
    // <h1> gende is <%=gender%></h1>
    // <h1> startYear is<%=startYear%></h1>
    
        let a=user[index].BasicSalary
        let b=user[index].Department
        let c=user[index].Name
        let d=user[index].gender
        let e=user[index].startYear
       return resp.render('find',{Name:c,Department:b,BasicSalary:a,gender:d,startYear:e})
        

    }
    catch(error){
        console.log(error);
    }
}
