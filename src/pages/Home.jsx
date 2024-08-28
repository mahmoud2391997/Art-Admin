import React from "react";
import CardStats from "../components/CardStats/CardStats";

export default function Home() {
  const arr = [
    {
      statSubtitle: "Total Income",
      statTitle: "350,897",
      statArrow: "down",
      statPercent: "3.48",
      statDescripiron: "Since last month",
      statIconName: "Income",
    },
    {
      statSubtitle: "Total Profit",
      statTitle: "350,897",
      statArrow: "down",
      statPercent: "3.48",
      statDescripiron: "Since last month",
      statIconName: "Profit",
    },
    {
      statSubtitle: "Total Sales",
      statTitle: "350,897",
      statArrow: "up",
      statPercent: "3.48",
      statDescripiron: "Since last month",
      statIconName: "Sales",
    },
    {
      statSubtitle: "Total Visitors",
      statTitle: "350,897",
      statArrow: "up",
      statPercent: "12.3",
      statDescripiron: "Since last month",
      statIconName: "View",
    },
  ];
  return (
    <div className="grid gap-4 w-[80%] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5">
      {arr.map((card) => {
        return (
          <CardStats
            statPercent={card.statPercent}
            statSubtitle={card.statSubtitle}
            statIconName={card.statIconName}
            statArrow={card.statArrow}
          />
        );
      })}
    </div>
  );
}
