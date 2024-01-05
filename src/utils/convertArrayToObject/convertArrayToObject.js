const convertArrayToObject = (myArray)=>{
    const myObject = myArray.reduce((accumulator, current, index, array) => {
        // Check if the current index is even (keys in the array)
        // if (index % 2 === 0) {
          // Assign the next element in the array as the value for the current key
          accumulator[current] = 1;
        // }
        return accumulator;
      }, {});
    return myObject;
}

module.exports = {convertArrayToObject}