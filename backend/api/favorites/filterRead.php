<?php
    require('../connect.php');
    $data = file_get_contents("php://input");
    $data = json_decode($data);
    $query = "SELECT * FROM favorite WHERE username=:username AND from_where=:from_where";
    $statement = $db->prepare($query);
    $statement->bindValue(":username", $data->username);
    $statement->bindValue(":from_where", $data->from_where);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    echo json_encode($results);
?>