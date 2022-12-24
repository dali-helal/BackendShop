const express =require("express")

const router=express.Router()
router.use(express.json())
const watchControllers=require('../Controllers/watchController.js')

//GET all watch

router.get('/',watchControllers.GetAllWatch)

router.post('/getProducts',watchControllers.GetAllWatchFilter)


router.get('/FeaturedProducts',watchControllers.GetFeaturedProducts)
//Get a signle watch
router.get('/:id',watchControllers.GetWatch)

//Post a new watch 
router.post('/',watchControllers.createWatch)

//Update a Watch
router.patch('/:id',watchControllers.updateWatch)

module.exports=router