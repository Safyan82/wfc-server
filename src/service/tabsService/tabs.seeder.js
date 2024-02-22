const mongoose = require('mongoose');


mongoose.connect('mongodb://safyan:2015-ag-5563@134.209.22.223:27017/wfcDev?authSource=wfcDev',{});

const TabsSchema = new mongoose.Schema({
    tab: String,
    groups: {type: mongoose.Schema.Types.Mixed,  required: false},
    module: {type: String, required: false}
    // other fields...
});

const TabModel = mongoose.model('Tabs' ,TabsSchema)

//Employee: ['HR', 'Pay Details', 'HR Task', 'Absense', 'Calendar', 'Sites Trained/Banned', 'Skills', 'Premiums', 'Custom Fields', 'Document Library'],

const tabData = [
    {"tab": "HR"},
    {"tab": "Pay Details"},
    {"tab": "HR Task"},
    {"tab": "Absense"},
    {"tab": "Calendar"},
    {"tab": "Sites Trained/Banned"},
    {"tab": "Skills"},
    {"tab": "Premiums"},
    {"tab": "Custom Fields"},
    {"tab": "Document Library"},
];

TabModel.insertMany(tabData).then(()=>console.log("tab seeded successfully")).catch((err)=>console.log("error while seeding tab data"+err.message));