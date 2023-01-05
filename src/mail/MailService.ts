import { createTransport, Transporter } from "nodemailer";
import { config } from "../config";

class MailService {
    private transporter: Transporter;
    constructor() {
        this.transporter = createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(email: string, link: string) {
        await this.transporter.sendMail({
            from: '"Internship" <from@example.com>',
            to: email,
            subject: "Account activation " + config.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Click to activate</h1>
                        <a href="${config.API_ACTIVATE_URL + link}">${config.API_ACTIVATE_URL + link}</a>
                    </div>
                `
        });
    }
}

export default new MailService();