const express = require('express')
const router = express.Router()
const routeModel = require('../model/route')
const trainModel = require('../model/train')
const classModel = require('../model/classes')
const scheduleModel = require('../model/schedule')
const reservationModel = require('../model/reservation')
const client = require('../client')

const accountSid = "AC13293c9143ac243e5a173aff908c805d"
const authToken = "a369d6bcf58a002e47e99d0b58411072"

const clients = require('twilio')(accountSid, authToken);

router.get('/railway/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({ '_id': req.params.id })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains', async (req, res) => {
    try {
        const result = await trainModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains/:route', async (req, res) => {
    try {
        const route = await routeModel.findOne({ '_id': req.params.route })
        const result = await trainModel.find({ route: route.name })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/classes', async (req, res) => {
    try {
        const result = await classModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/schedules', async (req, res) => {
    try {
        const result = await scheduleModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/railway/reservations', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body
        var reservation = new reservationModel(body)
        var result = await reservation.save()
      
            clients.messages
                .create({
                    body: `Verification by Train Booking ,
                    Refernce Id - ${body.user}
                    From - ${body.from}
                    To - ${body.to}
                    Train - ${body.train}
                    Class - ${body.trainClass} 
                    Time - ${body.time}
                    Passengers - ${body.qty}
                    Date - ${body.date}
                    Paid - ${body.amount}`,
                    from: "+13613457860",
                    to: `+917892213141`
                })
                .then(async (message) => {
                    console.log("message sent");
                })
                .catch(err => {
                    res.status(304).send("Server Error ");
                });
        
        //  if (body.phone) {
        //    console.log(body.phone);
        //   client.sendTextMessage({ ...body, reservationID: result._id })
        // if (body.card) {
        //   console.log(body.card);
        //    const html = '<h2><u>Reservation Slip</u></h2><p>Reference No : <b> ' + result._id + ' </b><br><br>From <b> ' + body.from + ' </b> to <b> ' + body.to + ' </b><br>' + 'Date :<b> ' + body.date + ' </b> Time :<b> ' + body.time + ' </b><br>Train : <b>' + body.train + ' </b> Class: <b> ' + body.trainClass + ' </b><br>Quantity : <b> ' + body.qty + ' </b></p><p>Total : <b> ' + body.total + ' LKR</b></p> '
        //    client.sendEmail({ ...body, html: html, subject: 'Railway e-Ticket' })
        //  }
        res.status(200).json(result);
        }
    catch (err) {
       res.status(500).json(err);
    }
});

router.get('/railway/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations/:user', async (req, res) => {
    try {
        const result = await reservationModel.find({ user: req.params.user })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/railway/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.deleteOne({ _id: req.params.id }).exec()
        console.log("result", result);
         res.status(200).json(result)
    } catch (err) {
         res.status(500).json(err)
    }
});

module.exports = router