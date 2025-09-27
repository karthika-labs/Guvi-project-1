import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function ChartCategory({ totalPerCategory }) {
  const backgroundColor = [
    "rgba(52, 211, 153, 0.7)",
    "rgba(96, 165, 250, 0.7)",
    "rgba(250, 204, 21, 0.7)",
    "rgba(167, 139, 250, 0.7)",
  ];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const piedata = {
    labels: Object.keys(totalPerCategory || {}),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(totalPerCategory || {}),
        backgroundColor,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const bardata = {
    labels: Object.keys(totalPerCategory || {}),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(totalPerCategory || {}),
        backgroundColor,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Expenses by Category - Pie",
        color: "#a0a0a0", 
        font: { size: 18, weight: "600" },
      },
      tooltip: {
        titleColor: "#1f2937",
        bodyColor: "#111827",
        backgroundColor: "#f3f4f6", 
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutCubic",
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Expenses by Category - Bar",
        color: "#a0a0a0", // dark gray
        font: { size: 18, weight: "600" },
      },
      tooltip: {
        titleColor: "#1f2937",
        bodyColor: "#111827",
        backgroundColor: "#f3f4f6", // light gray background
      },
    },
    scales: {
      x: {
        ticks: { color: "#1f2937", font: { size: 12 } },
      },
      y: {
        ticks: { color: "#1f2937", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="w-full space-y-6">
      <h4 className="flex items-center font-bold text-white justify-center text-xl rounded bg-gradient-to-r from-blue-500 via-purple-600 to-blue-300">
        CHARTS 📊
      </h4>

      {totalPerCategory &&
        (Object.keys(totalPerCategory).length <= 0 ? (
          <div className="flex items-center justify-center">No data found for this filter. </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-blue-100">
            {/* Pie Chart */}
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded shadow">
              <div className="flex items-center justify-center gap-2 mb-4 bg-blue-100 rounded px-2 py-1 ">
                <span
                  className="w-4 h-4 rounded-full 
                   bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500 
                   inline-block"
                ></span>

                <h4
                  className="text-xl text-black 
                 
                  rounded"
                >
                  - Chart
                </h4>
              </div>

              <div className="w-full max-w-sm h-96">
                <Pie data={piedata} options={optionsPie} />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded shadow">
              <div className="flex items-center justify-center gap-2 mb-4 bg-blue-100 rounded px-2 py-1">
                <span
                  className="w-2 h-5 
                   bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500 
                   inline-block"
                ></span>

                <h4
                  className="text-xl text-black 
                 
                  rounded"
                >
                  - Chart
                </h4>
              </div>
              <div className="w-full max-w-sm h-96">
                <Bar
                  data={bardata}
                  options={{
                    ...options,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChartCategory;
