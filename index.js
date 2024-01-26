// const knex = require("knex");
const express = require("express"),
  app = express(),
  cors = require("cors"),
  Sequelize = require("sequelize"),
  Op = Sequelize.Op;

// app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "db.uzkqvbaxaxmxniermdvw.supabase.co",
//     user: "postgres",
//     password: "HOO121p1364",
//     database: "postgres",
//     port: 5432,
//   },
// });
const sequelize = new Sequelize(
  "finder_rmta",
  "pouyan",
  "g4xpZdvpElrRWvVY7DuyJaBOuebjvMd2",
  {
    host: "dpg-cmq2rh821fec739jksq0-a",
    port: 5432,
    dialect: "postgres",
  },
  {
    timestamps: false,
  }
);

PORT = process.env.PORT || 8080;

app.post("/make", (req, res) => {
  const make = req.body.make;
  console.log(make);
  sequelize
    .query(`SELECT DISTINCT model FROM finders WHERE make = '${make}'`, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((models) => res.json(models.map((model) => model.model)));
});

app.post("/part", (req, res) => {
  const make = req.body.make,
    model = req.body.model,
    category = req.body.category,
    year = req.body.year;

  db.Finder.findAll({
    where: {
      make: make,
      model: model,
      category: category,
      startYear: { [Op.lte]: year },
      endYear: { [Op.gte]: year },
    },
  }).then((parts) => res.json(parts));
});

app.post("/oem", (req, res) => {
  db.Finder.findAll({
    where: {
      [Op.or]: [
        { OEM1: req.body.OEM },
        { OEM2: req.body.OEM },
        { OEM3: req.body.OEM },
        { OEM4: req.body.OEM },
        { OEM5: req.body.OEM },
        { OEM6: req.body.OEM },
        { OEM7: req.body.OEM },
        { OEM8: req.body.OEM },
        { OEM9: req.body.OEM },
        { OEM10: req.body.OEM },
      ],
    },
  }).then((part) => res.json(part));
});

app.post("/qfpp", (req, res) => {
  db.Finder.findAll({
    where: {
      qfpp: req.body.qfpp,
    },
  }).then((part) => res.json(part));
});
app.get("/:qfpp", (req, res) => {
  db.Finder.findAll({
    where: {
      qfpp: req.params.qfpp,
    },
  }).then((part) => res.json(part));
});
app.post("/relatedpart", (req, res) => {
  const part = req.body.relatedpart;

  db.Finder.findAll({
    where: {
      qfpp: part,
    },
  }).then((parts) => res.json(parts));
});
app.listen(PORT, () => {
  console.log(`Server in running on ${PORT}`);
});
