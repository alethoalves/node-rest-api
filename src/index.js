const express = require('express')
const {TodosRepository} = require('./todos/repository')
const { wait } = require('./utils')

const app = express()
app.use(express.json())

app.get('/hello',(req,res)=>{
    res.status(200).send(`Hello world!`)
})
app.get('/hello/:name',(req,res)=>{
    const name = req.params.name
    res.status(200).send(`Hello, ${name}!`)
})
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
app.get('/todos/list/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    const todo = await todosRepository.get(id)
    if(!todo){
        res.status(404).send(notFound)
        return
    }
    res.status(200).send(todo)
})
//2 - endpoint de inserção
app.post('/todos',async(req,res)=>{
    const todo = req.body
    const inserted = await todosRepository.insert(todo)
    res
        .status(201)
        .header('Location',`/todos/${inserted.id}`)
        .send(inserted)
})
//3 - atualização 
app.put('/todos/:id',async (req,res)=>{
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
app.delete('/todos/:id',async (req,res)=>{
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
app.get('/todos', async (req,res)=>{
    const todos = await todosRepository.list()
    res.status(200).send({todos})
})


app
    .listen(8080,'0.0.0.0',()=>{
        console.log('server started')
    })
    .once('error',(error)=>{
        console.error
        process.exit(1)
    })


