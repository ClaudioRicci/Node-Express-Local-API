/*Run the various API endpoints e.g.:
http://localhost:5000/api/courses/ in the Chrome 'Postman' API or Postman.
Try the different CRUD Methods (POST, GET, PUT, DElETE) in the interface, you should see the appropriate output
TIP: Open at leat 2 'Postman' tabs in the interfaxce so you can see the effects of different CRUD operators 
on the same endpoint*/

/*TO RUN THIS APPLICATION ->
Type 'nodemon' in terminal. Nodemon allows you to make changes to code
and not have to constantly restart the Node.js server to see changes.*/

const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

/*Route Handler*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
  //   res.send([1, 2, 3]);
});

//Posting to Route
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); // equivalent to result.error - this is destructuring

  if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

//*To ADD a course*/

app.put("api/courses/:id", (req, res) => {
  //Get course
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  //   const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // equivalent to result.error - this is destructuring

  if (error) {
    //400 Bad request
    res.status(400).send(error.details[0].message);
    return;
  }

  //Update.course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  //Validete
  const schema = {
    name: JOi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  // res.send(req.params.id);
  res.send(course);
});

/*Example of returning using 'year' and 'month' parameters*/
/*Example: http://localhost:5000/api/posts/2018/1 */
app.get("/api/posts/:year/:month", (req, res) => {
  /*Uses 'params' method for non-optional response parameters*/
  res.send(req.params);
});

/*Example of returning a 'sortBy' query*/
/*Example: 'sortBy' query:http://localhost:5000/api/posts/2018/1?sortBy=name */

app.get("/api/posts/:year/:month", (req, res) => {
  /*Uses 'query' method for optional response parameters*/
  res.send(req.query);
});

//DELETE a course

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

//PORT Environment variable. I f a port environment variable is set, use that, otherwise fallback to 3000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listen on port ${port}...`));
