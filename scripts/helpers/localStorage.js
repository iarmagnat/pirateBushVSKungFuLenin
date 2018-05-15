function LocalStorageHelper() {
    this.saveState = function (state) {
        localStorage.setItem("state", JSON.stringify(state))
    }
    this.getState = function () {
        return JSON.parse(localStorage.getItem("state"))
    }
}

module.exports = {"helper": LocalStorageHelper}