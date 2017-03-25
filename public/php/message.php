<?php
$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$requestArray = json_decode($postdata,true);

$message = "<html>
<head>
  <title>Новый заказ</title>
</head>
<body>
  <p>Имя пользователя - ".$requestArray['name']."</p>
  <p>Email - ".$requestArray['email']."</p>
  <p>Телефон - ".$requestArray['phone']."</p>
  <p>Текст письма - ".$requestArray['message']."</p>
</body>
</html>";
$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
if(mail("ligaz2403@yandex.ua","Новый заказ",$message,$headers)){
    echo 1;
}else echo -1;
?>