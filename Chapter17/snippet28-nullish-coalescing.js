const obj = {};
let nextId = 1;
obj.id = obj.id ?? nextId++;
console.log(obj.id, nextId);    // 1 2
obj.id = obj.id ?? nextId++;
console.log(obj.id, nextId);    // 1 2 again, `nextId` wasn't incremented 
