import axios from "axios";
let apiKey = process.env.SENDINBLUEKEY;

class sendMail {
  subject: string = "";
  htmlContent: string = "";
  sendSmtpEmail: {
    sender: {
      name: string,
      email: string
    }
  } = {
      sender: {
        name: "IST HUB",
        email: "ist-hub@gmail.com",
      }
    };
  to = [{ email: "", name: "" }];
  params = { subject: "" }
  headers = { "Some-Custom-Name": "unique-id-1234" };
  constructor(to: string, subject: string, text: string) {
    this.subject = subject;
    this.htmlContent = text;
    this.to = [{ email: to, name: "..." }];

    this.params = {
      subject: subject,
    };
  }
  send = async (): Promise<{ success: boolean }> => {
    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          'sender': {
            'name': 'IST HUB',
            'email': 'isthub@ist.edu.bd'
          },
          'to': this.to,
          'subject': this.subject,
          'htmlContent': this.htmlContent
        },
        {
          headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json'
          }
        }
      );
      return { success: true }
    } catch (err) {

    }
    return { success: false }
  };
}

export default sendMail