import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {motion} from "motion/react"
import studentData from "./student.json";

export function TableDemo() {
  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(studentData.length / itemsPerPage);

  const paginatedData = studentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
      <motion.div
       initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }}   
          transition={{ duration: 1 }}
      className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Name</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Age</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Marks</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Avg Marks</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Roll Number</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Class</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">City</TableHead>
              <TableHead className="px-4 py-2 text-sm text-gray-600">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((student) => (
              <TableRow key={student.rollNumber} className="border-b hover:bg-gray-50">
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.name}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.age}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.marks}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.avgMarks}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.rollNumber}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.class}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.city}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-800">{student.attendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
        <Pagination className="mt-4">
          <PaginationContent className="flex justify-center items-center space-x-4">
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePrevious} 
                disabled={currentPage === 1} 
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 text-sm rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        </motion.div>
      </motion.div>
    </div>
  );
}
