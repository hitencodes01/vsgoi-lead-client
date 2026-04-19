import React, { useCallback, useState } from "react";
import { LeadStore } from "../../store/useLead";

export default function SearchLead() {
  const { leads } = LeadStore();
  const [value, setValue] = useState<string | "">("");
  const leadCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    leads.filter((lead) =>
      lead.name.toLowerCase().includes(value.toLowerCase()),
    );
  }, []);
  return (
    <input
      className="input-success"
      value={value}
      type="text"
      onChange={leadCallback}
    />
  );
}
