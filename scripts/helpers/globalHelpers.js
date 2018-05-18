function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// return rand int between min included and max excluded
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// display name and description of item on hover
function getDescItem(name, desc) {
    document.querySelector(".description-content").innerHTML = name + "<br>" + desc
    document.querySelector(".description-content").classList.remove("hidden")
}

// display name and description of item on hover
function resetDescItem(name, desc) {
    document.querySelector(".description-content").innerHTML = ""
    document.querySelector(".description-content").classList.add("hidden")
}
