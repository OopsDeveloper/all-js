// Create a map
console.log("Creating");
const m = new Map();

// Add some entries
console.log("Adding four entries");
m.set(60, "sixty");
m.set(4, "four");
// `set` returns the map, so you can chain `set` calls together
m.set(50, "fifty").set(3, "three");

// See how many entries are in the map
console.log(`Entries: ${m.size}`);       // Entries: 4

// Get an entry's value
let value = m.get(60);
console.log(`60: ${value}`);             // 60: sixty
console.log(`3: ${m.get(3)}`);           // 3: three

// `get` returns `undefined` if no entry has the given key
console.log(`14: ${m.get(14)}`);         // 14: undefined

// Keys are not strings
console.log('Look for key "4" instead of 4:');
console.log(`"4": ${m.get("4")}`);       // "4": undefined (the key is 4, not "4")
console.log('Look for key 4:');
console.log(`4: ${m.get(4)}`);           // 4: four

// Update an entry
console.log("Updating entry for key 3 to THREE");
m.set(3, "THREE");
console.log(`3: ${m.get(3)}`);           // 3: THREE
console.log(`Entries: ${m.size}`);       // Entries: 4 (still)

// Delete an entry
console.log("Deleting the entry for key 4");
m.delete(4);

// Check if an entry exists
console.log(`Entry for 7? ${m.has(7)}`); // Entry for 7? false
console.log(`Entry for 3? ${m.has(3)}`); // Entry for 3? true

// Keys don't have to be all of the same type
m.set("testing", "one two three");
console.log(m.get("testing"));           // one two three

// Keys can be objects
const obj1 = {};
m.set(obj1, "value for obj1");
console.log(m.get(obj1));                // value for obj1

// Different objects are always different keys, even if they have
// the same properties
const obj2 = {};
m.set(obj2, "value for obj2");
console.log(`obj1: ${m.get(obj1)}`);    // obj1: value for obj1
console.log(`obj2: ${m.get(obj2)}`);    // obj2: value for obj2

// null, undefined, and NaN are perfectly valid keys
m.set(null, "value for null");
m.set(undefined, "value for undefined");
m.set(NaN, "value for NaN");
console.log(`null: ${m.get(null)}`);           // null: value for null
console.log(`undefined: ${m.get(undefined)}`); // undefined: value for undefined
console.log(`NaN: ${m.get(NaN)}`);             // NaN: value for NaN

// Delete all entries
console.log("Clearing the map");
m.clear();
console.log(`Entries now: ${m.size}`);  // Entries now: 0