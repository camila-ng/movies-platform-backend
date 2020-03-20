class MoviesController{
    constructor(moviesService){
        this.moviesService = moviesService
    }
async getMovies(req,res){
    let page = req.query.page ? req.query.page : 1
   const movies = await this.moviesService.getMovies(page)
    
   return res.json(movies)

}
async postMovies(req,res){
    let body = req.body
    body.movieImage = req.file.filename
    const postMovies = await this.moviesService.postMovies(body)
    return res.json(postMovies)


}
async getMoviesById(req,res){
    const id = req.params.id
    const moviesId = await this.moviesService.getMoviesById(id)
    return res.json(moviesId)
}
}

module.exports = MoviesController
