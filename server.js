const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/enviar', (req, res) => {
   const { nome, email, mensagem, numero, assunto } = req.body;
   
   
   const dotenv = require('dotenv');
   dotenv.config();

  
   const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
   }
});
 

   const mailOptions = {
      from: 'biewwwalker@gmai.com',
      to: 'biewwwalker@gmai.com', // Destinatário 
      subject: `Nova Mensagem de ${nome}`,
      text: `E-mail: ${email}\nMensagem: ${mensagem}`
   };

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.error(error);
         res.status(500).send('Erro ao enviar a mensagem.');
      } else {
         console.log('Email enviado: ' + info.response);
         res.status(200).send('Mensagem enviada com sucesso!');
      }
   });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servidor iniciado na porta ${PORT}`);
});
