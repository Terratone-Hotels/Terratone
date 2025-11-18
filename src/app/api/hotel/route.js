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
<div style=" padding:40px; background:#f4f1ed ;font-family:'EB Garamond', Georgia, 'Times New Roman', sans-serif; color:#333;">
  <div style="max-width:650px; margin:0 auto;  border:1px solid #ddd; padding:40px;">

    <!-- LOGO -->
    <div style="margin-bottom:30px;">
   <img 
  src="https://terratone.vercel.app/mail-logo.svg"
  alt="Terratone"
  style="height:32px;"
/>

    </div>

    <!-- TITLE -->
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
     <img 
  src="https://terratone.vercel.app/mail-dinner-logo.svg"
  alt="Terratone"
  style="height:26px;"
/>
      <h1 style="margin:0; font-size:26px;  ">
        New Room Enquiry
      </h1>
    </div>

    <p style="margin-top:4px; font-size:14px; color:#666;">
      A new hotel room enquiry has been submitted
    </p>

    <!-- SECTION: Room Breakdown -->
    <h3 style="margin-top:30px; margin-bottom:12px; font-size:18px; color:#1f1f1f;">
      Room Breakdown
    </h3>

    <!-- CARD -->
    <div style=" border:1px solid #e0dcd7;  padding:22px;">
      <!-- ROW: ROOMS -->
    <div style="margin-bottom:12px; display:flex; align-items:center; gap:8px;">
  <span style="font-size:12px; color:#777; letter-spacing:1px;">ROOMS :</span>
  <span style="font-size:14px; color:#333;">${rooms.length}</span>
</div>


      <!-- ROW: TYPE -->
<div style="margin-bottom:12px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
  
  <!-- LABEL -->
  <span style="font-size:12px; color:#777; letter-spacing:1px; white-space:nowrap;">
    TYPE :
  </span>

  <!-- BADGE GROUP -->
  <div style="display:flex; gap:8px; flex-wrap:wrap;">
    ${rooms
      .map(
        (room) => `
        <span style="
          background:#e5d5d3;
          color:#7a3d3a;
          font-size:12px;
          padding:4px 10px;
          border-radius:4px;
          border:1px solid #d2c3c2;
        ">
          ${room.property}
        </span>
      `
      )
      .join("")}
  </div>

</div>


      <!-- ROW: DATE -->
<div style="margin-bottom:12px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">

  <!-- LABEL -->
  <span style="font-size:12px; color:#777; letter-spacing:1px; white-space:nowrap;">
    DATE :
  </span>

  <!-- VALUE -->
  <span style="font-size:14px; color:#333; white-space:nowrap;">
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


      <!-- ROW: PAX -->
  <div style="margin-bottom:12px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">

  <!-- LABEL -->
  <span style="font-size:12px; color:#777; letter-spacing:1px; white-space:nowrap;">
    PAX :
  </span>

  <!-- VALUE -->
  <span style="font-size:14px; color:#333; white-space:nowrap;">
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
