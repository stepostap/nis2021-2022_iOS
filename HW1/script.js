function clk(val) {
    document.getElementById("screen").value += val
}

function erase() {
    document.getElementById("screen").value = ""
}

function res(val) {
    var text = document.getElementById("screen").value
    var res = eval(text)
    document.getElementById("screen").value = res
}