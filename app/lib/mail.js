import nodemailer from 'nodemailer'

export async function SendMail (to, subject, body){
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD
    }
  })

  try{
    const testResult = await transport.verify()
    console.log("successful")
  } catch(e) {
    console.log(e)
  }
}