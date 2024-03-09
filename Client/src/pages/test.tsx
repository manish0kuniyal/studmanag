import React, { useState } from 'react'
import * as XLSX from "xlsx"
function Test() {
const [excelFile,setExcelFile]=useState(null)
const [excelData,setExcelData]=useState(null)

const handleFileChange=(e)=>{
        let selectedFile = e.target.files[0]    
        if(selectedFile){
        console.log(selectedFile.type)
        let reader=new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload=(e)=>{
            setExcelFile(e.target.result)
        }
        }
        else{
            console.log("select a file")
        }
}

const handleFileSubmit=(e)=>{
    e.preventDefault()
    if(excelFile!=null){
        const workbook=XLSX.read(excelFile,{type:"buffer"})
        const worksheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[worksheetName]
        const data=XLSX.utils.sheet_to_json(worksheet)
        setExcelData(data.slice(0,10))
    }
}

return (<>
    <div>Test</div>
    <form className='border-2 flex flex-col'
    onSubmit={handleFileSubmit}
    >
    <input
    type="file"
    onChange={handleFileChange}
    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />    
    <button className='border-2 m-2 w-[20%]' onClick={handleFileChange}>Upload</button>
    </form>
    <div>
        {excelData ?(
        <div>
            <table>
                <thead>
                    <tr>
                        {Object.keys(excelData[0]).map((key)=>{
                            <th key={key}>{key}</th>
                        })}
                    </tr>
                </thead>
            </table>
        </div>
        ):
        (
        <div>No File is Uploaded</div>
        )}
    </div>
    
    </> )
}

export default Test