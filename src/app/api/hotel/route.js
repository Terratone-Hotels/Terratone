import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const rooms = data.rooms || [];

    // Detect if all rooms share the same stay dates
    const sameStay =
      rooms.length > 0 &&
      rooms.every(
        (r) =>
          r.checkIn === rooms[0].checkIn && r.checkOut === rooms[0].checkOut
      );

    const stayText = sameStay
      ? `${new Date(rooms[0].checkIn).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} → ${new Date(rooms[0].checkOut).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`
      : "Multiple stay periods";

    // ---------------- EMAIL HTML (TABLE FORMAT) ----------------
    const html = `
<div style="background:#000000; padding:40px; font-family:Arial, sans-serif; color:#f4f1ed;">
  <div style="max-width:650px; margin:0 auto; border:1px solid #222; border-radius:12px; padding:32px; background:#111111;">

    <!-- HEADER -->
    <h1 style="margin:0 0 12px 0; color:#e4a3a2; font-size:28px; font-weight:600;">
      Terratone | New Hotel Booking
    </h1>

    <p style="font-size:15px; margin-bottom:30px; color:#c6bdb5;">
      A new hotel booking enquiry has been submitted.
    </p>

    <!-- SUMMARY -->
    <table width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a; border:1px solid #1f1f1f; border-radius:10px; padding:16px 20px; margin-bottom:28px;">
      <tr>
        <td style="padding:10px 0; font-size:15px;">
          <strong style="color:#96703b;">Stay:</strong>
          ${stayText}
        </td>
      </tr>

      <tr>
        <td style="padding:4px 0 10px; font-size:15px;">
          <strong style="color:#96703b;">Rooms:</strong>
          ${rooms.length}
        </td>
      </tr>
    </table>

    <!-- ROOM BREAKDOWN -->
    <h2 style="color:#96703b; font-size:18px; margin-bottom:14px;">Room Breakdown</h2>

    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tbody>
        ${rooms
          .map(
            (r, i) => `
          <tr>
            <td style="padding:16px; background:#0b0b0b; border:1px solid #1e1e1e; border-radius:8px; margin-bottom:12px; display:block;">

              <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="font-size:15px; color:#e4a3a2; font-weight:600; padding-bottom:6px;">
                    Room ${i + 1}
                  </td>
                </tr>

                <tr>
                  <td style="font-size:14px; color:#f4f1ed;">
                    ${r.property}
                  </td>
                </tr>

                <tr>
                  <td style="font-size:13px; color:#c6bdb5; padding-top:8px;">
                    ${new Date(r.checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    →
                    ${new Date(r.checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>

                <tr>
                  <td style="font-size:13px; color:#c6bdb5; padding-top:8px;">
                    ${r.adults} Adults, ${r.children} Children
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    <!-- FOOTER -->
    <p style="margin-top:30px; color:#c6bdb5; font-size:12px; text-align:center;">
      Terratone Hotels · Automated Booking Notification
    </p>

  </div>
</div>
`;

    // SEND EMAIL
    await resend.emails.send({
      from: "Terratone Bookings <onboarding@resend.dev>",
      to: "marketing@terratonehotels.com",
      subject: "New Hotel Booking Request",
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
