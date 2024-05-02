THREE.TreeGeometry = {
    build: function(tree) {
        var geometry = new THREE.BufferGeometry();
        var vertices = [];
        var indices = [];
        var uvs = [];

        this.buildBranches(tree.root, vertices, indices, uvs, 0, null); // Start with no parent index
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

        return geometry;
    },

    buildBranches: function(branch, vertices, indices, uvs, vertexOffset, parentLastRowIndex) {
        var radiusSegments = branch.radiusSegments;
        var heightSegments = branch.segments.length - 1;
        var currentVertexOffset = vertices.length / 3; // Update current offset for vertices

        for (var y = 0; y <= heightSegments; y++) {
            var segment = branch.segments[y];
            for (var x = 0; x <= radiusSegments; x++) {
                var vertex = segment.vertices[x];
                var uv = segment.uvs[x];
                vertices.push(vertex.x, vertex.y, vertex.z);
                uvs.push(uv.x, uv.y);
            }
        }

        for (var y = 0; y < heightSegments; y++) {
            for (var x = 0; x < radiusSegments; x++) {
                var a = currentVertexOffset + x + y * (radiusSegments + 1);
                var b = currentVertexOffset + x + (y + 1) * (radiusSegments + 1);
                var c = currentVertexOffset + (x + 1) + (y + 1) * (radiusSegments + 1);
                var d = currentVertexOffset + (x + 1) + y * (radiusSegments + 1);

                indices.push(a, d, b);
                indices.push(b, d, c);
            }
        }

        if (branch.from === null) {
            // Handle root branch bottom cap
            var sumX = 0, sumY = 0, sumZ = 0;
            for (var i = 0; i <= radiusSegments; i++) {
                sumX += vertices[(currentVertexOffset + i) * 3];
                sumY += vertices[(currentVertexOffset + i) * 3 + 1];
                sumZ += vertices[(currentVertexOffset + i) * 3 + 2];
            }
            var centerX = sumX / (radiusSegments + 1);
            var centerY = sumY / (radiusSegments + 1);
            var centerZ = sumZ / (radiusSegments + 1);
            
            vertices.push(centerX, centerY, centerZ); // Add central vertex
            uvs.push(0.5, 0.5); // Center UV
            var bottomIndex = vertices.length / 3 - 1;
            
            for (var x = 0; x < radiusSegments; x++) {
                var v1 = currentVertexOffset + x;
                var v2 = currentVertexOffset + ((x + 1) % radiusSegments);
                indices.push(v1, bottomIndex, v2);
            }
        }
         else {
            // Connect to parent branch
            var parentLastRowStartIndex = parentLastRowIndex;
            var currentRowStartIndex = currentVertexOffset;

            for (var x = 0; x < radiusSegments; x++) {
                var v0 = currentRowStartIndex + x;
                var v1 = currentRowStartIndex + ((x + 1) % radiusSegments);
                var v2 = parentLastRowStartIndex + ((x + 1) % radiusSegments);
                var v3 = parentLastRowStartIndex + x;

                indices.push(v0, v1, v2);
                indices.push(v0, v2, v3);
            }
        }

        // Recursively build geometry for children branches
        var newVertexOffset = vertices.length / 3;
        var newParentLastRowIndex;
        if (branch.from === null) {
            // If it's root, the center vertex is added, exclude this vertex from the last row start index calculation
            newParentLastRowIndex = currentVertexOffset + (heightSegments-1) * (radiusSegments + 1) - 1;
        } else {
            // No center vertex is added for non-root branches
            newParentLastRowIndex = currentVertexOffset + (heightSegments-1) * (radiusSegments + 1);
        }
        //var newParentLastRowIndex = currentVertexOffset + (heightSegments) * (radiusSegments + 1); // Last row of the current branch
        branch.children.forEach(function(child) {
            this.buildBranches(child, vertices, indices, uvs, newVertexOffset, newParentLastRowIndex);
        }, this);
    },

    /*
     * Calculate length of the tree.
     * */
    calculateLength: function(tree) {
        return this.calculateSegmentLength(tree.root);
    },

    /*
     * Calculate length of a branch recursively.
     * */
    calculateSegmentLength: function(branch) {
        var longest = 0.0;
        var self = this;
        branch.children.forEach(function(child) {
            var len = self.calculateSegmentLength(child);
            if (len > longest) {
                longest = len;
            }
        });
        return longest + branch.calculateLength();
    }

};
