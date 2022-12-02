const res_error = (res, code, status, message) => {
    return res.status(code).json({
        status,
        message
    })
}

const res_success = (res, code, status, message, data) => {
    return res.status(code).json({
        status,
        data,
        message
    })
}

module.exports = {res_error, res_success};
