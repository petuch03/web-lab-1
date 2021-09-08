let X, Y, R;

function validateX() {
    let xButtons = document.getElementsByName('xVal');
    let xCounter = 0;

    xButtons.forEach(checkBox => {
        if (checkBox.checked)
            xCounter++;
    })
    if (xCounter > 1) {
        alert("Choose only 1 X option");
        return false;
    }
    if (xCounter === 0) {
        alert("Choose any X option");
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
        alert("Choose only 1 R option");
        return false;
    }
    if (yCounter === 0) {
        alert("Choose any R option");
        return false;
    }
    R = document.querySelector('input[name="rVal"]:checked').value;
    return true;
}

function validateY() {
    let r = document.getElementById("yValue");
    if (r.value.trim() === "") {
        alert("Y value must not be null");
        return false;
    }
    r.value = r.value.replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        alert("Y must be a number");
        return false;
    }
    if (r.value < -5 || r.value > 5) {
        alert("Y must be in interval: (-5; 5)!");
        return false;
    }
    Y = r.value.replace(",", ".");
    return true;
}

function validateForm() {
    return validateX() & validateY() & validateR();
}

function cal() {
    if (!validateForm()) {
        alert('cringe');
        return;
    }
    if (validateForm()) {
        $.post("checkHit.php", {
            'x': X,
            'y': Y,
            'r': R,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            alert("response got");
            let arr = JSON.parse(data);
            arr.forEach( function (elem) {
                alert("start  for each");
                if (!elem.validate) { return; }
                let newRow = '<tr>';
                newRow += '<td>' + elem.x + '</td>';
                newRow += '<td>' + elem.y + '</td>';
                newRow += '<td>' + elem.r + '</td>';
                newRow += '<td>' + (elem.isHit ? "yes" : "no") + '</td>';
                newRow += '<td>' + elem.duration + '</td>';
                newRow += '<td>' + elem.current + '</td>';
                $('#tableWithResults tr:first').after(newRow);
                alert("end for each");
            })
            alert("response got after for each");
        }).fail(function (err) {
            alert(err)
        });
    }
}