import React, { useState } from "react";
import Papa from "papaparse";

const Test = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const result = event.target.result as string;
                    Papa.parse(result, {
                        header: true,
                        encoding: "UTF-8",
                        complete: (results) => {
                            setData(results.data);
                        }
                    });
                }
            };
            reader.readAsText(file, "UTF-8");
        }
    };

    return (
        <>
            <div>UPLOAD A CSV</div>
            <input
                type="file"
                accept=".csv, .xml, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileUpload}
            />
            {data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((value, columnIndex) => (
                                    <td key={columnIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Test;
