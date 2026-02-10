import fs from 'fs'

function find(req, resp) {
    try {
        const { userId } = req.body;

        if (!fs.existsSync("user.json")) {
          
            return resp.send("<h1>No user data is here</h1>");
        }

        let data = JSON.parse(fs.readFileSync("user.json", "utf-8"));
        let IS = data.findIndex(val => val.userId == userId);

       
        if (IS === -1) {
            return resp.status(400).send("user is not found");
        }
        let foundUser = data[IS];
        return resp.render('find', { name: foundUser.name });

    } catch (error) {
        console.error(error);
        resp.status(500).send("there is some error in your code");
    }
}

export default find;