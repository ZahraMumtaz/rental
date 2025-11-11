let properties = [];
let currentId = 1;

getNextId = () => currentId++;

module.exports = {
    properties,
    getNextId
};