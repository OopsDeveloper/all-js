function boringOldLinearTime() {
    answer = 42; // ReferenceError: 'answer' is not defined
    console.log(answer);
    let answer;
}
boringOldLinearTime();
