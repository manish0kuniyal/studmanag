

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import LineChart from "./graph";

const SalaryTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "year", direction: "ascending" });
  const [selectedYear, setSelectedYear] = useState(null);
  const [jobTitlesData, setJobTitlesData] = useState([]);

  useEffect(() => {
    fetch('/salaries.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const aggregatedData = aggregateData(result.data);
            setData(aggregatedData);
            setSortedData(aggregatedData);
          }
        });
      });
  }, []);

  const aggregateData = (rawData) => {
    const aggregated = rawData.reduce((acc, row) => {
      const { work_year, job_title, salary_in_usd } = row;
      const salary = parseFloat(salary_in_usd);

      if (isNaN(salary) || !work_year || !job_title) {
        return acc;
      }

      if (!acc[work_year]) {
        acc[work_year] = { totalJobs: 0, totalSalary: 0, jobTitles: {} };
      }
      acc[work_year].totalJobs += 1;
      acc[work_year].totalSalary += salary;

      if (!acc[work_year].jobTitles[job_title]) {
        acc[work_year].jobTitles[job_title] = 0;
      }
      acc[work_year].jobTitles[job_title] += 1;

      return acc;
    }, {});

    return Object.keys(aggregated).map(year => {
      const { totalJobs, totalSalary, jobTitles } = aggregated[year];
      return {
        year,
        totalJobs,
        averageSalary: totalJobs > 0 ? (totalSalary / totalJobs).toFixed(2) : "0.00",
        jobTitles: Object.entries(jobTitles).map(([title, count]) => ({ job_title: title, count }))
      };
    });
  };

  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
    }
    return '🔃';
  };

  const handleRowClick = (year) => {
    setSelectedYear(year);
    const yearData = data.find(row => row.year === year);
    if (yearData) {
      setJobTitlesData(yearData.jobTitles);
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">ML Engineer Salaries (2020-2024)</h2>
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b cursor-pointer text-center" onClick={() => sortData("year")}>
                Year {getSortIndicator("year")}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer text-center" onClick={() => sortData("totalJobs")}>
                Number of Total Jobs {getSortIndicator("totalJobs")}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer text-center" onClick={() => sortData("averageSalary")}>
                Average Salary (USD) {getSortIndicator("averageSalary")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                onClick={() => handleRowClick(row.year)}
              >
                <td className="px-4 py-2 border-b text-center">{row.year}</td>
                <td className="px-4 py-2 border-b text-center">{row.totalJobs}</td>
                <td className="px-4 py-2 border-b text-center">${row.averageSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <LineChart data={sortedData} />

   
        {selectedYear && jobTitlesData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Job Titles for {selectedYear}</h3>
            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b text-center">Job Title</th>
                  <th className="px-4 py-2 border-b text-center">Number of Jobs</th>
                </tr>
              </thead>
              <tbody>
                {jobTitlesData.map((job, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 border-b text-center">{job.job_title}</td>
                    <td className="px-4 py-2 border-b text-center">{job.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryTable;
