import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const roomStyles = {
  "Deluxe Suite": {
    background: "#d1ecf1",
    color: "#0c5460",
  },
  "Deluxe King": {
    background: "#f8d7da",
    color: "#721c24",
  },
  "Deluxe Twin": {
    background: "#d4edda",
    color: "#155724",
  },
  Default: {
    background: "#e5d5d3",
    color: "#7a3d3a",
  },
};

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
    <head>
   
    
 <style>
     
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
    </style>
    
  
</head>
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
        New Room Enquiry
      </h1>
    </td>
  </tr>
</table>

    <p style="margin-top:8px; font-size:16px; color:#666;">
      A new hotel room enquiry has been submitted
    </p>

    <!-- Room Breakdown Heading -->
    <h3 style="margin-top:35px; margin-bottom:15px; font-size:22px; color:#1f1f1f;">
      Room Breakdown
    </h3>

    <!-- Box -->
    <div style="border:1px solid #e0dcd7; padding:25px;">
<!-- Guest Info -->
<table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width:auto;">
  <tr>
    <td style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; padding-right:10px; white-space:nowrap; font-family:sans-serif;">
      NAME :
    </td>
    <td style="font-size:16px; color:#333; white-space:nowrap; font-family:'EB Garamond', Georgia, serif;">
      ${fullName}
    </td>
  </tr>
</table>

<table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width:auto;">
  <tr>
    <td style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; padding-right:10px; white-space:nowrap; font-family:sans-serif;">
      PHONE :
    </td>
    <td style="font-size:16px; color:#333; white-space:nowrap; font-family:'EB Garamond', Georgia, serif;">
      ${phone}
    </td>
  </tr>
</table>

      <!-- Rooms count -->
    <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width: auto;">
  <tr>
    <!-- Table cell for the label -->
    <td style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; padding-right: 10px; white-space:nowrap; font-family: sans-serif;">
      ROOMS :
    </td>
    <!-- Table cell for the value -->
    <td style="font-size:16px; color:#333; white-space:nowrap; font-family:'EB Garamond', Georgia, serif;">
      ${rooms.length}
    </td>
  </tr>
</table>

      <!-- Type row -->
      <div style="margin-bottom:15px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <span style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; white-space:nowrap;">
          TYPE :
        </span>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          ${rooms
            .map((room) => {
              const style = roomStyles[room.property] || roomStyles.Default;
              return ` <span style="
                  background:${style.background};
                  color:${style.color};
                  font-size:14px;
                  padding:5px 12px;
                  border:1px solid #d2c3c2;
                  white-space:nowrap;
                "> ${room.property}</span> `;
            })
            .join("")}
        </div>
      </div>

      <!-- Date -->
     <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:15px; width: auto;">
  <tr>
    <!-- Table cell for the label -->
    <td style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; padding-right: 12px; white-space:nowrap; font-family: sans-serif;">
      DATE :
    </td>
    <!-- Table cell for the value -->
    <td style="font-size:16px; color:#333; white-space:nowrap; font-family:'EB Garamond', Georgia, serif;">
     ${
       rooms.length > 0
         ? `${(() => {
             const d = new Date(rooms[0].checkIn);
             const IST = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
             return IST.toLocaleDateString("en-US", {
               month: "short",
               day: "numeric",
               year: "numeric",
             });
           })()} – ${(() => {
             const d = new Date(rooms[0].checkOut);
             const IST = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
             return IST.toLocaleDateString("en-US", {
               month: "short",
               day: "numeric",
               year: "numeric",
             });
           })()}`
         : ""
     }

    </td>
  </tr>
</table>

      <!-- Pax -->
   <table cellspacing="0" cellpadding="0" border="0" style="margin-bottom:5px; width: auto;">
  <tr>
    <!-- Table cell for the label -->
    <td style="font-size:14px; color:#777; letter-spacing:1px; font-weight:bold; padding-right: 12px; white-space:nowrap; font-family: sans-serif;">
      PAX :
    </td>
    <!-- Table cell for the value -->
    <td style="font-size:16px; color:#333; white-space:nowrap; font-family:'EB Garamond', Georgia, serif;">
      ${rooms.reduce((a, c) => a + c.adults, 0)} Adults,
      ${rooms.reduce((a, c) => a + c.children, 0)} Children
    </td>
  </tr>
</table>
    </div>

  </div>
</div>
`;

    // SEND EMAIL
    await resend.emails.send({
      from: "Terratone Bookings <onboarding@resend.dev>",
      to: "sumesh@gradical.xyz",
      subject: "New Hotel Booking Request",
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
