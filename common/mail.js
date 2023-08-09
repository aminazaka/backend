const nodemailer = require("nodemailer")
//const hbs = require("nodemailer-express-handlebars")
//const mapping = require("./email-templates/mapping")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS
    },
    logger : true
});
const SendEmail = async (data, format) => {
 
    template = mapping.formats[format]
    await transporter.use('compile', hbs(mapping.layout_settings));
    const info = await transporter.sendMail({
        headers:{
            'Content-type': 'text/html; charset=iso-8859-1'
        },
        from: '"Demo Project" <test@demo.com>',
        to: data['to'],
        subject: template['subject'],
        template: template['html'],
        context: {
            username : "asfd"
        },
    });

    return "Message sent: %s", info.messageId
}
module.exports = SendEmail