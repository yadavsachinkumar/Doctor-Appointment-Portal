const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appointmentController');
router.get('/doctors', ctrl.getDoctors);
router.post('/appointments', ctrl.createAppointment);
module.exports = router;
