const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

router.post('/login', async (req, res) => {
    const body = req.body
    const email = body.username
    const password = body.password

    try {
        // UserModel.findOne({ email: username, password: password }, (err, val) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         if (val) {
        //             res.status(200).json(val)
        //         } else {
        //             res.status(401).json("unauthorized")
        //         }
        //     }
        // });
        UserModel.findOne({ email: email, password: password })
            .then(val => {
                if (val) {
                    res.status(200).json(val)
                } else {
                    res.status(401).json("unauthorized")
                }
            })
            .catch(err => {
                console.log(err);
            })
        // const id = "64420e5cf220800dec25f832"
        // console.log(email);
        // await UserModel.findOne({email:email})
        // .then(res=>{
        //     console.log("  ss ",res);
        // })
        // .catch(err=>console.log(err))

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router