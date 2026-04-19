export type Stats = {
  totalLeads: number;
  totalPendingLeads: number;
  totalResolvedLeads: number;
  totalLeadSuccess: number;
  totalLeadFail: number;
  leadsByCourse: [
    { _id: "BBA" | "BCA" | "BTECH" | "MBA" | "ITI"; count: number },
  ];
  leadsBySource: [{ _id: "facebook" | "instagram" | "wom"; count: number }];
  recentLeads: number;
  oldestLeads: number;
  leadsPerDay: [{_id : string , count : number}];
   leadsToday : {}
  totalTodayLeads : number
};

export type Lead = {
  _id : string;
  name: string;
  email: string;
  contactNo: number;
  interestedCourse: string;
  source: string;
  status: string;
  leadSuccess: boolean;
  createdAt: string;
};