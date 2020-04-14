<?php
    function create_session($username) {
        $_SESSION['user'] = $username;
        session_start();
        return;
    }
?>