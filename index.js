const { get } = require("mongoose");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:5,
    maxLength:255,
    uppercase:true
    // match:/patern/
  },
  category:{
    type:String,
    enum:['web','mobile','network'],
    lowercase:true,
    trim:true

  },
  author: String,
  tags: {
    type:Array,
    validate:{
      isAsync:true,
      validator:function(v,calback) {
        setTimeout(() => {
          const result=v && v.length>0
          calback(result);
        }, 4000);
       
      },
      message:"A least one tag"
    } 
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price:{
    type:Number,
    required:function(){return this.isPublished;},
    min:10,
    max:200,
    get: v=> Math.round(v),
    set: v=> Math.round(v),
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(params) {
  const course = new Course({
    name: "React js",
    author: "Hasan",
    tags: ["React"],
    isPublished: true,
    price:15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
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
// // Create
createCourse();

// // Get

// getCourse();

// // Update
// update direct
async function updateCourse(id, isPublished, name) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = isPublished;
  course.name = name;

  const result = await course.save();

  console.log(result);
}

// findByIdAndUpdate()
async function updateCourseByfindByIdAndUpdate(id, isPublished, name) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: name,
        isPublished,
      },
    },
    { new: true }
  );
  console.log(course);
}

// update()
async function updateCourseByUpdate(id, isPublished, name) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: name,
        isPublished,
      },
    }
  );
  console.log(result);
}

// update direct
// updateCourse("629a1297ef7f8f1b16da4509",true,"Hasan")
// updateCourseByUpdate("629a1297ef7f8f1b16da4509",false,"Asamoah")
// updateCourseByfindByIdAndUpdate("629a1297ef7f8f1b16da4509",true,"Acar")

// // Delete

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// deleteCourse("629a1297ef7f8f1b16da4509")
