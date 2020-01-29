var $alert = document.querySelector('.alert')
var $container = document.querySelector('.container')
var $content = document.querySelector('.container .popup--content')
var $popup = document.querySelector('.container .popup')
var $popupHandle = document.querySelector('.container .popup--handle')

const POPUP_MAX_HEIGHT = 400
const POPUP_HARD_MAX_HEIGHT = 500
const POPUP_MIN_HEIGHT = 25

var mousePushed = false
var mousePushedDy = 0
var lastMouseY = 0
var mouseVelocity = 0

function init () {
	$popup.style.height = POPUP_MAX_HEIGHT

	$popupHandle.addEventListener('mousedown', mouseDown, 0)
	$popupHandle.addEventListener('touchstart', mouseDown, 0)

	window.addEventListener('mouseup', mouseUp, 0)
	window.addEventListener('touchend', mouseUp, 0)
	window.addEventListener('mousemove', mouseMove, 0)
	window.addEventListener('touchmove', mouseMove, 0)
}

var animation = new ReleaseAnimation({
	maxY: POPUP_MAX_HEIGHT,
	minY: POPUP_MIN_HEIGHT,
	duration: 150,
})

function mouseDown (e) {
	mousePushed = true
	animation.stop()
	e.preventDefault()
	if (e.touches && e.touches[0]) e = e.touches[0]
	mousePushedDy =
		e.pageY - window.pageYOffset - $popupHandle.getBoundingClientRect().y
}

function mouseUp (e) {
	if (e.touches && e.touches[0]) e = e.touches[0]
	mousePushed = false
	var popupStyle = $popup.currentStyle || window.getComputedStyle($popup)
	var h0 = parseFloat(popupStyle.height)
	animation.play(mouseVelocity, h0, h => {
		$popup.style.height = h
		//$alert.innerText = h + ';' + Math.round(Math.random() * 100) + '; animation'
		var opacity = Math.min(
			1,
			(h - POPUP_MIN_HEIGHT) / (POPUP_MAX_HEIGHT - POPUP_MIN_HEIGHT)
		)
		$content.style.opacity = opacity
		$popupHandle.style['background-color'] = `rgba(255,255,255, ${opacity})`
	})
}

function mouseMove (e) {
	if (!mousePushed) return
	if (e.touches && e.touches[0]) e = e.touches[0]
	var my = e.pageY

	mouseVelocity = my - lastMouseY
	lastMouseY = my
	// MAX Y
	var containerStyle =
		$container.currentStyle || window.getComputedStyle($container)
	var conBottom =
		parseFloat(containerStyle.height) +
		parseFloat(containerStyle.paddingTop) +
		parseFloat(containerStyle.marginTop) +
		parseFloat(containerStyle.borderTopWidth)

	var topY = conBottom - POPUP_MAX_HEIGHT

	my = my - mousePushedDy
	var K = 10000
	var height
	if (my < topY) {
		var beta = -topY + K / (-POPUP_HARD_MAX_HEIGHT + POPUP_MAX_HEIGHT)

		height = POPUP_HARD_MAX_HEIGHT + K / (my + beta)
	} else {
		height = POPUP_MAX_HEIGHT + topY - my
	}
	// console.log('my', my, topY)
	$alert.innerText =
		Math.round(topY) +
		';' +
		(topY - my) +
		';move;client' +
		e.clientY +
		';page' +
		e.pageY

	var opacity = Math.min(
		1,
		(height - POPUP_MIN_HEIGHT) / (POPUP_MAX_HEIGHT - POPUP_MIN_HEIGHT)
	)
	$content.style.opacity = opacity
	$popupHandle.style['background-color'] = `rgba(255,255,255, ${opacity})`

	$popup.style.height = height
}

function main () {
	// select dom

	init()
}
main()
