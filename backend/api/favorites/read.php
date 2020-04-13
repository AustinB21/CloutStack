<?php
    require('../connect.php');
    $query = "SELECT * FROM favorite";
    $statement = $db->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    echo json_encode($results);
?>