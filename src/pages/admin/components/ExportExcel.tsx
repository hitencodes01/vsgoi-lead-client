import { useQuery } from "@tanstack/react-query";
import { fetchAllLeads } from "../../../api/axios";
import * as XLSX from "xlsx";

export default function ExportExcel() {
  const { data, isLoading } = useQuery({
    queryKey: ["allLeads"],
    queryFn: fetchAllLeads,
  });

  if (isLoading) return <p>Loading...</p>;

  const formatLeadsForExport = () => {
    return data.leads?.map((lead: any) => ({
      Name: lead.name,
      Contact: lead.contactNo,
      Email: lead.email,
      Course: lead.interestedCourse,
      Source: lead.source,
      "In 12th": lead.isIn12 ? "Yes" : "No",
      Status: lead.status,
      Success: lead.leadSuccess ? "Yes" : "No",
      CreatedAt: new Date(lead.createdAt).toLocaleString(),
    }));
  };

  const exportAllLeads = () => {
    const data = formatLeadsForExport();

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "All Leads");

    XLSX.writeFile(
      workbook,
      `${new Date(Date.now()).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}.xlsx`,
    );
  };
  return (
    <button onClick={exportAllLeads} className="btn btn-success ">
      Export Excel
    </button>
  );
}
