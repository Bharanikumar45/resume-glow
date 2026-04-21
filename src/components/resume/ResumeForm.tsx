import { useRef } from "react";
import { Plus, Trash2, Upload, X, Target, Wrench, Heart, Languages, Crown, Sparkles, Trophy } from "lucide-react";
import type { ResumeData } from "@/lib/resume-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

  const addToList = (key: "hardSkills" | "softSkills", val: string) => {
    const v = val.trim();
    if (!v) return;
    setData((d) => (d[key].includes(v) ? d : { ...d, [key]: [...d[key], v] }));
  };

  const removeFromList = (key: "hardSkills" | "softSkills", v: string) =>
    setData((d) => ({ ...d, [key]: d[key].filter((x) => x !== v) }));

  const combinedSkills = [...data.hardSkills, ...data.softSkills];

  return (
    <div className="space-y-6">
      {/* Target Position */}
      <Card title="Target Position" icon={<Target className="w-5 h-5 text-white" />} hint="Tell us the role you're applying for">
        <Input
          list="role-suggestions"
          placeholder="e.g. Frontend Developer, Data Scientist, DevOps Engineer"
          value={data.targetPosition}
          onChange={(e) => setData((d) => ({ ...d, targetPosition: e.target.value }))}
        />
        <datalist id="role-suggestions">
          {SUGGESTED_ROLES.map((r) => (
            <option key={r} value={r.replace(/\b\w/g, (l) => l.toUpperCase())} />
          ))}
        </datalist>
        <p className="text-xs text-muted-foreground mt-1.5">
          We'll check if your skills match and suggest courses if you need more.
        </p>
      </Card>

      {/* Personal */}
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Full Name">
            <Input value={data.personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input type="email" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} />
          </Field>
          <Field label="LinkedIn">
            <Input value={data.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} />
          </Field>
          <Field label="Portfolio">
            <Input value={data.personal.portfolio} onChange={(e) => updatePersonal("portfolio", e.target.value)} />
          </Field>
        </div>
        <div className="mt-3 flex items-center gap-3">
          {data.personal.photo ? (
            <div className="relative">
              <img src={data.personal.photo} alt="" className="w-16 h-16 rounded-lg object-cover border border-border" />
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
        <div className="text-xs text-muted-foreground mt-1 text-right">{data.summary.length}/500</div>
      </Card>

      {/* Hard Skills */}
      <Card title="Hard Skills" icon={<Wrench className="w-5 h-5 text-white" />} hint="Technical / tools (e.g. React, SQL, Figma)">
        <ChipList items={data.hardSkills} onRemove={(v) => removeFromList("hardSkills", v)} variant="primary" />
        <Input
          placeholder="Type a hard skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToList("hardSkills", (e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </Card>

      {/* Soft Skills */}
      <Card title="Soft Skills" icon={<Heart className="w-5 h-5 text-white" />} hint="Interpersonal (e.g. Leadership, Communication)">
        <ChipList items={data.softSkills} onRemove={(v) => removeFromList("softSkills", v)} variant="accent" />
        <Input
          placeholder="Type a soft skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToList("softSkills", (e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </Card>

      {/* Skills Advisor */}
      <Card title="ATS & Skills Advisor" icon={<Sparkles className="w-5 h-5 text-white" />}>
        <SkillsAdvisor targetPosition={data.targetPosition} skills={combinedSkills} />
      </Card>

      {/* Languages */}
      <Card title="Languages" icon={<Languages className="w-5 h-5 text-white" />}>
        {data.languages.map((l) => (
          <div key={l.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
            <Input
              placeholder="Language (e.g. English)"
              value={l.name}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  languages: d.languages.map((it) => (it.id === l.id ? { ...it, name: e.target.value } : it)),
                }))
              }
            />
            <Input
              placeholder="Proficiency (Native, Professional, Basic)"
              value={l.level}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  languages: d.languages.map((it) => (it.id === l.id ? { ...it, level: e.target.value } : it)),
                }))
              }
            />
            <button
              onClick={() => setData((d) => ({ ...d, languages: d.languages.filter((x) => x.id !== l.id) }))}
              className="px-2 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({ ...d, languages: [...d.languages, { id: uid(), name: "", level: "" }] }))
          }
          label="Add Language"
        />
      </Card>

      {/* Experience */}
      <Card title="Work Experience">
        {data.experience.map((x, i) => (
          <div key={x.id} className="glass rounded-xl p-3 mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Experience #{i + 1}</span>
              <button
                onClick={() =>
                  setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== x.id) }))
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
                    experience: d.experience.map((it) => (it.id === x.id ? { ...it, company: e.target.value } : it)),
                  }))
                }
              />
              <Input
                placeholder="Role"
                value={x.role}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((it) => (it.id === x.id ? { ...it, role: e.target.value } : it)),
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
                  experience: d.experience.map((it) => (it.id === x.id ? { ...it, duration: e.target.value } : it)),
                }))
              }
            />
            <Textarea
              rows={3}
              placeholder="Achievements (one bullet per line). Start with action verbs and quantify results."
              value={x.bullets}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  experience: d.experience.map((it) => (it.id === x.id ? { ...it, bullets: e.target.value } : it)),
                }))
              }
            />
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              experience: [...d.experience, { id: uid(), company: "", role: "", duration: "", bullets: "" }],
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
                onClick={() => setData((d) => ({ ...d, projects: d.projects.filter((e) => e.id !== p.id) }))}
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
                    projects: d.projects.map((it) => (it.id === p.id ? { ...it, title: e.target.value } : it)),
                  }))
                }
              />
              <Input
                placeholder="Tech Stack"
                value={p.stack}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((it) => (it.id === p.id ? { ...it, stack: e.target.value } : it)),
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
                  projects: d.projects.map((it) => (it.id === p.id ? { ...it, link: e.target.value } : it)),
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
                  projects: d.projects.map((it) => (it.id === p.id ? { ...it, description: e.target.value } : it)),
                }))
              }
            />
          </div>
        ))}
        <AddBtn
          onClick={() =>
            setData((d) => ({
              ...d,
              projects: [...d.projects, { id: uid(), title: "", stack: "", description: "", link: "" }],
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
                onClick={() => setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== ed.id) }))}
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
                    education: d.education.map((it) => (it.id === ed.id ? { ...it, degree: e.target.value } : it)),
                  }))
                }
              />
              <Input
                placeholder="College"
                value={ed.college}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) => (it.id === ed.id ? { ...it, college: e.target.value } : it)),
                  }))
                }
              />
              <Input
                placeholder="Year"
                value={ed.year}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) => (it.id === ed.id ? { ...it, year: e.target.value } : it)),
                  }))
                }
              />
              <Input
                placeholder="CGPA (optional)"
                value={ed.cgpa}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((it) => (it.id === ed.id ? { ...it, cgpa: e.target.value } : it)),
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
              education: [...d.education, { id: uid(), degree: "", college: "", year: "", cgpa: "" }],
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
                  setData((d) => ({ ...d, certifications: d.certifications.filter((e) => e.id !== c.id) }))
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
              certifications: [...d.certifications, { id: uid(), name: "", issuer: "", year: "" }],
            }))
          }
          label="Add Certification"
        />
      </Card>

      {/* Leadership */}
      <SimpleListCard
        title="Leadership"
        icon={<Crown className="w-5 h-5 text-white" />}
        items={data.leadership}
        onChange={(items) => setData((d) => ({ ...d, leadership: items }))}
        titlePlaceholder="Role / Title (e.g. Tech Lead — Frontend Guild)"
        detailPlaceholder="What did you lead? Team size, outcomes, impact."
        addLabel="Add Leadership"
      />

      {/* Extracurricular */}
      <SimpleListCard
        title="Extra-Curricular Activities"
        icon={<Sparkles className="w-5 h-5 text-white" />}
        items={data.extracurricular}
        onChange={(items) => setData((d) => ({ ...d, extracurricular: items }))}
        titlePlaceholder="Activity (e.g. Open Source Contributor)"
        detailPlaceholder="Brief description"
        addLabel="Add Activity"
      />

      {/* Achievements */}
      <SimpleListCard
        title="Achievements & Awards"
        icon={<Trophy className="w-5 h-5 text-white" />}
        items={data.achievements}
        onChange={(items) => setData((d) => ({ ...d, achievements: items }))}
        titlePlaceholder="Award / Achievement"
        detailPlaceholder="Context — issuer, year, what it recognized"
        addLabel="Add Achievement"
      />
    </div>
  );
}

