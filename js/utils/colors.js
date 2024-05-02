export function hexToVec3(hex) {
    // Remove the '#' from the hex code if present
    if (hex.charAt(0) === '#') {
        hex = hex.slice(1);
    }

    // Convert the hex to decimal values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Normalize the values to [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    // Return the vec3 string
    return `vec3(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)})`;
}
