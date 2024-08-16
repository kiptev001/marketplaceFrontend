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
    const fullLink = `${process.env.API_URL}/activation/${link}`;
    //@ts-ignore
    this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Account activation letter',
      text: '',
      html: 
            `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подтверждение регистрации</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #333333;
        }
        .content {
            text-align: center;
            padding: 20px 0;
        }
        .content p {
            font-size: 16px;
            margin: 0 0 20px;
            line-height: 1.5;
        }
        .content a {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #777777;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .header h1 {
                font-size: 20px;
            }
            .content p {
                font-size: 14px;
            }
            .content a {
                font-size: 14px;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Подтверждение регистрации</h1>
        </div>
        <div class="content">
            <p>Вы получили это письмо потому что зарегистрировались на сайте www&#46;thaisell&#46;net.</p>
            <p>Нажмите на кнопку ниже чтобы подтвердить регистрацию.</p>
            <a href="${fullLink}" target="_blank">Подтвердить</a>
        </div>
        <div class="footer">
            <p>Если вы не регистрировались,- просто проигнорируйте это письмо.</p>
        </div>
    </div>
</body>
</html>

            `
    });
  }

}

const service = new MailService();

export default service;
