import { useId, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { ChatCircleText, CheckCircle, X } from "@phosphor-icons/react";
import { CONTACT_ENDPOINT, EMAIL } from "../data";

type Status = "idle" | "sending" | "sent" | "error";

interface Values {
  name: string;
  email: string;
  company: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", company: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const REQUEST_TIMEOUT_MS = 15000;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.company.trim().length < 2) errors.company = "Tell me the company or role you are hiring for.";
  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please write at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-paper placeholder:text-zinc-600 transition focus:border-accent focus:outline-none";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const open = () => dialogRef.current?.showModal();

  const close = () => {
    dialogRef.current?.close();
    if (status === "sent") {
      setValues(EMPTY);
      setStatus("idle");
    }
  };

  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const honeypot = new FormData(e.currentTarget).get("_honey");
    if (honeypot) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          _subject: `Portfolio enquiry from ${values.name.trim()}`,
          _replyto: values.email.trim(),
          _captcha: "false",
          _template: "table",
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-sm font-semibold text-ink transition hover:bg-accent active:-translate-y-px active:scale-[0.98]"
      >
        <ChatCircleText size={20} strokeWidth={1.5} /> Let&apos;s talk
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-labelledby={`${uid}-title`}
        className="contact-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-0 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 id={`${uid}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
                Let&apos;s talk
              </h2>
              <p className="mt-2 text-sm text-zinc-400">Four quick questions. I reply to every message.</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close form"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/30 hover:text-paper active:scale-95"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {status === "sent" ? (
            <div role="status" className="mt-10 flex flex-col items-start gap-4 pb-4">
              <CheckCircle size={44} strokeWidth={1.5} className="text-accent" />
              <p className="text-xl font-semibold tracking-tight">Message sent.</p>
              <p className="max-w-[40ch] text-zinc-400">
                Thanks for reaching out. I will get back to you at the email you gave.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
              <Field id={`${uid}-name`} label="1. What is your name?" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-email`} label="2. What is your email address?" error={errors.email}>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-company`} label="3. Which company and role are you hiring for?" error={errors.company}>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? `${uid}-company-error` : undefined}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-message`} label="4. What would you like to talk about?" error={errors.message}>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                  className={`${fieldClass} resize-y`}
                />
              </Field>

              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"
                >
                  The message did not go through. Please try again, or email me directly at{" "}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                    {EMAIL}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-sm font-semibold text-ink transition hover:brightness-110 active:-translate-y-px active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
