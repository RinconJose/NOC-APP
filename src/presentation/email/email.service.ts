import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SenMailOptions {
    to:string;
    subject:string;
    htmlBody:string;
    //todo: attachment;
}

// TODO: Implementar attachments


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    async sendEmail(options:SenMailOptions):Promise<boolean> {
        
        const { to, subject, htmlBody } = options;
        
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            });
            console.log(sentInformation);
            
            return true;
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }


}


