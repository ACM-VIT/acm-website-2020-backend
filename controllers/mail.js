const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const landing = (req, res) => {
  res.send('Welcome to the backend!');
};

const sendMail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Email markup
  const emailMarkup = ` <div
      style="
        color: black;
        display: block;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 19px;
        font-weight: normal;
        line-height: 1.7;
        margin: 0 auto;
        max-width: 600px;
        padding-bottom: 0;
        background-color: #0085b9;
        color: #ffffff;
        padding: 0px;
        padding-top: 0;
        border-radius: 5px;
      "
    >
      <div
        align="center"
        style="
          box-sizing: border-box;
          color: black;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 19px;
          font-weight: normal;
          line-height: 1.7;
          margin: 0;
          padding: 0;
          background-size: auto 100%;
          display: block;
          text-align: center;
        "
      >
        <img
          src="https://i.imgur.com/4rBl4fq.png"
          style="width: 20rem; margin: 0 auto;"
        />
      </div>
      <div>
        <div
          style="
            box-sizing: border-box;
            color: #2c2c2c;
            font-size: 17px;
            line-height: 1.7;
            margin: 0 auto;
            padding: 20px 0;
            vertical-align: top;
            line-height: 24px;
            background-color: #fafbfb;
            padding: 20px;
            border-radius: 10px;
            margin: 1vw;
            text-align: center;
            margin-top: 0;
          "
        >
          <div style="text-align: justify;">
            <h3 style="text-align: center;">
              You have received a new message from a visitor!
            </h3>
            <div
              style="
                display: flex;
                justify-content: flex-start;
                margin-top: 2rem;
                color: black;
              "
            >
              <span style="font-weight: bold; padding-right: 1rem;">From:</span>
              <span>${req.body.name}</span>
            </div>
            <div
              style="display: flex; justify-content: flex-start; color: black;"
            >
              <span style="font-weight: bold; padding-right: 1rem;">
                Email:
              </span>
              <span>${req.body.email}</span>
            </div>
            <div
              style="display: flex; justify-content: flex-start; color: black;"
            >
              <span style="font-weight: bold; padding-right: 1rem;">
                Message:
              </span>
              <span>${req.body.message}</span>
            </div>
          </div>
        </div>
        <div
          align="center"
          style="
            box-sizing: border-box;
            color: black;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 19px;
            font-weight: normal;
            line-height: 1.7;
            margin: 0;
            padding: 0;
            background-size: auto 100%;
          "
        >
          <a
            href="https://www.facebook.com/ACM.VITU/"
            target="_blank"
            style="display: inline-block;"
          >
            <img
              style="height: 24px; vertical-align: sub;"
              src="https://materialdesignicons.com/api/download/95CC9E46-A553-42B3-B44E-2E88DB13C1E1/FFFFFF/1/FFFFFF/0/36"
            />
          </a>
          <a
            href="https://www.instagram.com/acmvit"
            target="_blank"
            style="display: inline-block; margin: 0 30px;"
          >
            <img
              style="height: 24px; vertical-align: sub;"
              src="https://materialdesignicons.com/api/download/2AA07220-461B-4070-AA95-17DEFE501444/FFFFFF/1/FFFFFF/0/36"
            />
          </a>
          <a
            href="https://twitter.com/acm_vit"
            target="_blank"
            style="display: inline-block;"
          >
            <img
              style="height: 24px; vertical-align: sub;"
              src="https://materialdesignicons.com/api/download/A95F7C7C-DE85-4564-BA65-DEDCF3BE105A/FFFFFF/1/FFFFFF/0/36"
            />
          </a>
        </div>
      </div>
    </div>`;

  // Transporter for the mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Mail info to be sent
  const info = await transporter.sendMail({
    from: `"Mailman" <${process.env.EMAIL}>`,
    to: 'shreyaskhn@gmail.com',
    subject: 'Message from a visitor', // Subject line
    text: 'Message received from a visitor of the website.', // Plain text body
    html: emailMarkup, // Html body
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return res.json({
    success: true,
    message: 'Message sent. Please wait for us to get back to you!',
  });
};

module.exports = { landing, sendMail };
