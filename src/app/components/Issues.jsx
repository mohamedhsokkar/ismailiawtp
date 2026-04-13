import { useEffect, useMemo, useState } from "react";
import { Plus, Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { createIssue, getIssues, updateIssue } from "../lib/auth";
import { toast } from "sonner";

const LOCATION_ORDER = ["Mashroat", "CTE", "Bamag1", "Bamag2"];
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getTodayDate = () => new Date().toISOString().split("T")[0];

const formatDisplayDate = (dateValue) => {
  if (!dateValue) {
    return "-";
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-GB");
};

const getDaysSinceOccurrence = (dateValue) => {
  if (!dateValue) {
    return "-";
  }

  const occurrenceDate = new Date(dateValue);
  if (Number.isNaN(occurrenceDate.getTime())) {
    return "-";
  }

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedOccurrence = new Date(
    occurrenceDate.getFullYear(),
    occurrenceDate.getMonth(),
    occurrenceDate.getDate()
  );

  return Math.max(0, Math.floor((normalizedToday - normalizedOccurrence) / MS_PER_DAY));
};

const getInitialCreateForm = () => ({
  description: "",
  location: "Mashroat",
  dateOfOccurance: getTodayDate(),
  dateOfFix: "",
  status: "open"
});

function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createForm, setCreateForm] = useState(getInitialCreateForm);

  const [closeOpen, setCloseOpen] = useState(false);
  const [closeSubmitting, setCloseSubmitting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [closeDateOfFix, setCloseDateOfFix] = useState("");

  const activeIssues = useMemo(
    () => issues.filter((issue) => issue.status !== "closed"),
    [issues]
  );

  const groupedActiveIssues = useMemo(() => {
    const grouped = activeIssues.reduce((acc, issue) => {
      const location = issue.location || "Unassigned";
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(issue);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([left], [right]) => {
      const leftIndex = LOCATION_ORDER.indexOf(left);
      const rightIndex = LOCATION_ORDER.indexOf(right);
      const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
      const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

      if (normalizedLeft !== normalizedRight) {
        return normalizedLeft - normalizedRight;
      }

      return left.localeCompare(right);
    });
  }, [activeIssues]);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load issues");
      } finally {
        setLoading(false);
      }
    };
    void loadIssues();
  }, []);

  const resetCreateForm = () => {
    setCreateForm(getInitialCreateForm());
  };

  const openCloseModal = (issue) => {
    setSelectedIssue(issue);
    setCloseDateOfFix("");
    setCloseOpen(true);
  };

  const handleCreateIssue = async () => {
    const trimmedDescription = createForm.description.trim();
    if (!trimmedDescription || !createForm.dateOfOccurance || !createForm.location || !createForm.status) {
      toast.error("Please fill all required fields");
      return;
    }
    if (createForm.status === "closed" && !createForm.dateOfFix) {
      toast.error("Fix date is required when status is closed");
      return;
    }

    setCreateSubmitting(true);
    try {
      const payload = {
        description: trimmedDescription,
        dateOfOccurance: createForm.dateOfOccurance,
        location: createForm.location,
        status: createForm.status
      };
      if (createForm.dateOfFix) {
        payload.dateOfFix = createForm.dateOfFix;
      }

      const createdIssue = await createIssue(payload);
      setIssues((prev) => [createdIssue, ...prev]);
      setCreateOpen(false);
      resetCreateForm();
      toast.success("Issue created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create issue");
    } finally {
      setCreateSubmitting(false);
    }
  };

  const handleCloseIssue = async () => {
    if (!selectedIssue?._id) return;
    if (!closeDateOfFix) {
      toast.error("Fix date is required");
      return;
    }

    setCloseSubmitting(true);
    try {
      const updated = await updateIssue(selectedIssue._id, {
        status: "closed",
        dateOfFix: closeDateOfFix
      });
      setIssues((prev) => prev.map((issue) => issue._id === updated._id ? updated : issue));
      setCloseOpen(false);
      setSelectedIssue(null);
      setCloseDateOfFix("");
      toast.success("Issue closed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to close issue");
    } finally {
      setCloseSubmitting(false);
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const reportDate = new Date().toLocaleDateString("en-GB");
    const body = [];

    groupedActiveIssues.forEach(([location, locationIssues]) => {
      locationIssues.forEach((issue, index) => {
        const row = [];

        if (index === 0) {
          row.push({
            content: location,
            rowSpan: locationIssues.length,
            styles: {
              halign: "center",
              valign: "middle",
              fontStyle: "bold"
            }
          });
        }

        row.push(issue.faultID ?? "-");
        row.push(String(getDaysSinceOccurrence(issue.dateOfOccurance)));
        row.push(issue.description?.trim() || "-");
        row.push(formatDisplayDate(issue.dateOfOccurance));

        body.push(row);
      });
    });

    if (body.length === 0) {
      body.push([
        {
          content: loading ? "Loading issues..." : "No open issues found",
          colSpan: 5,
          styles: {
            halign: "center"
          }
        }
      ]);
    }

    doc.setFontSize(15);
    doc.text("Ismailia Water Treatment Plant", 14, 12);

    doc.setFontSize(13);
    doc.text("Open Issues Report", 14, 19);

    doc.setFontSize(10);
    doc.text(`Date: ${reportDate}`, 14, 25);
    doc.text(`Total Open Issues: ${activeIssues.length}`, pageWidth - 58, 25);

    autoTable(doc, {
      startY: 30,
      head: [["Location", "ID", "Days", "Description", "Date"]],
      body,
      theme: "grid",
      margin: { top: 30, right: 14, bottom: 35, left: 14 },
      pageBreak: "auto",
      rowPageBreak: "avoid",
      showHead: "everyPage",
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: "linebreak",
        valign: "middle",
        lineWidth: 0.1,
        lineColor: [180, 180, 180],
        textColor: [0, 0, 0]
      },
      headStyles: {
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        lineWidth: 0.15,
        lineColor: [120, 120, 120]
      },
      columnStyles: {
        0: { cellWidth: 28, halign: "center" },
        1: { cellWidth: 18, halign: "center" },
        2: { cellWidth: 18, halign: "center" },
        3: { cellWidth: 90, halign: "left" },
        4: { cellWidth: 28, halign: "center" }
      },
      tableLineWidth: 0.2,
      tableLineColor: [80, 80, 80],
      didDrawPage: () => {
        const currentPageWidth = doc.internal.pageSize.getWidth();
        const currentPageHeight = doc.internal.pageSize.getHeight();

        doc.setFontSize(9);
        doc.text("Maintenance Department", 14, currentPageHeight - 10);
        doc.text(`Page ${doc.getNumberOfPages()}`, currentPageWidth - 25, currentPageHeight - 10);
      }
    });

    const finalY = doc.lastAutoTable?.finalY ?? 30;

    if (finalY > pageHeight - 45) {
      doc.addPage();
    }

    const signaturePageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(10);
    doc.line(20, signaturePageHeight - 25, 80, signaturePageHeight - 25);
    doc.line(120, signaturePageHeight - 25, 180, signaturePageHeight - 25);

    doc.text("Prepared By", 35, signaturePageHeight - 20);
    doc.text("Reviewed By", 135, signaturePageHeight - 20);

    doc.save(`open-issues-report-${reportDate.replaceAll("/", "-")}.pdf`);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Issues</CardTitle>
            <CardDescription>Track and manage plant issues</CardDescription>
          </div>
          <Button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="h-14 w-14 rounded-full p-0"
            aria-label="Add Issue"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button type="button" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              طباعة
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>م</TableHead>
                  <TableHead>عدد الايام</TableHead>
                  <TableHead>وصف العطل</TableHead>
                  <TableHead>تاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedActiveIssues.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      {loading ? "Loading issues..." : "No open issues found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  groupedActiveIssues.flatMap(([location, locationIssues]) => [
                    <TableRow key={`group-${location}`} className="bg-slate-50 hover:bg-slate-50">
                      <TableCell colSpan={4} className="font-semibold">
                        {location}
                      </TableCell>
                    </TableRow>,
                    ...locationIssues.map((issue) => (
                      <TableRow
                        key={issue._id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => openCloseModal(issue)}
                      >
                        <TableCell>{issue.faultID ?? "-"}</TableCell>
                        <TableCell>{getDaysSinceOccurrence(issue.dateOfOccurance)}</TableCell>

                        <TableCell>{issue.description}</TableCell>
                        <TableCell>
                          {formatDisplayDate(issue.dateOfOccurance)}
                        </TableCell>
                      </TableRow>
                    ))
                  ])
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Issue</DialogTitle>
            <DialogDescription>Enter issue details then save.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="issue-description">Description</Label>
              <Input
                id="issue-description"
                placeholder="Describe the issue"
                value={createForm.description}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-location">Location</Label>
              <select
                id="issue-location"
                value={createForm.location}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, location: e.target.value }))}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Mashroat">Mashroat</option>
                <option value="CTE">CTE</option>
                <option value="Bamag1">Bamag1</option>
                <option value="Bamag2">Bamag2</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-status">Status</Label>
              <select
                id="issue-status"
                value={createForm.status}
                onChange={(e) => {
                  const nextStatus = e.target.value;
                  setCreateForm((prev) => ({
                    ...prev,
                    status: nextStatus,
                    dateOfFix: nextStatus === "closed" ? prev.dateOfFix : ""
                  }));
                }}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-occurrence-date">Occurrence Date</Label>
              <Input
                id="issue-occurrence-date"
                type="date"
                value={createForm.dateOfOccurance}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, dateOfOccurance: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-fix-date">
                Fix Date {createForm.status === "closed" ? "*" : ""}
              </Label>
              <Input
                id="issue-fix-date"
                type="date"
                value={createForm.dateOfFix}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, dateOfFix: e.target.value }))}
                disabled={createForm.status !== "closed"}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCreateOpen(false);
                resetCreateForm();
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateIssue} disabled={createSubmitting}>
              {createSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={closeOpen} onOpenChange={setCloseOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Close Issue</DialogTitle>
            <DialogDescription>
              {selectedIssue ? `Set fix date for ${selectedIssue.description ?? "selected issue"}.` : "Set fix date."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="close-issue-fix-date">تاريخ اصلاح العطل</Label>
            <Input
              id="close-issue-fix-date"
              type="date"
              value={closeDateOfFix}
              onChange={(e) => setCloseDateOfFix(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCloseOpen(false);
                setSelectedIssue(null);
                setCloseDateOfFix("");
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCloseIssue} disabled={closeSubmitting}>
              {closeSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { Issues };
