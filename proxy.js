function traceMethodCalls(obj) {
    let handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                let result = origMethod.apply(this, args);
                console.log(
                    propKey +
                        JSON.stringify(args) +
                        " -> " +
                        JSON.stringify(result)
                );
                return result;
            };
        },
    };
    return new Proxy(obj, handler);
}

let obj = {
    multiply(x, y) {
        return x * y;
    },
    squared(x) {
        return this.multiply(x, x);
    },
};

const p = traceMethodCalls(obj);

p.multiply(23, 5);
