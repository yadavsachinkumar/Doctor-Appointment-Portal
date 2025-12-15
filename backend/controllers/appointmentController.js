const doctors = require('../data/doctors');
let appointments = [];
exports.getDoctors = (req,res)=>res.json(doctors);
exports.createAppointment = (req,res)=>{
 const {patientName,doctorId,date,time}=req.body;
 if(!patientName||!doctorId||!date||!time)
  return res.status(400).json({message:'All fields required'});
 appointments.push({id:Date.now(),patientName,doctorId,date,time});
 res.json({message:'Appointment booked successfully'});
};
