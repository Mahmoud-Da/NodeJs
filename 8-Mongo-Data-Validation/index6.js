const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 20 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: async function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mahmoud",
    category: "web",
    tags: ["front-end"],
    isPublished: true,
    price: 15.8,
  });

  try {
    await course.save();
    console.log(course);
  } catch (ex) {
    for (field in ex.errors) {
      const validationError = ex.errors[field];
      console.log(validationError.message);
    }
  }
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

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

createCourse();
