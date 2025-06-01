import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DasboardCards = () => {
  const baseOptions = {
    chart: {
      type: 'line',
      height: 100,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  // Example card data
const cards = [
  {
    title: 'Total Courses',
    percent: '+8.5%',
    isPositive: true,
    series: [{ name: 'Desktops', data: [10, 25, 20, 35, 50, 70, 80  , 100] }],
  },
  {
    title: 'Active Users',
    percent: '-4.2%',
    isPositive: false,
    series: [{ name: 'Desktops', data: [70, 60, 65, 50, 55, 40, 35, 30] }],
  },
  {
    title: 'Subscribers',
    percent: '+12.0%',
    isPositive: true,
    series: [{ name: 'Desktops', data: [15, 30, 25, 35, 40, 45, 50, 55] }],
  },
  // {
  //   title: 'Dropouts',
  //   percent: '-3.3%',
  //   isPositive: false,
  //   series: [{ name: 'Desktops', data: [55, 50, 60, 45, 50, 40, 35, 25] }],
  // },
];


  return (
    <div className="dashbord-cards">
      {cards.map((card, index) => {
        const options = {
          ...baseOptions,
          stroke: {
            ...baseOptions.stroke,
            colors: [card.isPositive ? '#28a745' : '#dc3545'], // green or red line
          },
        };

        return (
          <div className="cards-wrapped theme-card" key={index}>
            <h3 className='card-heading'>{card.title}</h3>
            <div className="graphline">
              <ReactApexChart
                options={options}
                series={card.series}
                type="line"
                height={100}
                width="100%"
              />
            </div>
            <p>
              <span  style={{ color: card.isPositive ? '#28a745' : '#dc3545' }}>{card.percent}</span> Since yesterday
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DasboardCards;
