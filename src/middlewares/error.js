const errorHandler = (log = console.error) => (error, req, res, next) => {
    log(error)
    res.status(500).send({message:error.message})
}

module.exports = errorHandler