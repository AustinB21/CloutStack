<?php
    require('../connect.php');
    $data = file_get_contents("php://input");
    $data = json_decode($data);
    // $q=$_GET["q"];
    $query = "INSERT INTO favorite(username, title, link, description, from_where) VALUES (:username, :title, :link, :description, :from_where)";
    $statement = $db->prepare($query);
    $statement->execute(array(
        ":username" => $data->username,
        ":title" => $data->title,
        ":link" => $data->link,
        ":description" => $data->description,
        ":from_where" => $data->from_where,
    ));
    $statement->closeCursor();
    include("read.php");
?>