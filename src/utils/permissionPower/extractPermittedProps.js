const { default: mongoose } = require("mongoose");
const { convertArrayToObject } = require("../convertArrayToObject/convertArrayToObject");

const extractPermittedProps = (ctx, obj) => {
    const propsPermission = Object.keys(ctx?.user?.permission[obj]).slice(3);
    const properties = propsPermission?.filter((prop)=>
        ctx?.user?.permission[obj][prop]?.visible==1
    ).map((property)=>ctx?.user?.permission[obj][property]?.label.replaceAll(" ","").toLowerCase());
    
    return convertArrayToObject(properties);
}

const extractPermittedPropIds = (ctx, obj) => {
    const propsPermission = Object.keys(ctx?.user?.permission[obj]).slice(3);
    const properties = propsPermission?.filter((prop)=>
        ctx?.user?.permission[obj][prop]?.visible==1
    )
    const PropertiesObjectType = properties?.map((prop)=>new mongoose.Types.ObjectId(prop));
    return PropertiesObjectType;
}

module.exports = {extractPermittedProps, extractPermittedPropIds}