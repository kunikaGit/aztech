import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ title, value }) => {
    const chartData = {
        series: [value],
        options: {
            chart: {
                type: "radialBar",
                offsetY: -20,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#1e1e1e", // Matches your card bg
                        strokeWidth: "97%",
                        margin: 5,
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: "#000",
                            opacity: 0.5,
                            blur: 3,
                        },
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "20px",
                            color: 'var(--text_black)',
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    shadeIntensity: 0.5,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91],
                    colorStops: [
                        { offset: 0, color: "var(--blue-color)", opacity: 1 },
                        { offset: 100, color: "var(--blue-color)", opacity: 1 },
                    ],
                },
            },
            labels: ["Progress"],
        },
    };

    return (
        <div
            className="objective-graph"
            style={{
                borderRadius: "12px",
                color: "var(--text_black)",
                textAlign: "center",
            }}>
            <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={150} />
            <h3 className="text-xs" >{title}</h3>
        </div>
    );
};

const Radarcharts = ({data}) => {



    return (
        <>
            <div className="radar-card theme-card mb-4" >
                <h2 className="card-heading" style={{ color: 'var(--text_black)' }}>
                     Activity</h2>
                <div className="tradingobjective-cards">
                    <ApexChart title="Package product visited" value={data.totalVisitedFromPackage} />
                    <ApexChart title="Referral (Daily)" value={data.totalReferal} />
                    <ApexChart title="Downline (Overall)" value={data.totalDownline} />
                    <ApexChart title="Other products" value={data.totalotherPurchases} />
                </div>
            </div>
          
        </>
    );
};

export default Radarcharts;
