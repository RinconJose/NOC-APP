import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SenMailOptions {
    to          :string | string[];
    subject     :string;
    htmlBody    :string;
    attachments?:Attachment[];
}

interface Attachment {
    filename:string;
    path    : string
}

// TODO: Implementar attachments


export class EmailService {

    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    constructor(
        // private readonly logRepository:LogRepository
    ) {}

    async sendEmail(options:SenMailOptions):Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments,
            });

            // const log = new LogEntity({
            //     level: LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin: 'email.service.ts',
            // })
            // this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            // const log = new LogEntity({
            //     level: LogSeverityLevel.high,
            //     message: 'Email was not sent',
            //     origin: 'email.service.ts',
            // })
            // this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to:string | string[] ) {
        const subject = 'Logs de sistemas';
        const htmlBody = `
            <h1>Logs de sistema - NOC</h1>
            <p>Proident dolore irure ea dolore cupidatat duis anim minim duis duis consequat voluptate. Adipisicing laboris id laborum commodo ad magna ex in tempor adipisicing. Anim tempor mollit Lorem magna fugiat aute proident ea anim culpa elit tempor labore. Amet nulla consequat quis quis non est irure Lorem commodo reprehenderit eiusmod. Aliquip irure esse quis laborum sint deserunt aliquip ut sint nostrud officia. Excepteur elit enim esse dolore ex in occaecat excepteur veniam consequat. Esse enim et tempor incididunt non reprehenderit.</p>
            <p>Ver logs adjuntos</p>
        `;
        const attachments:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            attachments,
            htmlBody,
            subject,
            to,
        })
    }


}


