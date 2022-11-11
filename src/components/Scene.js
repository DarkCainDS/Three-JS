
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const Scene = () => {
    const mountRef = useRef(null)


    useEffect(() => {

        const currentMount = mountRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 10
        scene.add(camera)

        //Renderer
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        //Cube
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x80FF80, transparent: true, opacity: 0.5 })
            //MeshNormalMaterial() ---Color by normal
        )

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        // controls.target = new THREE.Vector3(3, 3, 3)
        controls.enableDamping = true

        scene.add(cube)

        //Texture
        const textureLoader = new THREE.TextureLoader()
        const map = textureLoader.load('./textures/Lapis_Lazuli_001_COLOR.jpg')
        const ambientOclussionMap = textureLoader.load('./textures/Lapis_Lazuli_001_OCC.jpg')
        const RoughnessMap = textureLoader.load('./textures/Lapis_Lazuli_001_ROUGH.jpg')
        const NormalMap = textureLoader.load('./textures/Lapis_Lazuli_001_NRM.jpg')
        const heightMap = textureLoader.load('./textures/Lapis_Lazuli_001_DISP.png')
        //Sphere
        const matcap = textureLoader.load('./textures/MathCap1.png')
        const geometry = new THREE.SphereGeometry(0.8, 32, 16);
        const material = new THREE.MeshMatcapMaterial({
            matcap: matcap
        }); //{ color: 0xffff00,wireframe: true }
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphere.position.x = -2.5;
        sphere.position.y = -1;

        //Sphere2
        const geometry3= new THREE.SphereGeometry(0.8, 32, 16);
        const material3 = new THREE.MeshStandardMaterial({
            map: map,
            ambientOclussionMap: ambientOclussionMap,
            RoughnessMap: RoughnessMap,
            color: 0x00FF00,
            normalMap: NormalMap,
            displacementMap: heightMap,
            displacementScale: 0.1,

        }); //{ color: 0xffff00,wireframe: true }
        const sphere2 = new THREE.Mesh(geometry3, material3);
        scene.add(sphere2);
        sphere2.position.x = 2.5;
        sphere2.position.y = -1;
        

        //Light
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light)

        //TorusKnotGeometry
        const geometry2 = new THREE.TorusKnotGeometry(0.3, 0.0700, 100, 16);
        const material2 = new THREE.MeshNormalMaterial({ flatShading: true });
        const torusKnot = new THREE.Mesh(geometry2, material2);
        scene.add(torusKnot)
        //torusKnot.position.x = 2.5;
        //torusKnot.position.y = 1.5;
        torusKnot.position.set(2.5, 1.5, 0);
        // torusKnot.scale.x = 1.5;
        //torusKnot.scale.y = 1.5;
        torusKnot.scale.set(1.5, 1.5, 1.5);

        //Render the scene
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        //Clean up scene
        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div className='main-page' style={{ width: '100%', height: '100vh' }} ref={mountRef}>

        </div>
    )
}
/*        const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}
animate()*/