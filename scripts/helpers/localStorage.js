function LocalStorageHelper() {
    this.saveState = function (state) {
        localStorage.setItem("state", JSON.stringify(state))
    }
    this.getState = function () {
        return JSON.parse(localStorage.getItem("state"))
    }
    this.dropState = function () {
        localStorage.removeItem("state")
    }
}

module.exports = {"helper": LocalStorageHelper}