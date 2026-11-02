interface AppointmentFields {
  name: string;
  mobile: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export function appointmentEmailHtml(f: AppointmentFields): string {
  const optionalRows = [
    f.email
      ? row("Email", escHtml(f.email))
      : "",
    f.message
      ? row("Additional Notes", escHtml(f.message))
      : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Appointment Request</title>
</head>
<body style="margin:0;padding:0;background-color:#F0E4D0;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0E4D0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td style="background-color:#211D18;padding:36px 40px 28px;border-radius:4px 4px 0 0;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#B08B4F;">
                NAGPAL&rsquo;S PHYSIO CARE
              </p>
              <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:#F5E9D7;line-height:1.3;">
                New Appointment Request
              </h1>
              <div style="margin-top:20px;height:1px;background-color:#B08B4F;opacity:0.4;"></div>
              <p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#B08B4F;letter-spacing:0.5px;">
                A patient has submitted an appointment enquiry via the website.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">

              <!-- Patient Details -->
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B08B4F;">
                Patient Details
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #E9DDC9;border-radius:3px;overflow:hidden;margin-bottom:28px;">
                ${row("Name", escHtml(f.name))}
                ${row("Mobile", escHtml(f.mobile))}
                ${f.email ? row("Email", escHtml(f.email)) : ""}
              </table>

              <!-- Appointment Details -->
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B08B4F;">
                Appointment Details
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #E9DDC9;border-radius:3px;overflow:hidden;margin-bottom:28px;">
                ${row("Service", escHtml(f.service))}
                ${row("Preferred Date", escHtml(f.date))}
                ${row("Preferred Time", escHtml(f.time))}
                ${f.message ? row("Additional Notes", escHtml(f.message)) : ""}
              </table>

              <!-- CTA hint -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background-color:#F5E9D7;border-left:3px solid #B08B4F;border-radius:0 3px 3px 0;margin-bottom:8px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#211D18;line-height:1.6;">
                      Please reply to this email or call the patient directly to confirm their appointment slot.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#211D18;padding:24px 40px;border-radius:0 0 4px 4px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#B08B4F;line-height:1.7;">
                <strong style="color:#F5E9D7;">Nagpal&rsquo;s Physio Care</strong><br />
                717, Mahavir Colony, Yamuna Nagar, Haryana 135001<br />
                This email was generated automatically from the website appointment form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function appointmentEmailText(f: AppointmentFields): string {
  return [
    "NEW APPOINTMENT REQUEST — NAGPAL'S PHYSIO CARE",
    "================================================",
    "",
    "PATIENT DETAILS",
    `Name:   ${f.name}`,
    `Mobile: ${f.mobile}`,
    f.email ? `Email:  ${f.email}` : null,
    "",
    "APPOINTMENT DETAILS",
    `Service:        ${f.service}`,
    `Preferred Date: ${f.date}`,
    `Preferred Time: ${f.time}`,
    f.message ? `Additional Notes: ${f.message}` : null,
    "",
    "Please contact the patient to confirm their appointment slot.",
    "",
    "—",
    "Nagpal's Physio Care, 717 Mahavir Colony, Yamuna Nagar, Haryana 135001",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

function row(label: string, value: string): string {
  return `<tr style="border-top:1px solid #E9DDC9;">
    <td style="padding:12px 16px;font-family:Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#888;white-space:nowrap;width:38%;background-color:#FDFAF6;border-right:1px solid #E9DDC9;">
      ${label}
    </td>
    <td style="padding:12px 16px;font-family:Georgia,serif;font-size:14px;color:#211D18;line-height:1.5;">
      ${value}
    </td>
  </tr>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br />");
}
