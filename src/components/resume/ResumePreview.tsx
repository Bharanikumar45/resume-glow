import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resume-types";

interface Props {
  data: ResumeData;
}

const ACCENT = "#2563eb"; // ATS-safe blue
const INK = "#1a1a1a";
const MUTED = "#555";
const RULE = "#e5e7eb";

export const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const {
    personal,
    targetPosition,
    summary,
    education,
    hardSkills,
    softSkills,
    languages,
    experience,
    projects,
    certifications,
    leadership,
    extracurricular,
    achievements,
  } = data;

  return (
    <div
      ref={ref}
      id="resume-page"
      className="mx-auto bg-white shadow-2xl"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "12mm 14mm",
        fontFamily: "'Inter', Arial, sans-serif",
        fontSize: "10pt",
        lineHeight: 1.5,
        color: INK,
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          paddingBottom: "10px",
          marginBottom: "10px",
          borderBottom: `3px solid ${ACCENT}`,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: "24pt",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
              color: INK,
              fontFamily: "'Inter', Arial, sans-serif",
            }}
          >
            {personal.fullName || "Your Name"}
          </h1>
          {targetPosition && (
            <div
              style={{
                fontSize: "11pt",
                fontWeight: 600,
                color: ACCENT,
                marginTop: 2,
                letterSpacing: "0.02em",
              }}
            >
              {targetPosition}
            </div>
          )}
          <div style={{ marginTop: 6, fontSize: "9pt", color: MUTED }}>
            {[personal.location, personal.phone, personal.email].filter(Boolean).join("  •  ")}
          </div>
          <div style={{ marginTop: 1, fontSize: "9pt", color: MUTED }}>
            {[personal.linkedin, personal.portfolio].filter(Boolean).join("  •  ")}
          </div>
        </div>
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            style={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              objectFit: "cover",
              border: `2px solid ${ACCENT}`,
            }}
          />
        )}
      </header>

      {summary && (
        <Section title="Professional Summary">
          <p style={{ margin: 0, textAlign: "justify" }}>{summary}</p>
        </Section>
      )}

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr", gap: "18px", marginTop: 10 }}>
        {/* Main column */}
        <div>
          {experience.length > 0 && (
            <Section title="Work Experience">
              {experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <strong style={{ fontSize: "10.5pt", color: INK }}>
                      {e.role}
                      {e.company && (
                        <span style={{ fontWeight: 500, color: ACCENT }}> · {e.company}</span>
                      )}
                    </strong>
                    <span style={{ fontSize: "9pt", color: MUTED, whiteSpace: "nowrap" }}>
                      {e.duration}
                    </span>
                  </div>
                  <ul style={{ margin: "3px 0 0", paddingLeft: 16 }}>
                    {e.bullets
                      .split("\n")
                      .filter((b) => b.trim())
                      .map((b, i) => (
                        <li key={i} style={{ marginBottom: 1 }}>
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
                <div key={p.id} style={{ marginBottom: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <strong>
                      {p.title}
                      {p.stack && (
                        <span style={{ fontWeight: 400, color: MUTED }}> — {p.stack}</span>
                      )}
                    </strong>
                    {p.link && <span style={{ fontSize: "9pt", color: ACCENT }}>{p.link}</span>}
                  </div>
                  {p.description && <div style={{ marginTop: 1 }}>{p.description}</div>}
                </div>
              ))}
            </Section>
          )}

          {leadership.length > 0 && (
            <Section title="Leadership">
              {leadership.map((it) => (
                <div key={it.id} style={{ marginBottom: 5 }}>
                  <strong>{it.title}</strong>
                  {it.detail && <div style={{ color: INK }}>{it.detail}</div>}
                </div>
              ))}
            </Section>
          )}

          {achievements.length > 0 && (
            <Section title="Achievements & Awards">
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {achievements.map((it) => (
                  <li key={it.id} style={{ marginBottom: 2 }}>
                    <strong>{it.title}</strong>
                    {it.detail && <span style={{ color: MUTED }}> — {it.detail}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {extracurricular.length > 0 && (
            <Section title="Extra-Curricular">
              {extracurricular.map((it) => (
                <div key={it.id} style={{ marginBottom: 4 }}>
                  <strong>{it.title}</strong>
                  {it.detail && <span style={{ color: MUTED }}> — {it.detail}</span>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {hardSkills.length > 0 && (
            <Section title="Hard Skills">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 5px" }}>
                {hardSkills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "8.5pt",
                      padding: "2px 7px",
                      background: `${ACCENT}14`,
                      color: ACCENT,
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {softSkills.length > 0 && (
            <Section title="Soft Skills">
              <ul style={{ margin: 0, paddingLeft: 14 }}>
                {softSkills.map((s, i) => (
                  <li key={i} style={{ marginBottom: 1, fontSize: "9.5pt" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages">
              {languages.map((l) => (
                <div
                  key={l.id}
                  style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, fontSize: "9.5pt" }}
                >
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ color: MUTED }}>{l.level}</span>
                </div>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: 5 }}>
                  <div style={{ fontWeight: 700, fontSize: "9.5pt" }}>{ed.degree}</div>
                  {ed.college && <div style={{ color: INK, fontSize: "9pt" }}>{ed.college}</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", color: MUTED, fontSize: "8.5pt" }}>
                    <span>{ed.year}</span>
                    {ed.cgpa && <span>CGPA {ed.cgpa}</span>}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications">
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: "9.5pt" }}>{c.name}</div>
                  <div style={{ color: MUTED, fontSize: "8.5pt" }}>
                    {[c.issuer, c.year].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 8, marginBottom: 4, breakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "10pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 5px",
          paddingBottom: 3,
          borderBottom: `1.5px solid ${RULE}`,
          color: ACCENT,
          fontFamily: "'Inter', Arial, sans-serif",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
