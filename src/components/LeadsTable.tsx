import "react-data-grid/lib/styles.css";
import { LeadStore } from "../store/useLead";
import { DataGrid } from "react-data-grid";
import { useCallback, useEffect, useState } from "react";
import type { Lead } from "../types";
import { api } from "../api/axios";

const StatusEditor = ({ row, onRowChange }: any) => (
  <select
    autoFocus
    style={{ width: "100%", height: "100%", border: "none", padding: "0 8px" }}
    value={row.status}
    onChange={(e) => onRowChange({ ...row, status: e.target.value }, true)}
  >
    <option value="pending">Pending</option>
    <option value="resolved">Resolved</option>
  </select>
);

const LeadResultEditor = ({ row, onRowChange }: any) => (
  <select
    autoFocus
    style={{ width: "100%", height: "100%", border: "none", padding: "0 8px" }}
    value={row.leadSuccess ? "yes" : "no"}
    onChange={(e) =>
      onRowChange({ ...row, leadSuccess: e.target.value === "yes" }, true)
    }
  >
    <option value="no">No</option>
    <option value="yes">Yes</option>
  </select>
);

const columns = [
  { key: "name", name: "Name", width: 140 },
  { key: "email", name: "Email", width: 200 },
  { key: "contactNo", name: "Contact", width: 130 },
  { key: "interestedCourse", name: "Course", width: 150 },
  { key: "source", name: "Source", width: 100 },
  {
    key: "status",
    name: "Status",
    width: 130,
    editable: true,
    renderEditCell: StatusEditor,
    renderCell: ({ row }: any) => (
      <span
        style={{
          padding: "2px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
          background: row.status === "resolved" ? "#dcfce7" : "#fef9c3",
          color: row.status === "resolved" ? "#166534" : "#854d0e",
        }}
      >
        {row.status === "resolved" ? "Resolved" : "Pending"}
      </span>
    ),
  },
  {
    key: "leadSuccess",
    name: "Lead Result",
    width: 120,
    editable: true,
    renderEditCell: LeadResultEditor,
    renderCell: ({ row }: any) => (
      <span
        style={{
          padding: "2px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
          background: row.leadSuccess ? "#dcfce7" : "#fee2e2",
          color: row.leadSuccess ? "#166534" : "#991b1b",
        }}
      >
        {row.leadSuccess ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "createdAt",
    name: "Date",
    width: 260,
    renderCell: ({ row }: any) =>
      row.createdAt ? new Date(row.createdAt).toLocaleString() : "-",
  },
];

export default function LeadsTable() {
  const [value, setValue] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const { leads } = LeadStore();
  const [rows, setRows] = useState<Lead[]>([]);

  const filterdList = useCallback(() => {
    return leads.filter((lead) => {
      const matchesName = lead.name.toLowerCase().includes(value.toLowerCase());

      const matchesCourse = selectedCourse
        ? lead.interestedCourse === selectedCourse
        : true;

      const matchesSource = selectedSource
        ? lead.source === selectedSource
        : true;

      // Assumes lead.createdAt is an ISO string e.g. "2024-03-15T..."
      const matchesMonth = selectedMonth
        ? new Date(lead.createdAt).getMonth() + 1 === Number(selectedMonth)
        : true;

      return matchesName && matchesCourse && matchesSource && matchesMonth;
    });
  }, [leads, value, selectedCourse, selectedMonth, selectedSource]);

  useEffect(() => {
    setRows(filterdList);
  }, [filterdList]);

  const handleRowsChange = async (
    newRows: Lead[],
    { indexes }: { indexes: number[] },
  ) => {
    setRows(newRows);
    const changed = newRows[indexes[0]];
    try {
      await api.patch(`/lead/${changed._id}`, {
        status: changed.status,
        leadSuccess: changed.leadSuccess,
      });
    } catch (err) {
      console.error("Failed to update lead", err);
      setRows(rows);
    }
  };

  // return (
  //   <div>
  //     <label className="input">
  //       <svg
  //         className="h-[1em] opacity-50"
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //       >
  //         <g
  //           strokeLinejoin="round"
  //           strokeLinecap="round"
  //           strokeWidth="2.5"
  //           fill="none"
  //           stroke="currentColor"
  //         >
  //           <circle cx="11" cy="11" r="8"></circle>
  //           <path d="m21 21-4.3-4.3"></path>
  //         </g>
  //       </svg>
  //       <input
  //         type="search"
  //         placeholder="Search name"
  //         value={value}
  //         onChange={(e) => setValue(e.target.value)}
  //       />
  //     </label>

  //     {/*  */}

  //     {/* Sort by Course */}
  //     <select
  //       className="select select-bordered bg-white text-black"
  //       value={selectedCourse}
  //       onChange={(e) => setSelectedCourse(e.target.value)}
  //     >
  //       <option value="">All Courses</option>
  //       {[...new Set(leads.map((lead) => lead.interestedCourse))].map(
  //         (course) => (
  //           <option key={course} value={course}>
  //             {course}
  //           </option>
  //         ),
  //       )}
  //     </select>

  //     {/* Sort by Source */}
  //     <select
  //       className="select select-bordered bg-white text-black"
  //       value={selectedSource}
  //       onChange={(e) => setSelectedSource(e.target.value)}
  //     >
  //       <option value="">All Sources</option>
  //       {[...new Set(leads.map((lead) => lead.source))].map((source) => (
  //         <option key={source} value={source}>
  //           {source}
  //         </option>
  //       ))}
  //     </select>

  //     {/* Sort by Month */}
  //     <select
  //       className="select select-bordered bg-white text-black"
  //       value={selectedMonth}
  //       onChange={(e) => setSelectedMonth(e.target.value)}
  //     >
  //       <option value="">All Months</option>
  //       {[
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December",
  //       ].map((month, i) => (
  //         <option key={month} value={String(i + 1).padStart(2, "0")}>
  //           {month}
  //         </option>
  //       ))}
  //     </select>

  //     {/* Reset Filters */}
  //     {(selectedCourse || selectedSource || selectedMonth) && (
  //       <button
  //         className="btn btn-sm btn-ghost text-red-500"
  //         onClick={() => {
  //           setSelectedCourse("");
  //           setSelectedSource("");
  //           setSelectedMonth("");
  //         }}
  //       >
  //         ✕ Reset
  //       </button>
  //     )}
  //     {/*  */}

  //     <div className="flex justify-center items-center bg-blue-600 mt-5 ">
  //       <DataGrid
  //         columns={columns}
  //         rows={rows}
  //         onRowsChange={handleRowsChange}
  //         rowKeyGetter={(row: Lead) => row._id}
  //         className="rdg-light"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 bg-base-200 rounded-2xl p-4 shadow-sm border border-base-300">
        {/* Top Row: Search + Reset */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full sm:w-80 rounded-xl shadow-sm">
            <svg
              className="h-[1em] opacity-40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              type="search"
              placeholder="Search by name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="grow text-sm"
            />
          </label>

          {/* Reset Button */}
          {(selectedCourse || selectedSource || selectedMonth) && (
            <button
              className="btn btn-sm btn-error btn-outline rounded-xl gap-2"
              onClick={() => {
                setSelectedCourse("");
                setSelectedSource("");
                setSelectedMonth("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Reset Filters
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="divider my-0 text-xs text-base-content/40 font-semibold uppercase tracking-widest">
          Filter By
        </div>

        {/* Bottom Row: Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Course Filter */}
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wide pl-1">
              Course
            </span>
            <select
              className="select select-bordered select-sm bg-white text-black rounded-xl w-full"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {[...new Set(leads.map((lead) => lead.interestedCourse))].map(
                (course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wide pl-1">
              Source
            </span>
            <select
              className="select select-bordered select-sm bg-white text-black rounded-xl w-full"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="">All Sources</option>
              {[...new Set(leads.map((lead) => lead.source))].map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wide pl-1">
              Month
            </span>
            <select
              className="select select-bordered select-sm bg-white text-black rounded-xl w-full"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, i) => (
                <option key={month} value={String(i + 1).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills */}
      {(selectedCourse || selectedSource || selectedMonth) && (
        <div className="flex flex-wrap gap-2 px-1">
          {selectedCourse && (
            <div className="badge badge-info gap-2 p-3 text-xs font-medium">
              📚 {selectedCourse}
              <button
                onClick={() => setSelectedCourse("")}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
          {selectedSource && (
            <div className="badge badge-success gap-2 p-3 text-xs font-medium">
              🌐 {selectedSource}
              <button
                onClick={() => setSelectedSource("")}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
          {selectedMonth && (
            <div className="badge badge-warning gap-2 p-3 text-xs font-medium">
              📅{" "}
              {
                [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ][Number(selectedMonth) - 1]
              }
              <button
                onClick={() => setSelectedMonth("")}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* Row Count */}
      <div className="text-sm text-base-content/50 px-1">
        Showing{" "}
        <span className="font-bold text-base-content">{rows.length}</span> of{" "}
        <span className="font-bold text-base-content">{leads.length}</span>{" "}
        leads
      </div>

      {/* DataGrid */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-base-300">
        <DataGrid
          columns={columns}
          rows={rows}
          onRowsChange={handleRowsChange}
          rowKeyGetter={(row: Lead) => row._id}
          className="rdg-light"
        />
      </div>
    </div>
  );
}
