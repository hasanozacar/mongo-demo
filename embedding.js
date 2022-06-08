const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

// const Course = mongoose.model(
//   "Course",
//   new mongoose.Schema({
//     name: String,
//     author: authorSchema,
//   })
// );

//Using an Array of Sub Document
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

async function addCourse(courseId,author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}


async function removeCourse(courseId,authorId) {
  const course = await Course.findById(courseId);
  const author= course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", new Author({ name: "Mosh" }));

//Using an Array of Sub Document
// createCourse("Node Course", [
//     new Author({ name: "Hasa" }),
//     new Author({ name: "Hasan" }),
//     new Author({ name: "Ozac" }),
//     new Author({ name: "ACar" }),
// ]);

// //add
// addCourse("62a121f43e311c5a04ef66f2",new Author({ name: "AddNew" }))

//remove
removeCourse("62a121f43e311c5a04ef66f2","62a1220da9398d5a1088e442")

