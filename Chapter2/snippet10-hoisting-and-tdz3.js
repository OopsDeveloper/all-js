let answer; // The outer 'answer'
function hoisting() {
    answer = 42; // ReferenceError: 'answer' is not defined
    console.log(answer);
    let answer; // The inner 'answer'
}
hoisting();
