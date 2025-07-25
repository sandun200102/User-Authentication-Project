import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js"
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
            // template_uuid: "2c309d6d-e65a-45d3-8943-a82f06a99f52",
            // template_variables:{
            //     company_info_name: "Hire Me...",
            //     first_name: name,
            // }
            subject: 'Verify Your Email Address',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", "123456"),
            category: "Email Verification"
        });
        console.log('Email sent successfully:', response);

    }catch (error){
        console.error('Error sending email:', error);
        throw new Error(`Error sending welcome email:${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset Your Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
        console.log('Email sent successfully:', response);

    }catch(error){
        console.error('Error sending email:', error);
        throw new Error(`Error sending password reset email:${error}`);
    }
}

export const sendPasswordResetSuccessEmail = async (email) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log('Email sent successfully:', response);

    }catch(error){
        console.error('Error sending email:', error);
        throw new Error(`Error sending password reset success email:${error}`);
    }
}