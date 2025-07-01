import React from "react";
import API from "../../api/axios";

export default function ExportReports() {
  const exportCSV = async () => {
    try {
      const res = await API.get("/admin/export/csv", {
        responseType: "blob", 
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to export CSV");
    }
  };

  const exportPDF = async () => {
    try {
      const res = await API.get("/admin/export/pdf", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to export PDF");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">📤 Export Reports</h1>
      <div className="flex space-x-4">
        <button
          onClick={exportCSV}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Export as CSV
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
