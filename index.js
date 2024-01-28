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

PORT = process.env.PORT || 8080;

app.post("/make", (req, res) => {
  const make = req.body.make;
  const category = req.body.category;
  const models = [];
  for (const cl in workbook.Sheets[category]) {
    if (typeof workbook.Sheets[category][cl].v === "string") {
      if (
        workbook.Sheets[category][cl].v.toLowerCase() === make.toLowerCase()
      ) {
        models.push(workbook.Sheets[category]["B" + cl.substring(1, 3)].v);
      }
    }
  }
  res.json(models);
});

app.post("/part", (req, res) => {
  console.log(req.body);
  const make = req.body.make.toUpperCase(),
    model = req.body.model,
    category = req.body.category,
    year = req.body.year;
  const parts = [];
  for (const cl in workbook.Sheets[category]) {
    if (workbook.Sheets[category][cl].v == make) {
      if (workbook.Sheets[category]["B" + cl.substring(1, 3)].v == model) {
        let years =
          workbook.Sheets[category]["C" + cl.substring(1, 3)].v.split("-");

        if (
          Number(year) >= Number(years[0]) ||
          Number(year) <= Number(years[1])
        ) {
          // console.log(make, model, category, year);
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
        }
      }
    }
  }
  console.log(parts);
  res.json(parts);
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
