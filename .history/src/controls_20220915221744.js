import { Pane } from 'tweakpane'

const PARAMS = {
	bgColor: '#808080',
	color: '#ff0055',
	size: 10,
	ellipse: true,
	rect: false,
	square: false,
	angle: 0,
}

const pane = new Tweakpane.Pane()

const folder = pane.addFolder({
	title: 'Parameters',
})
