const nodemailer = require("nodemailer");

const OTP = async(email, subject, html) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'quangnguyenngoc314@gmail.com',
        pass: 'brad mqcb dlvz edde',
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"GnauqNguyen Shop" <gnauq-nguyen-shop.onrender.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
}

module.exports = OTP;
