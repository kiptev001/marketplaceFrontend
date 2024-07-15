const nodemailer = require('nodemailer');

class MailService {
  constructor(){
    //@ts-ignore
    this.transporter = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      secure:false,
      auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    });
  }
  async sendActivationMail( to:string, link:string ){
    const fullLink = `http://localhost:3000/api/activation/${link}`;
    //@ts-ignore
    this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Account activation letter',
      text: '',
      html: 
            `
                <div>
                    <h1>Click link below to activate your account</h1>
                    <a href=${fullLink}>${fullLink}</a>
                </div>
            `
    });
  }

}

const service = new MailService();

export default service;
