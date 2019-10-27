const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pieterse96@gmail.com',
        subject: 'Lets get you started',
        text: `thanks for using Task-Manager, ${name}. I hope using our app will get you what you wanted.`
    })
}

const sendLeaveEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pieterse96@gmail.com',
        subject: 'we are sorry to see you go',
        text: `thanks for your time with us, ${name}. I would love to hear why you decided to leave.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendLeaveEmail
}