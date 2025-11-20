import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      fullName,
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

    // ----------------------- VALIDATION -----------------------
    const missing = [];

    if (!fullName) missing.push("Full Name");
    if (!email) missing.push("Email");
    if (!phone) missing.push("Phone Number");
    if (!eventType) missing.push("Event Type");
    if (!selectedRoom) missing.push("Selected Room");
    if (!date) missing.push("Date");
    if (!startTime) missing.push("Start Time");
    if (!endTime) missing.push("End Time");
    if (!people) missing.push("Number of People");

    if (missing.length > 0) {
      return Response.json(
        {
          success: false,
          error: `Missing required fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // ----------------------- EMAIL HTML -----------------------
    await resend.emails.send({
      from: "Terratone Bookings <onboarding@resend.dev>",
      to: "marketing@terratonehotels.com",
      subject: "New Event Enquiry",
      html: `
<div style="padding:40px; background:#F4F1ED; font-family:'EB Garamond', Georgia, serif; color:#333;">
 
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
    <td style="padding-right: 12px; vertical-align: middle;">
      <img
        src="https://terratone.vercel.app/mail-dinner-logo.png"
        alt="Terratone"
        style="height: 32px; display: block; border: 0;"
        width="52"
        height="32"
      />
    </td>
    <td style="vertical-align: middle;">
      <h1 style="margin: 0; font-size: 50px; font-family: sans-serif; color: #000000; line-height: 1;">
        Event Enquiry
      </h1>
    </td>
  </tr>
</table>

    <p style="margin-top:8px; font-size:16px; color:#666;">
      A new event enquiry has been submitted.
    </p>
    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- CONTACT -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Contact Details
    </h2>

    <table style="width:100%; font-size:15px; line-height:1.7;">
      <tr>
        <td style="color:#c6bdb5; width:150px;">Name</td>
        <td style="color:black;">${fullName}</td>
      </tr>
      <tr>
        <td style="color:#c6bdb5;">Email</td>
        <td style="color:black;">${email}</td>
      </tr>
      <tr>
        <td style="color:#c6bdb5;">Phone</td>
        <td style="color:black;">${phone}</td>
      </tr>
    </table>

    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <!-- EVENT DETAILS -->
    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Event Details
    </h2>

    <table style="width:100%; font-size:15px; line-height:1.7;">
      <tr>
        <td style="color:#c6bdb5; width:150px;">Event Type</td>
        <td style="color:black;">${eventType}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Room</td>
        <td style="color:black;">${selectedRoom}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Date</td>
        <td style="color:black;">
         ${(() => {
           const d = new Date(date);
           const IST = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
           return IST.toLocaleDateString("en-US", {
             month: "short",
             day: "numeric",
             year: "numeric",
           });
         })()}

        </td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Starts</td>
        <td style="color:black;">${startTime}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">Ends</td>
        <td style="color:black;">${endTime}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5;">People</td>
        <td style="color:black;">${people}</td>
      </tr>
    </table>

    <!-- NOTES -->
    ${
      notes?.trim()
        ? `
      <div style="margin-top:20px;">
          <p style="color:#96703b; margin:0 0 6px; font-weight:600;">Notes:</p>
          <p style="margin:0; color:black; white-space:pre-line;">${notes}</p>
        </div>`
        : ""
    }

  

</div>
</div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Event enquiry error:", error);
    return Response.json({ success: false, error: error.message });
  }
}
