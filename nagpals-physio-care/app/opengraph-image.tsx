import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const logoPath = path.join(process.cwd(), "public", "images", "nagpals-physio-logo-dark.png");
  const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#211D18",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: "56px",
            height: "2px",
            background: "#B08B4F",
            marginBottom: "44px",
          }}
        />

        {/* Logo + clinic name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            width={68}
            height={68}
            alt=""
            style={{ borderRadius: "4px", objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "22px",
                color: "#F5E9D7",
                letterSpacing: "0.3px",
                lineHeight: 1,
              }}
            >
              Nagpal&apos;s Physio Care
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#B08B4F",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontFamily: "Arial, Helvetica, sans-serif",
                lineHeight: 1,
              }}
            >
              Yamuna Nagar · Haryana · India
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "68px",
            color: "#F5E9D7",
            lineHeight: 1.12,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontWeight: 400,
          }}
        >
          <span>Pain Relief.</span>
          <span>Rehabilitation.</span>
          <span style={{ color: "#B08B4F" }}>Mobility Care.</span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(245,233,215,0.12)",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "rgba(245,233,215,0.5)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Dr. Lovish Nagpal (PT)
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#B08B4F",
              letterSpacing: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            nagpalsphysiocare.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
