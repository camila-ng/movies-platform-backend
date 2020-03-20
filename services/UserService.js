const User = require('../models/User')

class UserService {
    constructor() {
        this.limit = 4
    }

    getUsers(page) {
        let skip = (page - 1) * this.limit
        const users = User.find().skip(skip).limit(this.limit).exec()
        return users
    }

    postUsers(body) {
        const usersBody = new User(body)
        return usersBody.save()
    }

    getUsersById(id) {
        const userId = User.findOne({ _id: id }).exec()
        return userId
    }

    getUserByName(user) {
        const userName = User.findOne({ user: user }).exec()
        return userName

    }

}


module.exports = UserService