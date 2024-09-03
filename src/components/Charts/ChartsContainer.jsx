import React from 'react';
import LineChartContainer from './LineChartContainer';
import PieChartContainer from './PieChartContainer';

export default function ChartsContainer() {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-4">
    <div className="w-full h-full">
    <LineChartContainer />
    </div>
    <div className="w-full h-full">
    <PieChartContainer />
    </div>
</div>
);
}
