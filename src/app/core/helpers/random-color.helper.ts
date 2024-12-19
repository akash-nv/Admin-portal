export function getRandomLightColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
    const saturation = 70; // Keep saturation high
    const lightness = 90; // Ensure lightness for soft colors
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Function to darken the color for the border
export function darkenHSL(hslColor: any, amount: any) {
    // Extract HSL components from the HSL string
    const [hue, saturation, lightness] = hslColor
        .match(/\d+/g)
        .map(Number);

    // Reduce lightness for a darker shade
    const newLightness = Math.max(lightness - amount, 0); // Ensure no negative lightness
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
}