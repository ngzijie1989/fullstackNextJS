import NodeMailer from 'nodemailer'

export async function SendMail (to, subject, body){
  const { NEXT_PUBLIC_SMTP_EMAIL, NEXT_PUBLIC_SMTP_PASSWORD } = process.env

  const transport = await NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: NEXT_PUBLIC_SMTP_EMAIL,
      pass: NEXT_PUBLIC_SMTP_PASSWORD
    }
  })

  try{
    const testResult = await transport.verify()
    console.log("successful")
    const sendResults = await transport.sendMail(
      {
        from: NEXT_PUBLIC_SMTP_EMAIL,
        to: to,
        subject: subject,
        html: body
      }
    )

  } catch(e) {
    console.log(e)
  }
}