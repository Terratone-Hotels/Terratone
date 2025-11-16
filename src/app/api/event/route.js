import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      eventType,
      selectedRoom,
      date,
      startTime,
      endTime,
      people,
      notes,
    } = data;

    await resend.emails.send({
      from: "Terratone Bookings <onboarding@resend.dev>",
      to: "marketing@terratonehotels.com",
      subject: "New Event Enquiry",
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
    <h1 style="margin:0; color:#e4a3a2; font-size:28px; font-weight:600;">
      Terratone | Event Enquiry
    </h1>

    <p style="color:#c6bdb5; margin-top:10px; font-size:15px;">
      A new event enquiry has been submitted.
    </p>

    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- CONTACT -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Contact Details
    </h2>

    <table style="width:100%; font-size:15px; line-height:1.7; text-transform:none;">
      <tr>
        <td style="color:#c6bdb5; width:150px;">Name</td>
        <td style="color:#f4f1ed;">${firstName} ${lastName}</td>
      </tr>
      <tr>
        <td style="color:#c6bdb5;">Email</td>
        <td style="color:#f4f1ed;">${email}</td>
      </tr>
      <tr>
        <td style="color:#c6bdb5;">Phone</td>
        <td style="color:#f4f1ed;">${phone}</td>
      </tr>
    </table>

    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- EVENT DETAILS -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Event Details
    </h2>

    <table style="width:100%; font-size:15px; line-height:1.7; text-transform:none;">
      <tr>
        <td style="color:#c6bdb5; width:150px;">Event Type</td>
        <td style="color:#f4f1ed;">${eventType}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Room</td>
        <td style="color:#f4f1ed;">${selectedRoom}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Date</td>
        <td style="color:#f4f1ed;">
          ${new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Starts</td>
        <td style="color:#f4f1ed;">${startTime}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Ends</td>
        <td style="color:#f4f1ed;">${endTime}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">People</td>
        <td style="color:#f4f1ed;">${people}</td>
      </tr>
    </table>

    <!-- NOTES -->
    ${
      notes?.trim()
        ? `
        <div style="margin-top:30px; border:1px solid #1f1f1f; padding:18px 20px; border-radius:10px; background:#0b0b0b;">
          <p style="color:#96703b; margin:0 0 6px; font-weight:600;">Notes:</p>
          <p style="margin:0; color:#c6bdb5; white-space:pre-line;">${notes}</p>
        </div>
      `
        : ""
    }

    <p style="text-align:center; margin-top:32px; color:#c6bdb5; font-size:12px;">
      Terratone Hotels · Automated Event Notification
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
