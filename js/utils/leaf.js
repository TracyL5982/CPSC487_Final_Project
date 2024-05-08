// functions for generating leaves
export function genLeafMesh(tree, leafShape, leafType, leafScale = 1, leafScaleX = 1, engine) {
    const leaves = [];
    const loader = new THREE.TextureLoader();

    const texturePath = `../js/assets/${leafType}_leaf.png`; 
    console.log("Starting texture loading...");

    // Load the leaf texture
    loader.load(
        texturePath,  
        function(texture) {
            console.log("Texture loaded successfully:", texture);
            const leafMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,      
                transparent: true,            
                alphaTest: 0.1,               
                opacity: 0.99                
            });

            const debugMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff, 
                side: THREE.DoubleSide, 
            });

            const leafGeometry = new THREE.BufferGeometry();
            const vertices = [];
            const uvs = [];
            const indices = [];

            // Define vertices and UVs based on leaf shape
            if (leafShape === 'rect') {
                vertices.push(
                    leafScaleX, 0, 0,
                    leafScaleX, 0, leafScale,
                    -leafScaleX, 0, leafScale,
                    -leafScaleX, 0, 0,
                    0, 0, leafScale / 2   
                );
                uvs.push(
                    1, 0,
                    1, 1,
                    0, 1,
                    0, 0,
                    0.5, 0.5              
                );
                indices.push(
                    0, 1, 4,
                    1, 2, 4,
                    2, 3, 4,
                    3, 0, 4
                );
            }

            leafGeometry.setIndex(indices);
            leafGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            leafGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
            leafGeometry.computeVertexNormals();

            // Position leaves at branchlets
            tree.branchlets().forEach(branchlet => {
                for (let i = 0; i < 5; i++) {
                    const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
                    const positionOffset = new THREE.Vector3(
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1
                    );

                    leafMesh.position.copy(branchlet.to.clone().add(positionOffset));
                    leafMesh.lookAt(branchlet.from.position);
                    leafMesh.rotateY(Math.random() * Math.PI * 2);
                    leafMesh.rotateZ(Math.random() * Math.PI * 2);

                    engine.scene.add(leafMesh);
                    leaves.push(leafMesh);
                }
            });
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error("An error happened during texture loading:", error);
        }
    );

    return leaves;
}
