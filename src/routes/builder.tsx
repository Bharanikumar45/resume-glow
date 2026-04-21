import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { emptyResume, type ResumeData } from "@/lib/resume-types";
import { exportResumePdf } from "@/lib/export-pdf";
import bkvsLogo from "@/assets/bkvs-logo.png";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Resume Builder — BKVS" },
      {
        name: "description",
        content: "Build your ATS-friendly resume with live preview and instant PDF export.",
      },
      { property: "og:title", content: "Resume Builder — BKVS" },
      {
        property: "og:description",
        content: "Live preview, smart formatting, instant PDF export.",
      },
    ],
  }),
  component: Builder,
});

function Builder() {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const filename = `${(data.personal.fullName || "resume").replace(/\s+/g, "_")}_resume.pdf`;
      await exportResumePdf(previewRef.current, filename);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={bkvsLogo}
              alt="BKVS logo"
              className="h-9 w-auto rounded-lg object-contain glow-primary"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-lg">
                <ArrowLeft className="w-4 h-4 mr-1" /> Home
              </Button>
            </Link>
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="rounded-xl gradient-primary text-white border-0 hover:opacity-95"
            >
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Exporting…
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1.5" /> Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6">
        {/* Form */}
        <div className="lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2 pb-10">
          <ResumeForm data={data} setData={setData} />
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-[80px] lg:self-start">
          <div className="glass-strong rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Live Preview
              </span>
              <span className="text-xs text-muted-foreground">A4 · ATS-Safe</span>
            </div>
            <div className="rounded-xl overflow-auto max-h-[calc(100vh-180px)] bg-neutral-200/40">
              <div
                style={{
                  transform: "scale(0.78)",
                  transformOrigin: "top center",
                  width: "fit-content",
                  margin: "0 auto",
                  padding: "16px 0",
                }}
              >
                <ResumePreview ref={previewRef} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}