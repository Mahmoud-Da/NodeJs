const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mahmoud",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // const courses = await Course.find(); // get all courses

  const courses = await Course.find({ author: "Mahmoud", isPublished: true }) // Filter
    .limit(10) // Limit number of results
    .sort({ name: 1 }) // Sort ascending by name
    .select({ name: 1, tags: 1 }); // Return only specific fields

  console.log(courses);
}

getCourses();
