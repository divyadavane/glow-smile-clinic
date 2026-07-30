"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Please call us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-glow/30 bg-glow/10 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-glow flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10l4 4 8-8"
              stroke="#0B2B2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl text-ink mb-2">
          Request received
        </h3>
        <p className="text-ink/65 text-sm">
          We'll call you shortly to confirm your slot. For faster booking,
          feel free to call us directly too.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-ink underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-ink/80 mb-2"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your name"
            className="w-full rounded-xl border border-ink/15 bg-porcelain-100 px-4 py-3 text-ink placeholder:text-ink/35 focus:border-glow outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-ink/80 mb-2"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            placeholder="+91"
            className="w-full rounded-xl border border-ink/15 bg-porcelain-100 px-4 py-3 text-ink placeholder:text-ink/35 focus:border-glow outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-semibold text-ink/80 mb-2"
        >
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-xl border border-ink/15 bg-porcelain-100 px-4 py-3 text-ink outline-none focus:border-glow transition-colors"
          defaultValue="Dental care"
        >
          <option>Dental care</option>
          <option>Hair treatment</option>
          <option>Skin & cosmetic care</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-ink/80 mb-2"
        >
          Tell us a little more (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Describe your concern or preferred timing"
          className="w-full rounded-xl border border-ink/15 bg-porcelain-100 px-4 py-3 text-ink placeholder:text-ink/35 outline-none focus:border-glow transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-bloom-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request appointment"}
      </button>
      <p className="text-xs text-ink/45 text-center">
        We'll call to confirm — this form doesn't book instantly.
      </p>
    </form>
  );
}
