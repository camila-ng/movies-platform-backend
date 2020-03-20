const bcrypt = require('bcrypt-nodejs')

class UserController{
constructor(userService){
    this.userService = userService
}
async getUsers(req,res){
    let page = req.query.page ? req.query.page : 1
    const users = await this.userService.getUsers(page)
    return res.json(users)

}
async postUsers(req,res){
    const body = req.body

    const newBody = {
        ...body, password : bcrypt.hashSync(body.password)
    }

    if(body){   
    const postUsers = await this.userService.postUsers(newBody)

    return res.sendStatus(200)
    
} else {
    return res.sendStatus(400)
     }
    }

    async getUsersById(req,res){
        const id = req.params.id
        const getId = await this.userService.getUsersById(id)
        return res.json(getId)
    }
    
}

module.exports = UserController