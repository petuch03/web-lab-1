<!DOCTYPE html>

<?php

session_start();

if (!isset($_SESSION['requests']) || !is_array($_SESSION['requests'])) {
    $_SESSION['requests'] = [];
}
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>lab 1</title>
    <link rel="stylesheet" href="style.css">
    <meta name="author" content="petuch03"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<div class="wrapper">

    <div id="header">
        <header>
            Safronov Egor Mikhailovich P3213, Task 732950
        </header>
    </div>

    <div id="checkForm">
        <div class="xLocator">
            <div id="area_x" class="box">
                <p1>Choose your X value:</p1>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="-5"> -5
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="-4"> -4
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value='-3'> -3
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="-2"> -2
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="-1"> -1
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="0"> 0
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="1"> 1
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="2"> 2
                    </label>
                <p><label><input class="xValue" name="xVal" type="checkbox" value="3"> 3
                    </label>
            </div>
        </div>

        <div class="yLocator">
            <div id="area_y" class="box">
                <p><label for="yValue">Input your Y value:</label></p>
                <input type="text" id="yValue" name="yVal" maxlength="9" placeholder="from -5 to 5">
            </div>
        </div>

        <div class="rLocator">
            <div id="area_r" class="box">
                <p1>Choose your R value:</p1>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="1"> 1 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="1.5"> 1.5 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="2"> 2 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value='2.5'> 2.5 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="3"> 3 </label>
            </div>
        </div>

        <div class="sLocator">
            <div id="area_submit">
                <p>
                    <button type="submit" id="formSubmit" onclick="cal()">Check</button>
                </p>
            </div>
        </div>

    </div>
    <div id="area_diagram">
        <img src="resources/pic.png" class="diagram" alt="pic with coordinates">
    </div>

    <div id="tLocator">
        <table id="tableWithResults">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>res</th>
                <th>duration</th>
                <th>now</th>
            </tr>
            <?php foreach ($_SESSION["requests"] as $request) {?>
                <tr>
                    <td><?= $request["x"] ?></td>
                    <td><?= $request["y"] ?></td>
                    <td><?= $request["r"] ?></td>
                    <td><?php echo $request["isHit"] == true ? "yes" : "no"; ?></td>
                    <td><?= $request["duration"] ?></td>
                    <td><?= $request["current"] ?></td>
                </tr>
                <?php } ?>
        </table>
    </div>

</div>
</body>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="script.js"></script>
</html>
