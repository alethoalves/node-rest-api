const {Router} = require('express')
const withAsyncErrorHandler = require('../middlewares/async-error')
const router = Router()
// CRUD
// Create: endpoint que faz a criação de um usuário
// POST /users {...user}

// Read: endpoint que faz a leitura de usuário | endpoint que lista usuários
// GET /users {users:[...users]}
// GET /users/:id {...user}

// Update: endpoint que faz a atualização de dados do usuário
// PUT /users/:id {...updatableUser}

// Delete: endpoint que remove um usuário
// DELETE /user/:id ''
const createUser = async (req,res)=>{
    res
        .status(201)
        .header('Location',`/users/???`)
        .send({})
}
router.post('/users',withAsyncErrorHandler(createUser))

router.get('/',withAsyncErrorHandler(async (req,res)=>{
    res.status(200).send({users:[]})
})
)

router.get('/:id',withAsyncErrorHandler( async (req,res)=>{
    res.status(200).send({})
}))

router.put('/:id',withAsyncErrorHandler( async (req,res)=>{
    res.status(200).send({})
}))

router.delete('/:id', async (req,res)=>{
    res.status(204).send()
})

module.exports = router