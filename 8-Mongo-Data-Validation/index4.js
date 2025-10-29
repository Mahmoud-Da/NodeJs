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
    // Mongoose old Version
    // validate: {
    //   isAsync: true,
    //   validator: function (v, callback) {
    //     setTimeout(() => {
    //       const result = v && v.length > 0;
    //       callback(result);
    //     }, 4000); // Simulating async operation (4 seconds)
    //   },
    //   message: "A course should have at least one tag.",
    // },
    // Mongoose new Version V5
    validate: {
      validator: async function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000); // Simulating async operation (4 seconds)
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
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mahmoud",
    category: "web",
    tags: null,
    isPublished: true,
    price: 20,
  });

  try {
    await course.save();
  } catch (ex) {
    console.log(ex.message);
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
