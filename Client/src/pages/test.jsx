import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // File type validation
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const parsedData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setData(parsedData);
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx, .xls" />
      {data.length > 0 && (
        <table>
          <thead>
            <tr >
              {data[0].map((header, index) => (
                <th className='border-2' key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr className='border-2' key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td className='border-2' key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FileUploader;
