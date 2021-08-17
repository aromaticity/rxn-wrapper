const orderedTreeNodes = {
    a: {
        actions: ['a'],
    },
    b: {
        actions: ['b'],
    },
    c: {
        actions: ['c']
    }
};

const keysToKeep = ['a', 'b'];
let test = [];

Object.keys(orderedTreeNodes).forEach(node => {
    if (!keysToKeep.includes(node)) delete orderedTreeNodes[node];
    if (orderedTreeNodes[node] !== undefined) test = test.concat(orderedTreeNodes[node].actions);
})

//console.log(orderedTreeNodes);
console.log(test);