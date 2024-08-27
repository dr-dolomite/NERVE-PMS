import { Resend }  from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email for NERVE App",
        html: `
            <p>Good day! Click the "Verify Email" below to verify your email address</p>
            <a href="${confirmLink}">Verify Email</a>
        `
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password for NERVE App",
        html: `
            <p>Good day! Click the "Reset Password" below to reset your password</p>
            <a href="${resetLink}">Reset Password</a>
        `
    });
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Two Factor Authentication for NERVE App",
        html: `
            <p>Good day! Here is your two factor authentication code: ${token}</p>
        `
    });
}