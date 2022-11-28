// import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addDefaultModels, addShader } from './defaultModels'
import { PARAMS, pane } from './controls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer'
import { RenderPass } from 'three/addons/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass'
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass'
import { Vector2 } from 'three'

let tl = gsap.timeline()
let renderer,
	scene,
	time,
	defaultMesh,
	defaultShaderMesh,
	defaultLight,
	renderScene,
	bloomPass,
	afterimagePass,
	composer
const container = document.querySelector('#container')
renderer = new THREE.WebGLRenderer()
scene = new THREE.Scene()
time = 0
let isPlaying = true
let video1 = document.querySelector('#video1')
let video2 = document.querySelector('#video2')
init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setClearColor(0x000000, 1)
	container.appendChild(renderer.domElement)
	defaultShaderMesh = addShader()
	defaultLight = addLight()
	scene.add(defaultShaderMesh)
	scene.add(defaultLight)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true

	addPost()
	playAnimation()

	animate()
}

function addPost() {
	renderScene = new RenderPass(scene, camera)
	bloomPass = new UnrealBloomPass(
		new Vector2(window.innerWidth, window.innerHeight),
		0.1,
		0.2,
		0.65
	)
	afterimagePass = new AfterimagePass()
	afterimagePass.uniforms.damp.value = 0.9
	composer = new EffectComposer(renderer)
	composer.addPass(renderScene)
	composer.addPass(bloomPass)
	composer.addPass(afterimagePass)
}

function playAnimation() {
	video1.play()
	video1.addEventListener('ended', () => {
		tl.to('#video1', {
			duration: 0.1,
			opacity: 0,
		})
		tl.to(
			defaultShaderMesh.material.uniforms.dist,
			{
				duration: 2,
				value: 3,
				ease: 'power2.inOut',
			},
			'<'
		)
		tl.to(
			bloomPass,
			{
				duration: 2,
				strength: 9,
				ease: 'power2.in',
			},
			'<'
		)
		tl.to(
			defaultShaderMesh.material.uniforms.dist,
			{
				duration: 2,
				value: 0,
				ease: 'power2.inOut',
			},
			2
		)
		tl.to(
			defaultShaderMesh.material.uniforms.progress,
			{
				duration: 1,
				value: 1,
				ease: 'power2.inOut',
			},
			1.0
		)
		tl.to(
			bloomPass,
			{
				duration: 2,
				strength: 0,
				ease: 'power2.out',
				onComplete: () => {
					video2.currentTime = 0
					video2.play()
					tl.to('#video2', {
						duration: 0.2,
						opacity: 1.0,
					})
					// tl.to(
					// 	defaultShaderMesh.material.uniforms.progress2,
					// 	{
					// 		duration: 1,
					// 		value: 0,
					// 		ease: 'power2.inOut',
					// 	},
					// 	3
					// )
					// tl.restart()
				},
			},
			2
		)
		// tl.to(defaultShaderMesh.material.uniforms.progress2, {
		// 	duration: 1,
		// 	value: 1,
		// 	ease: 'power2.inOut',
		// })
	})
	video2.addEventListener('ended', () => {
		console.log('his')
		tl.to('#video2', {
			duration: 0.1,
			opacity: 0,
		})
		tl.to(
			defaultShaderMesh.material.uniforms.dist,
			{
				duration: 2,
				value: 3,
				ease: 'power2.inOut',
			},
			0.1
		)
		// tl.to(
		// 	bloomPass,
		// 	{
		// 		duration: 2,
		// 		strength: 9,
		// 		ease: 'power2.in',
		// 	},
		// 	'<'
		// )
		// tl.to(
		// 	defaultShaderMesh.material.uniforms.dist2,
		// 	{
		// 		duration: 2,
		// 		value: 0,
		// 		ease: 'power2.inOut',
		// 	},
		// 	2
		// )
	})
}

window.addEventListener('resize', () => {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

function animate() {
	requestAnimationFrame(animate)
	// console.log(defaultShaderMesh.material)
	time += 0.05
	// console.log(defaultShaderMesh.material.)
	defaultShaderMesh.material.uniforms.time.value = time
	// defaultShaderMesh.material.uniforms.uTime.value += 0.1
	// defaultShaderMesh.material.uniforms.displacementStrength.value =
	// 	PARAMS.displacementStrength
	// defaultShaderMesh.rotation.y -= 0.01
	// defaultShaderMesh.rotation.z += 0.01
	// defaultMesh.rotation.x += 0.01
	// defaultMesh.rotation.y += 0.01
	// console.log(composer)
	composer.render()
	// renderer.render(scene, camera)
}
