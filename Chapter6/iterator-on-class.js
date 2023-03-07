// Basic iterator example on a class when not using a generator function
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

    [Symbol.iterator]() {
        let current = this.head;
        const itPrototype = Object.getPrototypeOf(
            Object.getPrototypeOf([][Symbol.iterator]())
        );
        const it = Object.assign(Object.create(itPrototype), {
            next() {
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return {value, done: false};
                }
                return {value: undefined, done: true};
            }
        });
        return it;
    }
}

const list = new LinkedList();
list.add("one");
list.add("two");
list.add("three");

for (const value of list) {
    console.log(value);
}
