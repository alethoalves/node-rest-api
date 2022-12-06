const {Router} = require('express')
const {TodosRepository} = require('../todos/repository')
const logger = require('../middlewares/logger')
const router = Router()
router.use(logger())

//*************
//API
//*************

const todosRepository = TodosRepository()
const notFound = {
    error:'Not found',
    message:'Resource not found',
}
//Criação de endpoints
//1 - endpoint de leitura
router.get('/list/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    const todo = await todosRepository.get(id)
    if(!todo){
        res.status(404).send(notFound)
        return
    }
    res.status(200).send(todo)
})
//2 - endpoint de inserção
router.post('/',async(req,res)=>{
    const todo = req.body
    const inserted = await todosRepository.insert(todo)
    res
        .status(201)
        .header('Location',`/todos/${inserted.id}`)
        .send(inserted)
})
//3 - atualização 
router.put('/:id',async (req,res)=>{
    const id = parseInt(req.params.id)
    const todo = {...req.body,id}
    const found = await todosRepository.get(id)
    if(!found){
        res.status(404).send(notFound)
        return
    }
    const updated = await todosRepository.update(todo)
    res.status(200).send(updated)
})
//4 - deleção 
router.delete('/:id',async (req,res)=>{
    const id = parseInt(req.params.id)
    const found = await todosRepository.get(id)
    if(!found){
        res.status(404).send(notFound)
        return
    }
    await todosRepository.del(id)
    res.status(204).send()
})
//5 - lista todos
router.get('/', async (req,res)=>{
    const todos = await todosRepository.list()
    res.status(200).send({todos})
})


module.exports = router