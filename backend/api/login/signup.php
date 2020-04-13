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
    if ($results == false)
    {
        $insert = "INSERT INTO login(email, password) VALUES (:email, :password)";
        $insertStatement = $db->prepare($insert);

        $pwd = htmlspecialchars($data->password);
        $hash_pwd = password_hash($pwd, PASSWORD_BCRYPT);

        $insertStatement->bindValue(':email', $data->email);
        $insertStatement->bindValue(':password', $hash_pwd);

        $insertStatement->execute();
        $insertStatement->closeCursor();
        $response = json_encode(array(
            'status' => 200,
            'message' => 'Successfully signed up.',
            'body' => $data->email
        ));
        require('createSession.php');
        create_session($data->email);
        echo $response;
    }
    else {
        $response = json_encode(array(
            'status' => 403,
            'message' => 'Email already in use.'
        ));
        echo $response;
    }
?>