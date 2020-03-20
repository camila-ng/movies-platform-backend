const Movie = require ('../models/Movie')

class MoviesService{
    constructor(){
        this.limit = 4
    }

    getMovies(page){
        let skip = (page - 1) * this.limit
        const movie = Movie.find().skip(skip).limit(this.limit).exec()

    return movie
}

    postMovies(body){
        const moviesBody = new Movie(body)
        return moviesBody.save()
    }
    getMoviesById(id){
        const moviesId = Movie.findOne({ _id : id}).exec()
        return moviesId
    }
}

module.exports = MoviesService