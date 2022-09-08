"use strict";
const someObject = {
    prop1: "prop1",
    prop2: "prop2",
};
console.log({ someObject });
Object.freeze(someObject);
someObject.prop1 = "new value";
console.log({ someObject });
//# sourceMappingURL=app.js.map