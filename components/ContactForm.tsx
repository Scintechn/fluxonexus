"use client";
import { useState, useTransition } from "react";
import { track } from "@vercel/analytics";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/[locale]/contactos/actions";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "error";

export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("idle");
    setErrorMsg("");

    startTransition(async () => {
      const res = await submitContact(fd);
      if (res.ok) {
        setStatus("success");
        track("contact_form_submit", { subject: "general" });
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(res.error === "validation" ? t.errorValidation : t.errorGeneric);
      }
    });
  }

  const inputBase =
    "w-full rounded-2xl border bg-white px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)]/70 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-500)] focus:ring-offset-1";
  const inputOk = "border-[color:var(--color-border)] hover:border-[color:var(--color-brand-300)]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[color:var(--color-brand-900)]">
            {t.name} <span aria-hidden className="text-[color:var(--color-accent-600)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            placeholder={t.placeholderName}
            className={cn(inputBase, inputOk)}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[color:var(--color-brand-900)]">
            {t.email} <span aria-hidden className="text-[color:var(--color-accent-600)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={t.placeholderEmail}
            className={cn(inputBase, inputOk)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-[color:var(--color-brand-900)]">
          {t.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={200}
          autoComplete="organization"
          placeholder={t.placeholderCompany}
          className={cn(inputBase, inputOk)}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[color:var(--color-brand-900)]">
          {t.message} <span aria-hidden className="text-[color:var(--color-accent-600)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder={t.placeholderMessage}
          className={cn(inputBase, inputOk, "resize-y")}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-[color:var(--color-muted)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-[color:var(--color-border)] text-[color:var(--color-brand-700)] focus:ring-[color:var(--color-accent-500)]"
        />
        <span>{t.consent}</span>
      </label>

      <div aria-live="polite" className="min-h-0">
        {status === "success" && (
          <div
            role="status"
            className="animate-float flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <span>{t.success}</span>
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="animate-float flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-700)] px-7 py-3.5 text-base font-medium text-white shadow-[0_8px_24px_-8px_oklch(0.40_0.180_226/0.6)] transition-all duration-300 hover:bg-[color:var(--color-brand-800)] hover:shadow-[0_12px_32px_-8px_oklch(0.40_0.180_226/0.8)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-500)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      >
        {pending ? t.submitting : t.submit}
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
