const obj = {"my-name": 1};
let {my-name} = obj; // SyntaxError: Unexpected token -
let {"my-name"} = obj; // SyntaxError: Unexpected token }