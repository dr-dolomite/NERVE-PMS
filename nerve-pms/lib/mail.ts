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