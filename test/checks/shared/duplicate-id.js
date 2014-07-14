describe('duplicate-id', function () {
	'use strict';

	var fixture = document.getElementById('fixture');


	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return true if there is only one element with an ID', function () {
		fixture.innerHTML = '<div id="target"></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, node.id);
		assert.equal(checkContext._relatedNodes.length, 0);

	});

	it('should return false if there are multiple elements with an ID', function () {
		fixture.innerHTML = '<div id="target"></div><div id="target"></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-id'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, node.id);
		assert.equal(checkContext._relatedNodes.length, 1);
	});

	it('should return remove duplicates', function () {
		assert.deepEqual(checks['duplicate-id'].after([{data: 'a'}, {data: 'b'}, {data: 'b'}]), [{data: 'a'}, {data: 'b'}]);
	});

});
