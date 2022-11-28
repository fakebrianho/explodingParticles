import { Pane } from 'tweakpane'

const PARAMS = {
	displacementStrength: 0.5,
}

const pane = new Tweakpane.Pane()

const folder = pane.addFolder({
	title: 'Parameters',
})

folder.addInput(PARAMS, 'bgColor')
folder.addInput(PARAMS, 'color')
folder.addInput(PARAMS, 'angle', { min: 0, max: 360 })
folder.addInput(PARAMS, 'displacementStrength', {
	min: 0.1,
	max: 1.0,
	step: 0.1,
})
folder.addInput(PARAMS, 'ellipse')
folder.addInput(PARAMS, 'rect')
