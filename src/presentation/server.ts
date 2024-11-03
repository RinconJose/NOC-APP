import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static start() {
        
        console.log('Server started...');

        // Mandar email
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'rincon.jmg@gmail.com',
            subject: 'Logs de sistemas',
            htmlBody: `
                <h1>Logs de sistema - NOC</h1>
                <p>Proident dolore irure ea dolore cupidatat duis anim minim duis duis consequat voluptate. Adipisicing laboris id laborum commodo ad magna ex in tempor adipisicing. Anim tempor mollit Lorem magna fugiat aute proident ea anim culpa elit tempor labore. Amet nulla consequat quis quis non est irure Lorem commodo reprehenderit eiusmod. Aliquip irure esse quis laborum sint deserunt aliquip ut sint nostrud officia. Excepteur elit enim esse dolore ex in occaecat excepteur veniam consequat. Esse enim et tempor incididunt non reprehenderit.</p>
                <p>Ver logs adjuntos</p>
            `
        });

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error ),
                    
        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3123')

        //     }
        // );
    
    }

}

