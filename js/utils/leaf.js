export function genLeafMesh(tree, leafShape, leafScale, leafScaleX) {
    // Assuming leafScale and leafScaleX are scalars for leaf size
    const leaves = [];
    const leafGeometry = new THREE.Geometry(); // Using Geometry for simplicity; consider BufferGeometry for performance

    // Define vertex positions based on the shape
    if (leafShape === 'hex') {
        leafGeometry.vertices.push(
            new THREE.Vector3(0, 0, 0),    // Center
            new THREE.Vector3(0.5, 0, 0.333 * leafScale),
            new THREE.Vector3(0.5, 0, 0.667 * leafScale),
            new THREE.Vector3(0, 0, leafScale),
            new THREE.Vector3(-0.5, 0, 0.667 * leafScale),
            new THREE.Vector3(-0.5, 0, 0.333 * leafScale)
        );
        leafGeometry.faces.push(
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 3, 4),
            new THREE.Face3(0, 4, 5)
        );
    } else if (leafShape === 'rect') {
        leafGeometry.vertices.push(
            new THREE.Vector3(leafScaleX, 0, 0),
            new THREE.Vector3(leafScaleX, 0, leafScale),
            new THREE.Vector3(-leafScaleX, 0, leafScale),
            new THREE.Vector3(-leafScaleX, 0, 0)
        );
        leafGeometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    }

    leafGeometry.computeFaceNormals();

    // Function to position and rotate leaves along branches
    tree.branchlets().forEach(branchlet => {
        const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Simple green material
        const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);

        // Position and orientation
        leafMesh.position.copy(branchlet.to); // Position at the end of the branchlet
        leafMesh.lookAt(branchlet.from.position);

        // Random rotation for variability
        leafMesh.rotateZ(Math.random() * Math.PI); // Random rotation around the z-axis

        tree.root.add(leafMesh); // Assuming 'root' is a THREE.Object3D for adding all tree elements
        leaves.push(leafMesh);
    });

    return leaves;
}
