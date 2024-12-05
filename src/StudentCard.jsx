import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {motion} from "motion/react"
import studentData from "./student.json";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-8">
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
      className="grid grid-cols-2 gap-6 w-full max-w-4xl px-4 bg-gray-900">
        {studentData.map((student, index) => (
          <Card key={index} className="bg-gray-800 text-white shadow-md font-bold border border-white rounded-lg">
            <CardHeader>
                <motion.div
                
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1,delay:.1 }}
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
        transition={{ duration: 1,delay:.1 }}
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
      </motion.div>
    </div>
  );
}

export default StudentCardGrid;
