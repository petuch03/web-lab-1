<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_SESSION['dataHistory'])) {
        foreach ($_SESSION['dataHistory'] as $value) {
            echo $value;
        }
    }
}

