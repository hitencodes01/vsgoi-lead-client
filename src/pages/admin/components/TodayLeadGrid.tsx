import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayLeads } from "../../../api/axios";
import Loading from "../../../components/Loading";
import { useMemo } from "react";
import type { Lead } from "../../../types";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "source", headerName: "Source", width: 130 },
  { field: "interestedCourse", headerName: "Course", width: 150 },
  { field: "contactNo", headerName: "Contact", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "leadSuccess", headerName: "Result", width: 150 },
];

export default function TodayLeadGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ["todayLeads"],
    queryFn: fetchTodayLeads,
  });

  const rows: Lead[] = useMemo(() => {
    if (!data?.leads) return [];
    return data.leads;
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div style={{ height: "100%", background: "#111" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[4]}
        initialState={{
          pagination: { paginationModel: { pageSize: 4 } },
        }}
      />
    </div>
  );
}
