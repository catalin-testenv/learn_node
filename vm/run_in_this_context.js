const vm = require("vm");
const code = "var bar = 1; console.log(foo); foo = 'Goodbye'";
let foo = "Hello vm";
let context = vm.createContext({
    console: console,
    foo: foo
});
vm.runInContext(code, context);
console.log(foo);
console.log(context.foo);
console.log(context.bar);