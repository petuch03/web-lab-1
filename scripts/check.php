<?php
function check($x, $y , $r) {
    if (rectangle($x, $y, $r) || circle($x, $y, $r) || triangle($x, $y, $r)) {
        return "in";
    }
    return "out";
}

function rectangle($x, $y, $r) {
    if ( ($x >= 0) && ($y <= 0) && ($x <= $r) && ($y >= -($r/2)) ) {
        return true;
    }
    return false;
}

function circle($x, $y, $r) {
    if ( (0 <= $x) && ($y <= 0) && (pow($x, 2) + pow($y, 2) <= pow($r,2)) ) {
        return true;
    }
    return false;
}

function triangle($x, $y, $r) {
    if ( ($x <= 0) && ($y >= 0) && ($y <= ($x + ($r/2))) && ($x >= ($y - ($r/2))) ) {
        return true;
    }
    return false;
}