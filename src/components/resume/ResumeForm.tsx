import { useRef } from "react";
import { Trash2, Upload, X, Target } from "lucide-react";
import type { ResumeData } from "@/lib/resume-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SkillsAdvisor } from "@/components/resume/SkillsAdvisor";
import { SUGGESTED_ROLES } from "@/lib/skills-advisor";

interface Props {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export function ResumeForm({ data, setData }: Props) {
  const photoRef = useRef<HTMLInputElement>(null);

  const updatePersonal = <K extends keyof ResumeData["personal"]>(
    k: K,
    v: ResumeData["personal"][K],
  ) => setData((d) => ({ ...d, personal: { ...d.personal, [k]: v } }));

  const onPhoto = (file: File) => {
    const r = new FileReader();
    r.onload = () => updatePersonal("photo", String(r.result));
    r.readAsDataURL(file);
  };

  const addSkill = (val: string) => {
    const v = val.trim();
    if (!v || data.skills.includes(v)) return;
    setData((d) => ({ ...d, skills: [...d.skills, v] }));
  };

  return (
    <div className="space-y-6">
      {/* Personal */}
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Full Name">
            <Input
              value={data.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <Input
              value={data.personal.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={data.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
            />
          </Field>
          <Field label="Location">
            <Input
              value={data.personal.location}
              onChange={(e) => updatePersonal("location", e.target.value)}
            />
          </Field>
          <Field label="LinkedIn">
            <Input
              value={data.personal.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
            />
          </Field>
          <Field label="Portfolio">
            <Input
              value={data.personal.portfolio}
              onChange={(e) => updatePersonal("portfolio", e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-3 flex items-center gap-3">
          {data.personal.photo ? (
            <div className="relative">
              <img
                src={data.personal.photo}
                alt=""
                className="w-16 h-16 rounded-lg object-cover border border-border"
              />
              <button
                onClick={() => updatePersonal("photo", "")}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg glass flex items-center justify-center text-muted-foreground">
              <Upload className="w-5 h-5" />
            </div>
          )}
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onPhoto(e.target.files[0])}
          />
          <Button variant="outline" onClick={() => photoRef.current?.click()}>
            Upload Profile Photo
          </Button>
        </div>
      </Card>

      {/* Summary */}
      <Card title="Professional Summary" hint="3–4 lines max for ATS friendliness">
        <Textarea
          rows={4}
          maxLength={500}
          value={data.summary}
          onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
          placeholder="Write a concise summary of your experience, skills, and goals..."
        />
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {data.summary.length}/500
        </div>
      </Card>

      {/* Skills */}
      <Card title="Skills">
        <div className="flex flex-wrap gap-2 mb-3">
          {data.skills.map((s) => (
            <span
              key={s}
              className="glass px-3 py-1 rounded-full text-sm flex items-center gap-2 smooth hover:glow-primary"
            >
              {s}
              <button
                onClick={() =>
                  setData((d) => ({ ...d, skills: d.skills.filter((x) => x !== s) }))
                }
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <Input
          placeholder="Type a skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </Card>

      {/* Experience */}
      <Card title="Experience">
        {data.experience.map((x, i) => (
          <div key={x.id} className="glass rounded-xl p-3 mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Experience #{i + 1}</span>
              <button
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.filter((e) => e.id !== x.id),
                  }))
                }
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                placeholder="Company"
                value={x.company}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((it) =>
                      it.id === x.id ? { ...it, company: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="Role"
                value={x.role}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((it) =>
                      it.id === x.id ? { ...it, role: e.target.value } : it,
                    ),
                  }))
                }
              />
            </div>
            <Input
              placeholder="Duration (e.g. Jan 2023 - Present)"
              value={x.duration}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  experience: d.experience.map((it) =>
                    it.id === x.id ? { ...it, duration: e.target.value } : it,
                  ),
                }))
              }
            />
            <Textarea
              rows={3}
              placeholder="Achievements (one bullet per line)"
              value={x.bullets}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  experience: d.experience.map((it) =>
                    it.id === x.id ? { ...it, bullets: e.target.value } : it,
                  ),
                }))
              }
            />
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              experience: [
                ...d.experience,
                { id: uid(), company: "", role: "", duration: "", bullets: "" },
              ],
            }))
          }
          label="Add Experience"
        />
      </Card>

      {/* Projects */}
      <Card title="Projects">
        {data.projects.map((p, i) => (
          <div key={p.id} className="glass rounded-xl p-3 mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Project #{i + 1}</span>
              <button
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.filter((e) => e.id !== p.id),
                  }))
                }
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                placeholder="Title"
                value={p.title}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((it) =>
                      it.id === p.id ? { ...it, title: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="Tech Stack"
                value={p.stack}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((it) =>
                      it.id === p.id ? { ...it, stack: e.target.value } : it,
                    ),
                  }))
                }
              />
            </div>
            <Input
              placeholder="GitHub or Demo Link"
              value={p.link}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  projects: d.projects.map((it) =>
                    it.id === p.id ? { ...it, link: e.target.value } : it,
                  ),
                }))
              }
            />
            <Textarea
              rows={2}
              placeholder="Description"
              value={p.description}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  projects: d.projects.map((it) =>
                    it.id === p.id ? { ...it, description: e.target.value } : it,
                  ),
                }))
              }
            />
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              projects: [
                ...d.projects,
                { id: uid(), title: "", stack: "", description: "", link: "" },
              ],
            }))
          }
          label="Add Project"
        />
      </Card>

      {/* Education */}
      <Card title="Education">
        {data.education.map((ed) => (
          <div key={ed.id} className="glass rounded-xl p-3 mb-3 space-y-2">
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    education: d.education.filter((e) => e.id !== ed.id),
                  }))
                }
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) =>
                      it.id === ed.id ? { ...it, degree: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="College"
                value={ed.college}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) =>
                      it.id === ed.id ? { ...it, college: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="Year"
                value={ed.year}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) =>
                      it.id === ed.id ? { ...it, year: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="CGPA (optional)"
                value={ed.cgpa}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) =>
                      it.id === ed.id ? { ...it, cgpa: e.target.value } : it,
                    ),
                  }))
                }
              />
            </div>
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              education: [
                ...d.education,
                { id: uid(), degree: "", college: "", year: "", cgpa: "" },
              ],
            }))
          }
          label="Add Education"
        />
      </Card>

      {/* Certifications */}
      <Card title="Certifications" hint="Optional">
        {data.certifications.map((c) => (
          <div key={c.id} className="glass rounded-xl p-3 mb-3 space-y-2">
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    certifications: d.certifications.filter((e) => e.id !== c.id),
                  }))
                }
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Name"
                value={c.name}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    certifications: d.certifications.map((it) =>
                      it.id === c.id ? { ...it, name: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="Issuer"
                value={c.issuer}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    certifications: d.certifications.map((it) =>
                      it.id === c.id ? { ...it, issuer: e.target.value } : it,
                    ),
                  }))
                }
              />
              <Input
                placeholder="Year"
                value={c.year}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    certifications: d.certifications.map((it) =>
                      it.id === c.id ? { ...it, year: e.target.value } : it,
                    ),
                  }))
                }
              />
            </div>
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              certifications: [
                ...d.certifications,
                { id: uid(), name: "", issuer: "", year: "" },
              ],
            }))
          }
          label="Add Certification"
        />
      </Card>
    </div>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5 smooth">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-1 block">{label}</Label>
      {children}
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary smooth flex items-center justify-center gap-2"
    >
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}