function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// return rand int between min included and max excluded
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}