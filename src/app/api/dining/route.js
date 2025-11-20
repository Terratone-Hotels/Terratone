import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --------- Helper to prevent HTML injection ----------
function escape(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const data = await req.json();

    // ---------- Validation ----------
    if (
      !data.fullName ||
      !data.phone ||
      !data.date ||
      !data.time ||
      !data.guests
    ) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---------- Format Date ----------
    let formattedDate = "Invalid Date";

    try {
      const dateObj = new Date(data.date);

      // Convert to IST manually → UTC + 5h30m
      const IST = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000);

      formattedDate = IST.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      console.log("Date formatting error:", e);
    }
    // ---------- Email HTML ----------
    const html = `
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

    <!-- Header -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 10px;">
      <tr>
        <td style="padding-right: 12px; vertical-align: middle;">
          <img
            src="https://terratone.vercel.app/mail-dinner-logo.png"
            alt="Terratone Dining"
            style="height: 32px; display: block; border: 0;"
            width="52"
            height="32"
          />
        </td>
        <td style="vertical-align: middle;">
          <h1 style="margin: 0; font-size: 50px; font-family: sans-serif; color: #000000; line-height: 1;">
            Table Reservation
          </h1>
        </td>
      </tr>
    </table>

    <p style="margin-top:8px; font-size:16px; color:#666;">
      A new dining enquiry has been submitted.
    </p>

    <hr style="border:0; border-top:1px solid #222; margin:28px 0;" />

    <h2 style="color:#96703b; font-size:20px; margin-bottom:14px;">
      Reservation Details
    </h2>

    <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width:auto;">
      <tr>
        <td style="color:#c6bdb5; padding-right:10px; padding-bottom: 8px;">Full Name :</td>
        <td style="color:black; padding-bottom: 8px;">${escape(data.fullName)}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5; padding-right:10px; padding-bottom: 8px;">Phone :</td>
        <td style="color:black; padding-bottom: 8px;">${escape(data.phone)}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5; padding-right:10px; padding-bottom: 8px;">Date :</td>
        <td style="color:black; padding-bottom: 8px;">${formattedDate}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5; padding-right:10px; padding-bottom: 8px;">Time :</td>
        <td style="color:black; padding-bottom: 8px;">${escape(data.time)}</td>
      </tr>

      <tr>
        <td style="color:#c6bdb5; padding-right:10px; padding-bottom: 8px;">Guests :</td>
        <td style="color:black; padding-bottom: 8px;">${escape(
          data.guests
        )} People</td>
      </tr>
    </table>

    <div style="margin-top: 30px; font-size: 12px; color: #999;">
      <p>Please contact the guest to confirm availability.</p>
    </div>

  </div>
</div>
`;

    // ---------- Send Email ----------
    await resend.emails.send({
      from: "Terratone Dining <onboarding@resend.dev>",
      to: "marketing@terratonehotels.com", // ← your target dining email
      subject: `New Table Reservation: ${formattedDate} @ ${data.time}`,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Dining Reservation Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
