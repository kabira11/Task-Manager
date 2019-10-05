const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email , name) => {
    sgMail.send({
        to: email,
        from: 'pankajbhj@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelationEmail = (email , name) => {
    sgMail.send({
        to: email,
        from: 'pankajbhj@gmail.com',
        subject: 'Sorry to see you go!!!',
        text: `GoodBye, ${name}.I hope to see you back sometimes soon.`
    })
}

//exporting an object coz we are gonna multiple object
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

