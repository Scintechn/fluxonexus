"use server";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "config" | "delivery" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bound(s: FormDataEntryValue | null, max: number) {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = bound(formData.get("name"), 200);
  const email = bound(formData.get("email"), 200);
  const company = bound(formData.get("company"), 200);
  const message = bound(formData.get("message"), 5000);
  const consent = formData.get("consent") === "on" || formData.get("consent") === "true";

  if (!name || !email || !message || !consent) return { ok: false, error: "validation" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "validation" };
  if (message.length < 10) return { ok: false, error: "validation" };

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      `[contact] (sem Telegram) lead recebido: nome="${name}" email="${email}" empresa="${company}" mensagem="${message.slice(0, 80)}…"`,
    );
    return { ok: true };
  }

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const text = [
    "<b>Novo contacto FluxoNexus</b>",
    `<b>Nome:</b> ${esc(name)}`,
    `<b>Email:</b> ${esc(email)}`,
    company ? `<b>Empresa:</b> ${esc(company)}` : null,
    "",
    `<b>Mensagem:</b>\n${esc(message)}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, parse_mode: "HTML", text }),
    });
    if (!res.ok) {
      console.error("[contact] Telegram delivery failed", res.status, await res.text());
      return { ok: false, error: "delivery" };
    }
  } catch (err) {
    console.error("[contact] Telegram delivery error", err);
    return { ok: false, error: "delivery" };
  }

  return { ok: true };
}
