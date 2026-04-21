import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export async function exportResumePdf(element: HTMLElement, filename = "resume.pdf") {
  // A4 in mm: 210 x 297
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const imgW = pageW;
  const imgH = (canvas.height * imgW) / canvas.width;

  if (imgH <= pageH) {
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgW, imgH, undefined, "FAST");
  } else {
    // Multi-page: slice canvas
    const pageHeightInPx = (pageH * canvas.width) / pageW;
    let rendered = 0;
    while (rendered < canvas.height) {
      const sliceH = Math.min(pageHeightInPx, canvas.height - rendered);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceH;
      const ctx = sliceCanvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(canvas, 0, rendered, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      const sliceImgH = (sliceH * imgW) / canvas.width;
      if (rendered > 0) pdf.addPage();
      pdf.addImage(
        sliceCanvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgW,
        sliceImgH,
        undefined,
        "FAST",
      );
      rendered += sliceH;
    }
  }

  pdf.save(filename);
}