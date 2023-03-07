// Create a set
console.log("Creating");
const s = new Set();

// Add some entries
console.log("Adding four entries");
s.add("two");
s.add("four");
// The `add` method returns the set, so you can chain `add` calls together
s.add("one").add("three");

// Check if an entry exists
console.log(`Has "two"? ${s.has("two")}`);     // Has "two"? true

// See how many entries are in the set
console.log(`Entries: ${s.size}`);             // Entries: 4

// Adding the same values again doesn't add them
s.add("one").add("three");
console.log(`Entries: ${s.size}`);             // Entries: 4 (still)

// Delete an entry
console.log('Deleting entry "two"');
s.delete("two");
console.log(`Has "two"? ${s.has("two")}`);     // Has "two"? false

// Clear the set (delete all entries)
console.log("Clearing the set");
s.clear();
console.log(`Entries: ${s.size}`);             // Entries: 0
