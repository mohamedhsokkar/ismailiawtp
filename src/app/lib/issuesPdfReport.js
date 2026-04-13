import { jsPDF } from "jspdf";
import "@fontsource/amiri/400.css";

const A4_WIDTH_PX = 794;
const REPORT_MARGINS = [12, 14, 20, 14];
const ARABIC_TEXT_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

const escapeHtml = (value) =>
  String(value ?? "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isArabicText = (value) => ARABIC_TEXT_PATTERN.test(String(value ?? ""));

const waitForReportFonts = async () => {
  if (typeof document === "undefined" || !document.fonts?.load) {
    return;
  }

  await Promise.all([
    document.fonts.load('400 16px "Amiri"'),
    document.fonts.ready
  ]);
};

const buildRowsHtml = ({ groupedActiveIssues, getDaysSinceOccurrence, formatDisplayDate }) => {
  if (groupedActiveIssues.length === 0) {
    return `
      <tr>
        <td colspan="5" class="empty-state">No open issues found</td>
      </tr>
    `;
  }

  return groupedActiveIssues
    .map(([location, locationIssues]) =>
      locationIssues
        .map((issue, index) => {
          const description = issue.description?.trim() || "-";
          const descriptionClasses = `description-cell${isArabicText(description) ? " arabic" : ""}`;
          const locationCell =
            index === 0
              ? `<td class="location-cell" rowspan="${locationIssues.length}">${escapeHtml(location)}</td>`
              : "";

          return `
            <tr>
              ${locationCell}
              <td class="id-cell">${escapeHtml(issue.faultID ?? "-")}</td>
              <td class="days-cell">${escapeHtml(getDaysSinceOccurrence(issue.dateOfOccurance))}</td>
              <td class="${descriptionClasses}">${escapeHtml(description)}</td>
              <td class="date-cell">${escapeHtml(formatDisplayDate(issue.dateOfOccurance))}</td>
            </tr>
          `;
        })
        .join("")
    )
    .join("");
};

const buildReportMarkup = ({
  activeIssues,
  groupedActiveIssues,
  loading,
  reportDate,
  getDaysSinceOccurrence,
  formatDisplayDate
}) => {
  const rowsHtml = loading
    ? `
      <tr>
        <td colspan="5" class="empty-state">Loading issues...</td>
      </tr>
    `
    : buildRowsHtml({ groupedActiveIssues, getDaysSinceOccurrence, formatDisplayDate });

  return `
    <div class="issues-report">
      <header class="report-header">
        <div>
          <h1>Ismailia Water Treatment Plant</h1>
          <h2>Open Issues Report</h2>
          <p>Date: ${escapeHtml(reportDate)}</p>
        </div>
        <div class="report-meta">
          <p>Total Open Issues: ${escapeHtml(activeIssues.length)}</p>
        </div>
      </header>

      <table class="issues-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>ID</th>
            <th>Days</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>

      <footer class="report-signatures">
        <div class="signature-block">
          <div class="signature-line"></div>
          <span>Prepared By</span>
        </div>
        <div class="signature-block">
          <div class="signature-line"></div>
          <span>Reviewed By</span>
        </div>
      </footer>
    </div>
  `;
};

const createReportContainer = (markup) => {
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText = [
    "all: initial",
    "position: fixed",
    "left: -10000px",
    "top: 0",
    `width: ${A4_WIDTH_PX}px`,
    "display: block",
    "background: #ffffff",
    "color: #111827",
    "font-family: Arial, sans-serif",
    "z-index: -1"
  ].join("; ");
  container.innerHTML = `
    <style>
      .issues-report-sandbox,
      .issues-report-sandbox * {
        box-sizing: border-box;
        color: #111827;
        border-color: #8b8b8b;
        text-shadow: none;
        box-shadow: none;
        outline-color: #111827;
      }

      .issues-report-sandbox {
        all: initial;
        display: block;
        width: ${A4_WIDTH_PX}px;
        background: #ffffff;
        color: #111827;
        font-family: Arial, sans-serif;
      }

      .issues-report {
        width: ${A4_WIDTH_PX}px;
        box-sizing: border-box;
        padding: 28px 30px 80px;
        color: #111827;
        background: #ffffff;
        font-family: Arial, sans-serif;
      }

      .report-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 24px;
      }

      .report-header h1,
      .report-header h2,
      .report-header p {
        margin: 0;
      }

      .report-header h1 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .report-header h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .report-header p,
      .report-meta p {
        font-size: 14px;
      }

      .report-meta {
        padding-top: 44px;
        white-space: nowrap;
      }

      .issues-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }

      .issues-table th,
      .issues-table td {
        border: 1px solid #8b8b8b;
        padding: 8px 10px;
        font-size: 13px;
        line-height: 1.45;
        vertical-align: middle;
        word-break: break-word;
      }

      .issues-table thead th {
        background: #f1f5f9;
        font-weight: 700;
        text-align: center;
      }

      .location-cell,
      .id-cell,
      .days-cell,
      .date-cell {
        text-align: center;
      }

      .location-cell {
        font-weight: 700;
      }

      .description-cell {
        text-align: left;
      }

      .description-cell.arabic {
        direction: rtl;
        unicode-bidi: plaintext;
        text-align: right;
        font-family: "Amiri", Arial, sans-serif;
        font-size: 15px;
        line-height: 1.6;
      }

      .empty-state {
        text-align: center;
        color: #6b7280;
        padding: 24px 12px;
      }

      .report-signatures {
        display: flex;
        justify-content: space-between;
        gap: 40px;
        margin-top: 48px;
        padding: 0 24px;
      }

      .signature-block {
        width: 220px;
        text-align: center;
      }

      .signature-line {
        border-top: 1px solid #111827;
        margin-bottom: 8px;
      }
    </style>
    <div class="issues-report-sandbox">
      ${markup}
    </div>
  `;

  document.body.appendChild(container);
  return container;
};

export const generateIssuesPdfReport = async ({
  activeIssues,
  groupedActiveIssues,
  loading,
  getDaysSinceOccurrence,
  formatDisplayDate
}) => {
  if (typeof document === "undefined") {
    throw new Error("PDF generation is only available in the browser");
  }

  await waitForReportFonts();

  const reportDate = new Date().toLocaleDateString("en-GB");
  const container = createReportContainer(
    buildReportMarkup({
      activeIssues,
      groupedActiveIssues,
      loading,
      reportDate,
      getDaysSinceOccurrence,
      formatDisplayDate
    })
  );

  try {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    await doc.html(container, {
      autoPaging: "text",
      margin: REPORT_MARGINS,
      x: 0,
      y: 0,
      width: 182,
      windowWidth: A4_WIDTH_PX,
      html2canvas: {
        backgroundColor: "#ffffff",
        scale: 0.8,
        useCORS: true,
        onclone: (clonedDocument) => {
          clonedDocument.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
            const source = node.tagName === "LINK"
              ? node.getAttribute("href") ?? ""
              : node.textContent ?? "";

            if (!source.toLowerCase().includes("amiri")) {
              node.remove();
            }
          });

          if (clonedDocument.body) {
            clonedDocument.body.style.background = "#ffffff";
            clonedDocument.body.style.color = "#111827";
          }
        }
      }
    });

    const pageCount = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      doc.setPage(pageNumber);
      doc.text("Maintenance Department", 14, pageHeight - 8);
      doc.text(`Page ${pageNumber} of ${pageCount}`, pageWidth - 30, pageHeight - 8);
    }

    doc.save(`open-issues-report-${reportDate.replaceAll("/", "-")}.pdf`);
  } finally {
    container.remove();
  }
};
