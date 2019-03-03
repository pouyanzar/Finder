const express = require('express'),
app = express(),
cors = require('cors'),
Sequelize = require('sequelize'),
Op = Sequelize.Op;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const sequelize = new Sequelize('d85d4q947826an', 'yahiniwwkmjyzs', '9c1a9cb5cb41447bf6cec034c6c2124940296a6ca1f24c9d7aaf67b6db298444', {
    host:"ec2-54-243-223-245.compute-1.amazonaws.com",
    port:5423,
    dialect: 'mysql'
},{
    timestamps: false
})
// if (process.env.DATABASE_URL) {
    // const sequelize = new Sequelize('mysql://quickfit_adminFinder@quickfitparts.com:3306/quick_finder', {
    //   define: {
    //     freezeTableName: true, // don't make plural table names
    //     underscored: true // don't use camel case
    //   },
    //   dialect: 'mysql'
    //   dialectOptions: {
    //     ssl: true
    //   },
    //   logging: true,
    //   protocol: 'mysql',
    //   quoteIdentifiers: false // set case-insensitive
    // });
//   } else {
//     console.log('Fatal error: DATABASE_URL not set');
//     process.exit(1);

PORT = process.env.PORT || 8080,
db = require('./models');

app.post('/make', (req,res)=>{
    const make = req.body.make;
    console.log(make);
    sequelize.query(`SELECT DISTINCT model FROM finders WHERE make = '${make}'`,{type:sequelize.QueryTypes.SELECT})
    .then(models => res.json(models.map(model => model.model)))
})

app.post('/part',(req,res)=>{
    const make = req.body.make,
    model = req.body.model,
    category=req.body.category,
    year=req.body.year

    db.Finder.findAll({
        where:
        {
            make:make,
            model:model,
            category:category,
            startYear : {[Op.lte]: year},
            endYear: {[Op.gte]:year}
        }
    })
    .then(parts => res.json(parts))
})

app.post('/oem', (req,res)=>{
    db.Finder.findAll({
        where:{
            [Op.or]:[
                {OEM1:req.body.OEM},
                {OEM2:req.body.OEM},
                {OEM3:req.body.OEM},
                {OEM4:req.body.OEM},
                {OEM5:req.body.OEM},
                {OEM6:req.body.OEM},
                {OEM7:req.body.OEM},
                {OEM8:req.body.OEM},
                {OEM9:req.body.OEM},
                {OEM10:req.body.OEM}
            ]
        }
    })
    .then(part => res.json(part))
})

app.post('/qfpp',(req,res)=>{
    db.Finder.findAll({
        where:
        {
            qfpp:req.body.qfpp
        }
    })
    .then(part => res.json(part))
})
app.get('/:qfpp',(req,res)=>{
    db.Finder.findAll(
        {
            where:
            {
                qfpp: req.params.qfpp
            }
        }
    )
    .then(part => res.json(part))
})
app.post('/relatedpart',(req,res) =>{

    const part = req.body.relatedpart;

    db.Finder.findAll({
        where:
        {
            qfpp:part
        }
    })
    .then(parts => res.json(parts))
   
})
app.listen(PORT, ()=>{
    console.log(`Server in running on ${PORT}`);
})