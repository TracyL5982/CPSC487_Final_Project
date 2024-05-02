export function genLeafMesh(tree, leafShape, leafScale = 1, leafScaleX = 1, engine) {
    const leaves = [];
    const loader = new THREE.TextureLoader();

    console.log("Starting texture loading...");

    // Load the leaf texture
    loader.load(
        '../js/assets/leaf_4.png',  // Ensure this is the correct path
        function(texture) {
            console.log("Texture loaded successfully:", texture);
            const leafMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,       // Render both sides of the leaf
                transparent: true,            // Enable transparency
                alphaTest: 0.5,               // Configure alpha testing (adjust this value as needed)
                opacity: 0.99                 // Set opacity slightly less than 1 for better blending
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
                    0, 0, leafScale / 2   // Additional vertex for shared edge
                );
                uvs.push(
                    1, 0,
                    1, 1,
                    0, 1,
                    0, 0,
                    0.5, 0.5              // UV for additional vertex
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
                for (let i = 0; i < 3; i++) {
                    const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
                    const positionOffset = new THREE.Vector3(
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.5) * 0.1
                    );

                    leafMesh.position.copy(branchlet.to.clone().add(positionOffset));
                    leafMesh.lookAt(branchlet.from.position);
                    leafMesh.rotateY(Math.random() * Math.PI * 2);

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
