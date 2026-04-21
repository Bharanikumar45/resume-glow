import { forwardRef } from "react";
import { Mail, Phone, MapPin, Link2, Globe, User, Briefcase, FolderGit2, Crown, Trophy, Sparkles, Award, GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import type { ResumeData } from "@/lib/resume-types";

interface Props {
  data: ResumeData;
}

// Modern, premium palette
const PRIMARY = "#0B1F3A";       // deep navy
const PRIMARY_2 = "#13335C";
const ACCENT = "#D4A574";        // warm champagne gold
const ACCENT_DARK = "#A87740";
const INK = "#0B1F3A";
const BODY = "#334155";
const MUTED = "#64748b";
const PAGE_BG = "#ffffff";
const SOFT = "#f8fafc";
const RULE = "#e2e8f0";

const A4 = { width: "210mm", height: "297mm" };

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
      className="mx-auto"
      style={{
        width: A4.width,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "9.8pt",
        lineHeight: 1.55,
        color: INK,
      }}
    >
      {/* ========================== PAGE 1 ========================== */}
      <div
        className="bg-white shadow-2xl"
        style={{
          width: A4.width,
          height: A4.height,
          background: PAGE_BG,
          display: "grid",
          gridTemplateColumns: "78mm 1fr",
          overflow: "hidden",
          pageBreakAfter: "always",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            background: `linear-gradient(180deg, ${PRIMARY} 0%, ${PRIMARY_2} 100%)`,
            color: "#e2e8f0",
            padding: "16mm 11mm",
            position: "relative",
          }}
        >
          {/* gold top stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5mm", background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DARK})` }} />

          {/* Avatar */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            {personal.photo ? (
              <img
                src={personal.photo}
                alt=""
                style={{
                  width: 120, height: 120, borderRadius: "50%",
                  objectFit: "cover",
                  border: `3px solid ${ACCENT}`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: PRIMARY_2,
                  border: `3px solid ${ACCENT}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "32pt", fontWeight: 800, color: ACCENT,
                  letterSpacing: "-0.02em",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                {initials}
              </div>
            )}
          </div>

          <SideHeading icon={<Phone size={10} />}>Contact</SideHeading>
          <div style={{ fontSize: "8.5pt", lineHeight: 1.7 }}>
            {personal.phone && <ContactRow icon={<Phone size={10} />} text={personal.phone} />}
            {personal.email && <ContactRow icon={<Mail size={10} />} text={personal.email} />}
            {personal.location && <ContactRow icon={<MapPin size={10} />} text={personal.location} />}
            {personal.linkedin && <ContactRow icon={<Link2 size={10} />} text={personal.linkedin} />}
            {personal.portfolio && <ContactRow icon={<Globe size={10} />} text={personal.portfolio} />}
          </div>

          {education.length > 0 && (
            <>
              <SideHeading icon={<GraduationCap size={11} />}>Education</SideHeading>
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: "9.5pt", color: "#fff" }}>{ed.degree}</div>
                  {ed.college && (
                    <div style={{ fontSize: "8.5pt", fontStyle: "italic", color: "#cbd5e1" }}>{ed.college}</div>
                  )}
                  <div style={{ color: ACCENT, fontSize: "8pt", marginTop: 2, fontWeight: 600 }}>
                    {ed.year}{ed.cgpa && ` · CGPA ${ed.cgpa}`}
                  </div>
                </div>
              ))}
            </>
          )}

          {hardSkills.length > 0 && (
            <>
              <SideHeading icon={<Sparkles size={10} />}>Hard Skills</SideHeading>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 5px" }}>
                {hardSkills.map((s, i) => (
                  <span key={i}
                    style={{
                      fontSize: "8pt", padding: "2.5px 8px",
                      background: `${ACCENT}26`, color: ACCENT,
                      borderRadius: 999, fontWeight: 600,
                      border: `1px solid ${ACCENT}55`,
                    }}>
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}

          {softSkills.length > 0 && (
            <>
              <SideHeading icon={<User size={10} />}>Soft Skills</SideHeading>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: "8.7pt" }}>
                {softSkills.map((s, i) => (
                  <li key={i} style={{ marginBottom: 4, paddingLeft: 12, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 6, width: 5, height: 5, borderRadius: "50%", background: ACCENT }} />
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          {languages.length > 0 && (
            <>
              <SideHeading icon={<LanguagesIcon size={10} />}>Languages</SideHeading>
              {languages.map((l) => (
                <div key={l.id} style={{ marginBottom: 5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8.7pt" }}>
                    <span style={{ fontWeight: 700, color: "#fff" }}>{l.name}</span>
                    <span style={{ color: ACCENT, fontStyle: "italic", fontSize: "8pt" }}>{l.level}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </aside>

        {/* MAIN PAGE 1 */}
        <main style={{ padding: "14mm 14mm 12mm" }}>
          {/* Name block */}
          <header style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "8pt", letterSpacing: "0.3em", textTransform: "uppercase", color: ACCENT_DARK, fontWeight: 700, marginBottom: 4 }}>
              Curriculum Vitae
            </div>
            <h1 style={{ fontSize: "30pt", fontWeight: 800, margin: 0, letterSpacing: "-0.025em", color: PRIMARY, lineHeight: 1 }}>
              {(personal.fullName || "Your Name").split(" ")[0]}
              {personal.fullName?.split(" ").length > 1 && (
                <span style={{ fontWeight: 300, color: PRIMARY }}>
                  {" "}{personal.fullName.split(" ").slice(1).join(" ")}
                </span>
              )}
            </h1>
            {targetPosition && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                <div style={{ width: 32, height: 2.5, background: ACCENT }} />
                <span style={{ fontSize: "11pt", fontWeight: 600, color: ACCENT_DARK, letterSpacing: "0.05em", fontStyle: "italic" }}>
                  {targetPosition}
                </span>
              </div>
            )}
          </header>

          {summary && (
            <MainSection title="Profile" icon={<User size={11} />}>
              <p style={{ margin: 0, textAlign: "justify", color: BODY, fontSize: "9.8pt", lineHeight: 1.6 }}>
                <span style={{ fontSize: "16pt", fontWeight: 800, color: ACCENT, float: "left", lineHeight: 0.9, marginRight: 4, marginTop: 2 }}>
                  {summary.charAt(0)}
                </span>
                {summary.slice(1)}
              </p>
            </MainSection>
          )}

          {experience.length > 0 && (
            <MainSection title="Work Experience" icon={<Briefcase size={11} />}>
              <div style={{ position: "relative", paddingLeft: 16 }}>
                <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1.5, background: `linear-gradient(180deg, ${ACCENT}, ${RULE})` }} />
                {experience.map((e) => (
                  <div key={e.id} style={{ marginBottom: 11, position: "relative" }}>
                    <div style={{
                      position: "absolute", left: -16, top: 4, width: 11, height: 11,
                      borderRadius: "50%", background: ACCENT,
                      border: "2px solid #fff",
                      boxShadow: `0 0 0 1.5px ${ACCENT}`,
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                      <div>
                        <strong style={{ fontSize: "10.8pt", color: PRIMARY }}>{e.role}</strong>
                        {e.company && (
                          <span style={{ fontWeight: 500, color: ACCENT_DARK, fontStyle: "italic" }}> @ {e.company}</span>
                        )}
                      </div>
                      <span style={{
                        fontSize: "8.5pt", color: PRIMARY, fontWeight: 700, whiteSpace: "nowrap",
                        background: `${ACCENT}26`, padding: "2px 8px", borderRadius: 999,
                        border: `1px solid ${ACCENT}55`,
                      }}>
                        {e.duration}
                      </span>
                    </div>
                    <ul style={{ margin: "4px 0 0", paddingLeft: 16, color: BODY }}>
                      {e.bullets.split("\n").filter((b) => b.trim()).map((b, i) => (
                        <li key={i} style={{ marginBottom: 1.5 }}>{b.replace(/^[-•]\s*/, "")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection title="Featured Projects" icon={<FolderGit2 size={11} />}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {projects.map((p) => (
                  <div key={p.id} style={{
                    background: SOFT, borderLeft: `3px solid ${ACCENT}`,
                    padding: "6px 10px", borderRadius: 4,
                  }}>
                    <div style={{ fontWeight: 700, color: PRIMARY, fontSize: "10pt" }}>{p.title}</div>
                    {p.stack && <div style={{ fontSize: "8.5pt", color: ACCENT_DARK, fontStyle: "italic", marginBottom: 2 }}>{p.stack}</div>}
                    {p.description && <div style={{ fontSize: "9pt", color: BODY }}>{p.description}</div>}
                    {p.link && <div style={{ fontSize: "8pt", color: ACCENT_DARK, marginTop: 2, fontWeight: 600 }}>{p.link}</div>}
                  </div>
                ))}
              </div>
            </MainSection>
          )}
        </main>
      </div>

      {/* ========================== PAGE 2 ========================== */}
      <div
        className="bg-white shadow-2xl"
        style={{
          width: A4.width,
          height: A4.height,
          background: PAGE_BG,
          marginTop: "8mm",
          padding: "14mm 16mm",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Page 2 header banner */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5mm", background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_2}, ${ACCENT})` }} />

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          paddingBottom: 8, marginBottom: 10, borderBottom: `1.5px solid ${RULE}`,
        }}>
          <div>
            <div style={{ fontSize: "16pt", fontWeight: 800, color: PRIMARY, letterSpacing: "-0.02em" }}>
              {personal.fullName || "Your Name"}
            </div>
            <div style={{ fontSize: "8pt", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
              Page 2 — Beyond the Résumé
            </div>
          </div>
          <div style={{ fontSize: "8.5pt", color: ACCENT_DARK, fontStyle: "italic", fontWeight: 600 }}>
            {targetPosition || ""}
          </div>
        </div>

        {leadership.length > 0 && (
          <MainSection title="Leadership" icon={<Crown size={11} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {leadership.map((it) => (
                <DetailCard key={it.id} title={it.title} detail={it.detail} />
              ))}
            </div>
          </MainSection>
        )}

        {achievements.length > 0 && (
          <MainSection title="Achievements & Awards" icon={<Trophy size={11} />}>
            {achievements.map((it) => (
              <div key={it.id} style={{
                display: "flex", gap: 10, marginBottom: 6,
                paddingBottom: 6, borderBottom: `1px dashed ${RULE}`,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 2,
                }}>
                  <Award size={12} />
                </div>
                <div>
                  <strong style={{ color: PRIMARY, fontSize: "10pt" }}>{it.title}</strong>
                  {it.detail && <div style={{ color: BODY, fontSize: "9pt", fontStyle: "italic" }}>{it.detail}</div>}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {extracurricular.length > 0 && (
          <MainSection title="Extra-Curricular" icon={<Sparkles size={11} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {extracurricular.map((it) => (
                <DetailCard key={it.id} title={it.title} detail={it.detail} />
              ))}
            </div>
          </MainSection>
        )}

        {certifications.length > 0 && (
          <MainSection title="Certifications" icon={<Award size={11} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {certifications.map((c) => (
                <div key={c.id} style={{
                  background: SOFT, padding: "8px 10px", borderRadius: 6,
                  borderTop: `2px solid ${ACCENT}`,
                }}>
                  <div style={{ fontWeight: 700, color: PRIMARY, fontSize: "9.5pt" }}>{c.name}</div>
                  <div style={{ color: ACCENT_DARK, fontSize: "8.5pt", fontStyle: "italic" }}>
                    {c.issuer}
                  </div>
                  <div style={{ color: MUTED, fontSize: "8pt", fontWeight: 600, marginTop: 1 }}>{c.year}</div>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Closing flourish */}
        <div style={{
          position: "absolute", bottom: "8mm", left: 0, right: 0,
          textAlign: "center", color: MUTED, fontSize: "7.5pt",
          letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 30, height: 1, background: ACCENT }} />
            References available upon request
            <span style={{ width: 30, height: 1, background: ACCENT }} />
          </span>
        </div>
      </div>
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

function SideHeading({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "9.5pt", fontWeight: 800, textTransform: "uppercase",
      letterSpacing: "0.18em", color: ACCENT,
      margin: "18px 0 8px", paddingBottom: 5,
      borderBottom: `1px solid ${ACCENT}55`,
      display: "flex", alignItems: "center", gap: 7,
    }}>
      {icon}
      {children}
    </h2>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, wordBreak: "break-word" }}>
      <span style={{
        width: 18, height: 18, borderRadius: 4,
        background: `${ACCENT}26`, color: ACCENT,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ minWidth: 0, color: "#e2e8f0" }}>{text}</span>
    </div>
  );
}

function MainSection({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 12, breakInside: "avoid" }}>
      <h2 style={{
        fontSize: "11pt", fontWeight: 800, textTransform: "uppercase",
        letterSpacing: "0.14em", margin: "0 0 7px", color: PRIMARY,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {icon && (
          <span style={{
            width: 22, height: 22, borderRadius: 5,
            background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_2})`,
            color: ACCENT, display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 2px 6px rgba(11,31,58,0.25)`,
          }}>
            {icon}
          </span>
        )}
        <span>{title}</span>
        <span style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginLeft: 4 }} />
      </h2>
      {children}
    </section>
  );
}

function DetailCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div style={{
      background: SOFT, padding: "8px 10px", borderRadius: 6,
      borderLeft: `3px solid ${ACCENT}`,
    }}>
      <strong style={{ color: PRIMARY, fontSize: "10pt" }}>{title}</strong>
      {detail && <div style={{ color: BODY, fontSize: "9pt", marginTop: 2 }}>{detail}</div>}
    </div>
  );
}
