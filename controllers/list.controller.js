const UserList = require('../models/user.model');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const {res_error, res_success} = require('../validate')
env.config();
let auth = null;
let token = null;
let user = null;
let _idUser = null

module.exports = {
    checkJWT: (req, res, next) => {
        try {
            auth = req.headers.authorization;
            token = auth.split(" ")[1];
            user = jwt.verify(token, process.env.CODE_JWT);
            _idUser = user._id;
            if(!user) res_error(res, 403, "403 Forbidden", "You haven't been authenticated and authorized")
            next()
        } catch (error) {
            if(error) res_error(res, 500, "500 Internal Server Error", "There is an error from the server side")
        }
    },
  
    getAllList: async (req, res) => {
        try {
            UserList.find({"_id":_idUser}, (err, result) => {
                if(err) res_error(res, 400, "400 Bad Request", "You can't retrieve all data due to an error from the client side")
    
                return res_success(res, 200, "200 OK", "You retrieve all data", result[0].list)
            })
        } catch (error) {
            if(error) res_error(res, 500, "500 Internal Server Error", "You can't retrieve all data due to an error from the server side")
        }
    },
  
    getListById: async (req, res) => {
        const _idList = req.params.id;
        try {
            const _idUser = user._id;
            
            await UserList.find({"_id":_idUser}, {"list":{$elemMatch:{_id:_idList}}})
            .then((data) => {
                return res_success(res, 200, "200 OK", "You retrieve data by ID", data[0].list[0])
            })
            .catch(() => {
                return res_error(res, 400, "400 Bad Request", "You can't retrieve data by ID due to an error from the client side")
            })
        } catch (err) {
            if(err) res_error(res, 500, "500 Internal Server Error", "You can't retrieve data by ID due to an error from the server side")
        }
    },
  
    postList: async (req, res) => {
        try {
            const {title, content} = req.body;
            const subList = {
                title, content
            }
            UserList.updateOne({"_id":_idUser}, {$push:{"list":subList}}, (err,result) => {
                if(err) res_error(res, 400, "400 Bad Request", "You can't store data due to an error from the client side")
    
                return res_success(res, 201, "201 Created", "You store data", subList)
            })
    
        } catch (error) {
            if(error){
                return res_error(res, 500, "500 Internal Server Error", "You can't store data due to an error from the server side")
            }
        }
    },
  
    updateListById: async (req, res) => {
        try {
            const {title, content} = req.body;
            const _idList = req.params.id;
    
            UserList.updateOne({"_id":_idUser, "list._id":_idList}, {$set:{"list.$.title":title, "list.$.content":content}}, (err, result) => {
                if(err) res_error(res, 400, "400 Bad Request", "You can't update data due to an error from the client side")
    
                return res_success(res, 200, "200 OK", "You update data by ID", {title, content})
            })
        } catch (error) {
            if(error) res_error(res, 500, "500 Internal Server Error", "You can't update data due to an error from the server side")
        }
    },

    deleteListById: async (req, res) => {
        try {
            const _idList = req.params.id;
    
            UserList.updateOne({"_id":_idUser}, {$pull:{"list":{"_id":_idList}}}, (err, result) => {
                if(err) res_error(res, 400, "400 Bad Request", "You can't delete data by ID due to an error from the client side")
    
                return res_success(res, 200, "200 OK", "You delete data by ID")
            })
        } catch (error) {
            if(error) res_error(res, 500, "500 Internal Server Error", "You can't delete data by ID due to an error from the server side") 
        }
    },

    deleteAllList: async (req, res) => {
        try {
            UserList.updateOne({"_id":_idUser}, {$set:{"list": []}}, (err, result) => {
                if(err) res_error(res, 400, "400 Bad Request", "You can't delete all data due to an error from the client side")
    
                return res_success(res, 200, "200 OK", "You delete all data")
            })
        } catch (error) {
            if(error) res_error(res, 500, "500 Internal Server Error", "You can't delete all data due to an error from the server side")
        }
    },
  }