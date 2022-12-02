const express = require("express");
const router = express.Router();

const {
  getAllList, 
  getListById, 
  postList, 
  updateListById, 
  deleteListById, 
  deleteAllList, 
  checkJWT
} = require("../controllers/list.controller");

router.use(checkJWT);

router.get('/', getAllList);
router.get('/:id', getListById);
router.post("/", postList);
router.put('/:id', updateListById);
router.delete('/:id', deleteListById);
router.delete('/', deleteAllList);

module.exports = router;
