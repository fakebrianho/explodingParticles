import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	DoubleSide,
	PlaneBufferGeometry,
	Points,
	TextureLoader,
} from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
import t from '/last1.jpg'
import t2 from '/start2.jpg'
import t3 from '/start3.jpg'
export const addDefaultModels = () => {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshStandardMaterial({ color: 0xff0000 })
	const mesh = new Mesh(geometry, material)
	mesh.position.set(-2, 0, 0)
	return mesh
}

export const addShader = () => {
	const material = new ShaderMaterial({
		extensions: {
			derivatives: '#extension GL_OES_standard_derivatives : enable',
		},
		side: DoubleSide,
		uniforms: {
			time: { type: 'f', value: 0 },
			t: {
				type: 't',
				value: new TextureLoader().load(t),
			},
			progress: {
				type: 'f',
				value: 0,
			},
			progress2: {
				type: 'f',
				value: 0,
			},
			dist2: {
				type: 'f',
				value: 0,
			},
			t2: {
				type: 't',
				value: new TextureLoader().load(t2),
			},
			t3: {
				type: 't',
				value: new TextureLoader().load(t3),
			},
			resolution: { type: 'v4', value: new Vector4() },
			dist: { type: 'f', value: 0 },
			uvRate1: {
				value: new Vector2(1, 1),
			},
		},
		// wireframe: true,
		// transparent: true,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	})
	const geometry = new PlaneBufferGeometry(820 * 1.745, 480 * 1.745, 820, 480)
	const plane = new Points(geometry, material)
	// const mesh = new Mesh(geometry, material)
	// mesh.position.set(2, 0, 0)
	return plane
}
