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

  const course = await Course.
  // find(
  //     {author:"Hasan",isPublished:true}
  // )
  // find({price:{$gte:10,$lte:20}})
  find({price:{$in:[10,14,20]}}).
  // .or([{author:"Hasan",isPublished:true}])
  and([{author:"Hasan",isPublished:true}])
  .limit(10).sort({name:1}).select({name:1,tags:1});
  console.log(course);
}
// Create 
// createCourse();

// Get

getCourse();