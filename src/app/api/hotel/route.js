import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const { fullName, phone } = data;
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
<div style=" padding:40px; background:#ffff ;font-family:'EB Garamond', Georgia, 'Times New Roman', sans-serif; color:#333;">
  <div style="max-width:650px; margin:0 auto;  border:1px solid #ddd; padding:40px;">

        <div style="margin-bottom:30px;">
   <img 
  src="https://terratone.vercel.app/mail-logo.svg"
  alt="Terratone"
  style="height:38px;"
/>

    </div>

        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
     <img 
  src="https://terratone.vercel.app/mail-dinner-logo.svg"
  alt="Terratone"
  style="height:32px;"
/>
      <h1 style="margin:0; font-size:30px;  ">
        New Room Enquiry
      </h1>
    </div>

    <p style="margin-top:8px; font-size:16px; color:#666;">
      A new hotel room enquiry has been submitted
    </p>

        <h3 style="margin-top:35px; margin-bottom:15px; font-size:22px; color:#1f1f1f;">
      Room Breakdown
    </h3>

        <div style=" border:1px solid #e0dcd7;  padding:25px;">
          <div style="margin-bottom:15px; display:flex; align-items:center; gap:10px;">
  <span style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold;">ROOMS :</span>
  <span style="font-size:16px; color:#333;">${rooms.length}</span>
</div>


      <div style="margin-bottom:15px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
  
    <span style="font-size:14px; color:#777; letter-spacing:1px; white-space:nowrap; font-weight:bold;">
    TYPE :
  </span>

    <div style="display:flex; gap:10px; flex-wrap:wrap;">
    ${rooms
      .map(
        (room) => `
        <span style="
          background:#e5d5d3;
          color:#7a3d3a;
          font-size:14px; /* Increased text size */
          padding:5px 12px; /* Adjusted padding */
          border-radius:4px;
          border:1px solid #d2c3c2;
          white-space:nowrap;
        ">
          ${room.property}
        </span>
      `
      )
      .join("")}
  </div>

</div>


      <div style="margin-bottom:15px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">

    <span style="font-size:14px; color:#777; letter-spacing:1px; white-space:nowrap; font-weight:bold;">
    DATE :
  </span>

    <span style="font-size:16px; color:#333; white-space:nowrap;">
    ${
      rooms.length > 0
        ? `${new Date(rooms[0].checkIn).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} – ${new Date(rooms[0].checkOut).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`
        : ""
    }
  </span>

</div>


        <div style="margin-bottom:15px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">

    <span style="font-size:14px; color:#777; letter-spacing:1px; white-space:nowrap; font-weight:bold;">
    PAX :
  </span>

    <span style="font-size:16px; color:#333; white-space:nowrap;">
    ${rooms.reduce((a, c) => a + c.adults, 0)} Adults, 
    ${rooms.reduce((a, c) => a + c.children, 0)} Children
  </span>

</div>

    </div>

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
