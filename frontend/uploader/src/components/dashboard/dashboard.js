import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'POS Bar Chart',
    },
  },
};

const labels = ['Nouns', 'Pronouns', 'Adjectives', 'Adverbs'];

export const getData = (values) => ({
  labels,
  datasets: [
    {
      label: '% of sentences',
      data: [values.nouns, values.pronouns, values.adjectives, values.adverbs],
      backgroundColor: 'rgba(17, 189, 31, 0.8)',
    },
  ],
});

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const location = useLocation();
  const name = location.state.name;

  const fetchData = async () => {
    const data = await fetch(`/api?name=${name.split('.')[0]}`, {
      method: "GET"
    });
    const resultantData = await data.json();
    setChartData({
      nouns: resultantData.data.nouns,
      pronouns: resultantData.data.pronouns,
      adjectives: resultantData.data.adjectives,
      adverbs: resultantData.data.adverbs
    });
  }

  useEffect(() => {
    (
      async () => {
        await fetchData();
        setIsLoading(false);
      }
    )()
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {
        !isLoading && (
          <div className='bar-chart'>
            <Bar options={options} data={getData(chartData)} />
          </div>
        )
      }
    </>
  );
}

export default Dashboard;
