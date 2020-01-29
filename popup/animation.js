class ReleaseAnimation {
	constructor (config) {
		this.duration = config.duration || 100 // animation duration in ms
		this.breakingV = config.breakingV || 7.0
		this.maxY = config.maxY || 500
		this.minY = config.minY || 0
	}

	play (v, y0, cb) {
		this.stop() // stop the playing animation
		var t0
		var run = t => {
			if (!t) t = Date.now()
			var deltaT = t - t0
			var [newy, done] = this.calcY(v, y0, deltaT)
			cb(newy)
			if (done) return this.stop()
			this.animationframe = window.requestAnimationFrame(run)
		}

		this.animationframe = window.requestAnimationFrame(t => {
			t0 = t || Date.now()
			run(t0)
		})
	}

	// return [new y, done?]
	// done = true mean the returned y has reached its destination, no further animation needed
	// done = false mean the returned y hasn't reached its destination
	calcY (v, y0, t) {
		var towardY
		if (y0 > this.maxY) towardY = this.maxY
		else if (y0 < this.minY) towardY = this.minY
		else if (v < this.breakingV) {
			if (Math.abs(this.maxY - y0) < Math.abs(this.minY - y0)) {
				// closer to the top, should expand
				towardY = this.maxY
			} else {
				// closer to the bottom, should collapse
				towardY = this.minY
			}
		} else {
			// v >= this.breakingV
			if (v < 0) towardY = this.maxY
			else towardY = this.minY
		}

		var y = linearTransform(y0, towardY, t, this.duration)
		return [y, eqFloat(y, towardY)]
	}

	stop () {
		window.cancelAnimationFrame(this.animationframe)
	}
}

function linearTransform (from, to, t, duration) {
	if (eqFloat(from, to)) return from

	var s = to - from
	var v = s / duration
	var x = from + v * t

	if (from < to && x > to) x = to
	else if (to < from && x < to) x = to
	return x
}

function eqFloat (a, b) {
	return Math.abs(a - b) <= 0.001
}
// module.exports = { linearTransform, ReleaseAnimation }
