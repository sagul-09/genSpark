import express from 'express'
import { 
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById,
    searchMovies,
    getDirectorAnalytics,
    filterMovies
} from '../controller/movieController.js'

const router = express.Router();

router.get('/', getAllMovies)
router.get('/get/:id', getMovieById)
router.post('/add', createMovie)
router.put('/update/:id', updateMovieById)
router.delete('/delete/:id', deleteMovieById)
router.get('/filter', filterMovies);
router.get('/search', searchMovies)
router.get('/analytics', getDirectorAnalytics)

export default router