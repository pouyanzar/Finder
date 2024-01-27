const express = require("express"),
  app = express(),
  cors = require("cors"),
  Sequelize = require("sequelize"),
  Op = Sequelize.Op;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
var XLSX = require("xlsx");

var workbook = XLSX.readFile("Info.xlsx");

// const sequelize = new Sequelize(
//   "finder_rmta",
//   "pouyan",
//   "g4xpZdvpElrRWvVY7DuyJaBOuebjvMd2",
//   {
//     host: "dpg-cmq2rh821fec739jksq0-a",
//     port: 5432,
//     dialect: "postgres",
//   },
//   {
//     timestamps: false,
//   }
// );

PORT = process.env.PORT || 8080;

app.post("/make", (req, res) => {
  const make = req.body.make;
  const models = [];
  for (const cl in workbook.Sheets["RAD"]) {
    if (typeof workbook.Sheets["RAD"][cl].v === "string") {
      if (workbook.Sheets["RAD"][cl].v.toLowerCase() === make.toLowerCase()) {
        console.log(workbook.Sheets["RAD"]["B" + cl.substring(1, 3)].v);
        models.push(workbook.Sheets["RAD"]["B" + cl.substring(1, 3)].v);
      }
    }
  }
  res.json(models);

  // .then((models) => res.json(models.map((model) => model.model)));
});

app.post("/part", (req, res) => {
  const make = req.body.make,
    model = req.body.model,
    category = req.body.category,
    year = req.body.year;
  const parts = [];
  for (const cl in workbook.Sheets[category]) {
    if (workbook.Sheets[category][cl].v == make) {
      if (workbook.Sheets[category]["B" + cl.substring(1, 3)].v == model) {
        console.log(workbook.Sheets[category]["C" + cl.substring(1, 3)].v);
        let years =
          workbook.Sheets[category]["C" + cl.substring(1, 3)].v.split("-");

        if (
          Number(year) >= Number(years[0]) ||
          Number(year) <= Number(years[1])
        ) {
          console.log(make, model, category, year);
          parts.push({
            make: workbook.Sheets[category][cl].v,
            model: workbook.Sheets[category]["B" + cl.substring(1, 3)].v,
            year: workbook.Sheets[category]["C" + cl.substring(1, 3)].v,
            OEM: workbook.Sheets[category]["E" + cl.substring(1, 3)].v,
            pic:
              workbook.Sheets[category]["G1"].v.toLowerCase() == "pics"
                ? workbook.Sheets[category]["G" + cl.substring(1, 3)].v
                : null,
            price:
              workbook.Sheets[category]["H1"].v.toLowerCase() == "price"
                ? workbook.Sheets[category]["H" + cl.substring(1, 3)].v
                : null,
          });
          console.log({
            make: workbook.Sheets[category][cl].v,
            model: workbook.Sheets[category]["B" + cl.substring(1, 3)].v,
            year: workbook.Sheets[category]["C" + cl.substring(1, 3)].v,
            OEM: workbook.Sheets[category]["E" + cl.substring(1, 3)].v,
            pic: workbook.Sheets[category]["G" + cl.substring(1, 3)].v,
            price: workbook.Sheets[category]["H" + cl.substring(1, 3)].v,
          });
        }
      }
    }
  }
  console.log(JSON.stringify(parts));
  res.json(JSON.stringify(parts));
  // db.Finder.findAll({
  //   where: {
  //     make: make,
  //     model: model,
  //     category: category,
  //     startYear: { [Op.lte]: year },
  //     endYear: { [Op.gte]: year },
  //   },
  // }).then((parts) => res.json(parts));
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
