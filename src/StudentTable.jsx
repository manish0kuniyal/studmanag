import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import studentData from "./student.json"; 

export function TableDemo() {
  return (
    <Table >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Marks</TableHead>
          <TableHead>Avg Marks</TableHead>
          <TableHead>Roll Number</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Attendance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentData.map((student) => (
          <TableRow key={student.rollNumber}> 
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.age}</TableCell>
            <TableCell>{student.marks}</TableCell>
            <TableCell>{student.avgMarks}</TableCell>
            <TableCell>{student.rollNumber}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.city}</TableCell>
            <TableCell>{student.attendance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     </Table>
  );
}
