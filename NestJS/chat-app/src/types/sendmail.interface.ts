export interface SendMail{
    from?: string; // optional sender address, transporter will fallback if missing
    to: string;
    subject: string;
    html: string;
}