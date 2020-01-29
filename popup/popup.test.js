var test = require('tape')
var lib = require('./popup.js')

test('linearTransform', t => {
	// from == to
	t.equal(lib.linearTransform(5, 5, 50, 100), 5)

	// from > to
	t.equal(lib.linearTransform(5, 0, 0, 100), 5)
	t.equal(lib.linearTransform(5, 0, 100, 100), 0)
	t.equal(lib.linearTransform(5, 0, 200, 100), 0)

	// from < to
	t.equal(lib.linearTransform(5, 10, 0, 100), 5)
	t.equal(lib.linearTransform(5, 10, 100, 100), 10)
	t.equal(lib.linearTransform(5, 10, 200, 100), 10)

	t.equal(lib.linearTransform(0, 10, 50, 100), 5)
	t.end()
})

test('ReleaseAnimation', t => {
	var animation = new lib.ReleaseAnimation({})
	animation.play(3, 4, newy => console.log(newy))
	t.end()
})
