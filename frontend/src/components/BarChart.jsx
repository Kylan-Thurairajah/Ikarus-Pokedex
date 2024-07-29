import React from "react"
import { Bar } from "react-chartjs-2"
import "./PokemonDetails.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ stats }) => {
  const data = {
    labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
    datasets: [
      {
        data: [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]],
        backgroundColor: "rgba(55, 184, 117, 0.2)",
        borderColor: "#4bc093",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 280,
        ticks: {
          stepSize: 40,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default BarChart
