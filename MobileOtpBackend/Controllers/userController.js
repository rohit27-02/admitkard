const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const { User } = require('../Models/userModel');
const { Otp } = require('../Models/otpModel');


const twilio = require('twilio');

const accountSid = 'AC312c29ca9251e3c26ccc88d1e1428c5a';
const authToken = 'e114c0ee75ade7e205a1a3dc4f0345b4';

const client = twilio(accountSid, authToken);







module.exports.signUp = async (req, res) => {
    const user = await User.findOne({
        number: req.body.number
    });
    if (user) return res.status(400).send("User already registered!");
    // Generate OTP
    const OTP = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });

    // Send OTP via Twilio
    const mobileNumber = req.body.number;
    const message = `Your OTP is: ${OTP}`;
    const otp = new Otp({ number: mobileNumber, otp: OTP });
    console.log(message)
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();

    client.messages
        .create({
            body: message,
            from: '+12512205003', // Your Twilio phone number
            to: mobileNumber // Recipient's mobile number
        })
        .then(message => {
            console.log(`OTP sent to ${mobileNumber} with message SID: ${message.sid}`);
            // Save the OTP and send a response to your client
            // ...
            return res.status(200).send("OTP sent successfully!");
        })
        .catch(error => {
            console.error(error);
            return res.status(400).send("Error sending OTP.");
        });

}
module.exports.verifyotp = async (req, res) => {

    const otpHolder = await Otp.find({
        number: req.body.number
    });
    if (otpHolder.length === 0) return res.status(400).json("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    //console.log(validUser,rightOtpFind,rightOtpFind.number)
    if (rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "User Registration Successfull!",
            token: token,
            data: result

        });
    } else {

        return res.status(400).json("Your otp is wrong")
    }


}