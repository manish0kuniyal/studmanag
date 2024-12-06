export const getStudents = async (pageSize, pageNumber) => {
    const { default: students } = await import("./student.json");
  
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedData = students.slice(startIndex, startIndex + pageSize);
        
        resolve({
          data: paginatedData,
          totalItems: students.length,
        });
      }, 2000);
    });
  };
  