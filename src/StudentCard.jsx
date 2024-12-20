import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { getStudents } from "./GetStudents";

function StudentCardGrid() {
  const emojis = [
    "🤖",
    "👨‍💻",
    "👩‍🌾",
    "🐱",
    "🐶",
    "🦁",
    "🌱",
    "🌵",
    "🌻",
  ];

  const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const [studentsToDisplay, setStudentsToDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const loadMoreStudents = async () => {
    if (loading) return;
    setLoading(true);
    const response = await getStudents(pageSize, page);
    setStudentsToDisplay((prevData) => [...prevData, ...response.data]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreStudents();
  }, []);

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gray-900 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-2 gap-6 w-full max-w-4xl px-4 bg-gray-900"
      >
        {studentsToDisplay.map((student, index) => (
          <Card key={index} className="bg-gray-800 text-white shadow-md font-bold border border-white rounded-lg">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                <CardTitle>
                  {student.name} <span>{getRandomEmoji()}</span>
                </CardTitle>
                <CardDescription>Roll Number: {student.rollNumber}</CardDescription>
              </motion.div>
            </CardHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <CardContent>
                <p>Age: {student.age}</p>
                <p>Marks: {student.marks}</p>
              </CardContent>
              <CardFooter>
                <p>From: {student.city}</p>
              </CardFooter>
            </motion.div>
          </Card>
        ))}

        {loading && (
          <div className="col-span-full text-center text-white mt-4">Loading...</div>
        )}
      </motion.div>

      <div className="w-full flex justify-center mt-6">
        {!loading && (
          <button
            onClick={loadMoreStudents}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentCardGrid;
