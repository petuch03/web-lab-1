<?php

require_once("arr_to_json.php");

function validateX($xVal): bool
{
    return isset($xVal);
}

function validateY($yVal): bool
{
    if (!isset($yVal))
        return false;

    $numY = str_replace(',', '.', $yVal);
    return is_numeric($numY) && $numY > -5 && $numY < 5;
}

function validateR($rVal): bool
{
    return isset($rVal);
}

function validateForm($xVal, $yVal, $rVal): bool
{
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

function rectangle($xVal, $yVal, $rVal): bool
{
    if (($xVal >= 0) && ($yVal <= 0) && ($xVal <= $rVal) && ($yVal >= -($rVal / 2))) {
        return true;
    }
    return false;
}

function circle($xVal, $yVal, $rVal): bool
{
    if ((0 <= $xVal) && ($yVal <= 0) && (pow($xVal, 2) + pow($yVal, 2) <= pow($rVal, 2))) {
        return true;
    }
    return false;
}

function triangle($xVal, $yVal, $rVal): bool
{
    if (($xVal <= 0) && ($yVal >= 0) && ($yVal <= ($xVal + ($rVal / 2))) && ($xVal >= ($yVal - ($rVal / 2)))) {
        return true;
    }
    return false;
}

function check($xVal, $yVal, $rVal): bool
{
    if (rectangle($xVal, $yVal, $rVal) || circle($xVal, $yVal, $rVal) || triangle($xVal, $yVal, $rVal)) {
        return true;
    }
    return false;
}

$xVal = $_POST['x'];
$yVal = $_POST['y'];
$rVal = $_POST['r'];
$timezoneOffset = $_POST['timezone'];

$res = array();

$isValid = validateForm($xVal, $yVal, $rVal);
$isHit = check($xVal, $yVal, $rVal);

$currentTime = date('H:i:s', time() - $timezoneOffset * 60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

array_push($res, array(
    "validate" => $isValid,
    "x" => $xVal,
    "y" => $yVal,
    "r" => $rVal,
    "isHit" => $isHit,
    "duration" => $executionTime,
    "current" => $currentTime
));

echo toJson($res);