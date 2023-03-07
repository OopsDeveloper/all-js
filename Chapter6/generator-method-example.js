class LinkedList {
    constructor() {
        this.head = this.tail = null;
    }

    add(value) {
        const entry = {value, next: null};
        if (!this.tail) {
            this.head = this.tail = entry;
        } else {
            this.tail = this.tail.next = entry;
        }
    }

    *[Symbol.iterator]() {
        for (let current = this.head; current; current = current.next) {
            yield current.value;
        }
    }
}

const list = new LinkedList();
list.add("one");
list.add("two");
list.add("three");

for (const value of list) {
    console.log(value);
}
