"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { financeData } from "hooks/data";
import { formatLargeNumber } from "./helper/formatLargeNumber";
import { chartOptions } from "./helper/chartOptions";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type FinancialTableProps = {
  data: Array<{
    title: string;
    value: string | number;
    change: string;
  }>;
  date: string;
};

const FinancialTable: React.FC<FinancialTableProps> = ({ data, date }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              (INR)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {date}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Y/Y Change
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.title} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                {item.title.includes("margin") ||
                item.title.includes("tax rate") ||
                item.title.includes("rate")
                  ? `${item.value}%`
                  : `₹${formatLargeNumber(item.value)}`}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                  item.change === "—"
                    ? "text-gray-700"
                    : parseFloat(item.change) > 0
                      ? "text-positive"
                      : "text-negative"
                }`}
              >
                {item.change === "—"
                  ? "—"
                  : parseFloat(item.change) > 0
                    ? `↑ ${item.change}`
                    : `↓ ${item.change}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Financials = () => {
  // State to manage which accordion section is open
  const [activeSection, setActiveSection] = useState<string | null>("Income Statement"); // 'Income Statement', 'Balance Sheet', 'Cash Flow', or null

  const incomeStatementResults = financeData.financials[0].results;
  const balanceSheetResults = financeData.financials[1].results;
  const cashFlowResults = financeData.financials[2].results;

  // State for period type within each section
  const [incomePeriodType, setIncomePeriodType] = useState("Quarterly");
  const [balanceSheetPeriodType, setBalanceSheetPeriodType] =
    useState("Quarterly");
  const [cashFlowPeriodType, setCashFlowPeriodType] = useState("Quarterly");

  const toggleSection = (sectionTitle: string) => {
    setActiveSection(activeSection === sectionTitle ? null : sectionTitle);
  };

  // Filtered data for Income Statement Chart & Table
  const filteredIncomeData = incomeStatementResults.filter(
    (r) => r.period_type === incomePeriodType,
  );
  const incomeChartData = {
    labels: filteredIncomeData.map((r) => r.date),
    datasets: [
      {
        label: "Revenue",
        data: filteredIncomeData.map((r) =>
          parseFloat(r.table.find((item) => item.title === "Revenue")?.value || "0"),
        ),
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
        borderWidth: 1,
      },
      {
        label: "Net Income",
        data: filteredIncomeData.map((r) =>
          parseFloat(r.table.find((item) => item.title === "Net income")?.value || "0"),
        ),
        backgroundColor: "#28A745",
        borderColor: "#28A745",
        borderWidth: 1,
      },
    ],
  };
  const latestIncomeTableData =
    filteredIncomeData.length > 0 ? filteredIncomeData[0].table : [];
  const latestIncomeTableDate =
    filteredIncomeData.length > 0 ? filteredIncomeData[0].date : "";

  // Filtered data for Balance Sheet Chart & Table
  const filteredBalanceSheetData = balanceSheetResults.filter(
    (r) => r.period_type === balanceSheetPeriodType,
  );
  const balanceSheetChartData = {
    labels: filteredBalanceSheetData.map((r) => r.date),
    datasets: [
      {
        label: "Total Assets",
        data: filteredBalanceSheetData.map((r) =>
          parseFloat(
            r.table.find((item) => item.title === "Total assets")?.value || "0",
          ),
        ),
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
        borderWidth: 1,
      },
      {
        label: "Cash & Short-term Investments",
        data: filteredBalanceSheetData.map((r) =>
          parseFloat(
            r.table.find(
              (item) => item.title === "Cash and short-term investments",
            )?.value || "0",
          ),
        ),
        backgroundColor: "#FFC107", // Yellow for contrast
        borderColor: "#FFC107",
        borderWidth: 1,
      },
    ],
  };
  const latestBalanceSheetTableData =
    filteredBalanceSheetData.length > 0
      ? filteredBalanceSheetData[0].table
      : [];
  const latestBalanceSheetTableDate =
    filteredBalanceSheetData.length > 0 ? filteredBalanceSheetData[0].date : "";

  // Filtered data for Cash Flow Table (using dummy data)
  const filteredCashFlowData = cashFlowResults.filter(
    (r) => r.period_type === cashFlowPeriodType,
  );
  const latestCashFlowTableData =
    filteredCashFlowData.length > 0 ? filteredCashFlowData[0].table : [];
  const latestCashFlowTableDate =
    filteredCashFlowData.length > 0 ? filteredCashFlowData[0].date : "";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Financials
          </h1>
        </div>

        {/* Income Statement Section (Accordion) */}
        <div className="border-t border-gray-200">
          <div
            className="p-6 sm:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleSection("Income Statement")}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Income Statement
            </h2>
            <span className="text-gray-500 text-lg">
              {activeSection === "Income Statement" ? (
                <>&#9650;</>
              ) : (
                <>&#9660;</>
              )}
            </span>
          </div>
          {activeSection === "Income Statement" && (
            <div className="p-6 sm:p-8 pt-0">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setIncomePeriodType("Quarterly")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${incomePeriodType === "Quarterly" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setIncomePeriodType("Annual")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${incomePeriodType === "Annual" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Annual
                </button>
              </div>

              {/* Chart Section */}
              <div className="chart-container mb-8">
                <Bar data={incomeChartData} options={chartOptions} />
              </div>

              {/* Data Table Section */}
              <FinancialTable
                data={latestIncomeTableData}
                date={latestIncomeTableDate}
              />
            </div>
          )}
        </div>

        {/* Balance Sheet Section (Accordion) */}
        <div className="border-t border-gray-200">
          <div
            className="p-6 sm:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleSection("Balance Sheet")}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Balance Sheet
            </h2>
            <span className="text-gray-500 text-lg">
              {activeSection === "Balance Sheet" ? <>&#9650;</> : <>&#9660;</>}
            </span>
          </div>
          {activeSection === "Balance Sheet" && (
            <div className="p-6 sm:p-8 pt-0">
              {/* Tab Navigation for Balance Sheet */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setBalanceSheetPeriodType("Quarterly")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${balanceSheetPeriodType === "Quarterly" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setBalanceSheetPeriodType("Annual")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${balanceSheetPeriodType === "Annual" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Annual
                </button>
              </div>
              {/* Balance Sheet Chart */}
              <div className="chart-container mb-8">
                <Bar data={balanceSheetChartData} options={chartOptions} />
              </div>
              {/* Balance Sheet Table */}
              <FinancialTable
                data={latestBalanceSheetTableData}
                date={latestBalanceSheetTableDate}
              />
            </div>
          )}
        </div>

        {/* Cash Flow Section (Accordion) */}
        <div className="border-t border-gray-200 rounded-b-xl">
          <div
            className="p-6 sm:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleSection("Cash Flow")}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Cash Flow
            </h2>
            <span className="text-gray-500 text-lg">
              {activeSection === "Cash Flow" ? <>&#9650;</> : <>&#9660;</>}
            </span>
          </div>
          {activeSection === "Cash Flow" && (
            <div className="p-6 sm:p-8 pt-0">
              {/* Tab Navigation for Cash Flow */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setCashFlowPeriodType("Quarterly")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${cashFlowPeriodType === "Quarterly" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setCashFlowPeriodType("Annual")}
                  className={`py-2 px-4 text-lg font-medium border-b-2 ${cashFlowPeriodType === "Annual" ? "border-primary-blue text-primary-blue" : "border-transparent text-gray-600 hover:border-gray-300"} focus:outline-none`}
                >
                  Annual
                </button>
              </div>
              {/* Cash Flow Table */}
              <FinancialTable
                data={latestCashFlowTableData}
                date={latestCashFlowTableDate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
