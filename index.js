const { get } = require("mongoose");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(params) {
  const course = new Course({
    name: "React js",
    author: "Hasan",
    tags: ["Fronted", "node"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  // Comparison operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // get (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  //Logical query operations

  //and
  //or

  //Pagination

  const pageNumber = 2;
  const pageSize = 10;

  const course = await Course
    // find(
    //     {author:"Hasan",isPublished:true}
    // )
    // find({price:{$gte:10,$lte:20}})
    // find({price:{$in:[10,14,20]}}).
    // .or([{author:"Hasan",isPublished:true}])
    // and([{author:"Hasan",isPublished:true}])

    //Starts with Hasan
    // find({author:/^Hasan/})
    //Starts with Hasan with case insensitive
    // .find({ author: /^Hasan/ });
    //Ends with Hasan with case insensitive
    // find({ author: /Hasan$/i })
    //Contains  Hasan with case insensitive

    .find({ author: /.*Hasan.*/i })
    .skip(pageNumber - 1 * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    // Count
    .count();
  console.log(course);
}
// Create
// createCourse();

// Get

getCourse();
