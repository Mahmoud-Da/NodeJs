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
  const courses = await Course.find({ author: "Mahmoud", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();

  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Jack",
      isPublished: true,
    },
  });

  console.log(course);
}

// async function removeCourse(id) {
//   const result = await Course.deleteOne({ _id: id });
//   console.log(result);
// }

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeCourse("68ff097717f3b86ac1bbba42");
