import React, { useState } from "react";
import {
Tabs,
TabsHeader,
TabsBody,
Tab,
TabPanel,
} from "@material-tailwind/react";

export default function SingleProductTabs() {
const [activeTab, setActiveTab] = useState("description");
// const [activeTabIndex, setActiveTabIndex] = useState(0);
const data = [
    {
    label: "DESCRIPTION",
    value: "description",
    desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lab oris nisi ut.`,
    },
    {
    label: "ADDITIONAL INFORMATION",
    value: "additional information",
    desc: `Weight	  2 kg , Dimensions	  20 × 10 × 5 cm`,
    },
    // {
    //   label: "REVIEWS",
    //   value: "reviews",
    //   desc: `We're not always in the position that we want to be at.`,
    // },
];
return (
    <Tabs value={activeTab} className="w-[60%] mt-10 ">
    <TabsHeader
        className="rounded-none bg-transparent p-0 justify-center m-auto w-full flex-col lg:flex-row"
        style={{ borderBottom: "1px solid var(--light-gray)" }}
        indicatorProps={{
        className:
            "bg-transparent shadow-none rounded-none transition-transform duration-700 ease-in-out",
        style: {
            // transform: `translateX(${activeTabIndex * 100}%)`,
            borderBottom: "1px solid var(--main-text-color)",
        },
        }}
    >
        {data.map(({ label, value }, index) => (
        <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            // onMouseEnter={() => setActiveTabIndex(index)}
            className=" py-1 px-1 lg:py-[18px] lg:px-[34px] w-fit"
            // className= {activeTab === value ? "text-gray-900" : ""}
            style={{
            fontFamily: "var(--main-font)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "1.35em",
            letterSpacing: ".16em",
            cursor: "pointer",
            //   padding: "13px 34px",
            // backgroundColor: "gray",
            }}
        >
            {label}
        </Tab>
        ))}
    </TabsHeader>
    <TabsBody>
        {data.map(({ value, desc }) => (
        <TabPanel
            key={value}
            value={value}
            className="mx-10 my-6"
            style={{
            color: "var(--main-text-color",
            fontFamily: "var(--third-font)",
            fontSize: "17px",
            fontWeight: 400,
            lineHeight: "1.85em",
            }}
        >
            {desc}
        </TabPanel>
        ))}
    </TabsBody>
    </Tabs>
);
}
