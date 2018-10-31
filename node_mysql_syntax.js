// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "muhammad",
//   password: "password",
//   database: "restful_node"
// });

// Generate data by faker
// ========================
// let data = [];
// for (let i = 0; i < 100; i++) {
//   data.push([faker.name.title(), faker.lorem.paragraph(), faker.date.past()]);
// }

// Populated data to sql
// ======================
// router.get("/createposts", (req, res) => {
//   const q = "insert into posts(title, body, created_at) values ?";
//   connection.query(q, [data], (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
//   res.send("/100 posts");
// });

// Created table using sql
// =============================
// router.get("/createTable", (req, res) => {
//   const q = `create table posts (
//     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
//     title VARCHAR(100) NOT NULL,
//     body TEXT NOT NULL,
//     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
//   )`;
//   connection.query(q, (err, res) => {
//     if (err) throw err;
//   });
//   res.send("CREATED");
// });

// // Read ALL
// router.get("/", (req, res) => {
//   const q = "select * from posts";
//   connection.query(q, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Read
// router.get("/:id", (req, res) => {
//   const q = `select * from posts where id=${req.params.id}`;
//   connection.query(q, (err, result) => {
//     if (err) throw err;
//     if (result.length <= 0) return res.status(404).send("Post was not found!");

//     res.send(result);
//   });
// });

// // Create
// router.post("/", (req, res) => {
//   const { error } = validateCourse(req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   const { title, body } = req.body;
//   const q = `insert into posts(title, body) values("${title}", "${body}")`;
//   connection.query(q, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Update
// router.put("/:id", (req, res) => {
//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const { id } = req.params;
//   const { title, body } = req.body;
//   const q = `update posts set title = "${title}", body = "${body}" where id = ${id}`;

//   connection.query(q, (err, result) => {
//     if (err) throw err;
//     if (result.affectedRows === 0)
//       return res.status(404).send("Post does not exist!");
//     console.log(result.affectedRows);
//     res.send(result);
//   });
// });

// // Delete
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const q = `delete from posts where id = ${id} `;

//   connection.query(q, (err, result) => {
//     if (err) throw err;
//     if (result.affectedRows === 0)
//       return res.status(404).send("Post already deleted!");
//     res.send(result);
//   });
// });
