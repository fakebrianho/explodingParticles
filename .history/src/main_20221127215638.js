import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addDefaultModels, addShader } from './defaultModels'
import { PARAMS, pane } from './controls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
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
	document.body.appendChild(renderer.domElement)
	// defaultMesh = addDefaultModels()
	defaultShaderMesh = addShader()
	defaultLight = addLight()
	// scene.add(defaultMesh)
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
			1.5
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
					tl.restart()
				},
			},
			2
		)
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
	renderer.render(scene, camera)
}
