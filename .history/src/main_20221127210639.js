import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addDefaultModels, addShader } from './defaultModels'
import { PARAMS, pane } from './controls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

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

window.addEventListener('resize', () => {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

function animate() {
	requestAnimationFrame(animate)
	defaultShaderMesh.material.uniforms.uTime.value += 0.1
	defaultShaderMesh.material.uniforms.displacementStrength.value =
		PARAMS.displacementStrength
	defaultShaderMesh.rotation.y -= 0.01
	defaultShaderMesh.rotation.z += 0.01
	defaultMesh.rotation.x += 0.01
	defaultMesh.rotation.y += 0.01
	renderer.render(scene, camera)
}
