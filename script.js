let X, Y, R;
let ALERT = '';

function validateX() {
    let xButtons = document.getElementsByName('xVal');
    let xCounter = 0;

    xButtons.forEach(checkBox => {
        if (checkBox.checked)
            xCounter++;
    })
    if (xCounter > 1) {
        ALERT += "\n" + "Choose only 1 X option;";
        return false;
    }
    if (xCounter === 0) {
        ALERT += "\n" + "Choose any X option;";
        return false;
    }
    X = document.querySelector('input[name="xVal"]:checked').value;
    return true;
}

function validateR() {
    let yButtons = document.getElementsByName('rVal');
    let yCounter = 0;
    yButtons.forEach(checkBox => {
        if (checkBox.checked)
            yCounter++;
    })
    if (yCounter > 1) {
        ALERT += "\n" + "Choose only 1 R option;";
        return false;
    }
    if (yCounter === 0) {
        ALERT += "\n" + "Choose any R option;";
        return false;
    }
    R = document.querySelector('input[name="rVal"]:checked').value;
    return true;
}

function validateY() {
    let y = document.getElementById("yValue");
    if (y.value.trim() === "") {
        ALERT += "\n" + "Y value must not be null;";
        return false;
    }
    y.value = y.value.replace(',', '.');
    if (!(y.value && !isNaN(y.value))) {
        ALERT += "\n" + "Y must be a number;";
        return false;
    }
    if (y.value <= -5 || y.value >= 5) {
        ALERT += "\n" + "Y must be in the following interval: (-5; 5);";
        return false;
    }
    y.value = parseFloat(y.value);
    Y = y.value;
    return true;
}

function validateForm() {
    return validateX() & validateY() & validateR();
}

function cal() {
    if (!validateForm()) {
        alert(ALERT);
        ALERT = '';
        return;
    }
    if (validateForm()) {
        $.post("checkHit.php", {
            'x': X,
            'y': Y,
            'r': R,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            $('#tableWithResults tr:first').after(data);
        }).fail(function (err) {
            alert(err)
        });
    }
}