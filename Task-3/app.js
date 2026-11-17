import os from "node:os";
import express from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();

const filePath = path.join(
  import.meta.dirname,
  "data",
  "courses.json"
);

// GET all courses with category filter
app.get("/api/courses", async (req, res) => {
  try {
    // TODO 1: Read the file
    const data = await fs.readFile(filePath, "utf-8");

    // TODO 2: Convert JSON string into JavaScript object
    const courses = JSON.parse(data);

    // TODO 3: Get category from URL
    const category = req.query.category;

    // TODO 4: If category is not provided, return all courses
    if (!category) {
      return res.json(courses);
    }

    // TODO 5: Filter courses by category
    const filteredCourses = courses.filter(
      (course) => course.category === category
    );

    // TODO 6: Send filtered courses
    res.json(filteredCourses);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// GET course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    // TODO 7: Read the file and parse it
    const data = await fs.readFile(filePath, "utf-8");
    const courses = JSON.parse(data);

    // TODO 8: Get the ID
    const id = Number(req.params.id);

    // TODO 9: Find the course
    const course = courses.find((c) => c.id === id);

    // TODO 10: Check if course is not found
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // TODO 11: Send the found course
    res.json(course);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});
// GET system health information: 
app.get("/api/health", (req, res) => {
  const platform = os.platform();
  const cpuCores = os.cpus().length;
  const freeMemory = os.freemem();

  res.json({
    platform,
    cpuCores,
    freeMemory
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});