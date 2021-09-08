let X, Y, R;

function validateX() {
    let xButtons = document.getElementsByName('xVal');
    let xcounter = 0;

    xButtons.forEach(checkBox => {
        if (checkBox.checked)
            xcounter++;
    })
    if (xcounter > 1) {
        alert("Choose only 1 X option");
        return false;
    }
    X = document.querySelector('input[name="xVal"]:checked').value;
    return true;
}

function validateR() {
    let yButtons = document.getElementsByName('rVal');
    let ycounter = 0;
    yButtons.forEach(checkBox => {
        if (checkBox.checked)
            ycounter++;
    })
    if (ycounter > 1) {
        alert("Choose only one R option");
        return false;
    }
    R = document.querySelector('input[name="rVal"]:checked').value;
    return true;
}

function validateY() {
    let r = document.getElementById("yValue");
    if (r.value.trim() === "") {
        alert("Y must not be null");
        return false;
    }
    r.value = r.value.replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        alert("Y must be a number");
        return false;
    }
    if (r.value < -5 || r.value > 5) {
        alert("Y must be in (-5; 5)");
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
            let arr = JSON.parse(data);
            arr.forEach( function (elem) {
                if (!elem.validate) return;
                newRow = '<tr>';
                newRow += '<td>' + elem.x + '</td>';
                newRow += '<td>' + elem.y + '</td>';
                newRow += '<td>' + elem.r + '</td>';
                newRow += '<td>' + (elem.isHit ? "yes" : "no") + '</td>';
                newRow += '<td>' + elem.duration + '</td>';
                newRow += '<td>' + elem.current + '</td>';
                $('#tableWithResults').append(newRow);
            })
        }).fail(function (err) {
            alert(err)
        });
    }
}