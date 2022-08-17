const nodemailer = require("nodemailer")

//step1

function nodeMail(email,) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'hai.warungku@gmail.com',
            pass: "yricxuevjzvsyxxm"
        }
    })

    //step2
    let mailOptions = {
        from: "hai.warungku@gmail.com",
        to: email,
        subject: 'Confirmation Email Success',
        text: "Welcome to the club!"
    }

    //step3
    transporter.sendMail(mailOptions)
        .then(data => console.log("email sent!"))
        .catch(err => console.log("error!"))
}

module.exports = { nodeMail }