import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js";



export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify Your Email Address',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log('Email sent successfully:', response);

    }catch(error){
        console.error('Error sending email:', error);
        throw new Error(`Error sending verification email:${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "2c309d6d-e65a-45d3-8943-a82f06a99f52",
            template_variables:{
                company_info_name: "Hire Me...",
                first_name: name,
            }
        });
        console.log('Email sent successfully:', response);

    }catch (error){
        console.error('Error sending email:', error);
        throw new Error(`Error sending welcome email:${error}`);
    }
}