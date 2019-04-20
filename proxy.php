<?php 
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $response = array();

    $url = $_POST['url'];


    // 1. инициализация
    $ch = curl_init();

    // 2. указываем параметры, включая url
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    // 3. получаем ответ
    $output = curl_exec($ch);

    // 4. закрываем соединение
    curl_close($ch);




    $response ['response'] = $output;
    echo json_encode($response);
    exit();
    }

?>