function ChipList({
  items,
  onRemove,
  variant,
}: {
  items: string[];
  onRemove: (v: string) => void;
  variant: "primary" | "accent";
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {items.length === 0 && (
        <span className="text-xs text-muted-foreground italic">No items yet — add below.</span>
      )}
      {items.map((s) => (
        <span
          key={s}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 smooth border ${
            variant === "primary"
              ? "bg-primary/10 border-primary/30 text-foreground"
              : "bg-accent/10 border-accent/30 text-foreground"
          }`}
        >
          {s}
          <button onClick={() => onRemove(s)} className="text-muted-foreground hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}

function SimpleListCard({
  title,
  icon,
  items,
  onChange,
  titlePlaceholder,
  detailPlaceholder,
  addLabel,
}: {
  title: string;
  icon: React.ReactNode;
  items: { id: string; title: string; detail: string }[];
  onChange: (items: { id: string; title: string; detail: string }[]) => void;
  titlePlaceholder: string;
  detailPlaceholder: string;
  addLabel: string;
}) {
  return (
    <Card title={title} icon={icon}>
      {items.map((it, i) => (
        <div key={it.id} className="glass rounded-xl p-3 mb-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">#{i + 1}</span>
            <button onClick={() => onChange(items.filter((x) => x.id !== it.id))}>
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
          <Input
            placeholder={titlePlaceholder}
            value={it.title}
            onChange={(e) =>
              onChange(items.map((x) => (x.id === it.id ? { ...x, title: e.target.value } : x)))
            }
          />
          <Textarea
            rows={2}
            placeholder={detailPlaceholder}
            value={it.detail}
            onChange={(e) =>
              onChange(items.map((x) => (x.id === it.id ? { ...x, detail: e.target.value } : x)))
            }
          />
        </div>
      ))}
      <AddBtn
        onClick={() => onChange([...items, { id: uid(), title: "", detail: "" }])}
        label={addLabel}
      />
    </Card>
  );
}

function Card({
  title,
  hint,
  icon,
  children,
}: {
  title: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5 smooth">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold truncate">{title}</h3>
        </div>
        {hint && <span className="text-xs text-muted-foreground text-right shrink-0">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Field({ label: labelText, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-1 block">{labelText}</Label>
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
