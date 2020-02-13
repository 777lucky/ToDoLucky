function succes(res, data, statusCode){
    return res.status(statusCode).json({
        status: true,
        data
    })
}

function error(res, err, statusCode){
    return res.status(statusCode).json({
        status: false,
        errors: err
    })
}

module.exports = {
    succes,
    error
}