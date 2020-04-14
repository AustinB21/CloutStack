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

    $response = json_encode(array(
        'status' => 403,
        'message' => 'Incorrect email or password'
    ));
    if ($results !== false)
    {
        if (password_verify($pwd, $results['password']))
        {
            $response = json_encode(array(
                'status' => 200,
                'message' => 'Successfully logged in.',
                'body' => $data->email
            ));
            include('createSession.php');
            create_session($data->email);
            echo $response;
        }
        else {echo $response;}
    }
    else {echo $response;}
?>