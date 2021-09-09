<?php

require_once("arr_to_json.php");

function validateX($xValue)
{
    return isset($xValue);
}

function validateY($yValue) {
    if (!isset($yValue)) return false;

    $Y = str_replace(',', '.', $yValue);

    return $Y > -5 && $Y < 5 && is_numeric($Y);
}

function validateR($rValue) {
    return isset($rValue);
}

function validateData($xValue, $yValue, $rValue)
{
    return validateX($xValue) && validateY($yValue) && validateR($rValue);
}

function rectangle($xValue, $yValue, $rValue)
{
    if (($xValue >= 0) && ($yValue <= 0) && ($xValue <= $rValue) && ($yValue >= -($rValue / 2))) {
        return true;
    }
    return false;
}

function circle($xValue, $yValue, $rValue)
{
    if (($xValue <= 0) && ($yValue <= 0) && (pow($xValue, 2) + pow($yValue, 2) <= (pow($rValue, 2)/2))) {
        return true;
    }
    return false;
}

function triangle($xValue, $yValue, $rValue)
{
    if (($xValue <= 0) && ($yValue >= 0) && ($yValue <= ($xValue + ($rValue / 2)))) {
        return true;
    }
    return false;
}

function check($xValue, $yValue, $rValue)
{
    if (rectangle($xValue, $yValue, $rValue) || circle($xValue, $yValue, $rValue) || triangle($xValue, $yValue, $rValue)) {
        return true;
    }
    return false;
}

$xValue = $_POST['x'];
$yValue = $_POST['y'];
$rValue = $_POST['r'];
$timezoneOffset = $_POST['timezone'];

$res = array();

$isValid = validateData($xValue, $yValue, $rValue);
$isHit = check($xValue, $yValue, $rValue);

$currentTime = date('H:i:s', time() - $timezoneOffset * 60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

array_push($res, array(
    "validate" => $isValid,
    "x" => $xValue,
    "y" => $yValue,
    "r" => $rValue,
    "isHit" => $isHit,
    "duration" => $executionTime,
    "current" => $currentTime
));

echo toJson($res);