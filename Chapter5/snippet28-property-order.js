function example(obj) {
    obj.answer = 42;
    obj.question = "Life, the Universe, and Everything";
    return obj;
}

const obj1 = example({});
console.log(Object.keys(obj1)); // ["answer", "question"]

const obj2 = example({question: "What's the meaning of life?"});
console.log(Object.keys(obj2)); // ["question", "answer"]
