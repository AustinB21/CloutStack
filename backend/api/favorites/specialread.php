<?php
    require('../connect.php');
    // $data = json_decode($data);
    $query = "SELECT * FROM favorite WHERE username=:username";
    $statement = $db->prepare($query);
    $statement->bindValue(":username", $logged_in);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    echo json_encode($results);
?>