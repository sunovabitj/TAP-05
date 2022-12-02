const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const listRouter = require('./list.router');

router.use("/users", userRouter)
router.use("/lists", listRouter)


module.exports = router
