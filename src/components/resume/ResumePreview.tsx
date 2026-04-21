import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resume-types";

interface Props {
  data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personal, summary, education, skills, experience, projects, certifications } = data;

  return (
    <div
      ref={ref}
      id="resume-page"
      className="mx-auto bg-white text-neutral-900 shadow-2xl"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "14mm 16mm",
        fontFamily: "'Inter', Arial, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.45,
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          borderBottom: "2px solid #111",
          paddingBottom: "10px",
          marginBottom: "12px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "22pt",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.02em",
              fontFamily: "'Space Grotesk','Inter',sans-serif",
            }}
          >
            {personal.fullName || "Your Name"}
          </h1>
          <div style={{ marginTop: 4, fontSize: "9.5pt", color: "#444" }}>
            {[personal.location, personal.phone, personal.email]
              .filter(Boolean)
              .join("  •  ")}
          </div>
          <div style={{ marginTop: 2, fontSize: "9.5pt", color: "#444" }}>
            {[personal.linkedin, personal.portfolio].filter(Boolean).join("  •  ")}
          </div>
        </div>
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            style={{
              width: 70,
              height: 70,
              borderRadius: 8,
              objectFit: "cover",
              border: "1px solid #ddd",
            }}
          />
        )}
      </header>

      {summary && (
        <Section title="Professional Summary">
          <p style={{ margin: 0 }}>{summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
            {skills.map((s, i) => (
              <span
                key={i}
                style={{
                  fontSize: "9.5pt",
                  padding: "2px 8px",
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  background: "#f7f7f8",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <strong style={{ fontSize: "11pt" }}>
                  {e.role}
                  {e.company && <span style={{ fontWeight: 500 }}> · {e.company}</span>}
                </strong>
                <span style={{ fontSize: "9.5pt", color: "#555" }}>{e.duration}</span>
              </div>
              <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                {e.bullets
                  .split("\n")
                  .filter((b) => b.trim())
                  .map((b, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {b.replace(/^[-•]\s*/, "")}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <strong>
                  {p.title}
                  {p.stack && (
                    <span style={{ fontWeight: 400, color: "#555" }}> — {p.stack}</span>
                  )}
                </strong>
                {p.link && (
                  <span style={{ fontSize: "9.5pt", color: "#555" }}>{p.link}</span>
                )}
              </div>
              {p.description && <div style={{ marginTop: 2 }}>{p.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((ed) => (
            <div
              key={ed.id}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}
            >
              <div>
                <strong>{ed.degree}</strong>
                {ed.college && <span> · {ed.college}</span>}
                {ed.cgpa && (
                  <span style={{ color: "#555" }}> · CGPA {ed.cgpa}</span>
                )}
              </div>
              <span style={{ fontSize: "9.5pt", color: "#555" }}>{ed.year}</span>
            </div>
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((c) => (
            <div
              key={c.id}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}
            >
              <span>
                <strong>{c.name}</strong>
                {c.issuer && <span> · {c.issuer}</span>}
              </span>
              <span style={{ fontSize: "9.5pt", color: "#555" }}>{c.year}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 10 }}>
      <h2
        style={{
          fontSize: "10.5pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: "0 0 4px",
          paddingBottom: 2,
          borderBottom: "1px solid #222",
          fontFamily: "'Space Grotesk','Inter',sans-serif",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}