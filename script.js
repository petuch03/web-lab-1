let X, Y, R;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateX() {
    let xButtons = document.getElementsByName('xVal');
    let xcounter = 0;

    xButtons.forEach(checkBox => {
        if (checkBox.checked)
            xcounter++;
    })
    if (xcounter > 1) {
        alert("Выберите 1 значение X");
        return false;
    }
    X = 0;
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
        alert("Выберите 1 значение R");
        return false;
    }
    R = 0;
    return true;
}

function validateY() {
    let r = document.getElementById("yValue");
    if (r.value.trim() === "") {
        alert("Поле Y должно быть заполнено");
        return false;
    }
    r.value = r.value.replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        alert("Y должен быть числом!");
        return false;
    }
    if (r.value < -5 || r.value > 5) {
        alert("Y должен принадлежать промежутку: (-5; 5)!");
        return false;
    }
    Y = r.value.replace(",", ".");
    return true;
}

function validateForm() {
    return validateX() & validateY() & validateR();
}

function cal() {
    if (!validateForm()) alert('cringe');
    if (validateForm()) {
        $.post("checkHit.php", {
            'x': X,
            'y': Y,
            'r': R,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            alert("bbwriuhgiheiufh")
            let arr = JSON.parse(data);
            arr.forEach( function (elem) {
                if (!elem.validate()) return;
                let newRow = '<tr>';
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
            alert("dd")
        });
    }
}