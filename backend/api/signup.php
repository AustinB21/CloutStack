<?php
    require('connect.php');
    $data = file_get_contents("php://input");
    $data = json_decode($data);
    $query = "SELECT * FROM login WHERE email=:email";
    $statement = $db->prepare($query);
    $statement->bindValue(':email', $data->email);
    $statement->execute();
    $results = $statement->fetch();
    $statement->closeCursor();

    if (is_null($results))
    {
        $insert = "INSERT INTO login(email, password) VALUES (:email, :password)";
        $insertStatement = $db->prepare($insert);

        $pwd = htmlspecialchars($data->password);
        $hash_pwd = password_hash($pwd, PASSWORD_BCRYPT);

        $insertStatement->bindValue(':email', $data->email);
        $insertStatement->bindValue(':password', $hash_pwd);

        $statement->execute();
        $statement->closeCursor();
        echo "Signup Successful";
    }
    else {echo "Email already in use";}
?>