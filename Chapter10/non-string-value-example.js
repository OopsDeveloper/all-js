const logJSON = (template, ...values) => {
    let result = template[0];
    for (let index = 1; index < template.length; ++index) {
        result += JSON.stringify(values[index - 1]) + template[index];
    }
    console.log(result);
};

const a = [1, 2, 3];
const o = {"answer": 42};
const s = "foo";
logJSON`Logging: a = ${a} and o = ${o} and s = ${s}`;
