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

    $response = json_encode(array(
        'status' => 403,
        'message' => 'Email already in use.'
    ));
    if ($results !== false)
    {
        if (password_verify($hash_pwd, $results['password']))
        {
            $response = json_encode(array(
                'status' => 200,
                'message' => 'Successfully signed up.'
            ));
            echo $response;
        }
        else {echo $response;}
    }
    else {echo $response;}
?>