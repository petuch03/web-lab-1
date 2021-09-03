const xValue = document.querySelector('input[name="xValue"]')
const yValue = document.querySelector('input[name="yValue"]')
const rValue = document.querySelector('input[name="rValue"]')
const NUMBER_REGULAR_EXPRESSION = /^-?\d+(.\d+)?$/

xValue.addEventListener("input", function(event){
    console.log(event.target.value);
    if (validateCoordinates(event.target.value)) {
        event.target.classList.remove("invalid")
    } else {
        event.target.classList.add("invalid");
    }
});

function validateCoordinates(str) {
    return NUMBER_REGULAR_EXPRESSION.test(str)
}