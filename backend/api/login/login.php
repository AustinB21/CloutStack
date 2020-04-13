<?php
    require('../connect.php');
    $data = file_get_contents("php://input");
    $data = json_decode($data);
    $query = "SELECT * FROM login WHERE email=:email";
    $statement = $db->prepare($query);
    $statement->bindValue(':email', $data->email);
    $statement->execute();
    $results = $statement->fetch();
    $statement->closeCursor();

    $pwd = htmlspecialchars($data->password);
    $hash_pwd = password_hash($pwd, PASSWORD_BCRYPT);

    if (!is_null($results))
    {
        if (password_verify($hash_pwd, $results['password']))
        {
            echo $results['email'];
        }
        else {echo "Could not authenticate";}
    }
    else {echo "Could not authenticate";}
?>