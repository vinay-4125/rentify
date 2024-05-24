import nodemailer from "nodemailer";

export const sendEmail = async (req,res) => {
try{
  const {Pid,email,name} = req.body
  const transporter = nodemailer.createTransport({  
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.MYPASS,
    },
  });

  const mailOptions = {
    from: {name:name,address:process.env.MYEMAIL},
    to: email,
    subject: "Payment Receipt",
    text: `Attached is your ${name} Donation payment receipt.`,
    attachments: [
      {
        filename: `${name}${Pid}.pdf`,
        path: `./ReceiptPDF/${name}${Pid}.pdf`,
        contentType: "application/pdf",  
      },
    ],
  };

  transporter.sendMail(mailOptions);
  res.status(200).json({
    success: true,
    message: "PDF receipt sent successfully",
  });
} catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
};
}
