'use strict';

class Abstract {
    constructor(val){
        setTimeout(() => {
            this.g(val)
        }, 500);
    }
}

class Concrete extends Abstract {
    g(...args) {
        console.log(args);
    }
}

class Composite {
    constructor(val) {
        this.abstract = new Abstract(val);
        this.abstract.g = this.g.bind(this);
    }

    g(...args) {
        console.log(args);
    }
}

// let c = new Concrete(66);
let cc = new Composite(66);
