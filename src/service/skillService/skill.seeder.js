const mongoose = require('mongoose');


mongoose.connect('mongodb://safyan:2015-ag-5563@134.209.22.223:27017/wfcDev?authSource=wfcDev',{});

const SkillsSchema = new mongoose.Schema({
    skill: String,
    categoryId: {type: Number,  required: false},
    anyExpiry: {type: Boolean, required: false},
    digitalCertificate: {type: Boolean, required: false}
    // other fields...
});

const skillModel = mongoose.model('skills' ,SkillsSchema)

//Employee: ['HR', 'Pay Details', 'HR Task', 'Absense', 'Calendar', 'Sites Trained/Banned', 'Skills', 'Premiums', 'Custom Fields', 'Document Library'],

const skillsData = [
    {
        skill: 'Security guarding',
        categoryId: 1,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'Door supervision',
        categoryId: 1,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'CCTV license',
        categoryId: 1,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'Close protection',
        categoryId: 1,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'SIA Licenced Staff',
        categoryId: 1,
        anyExpiry: false,
        digitalCertificate: false
    },
    
    {
        skill: 'HMCT trained',
        categoryId: 2,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'EL1 clearnce',
        categoryId: 3,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'Stewarding',
        categoryId: 3,
        anyExpiry: false,
        digitalCertificate: false
    },
    
    {
        skill: 'Fire warden',
        categoryId: 4,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'First aid',
        categoryId: 5,
        anyExpiry: false,
        digitalCertificate: false
    },
    {
        skill: 'Mental Health Awareness',
        categoryId: 5,
        anyExpiry: false,
        digitalCertificate: false
    },
];

skillModel.insertMany(skillsData).then(()=>console.log("skill data added successfully")).catch((err)=>console.log("error while seeding skill data"+err.message));