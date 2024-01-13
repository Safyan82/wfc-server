import config  from "config";
import mail from "@sendgrid/mail";

export class MailService {
    async sendMail(email, employeeId){
        const username = "Safyan";
        mail.setApiKey("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");
        const msg = {
        to: email, // Change to your recipient
        from: 'safyan@intraguard.co.uk', // Change to your verified sender
        subject: 'Workforce city invited you to join',
        html: `<style>
        a{
            text-decoration: none !important;
        }
    </style>
    <div style=" background-color: rgb(245, 248, 250); padding: 50px 0; ">
        <center>
            <div style="width: 70%; background-color: white; ">
    
                <div style="background-color: #ff7a59; height: 5px;  margin-bottom: 32px;"></div>
                
                <img style="margin-bottom: 32px;" src="https://i.ibb.co/8YPrcWF/wc-logo-big.png" alt="" width="100px">
                
                <div style="padding: 0 100px;">
                    <div style="margin-bottom: 32px; border-top: 1px solid rgba(0,0,0,0.2); border-bottom: 1px solid rgba(0,0,0,0.2); padding: 25px 0;font-size: 20px; font-weight: bold; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        Join Workforce city
                    </div>
        
                    <div style="font-size:14px; line-height: 20px; letter-spacing: 1px;">
                        Workforce city is a CRM that's both powerful and easy to use <br/> — designed to help businesses like yours grow better.
                    </div>

                    
                    <a 
                    href="http://134.209.22.223/join/${employeeId}"
                    target="_blank"    
                    >
                    <button
                        style="cursor: pointer;padding: 12px 20px; background-color: rgb(66, 91, 118); border: none; border-radius: 3px; width: 170px; color: white; letter-spacing: 1px; margin: 16px 0;"
                    >Join Team
                    </button></a>
        
                    <div style="margin-top: 16px; font-size:12px; line-height: 20px; letter-spacing: 0.7px; padding-bottom: 60px;">
                        For added security, this link will only work for 14 days after it was sent. If the link expires, you can reach out to your manager, and ask them to send a new invite.
                    </div>
                </div>
    
            </div>
            
            <div style="width: 70%; margin: 20px 0;">
                <div style="font-size: 10px; color: rgba(0,0,0,0.5); text-align: center; line-height: 15px; letter-spacing: 0.5px;">
                    We're committed to your privacy. Workforce City uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications — except important account emails — at any time. For more information, check out our <a href="#">Privacy Policy</a>.
                </div>
    
                <div style="font-size: 10px; color: rgba(0,0,0,0.5); text-align: center; margin: 20px 0; line-height: 15px; letter-spacing: 0.5px;">
                    By creating a Workforce City account, you're agreeing to accept the Workforce City <a href="#">Terms of Service</a>.
                </div>
    
                <div style="font-size: 10px; color: rgba(0,0,0,0.5); text-align: center; margin: 20px 0; line-height: 15px; letter-spacing: 0.5px;">
                    You can't unsubscribe from important emails about your account like this one.
                </div>
    
                
            </div>
        </center>
    </div>`,
        }
        mail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }
}