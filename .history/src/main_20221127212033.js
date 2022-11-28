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

let tl = gsap.timeline()
let renderer, scene, defaultMesh, defaultShaderMesh, defaultLight
renderer = new THREE.WebGLRenderer()
scene = new THREE.Scene()
let isPlaying = true
let video1 = document.querySelector('#video1')
let video2 = document.querySelector('#video2')
init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setClearColor(0x000000, 1)
	document.body.appendChild(renderer.domElement)
	defaultMesh = addDefaultModels()
	defaultShaderMesh = addShader()
	defaultLight = addLight()
	scene.add(defaultMesh)
	scene.add(defaultShaderMesh)
	scene.add(defaultLight)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true

	animate()
}

function playAnimation() {
	video1.play()
	video1.addEventListener('ended', () => {
		tl.to('#video1', {
			duration: 0.1,
			opacity: 0,
		})
		tl.to(
			defaultMesh.material.uniforms.dist,
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
			defaultMesh.material.uniforms.dist,
			{
				duration: 2,
				value: 0,
				ease: 'power2.inOut',
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
	defaultMesh.material.time.value += 0.5
	// defaultShaderMesh.material.uniforms.uTime.value += 0.1
	// defaultShaderMesh.material.uniforms.displacementStrength.value =
	// 	PARAMS.displacementStrength
	// defaultShaderMesh.rotation.y -= 0.01
	// defaultShaderMesh.rotation.z += 0.01
	// defaultMesh.rotation.x += 0.01
	// defaultMesh.rotation.y += 0.01
	renderer.render(scene, camera)
}
