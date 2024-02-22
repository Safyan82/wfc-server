const mongoose = require('mongoose');


mongoose.connect('mongodb://safyan:2015-ag-5563@134.209.22.223:27017/wfcDev?authSource=wfcDev',{});

const SkillCategorySchema = new mongoose.Schema({
    id: Number,
    category: String
    // other fields...
});

const skillcategoriesModal = mongoose.model('skillcategories' ,SkillCategorySchema)

const skillCategoryData = [
    {id: 1, category: "SIA licenses"},
    {id: 2, category: "HMCT courts"},
    {id: 3, category: "HMPPS"},
    {id: 4, category: "Fire warden training"},
    {id: 5, category: "Health & Safety"},
];

skillcategoriesModal.insertMany(skillCategoryData).then(()=>console.log("skillCatgory data added successfully")).catch((err)=>console.log("error while seeding skill data"+err.message));