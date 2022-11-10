"use strict";
const myObj = {};
myObj["1"] = "one";
Object.assign(myObj, { 1: "two" });
myObj[1] = "three";
console.log(myObj);
const myMap = new Map();
myMap.set("1", "one");
myMap.set(1, "two");
myMap.set(1, "three");
console.log(myMap);
//# sourceMappingURL=app.js.map