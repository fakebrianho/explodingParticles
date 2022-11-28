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

folder.addInput(PARAMS, 'bgColor')
folder.addInput(PARAMS, 'color')
folder.addInput(PARAMS, 'angle', { min: 0, max: 360 })
folder.addInput(PARAMS, 'size', { min: 1, max: 50, step: 1 })
folder.addInput(PARAMS, 'ellipse')
folder.addInput(PARAMS, 'rect')
