const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const { text } = require("express");
const bcrypt = require("bcrypt");


//@desc get all user
//@route GET /user/all
//@access public
const getUsers = asyncHandler(async (req,res) => {
    const text = "SELECT * FROM users ORDER BY id ASC";
    const {rows} = await db.query(text);
    if(!rows.length){
        return res.status(200).json({message:'There is no user in database!'})
    }
    return res.status(200).json(rows);
});

//@desc get user by id
//@route GET /user/:id
//@access public
const getUser =  asyncHandler(async (req,res) => {
    const {id} = req.params;
    const text = "select * from users where id = $1";
    const values = [id];
    const {rows} = await db.query(text,values);
    if(!rows.length){
        res.status(404);
        throw new Error(`User Not Found with id: ${id} in your database!`);
    }
    return res.status(200).json(rows);
});

//@desc Add user
//@route post /user/add
//@access public
const createUser = asyncHandler(async (req,res) => {
    const {email,password,username} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    
    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    const createdDate = new Date().toLocaleString('en-GB', {hour12: false,});
    const text = "insert into users (email,password,username,createddate,updatedDate) values ($1,$2,$3,$4,$5) returning *";
    const values = [email,hashedPassword,username,createdDate,createdDate];
    const {rows} = await db.query(text,values);
    return res.status(201).json({"_id":rows[0].id,"email":rows[0].email,"username":rows[0].username});    
});

//@desc update user by id
//@route PUT /user/:id
//@access public
const updateUser = asyncHandler(async (req,res) => {

    const {id} = req.params;        
    const updatedDate = new Date().toLocaleString('en-GB', {hour12: false,});
    const text = "update users set email = $1, username = $2, updatedDate = $3 where id = $4 RETURNING *";
    const values = [req.body.email,req.body.username,updatedDate,id];
    const {rows} = await db.query(text,values);
    if(!rows.length){
        res.status(404);
        throw new Error(`User Not Found with id: ${id} in your database!`);
    }
    console.log(rows);
    return res.status(200).json({updatedUser:rows[0]});
});

//@desc delete user by id
//@route DELETE /user/:id
//@access public
const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const text = "delete from users where id = $1 returning *";
    const values = [id];
    const {rows} = await db.query(text,values);
    if(!rows.length){
        res.status(404);
        throw new Error(`User Not Found with id: ${id} in your database!`);
    }
    console.log(rows);
    return res.status(200).json({deletedUser:rows[0]});
});
module.exports = {getUsers,getUser,createUser,updateUser,deleteUser}