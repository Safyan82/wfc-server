const ipLocation = require("iplocation");
 
const getLocation =  async(ip) => {
    const location = await ipLocation("172.217.167.78");
    console.log(location);
    return location
    //=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
};

module.exports={getLocation}