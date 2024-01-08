import config  from "config";
import nodemailer from 'nodemailer';

export class MailService {
    async sendMail(){
        const transporter = nodemailer.createTransport({

            host: 'smtp-mail.outlook.com',                  // hostname
            service: 'outlook',                             // service name
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'                            // tls version
            },
            port: 587,
            
            auth: {
                user: "admin@intraguard.co.uk",
                pass: "2015-Ag-5563"
            }
        });
        await transporter.sendMail({
            from: "admin@intraguard.co.uk", // sender address
            to: "msafyan46@gmail.com", // list of receivers
            subject: "ed", // Subject line
            html: "<button>asd</button>",
        })
    }
}