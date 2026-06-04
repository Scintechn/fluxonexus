import { ImageResponse } from "next/og";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "FluxoNexus — Logística Integrada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #061425 0%, #0c2942 50%, #103a5f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(56,192,201,0.4), transparent 60%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #1b4a73, #061425)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: "#7cd8e3", fontSize: 28, fontWeight: 700 }}>≈</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, letterSpacing: -1 }}>
            Fluxo<span style={{ color: "#7cd8e3" }}>Nexus</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              color: "#7cd8e3",
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 600,
              display: "flex",
            }}
          >
            Logística Integrada
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -2,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {dict.meta.home.title.replace("FluxoNexus — ", "")}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              display: "flex",
              lineHeight: 1.35,
            }}
          >
            {dict.meta.siteDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.5)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>fluxonexus.pt</div>
          <div style={{ display: "flex" }}>Viana do Castelo · Portugal</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
