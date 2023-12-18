const express = require('express')
const router = express.Router()
const CardModel = require('../model/card')
const PhoneModel = require('../model/phone')
const client = require('../client')

const accountSid = "AC30ec4d51ddff3b1cef3285b11b648ba0"
const authToken = "200b5b4c4f7e06400a49efb6d0fd244b"

const clients = require('twilio')(accountSid, authToken);

router.post('/payment/card', (req, res) => {

    const body = req.body
    console.log(body.card);
    try {
        CardModel.find({card: body.card }, (err, val) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
                console.log("val",val);
                console.log(req.body.total + " paid")
                res.status(200).json({ validated: true })
                // clients.messages
                // .create({
                //     body: `Verification by Train Booking , Payment Successful`,
                //     from: "+15674853988",
                //     to: `+917892213141`
                // })
                // .then(async (message) => {
                //     res.status(200).json({ validated: true })
                //     console.log("message sent");
                // })
                // .catch(err => {
                //     console.log(err);
                //     res.status(304).send("Server Error in seneding otp");
                // });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});

router.post('/payment/phone', (req, res) => {

    const body = req.body
  
    try {
        PhoneModel.find({ phone: body.phone}, (err, val) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
                console.log(req.body.total + " paid")
                res.status(200).json({ validated: true })
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router