const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  await course.save();
}

// old mongoose support remove()
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  await course.save();
}

// Using filter
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  // Filter out the author by ID
  course.authors = course.authors.filter((a) => a._id.toString() !== authorId);

  await course.save();
  console.log("Author removed successfully");
}

// Using pull
// async function removeAuthor(courseId, authorId) {
//   const course = await Course.findById(courseId);

//   course.authors.pull({ _id: authorId }); // removes matching subdocument
//   await course.save();
//   console.log("Author removed successfully");
// }

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);

// addAuthor("6909b648a05400910103c2ac", new Author({ name: "Amy" }));
removeAuthor("6909b648a05400910103c2ac", "6909b6808923fdd1f79dcfce");
