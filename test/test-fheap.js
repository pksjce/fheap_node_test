var fheap = require('../fheap.js');

exports['insert'] = function(test){
	var newheap = new fheap;
	newheap.insert(9);
	newheap.insert(1);
	newheap.insert(2);
	newheap.insert(4);
	newheap.insert(5);
	test.equal(newheap.min.data, 1);
	test.done();
};

exports['deleteMin'] = function(test){
	var newheap = new fheap;
	newheap.insert(9);
	newheap.insert(1);
	newheap.insert(2);
	newheap.insert(4);
	newheap.insert(5);
	var x = newheap.deleteMin();
	test.equal(x, 1);
	x = newheap.deleteMin();
	test.equal(x, 2);
	x = newheap.deleteMin();
	test.equal(x, 4);
	test.done();
}

