const logJSON = (template, ...values) => {
    const result = template.reduce((acc, str, index) =>
        acc + JSON.stringify(values[index - 1]) + str
    );
    console.log(result);
};

const a = [1, 2, 3];
const o = {"answer": 42};
const s = "foo";
logJSON`Logging: a = ${a} and o = ${o} and s = ${s}`;
