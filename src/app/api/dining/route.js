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
<div style="background:#000; padding:40px; font-family:Arial, sans-serif;">
  <div style="
      max-width:650px;
      margin:0 auto;
      background:#0d0d0d;
      padding:32px;
      border-radius:14px;
      border:1px solid #1a1a1a;
      color:#f4f1ed;
  ">

    <!-- HEADER -->
    <h1 style="margin:0; color:#e4a3a2; font-size:26px; font-weight:600;">
      Terratone | Dining Reservation
    </h1>

    <p style="font-size:15px; margin-top:10px; color:#c6bdb5;">
      A new dining reservation has been submitted.
    </p>

    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- RESERVATION DETAILS -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Reservation Details
    </h2>

    <table style="width:100%; font-size:15px; line-height:1.7; text-transform:none;">
      <tr>
        <td style="color:#c6bdb5; width:150px;">Full Name</td>
        <td style="color:#f4f1ed;">${data.fullName}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Phone</td>
        <td style="color:#f4f1ed;">${data.phone}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Date</td>
        <td style="color:#f4f1ed;">${formattedDate}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Time</td>
        <td style="color:#f4f1ed;">${data.time}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Guests</td>
        <td style="color:#f4f1ed;">${data.guests}</td>
      </tr>
    </table>

    <p style="text-align:center; margin-top:32px; color:#c6bdb5; font-size:12px;">
      Terratone Hotels · Automated Dining Notification
    </p>

  </div>
</div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
