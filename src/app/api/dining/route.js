import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    await resend.emails.send({
      from: "Terratone Dining <onboarding@resend.dev>",
      to: "marketing@terratonehotels.com",
      subject: "New Dining Reservation",
      html: `
<div style="padding:40px; background:#F4F1ED; font-family:'EB Garamond', Georgia, serif; color:#333;">


    <!-- HEADER -->
  <div style="max-width:650px; margin:0 auto; border:1px solid #ddd; padding:40px;">

    <!-- Logo -->
    <div style="margin-bottom:30px;">
      <img
        src="https://terratone.vercel.app/mail-logo.png"
        alt="Terratone"
        style="height:18px; display:block;"
      />
    </div>

    <!-- Header Row -->
   <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 10px;">
  <tr>
    <!-- Table cell for the logo image -->
    <td style="padding-right: 12px; vertical-align: middle;">
      <img
        src="https://terratone.vercel.app/mail-dinner-logo.png"
        alt="Terratone"
        style="height: 32px; display: block; border: 0;"
        width="52"
        height="32"
      />
    </td>
    <!-- Table cell for the heading text -->
    <td style="vertical-align: middle;">
      <h1 style="margin: 0; font-size: 50px; font-family: sans-serif; color: #000000; line-height: 1;">
        Dining Reservation
      </h1>
    </td>
  </tr>
</table>

    <p style="margin-top:8px; font-size:16px; color:#666;">
      A new hotel dining reservation enquiry has been submitted
    </p>
    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- RESERVATION DETAILS -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Reservation Details
    </h2>

    <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width:auto;">
      <tr>
        <td style="color:#c6bdb5; padding-right:10px;">Full Name :</td>
        <td style="color:black;">${data.fullName}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Phone :</td>
        <td style="color:black;">${data.phone}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Date :</td>
        <td style="color:black;">${formattedDate}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Time :</td>
        <td style="color:black;">${data.time}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Guests :</td>
        <td style="color:black;">${data.guests}</td>
      </tr>
    </table>

  </div>
</div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
