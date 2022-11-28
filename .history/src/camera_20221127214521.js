import { PerspectiveCamera } from 'three'

const FOV = 70
export const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}
export const camera = new PerspectiveCamera(
	FOV,
	window.innerWidth / window.innerHeight,
	0.001,
	5000
)

camera.position.set(0, 0, 1500)

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
})

export default camera
