import { useEffect, useState } from "react";
import { toast } from "sonner";
import { contact } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const linkedinHandle = contact.linkedin.split("/").filter(Boolean).pop() ?? "";
const githubHandle = contact.github.split("/").filter(Boolean).pop() ?? "";

const RESUME_ENDPOINT = "/api/resume";
const RESUME_FILENAME = "zidan-ahammed-resume.pdf";

type Channel = {
  key: string;
  label: string;
  value: string;
  href: string;
  copyValue: string;
};

const channels: Channel[] = [
  {
    key: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copyValue: contact.email,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: `in/${linkedinHandle}`,
    href: contact.linkedin,
    copyValue: contact.linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    value: `@${githubHandle}`,
    href: contact.github,
    copyValue: contact.github,
  },
];

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

type ResumeStatus = "loading" | "available" | "error";

export function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [resumeStatus, setResumeStatus] = useState<ResumeStatus>("loading");
  const [fallbackBusy, setFallbackBusy] = useState(false);
  const [linkedinTested, setLinkedinTested] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(RESUME_ENDPOINT, { method: "HEAD" });
        if (!alive) return;
        setResumeStatus(res.ok ? "available" : "error");
      } catch {
        if (alive) setResumeStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleCopy = async (key: string, text: string, label: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      toast.success(`${label} link copied`, { description: text });
      window.setTimeout(
        () => setCopiedKey((current) => (current === key ? null : current)),
        2000,
      );
    } else {
      toast.error("Copy blocked by your browser", { description: text });
    }
  };

  const testLinkedin = () => {
    const win = window.open(contact.linkedin, "_blank", "noopener,noreferrer");
    setLinkedinTested(true);
    if (!win) {
      toast.error("LinkedIn couldn't open", {
        description: "Your browser blocked the popup — copy the link instead.",
      });
      return;
    }
    toast.success("Opened LinkedIn in a new tab", {
      description:
        "If it shows a sign-in wall, that's LinkedIn blocking logged-out visitors — the URL is still correct.",
    });
  };

  const fallbackDownload = async () => {
    setFallbackBusy(true);
    try {
      const res = await fetch(contact.resume);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = RESUME_FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setResumeStatus("available");
      toast.success("Resume download started");
    } catch {
      setResumeStatus("error");
      toast.error("Resume file couldn't be fetched", {
        description: "Try again in a moment, or email me for a copy.",
      });
    } finally {
      setFallbackBusy(false);
    }
  };

  return (
    <Section id="contact" className="pb-16 md:pb-24">
      <SectionHeading index="06" label="Contact" />
      <MaskedLines
        className="display-xl mt-12 uppercase md:mt-20"
        lines={["Let's build", "something", "useful."]}
      />

      <ul className="mt-16 grid border-t border-border md:mt-24">
        {channels.map((channel, i) => (
          <li key={channel.key} className="border-b border-border">
            <Reveal delay={i * 80}>
              <div className="grid gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center md:py-7">
                <span className="meta">{channel.label}</span>
                <span className="truncate text-xl md:text-2xl">{channel.value}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={channel.href}
                    target={channel.key === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="meta inline-flex min-h-11 items-center rounded-full border border-border px-4 transition-colors hover:border-primary hover:text-primary"
                  >
                    Open →
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(channel.key, channel.copyValue, channel.label)}
                    className="meta inline-flex min-h-11 items-center rounded-full border border-border px-4 transition-colors hover:border-primary hover:text-primary"
                  >
                    {copiedKey === channel.key ? "Copied ✓" : "Copy link"}
                  </button>
                  {channel.key === "linkedin" ? (
                    <button
                      type="button"
                      onClick={testLinkedin}
                      className="meta inline-flex min-h-11 items-center rounded-full border border-border px-4 transition-colors hover:border-primary hover:text-primary"
                    >
                      Test link
                    </button>
                  ) : null}
                </div>
              </div>
              {channel.key === "linkedin" && linkedinTested ? (
                <p className="meta pb-5 text-muted-foreground">
                  Nothing loaded? LinkedIn shows a sign-in wall to logged-out visitors.
                  Sign in, or paste the copied URL directly:{" "}
                  <span className="text-foreground">{contact.linkedin}</span>
                </p>
              ) : null}
            </Reveal>
          </li>
        ))}

        <li className="border-b border-border">
          <Reveal delay={240}>
            <div className="grid gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center md:py-7">
              <span className="meta">Resume</span>
              <span className="flex items-center gap-3 text-xl md:text-2xl">
                PDF
                <span
                  className={`meta rounded-full border px-3 py-1 ${
                    resumeStatus === "available"
                      ? "border-primary text-primary"
                      : resumeStatus === "error"
                        ? "border-destructive text-destructive"
                        : "border-border text-muted-foreground"
                  }`}
                  aria-live="polite"
                >
                  {resumeStatus === "loading"
                    ? "Checking…"
                    : resumeStatus === "available"
                      ? "Available"
                      : "Unavailable"}
                </span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={RESUME_ENDPOINT}
                  download={RESUME_FILENAME}
                  className="meta inline-flex min-h-11 items-center rounded-full border border-border px-4 transition-colors hover:border-primary hover:text-primary"
                >
                  Download →
                </a>
                <button
                  type="button"
                  onClick={fallbackDownload}
                  disabled={fallbackBusy}
                  className="meta inline-flex min-h-11 items-center rounded-full border border-border px-4 transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  {fallbackBusy ? "Fetching…" : "Backup download"}
                </button>
              </div>
            </div>
            {resumeStatus === "error" ? (
              <p className="meta pb-5 text-destructive">
                The resume file couldn't be reached. Try the backup download, or email{" "}
                {contact.email} and I'll send it over.
              </p>
            ) : null}
          </Reveal>
        </li>
      </ul>
    </Section>
  );
}
