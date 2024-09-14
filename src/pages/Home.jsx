import ChartsContainer from "../components/Charts/ChartsContainer";
import React, { useEffect, useState } from "react";
import CardStats from "../components/CardStats/CardStats";
import axios from "axios";

export default function Home() {
  const [cardStatArr, setCardStatArr] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  async function getDashboardData() {
    let token = sessionStorage.getItem("token");

    await axios
      .get("https://art-ecommerce-server.glitch.me/admin/statistics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        (response.data);

        setCardStatArr([
          response.data.income,
          response.data.profit,
          response.data.sales,
          response.data.visitors,
        ]);
        setLineChartData(response.data.lineChartData);
        setPieChartData(response.data.pieChartData);
      });
  }
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <div className="grid gap-4 w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5">
        {cardStatArr.map((card, index) => {
          return (
            <CardStats
              key={index}
              statTitle={card.statTitle}
              statDescripiron={card.statDescripiron}
              statPercent={card.statPercent}
              statSubtitle={card.statSubtitle}
              statIconName={card.statIconName}
              statArrow={card.statArrow}
            />
          );
        })}
      </div>
      <div className="mt-12">
        <ChartsContainer
          pieChartData={pieChartData}
          lineChartData={lineChartData}
        />
      </div>
    </div>
  );
}
