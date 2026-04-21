import { forwardRef } from "react";
import { Mail, Phone, MapPin, Link2, Globe, User } from "lucide-react";
import type { ResumeData } from "@/lib/resume-types";

interface Props {
  data: ResumeData;
}

// Premium ATS-safe palette
const ACCENT = "#0F172A"; // deep slate
const ACCENT_2 = "#1E293B";
const HIGHLIGHT = "#F59E0B"; // warm gold
const INK = "#0f172a";
const MUTED = "#64748b";
const SIDEBAR_TEXT = "#e2e8f0";
const SIDEBAR_MUTED = "#94a3b8";

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

  const initials =
    (personal.fullName || "Y N")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "YN";

  return (
    <div
      ref={ref}
      id="resume-page"
      className="mx-auto bg-white shadow-2xl"
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Inter', Arial, sans-serif",
        fontSize: "9.8pt",
        lineHeight: 1.5,
        color: INK,
        display: "grid",
        gridTemplateColumns: "75mm 1fr",
        overflow: "hidden",
      }}
    >
      {/* ============ SIDEBAR ============ */}
      <aside
        style={{
          background: `linear-gradient(165deg, ${ACCENT} 0%, ${ACCENT_2} 100%)`,
          color: SIDEBAR_TEXT,
          padding: "14mm 10mm",
          position: "relative",
        }}
      >
        {/* Decorative corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4mm",
            background: HIGHLIGHT,
          }}
        />

        {/* Photo / Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          {personal.photo ? (
            <img
              src={personal.photo}
              alt=""
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${HIGHLIGHT}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
            />
          ) : (
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: ACCENT_2,
                border: `3px solid ${HIGHLIGHT}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28pt",
                fontWeight: 700,
                color: HIGHLIGHT,
                fontFamily: "'Inter', Arial, sans-serif",
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Contact */}
        <SideHeading>Contact</SideHeading>
        <div style={{ fontSize: "8.5pt", lineHeight: 1.7 }}>
          {personal.phone && <ContactRow icon={<Phone size={10} />} text={personal.phone} />}
          {personal.email && <ContactRow icon={<Mail size={10} />} text={personal.email} />}
          {personal.location && <ContactRow icon={<MapPin size={10} />} text={personal.location} />}
          {personal.linkedin && <ContactRow icon={<Link2 size={10} />} text={personal.linkedin} />}
          {personal.portfolio && <ContactRow icon={<Globe size={10} />} text={personal.portfolio} />}
        </div>

        {education.length > 0 && (
          <>
            <SideHeading>Education</SideHeading>
            {education.map((ed) => (
              <div key={ed.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: "9pt", color: "#fff" }}>{ed.degree}</div>
                {ed.college && (
                  <div style={{ color: SIDEBAR_TEXT, fontSize: "8.5pt" }}>{ed.college}</div>
                )}
                <div style={{ color: SIDEBAR_MUTED, fontSize: "8pt", marginTop: 1 }}>
                  {ed.year}
                  {ed.cgpa && ` · CGPA ${ed.cgpa}`}
                </div>
              </div>
            ))}
          </>
        )}

        {hardSkills.length > 0 && (
          <>
            <SideHeading>Hard Skills</SideHeading>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 5px" }}>
              {hardSkills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "8pt",
                    padding: "2px 7px",
                    background: "rgba(245,158,11,0.18)",
                    color: HIGHLIGHT,
                    borderRadius: 3,
                    fontWeight: 600,
                    border: `1px solid rgba(245,158,11,0.35)`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {softSkills.length > 0 && (
          <>
            <SideHeading>Soft Skills</SideHeading>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: "8.5pt" }}>
              {softSkills.map((s, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: 3,
                    paddingLeft: 10,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 6,
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: HIGHLIGHT,
                    }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}

        {languages.length > 0 && (
          <>
            <SideHeading>Languages</SideHeading>
            {languages.map((l) => (
              <div
                key={l.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 3,
                  fontSize: "8.5pt",
                }}
              >
                <span style={{ fontWeight: 600, color: "#fff" }}>{l.name}</span>
                <span style={{ color: SIDEBAR_MUTED }}>{l.level}</span>
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <SideHeading>Certifications</SideHeading>
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: 5 }}>
                <div style={{ fontWeight: 600, fontSize: "8.5pt", color: "#fff" }}>{c.name}</div>
                <div style={{ color: SIDEBAR_MUTED, fontSize: "8pt" }}>
                  {[c.issuer, c.year].filter(Boolean).join(" · ")}
                </div>
              </div>
            ))}
          </>
        )}
      </aside>

      {/* ============ MAIN ============ */}
      <main style={{ padding: "14mm 14mm 14mm 12mm" }}>
        {/* Name + Title block */}
        <header style={{ marginBottom: 12 }}>
          <h1
            style={{
              fontSize: "26pt",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
              color: ACCENT,
              lineHeight: 1.1,
            }}
          >
            {personal.fullName || "Your Name"}
          </h1>
          {targetPosition && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <div style={{ width: 28, height: 2, background: HIGHLIGHT }} />
              <span
                style={{
                  fontSize: "11pt",
                  fontWeight: 600,
                  color: HIGHLIGHT,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {targetPosition}
              </span>
            </div>
          )}
        </header>

        {summary && (
          <MainSection title="Profile" icon={<User size={11} />}>
            <p style={{ margin: 0, textAlign: "justify", color: "#334155" }}>{summary}</p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Work Experience">
            <div style={{ position: "relative", paddingLeft: 14 }}>
              {/* timeline line */}
              <div
                style={{
                  position: "absolute",
                  left: 4,
                  top: 4,
                  bottom: 4,
                  width: 1.5,
                  background: "#e2e8f0",
                }}
              />
              {experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 10, position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -14,
                      top: 4,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: HIGHLIGHT,
                      border: "2px solid #fff",
                      boxShadow: `0 0 0 1.5px ${HIGHLIGHT}`,
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <strong style={{ fontSize: "10.5pt", color: ACCENT }}>
                      {e.role}
                      {e.company && (
                        <span style={{ fontWeight: 500, color: "#475569" }}> · {e.company}</span>
                      )}
                    </strong>
                    <span
                      style={{
                        fontSize: "8.5pt",
                        color: HIGHLIGHT,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        background: "rgba(245,158,11,0.1)",
                        padding: "1px 7px",
                        borderRadius: 3,
                        height: "fit-content",
                      }}
                    >
                      {e.duration}
                    </span>
                  </div>
                  <ul style={{ margin: "3px 0 0", paddingLeft: 16, color: "#334155" }}>
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
            </div>
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <strong style={{ color: ACCENT }}>
                    {p.title}
                    {p.stack && (
                      <span style={{ fontWeight: 400, color: MUTED }}> — {p.stack}</span>
                    )}
                  </strong>
                  {p.link && (
                    <span style={{ fontSize: "8.5pt", color: HIGHLIGHT, fontWeight: 500 }}>
                      {p.link}
                    </span>
                  )}
                </div>
                {p.description && (
                  <div style={{ marginTop: 1, color: "#334155" }}>{p.description}</div>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {leadership.length > 0 && (
          <MainSection title="Leadership">
            {leadership.map((it) => (
              <div key={it.id} style={{ marginBottom: 5 }}>
                <strong style={{ color: ACCENT }}>{it.title}</strong>
                {it.detail && <div style={{ color: "#334155" }}>{it.detail}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {achievements.length > 0 && (
          <MainSection title="Achievements & Awards">
            <ul style={{ margin: 0, paddingLeft: 16, color: "#334155" }}>
              {achievements.map((it) => (
                <li key={it.id} style={{ marginBottom: 2 }}>
                  <strong style={{ color: ACCENT }}>{it.title}</strong>
                  {it.detail && <span style={{ color: MUTED }}> — {it.detail}</span>}
                </li>
              ))}
            </ul>
          </MainSection>
        )}

        {extracurricular.length > 0 && (
          <MainSection title="Extra-Curricular">
            {extracurricular.map((it) => (
              <div key={it.id} style={{ marginBottom: 4 }}>
                <strong style={{ color: ACCENT }}>{it.title}</strong>
                {it.detail && <span style={{ color: MUTED }}> — {it.detail}</span>}
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

function SideHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "9.5pt",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: HIGHLIGHT,
        margin: "16px 0 8px",
        paddingBottom: 4,
        borderBottom: `1px solid rgba(245,158,11,0.4)`,
      }}
    >
      {children}
    </h2>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, wordBreak: "break-word" }}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          background: "rgba(245,158,11,0.15)",
          color: HIGHLIGHT,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ minWidth: 0 }}>{text}</span>
    </div>
  );
}

function MainSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 10, breakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: "0 0 6px",
          color: ACCENT,
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
        }}
      >
        {icon && (
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: ACCENT,
              color: HIGHLIGHT,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>
        )}
        {title}
        <span style={{ flex: 1, height: 1.5, background: "#e2e8f0", marginLeft: 4 }} />
      </h2>
      {children}
    </section>
  );
}
