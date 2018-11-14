<?php

require __DIR__ . '/vendor/autoload.php';
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>test</title>
    <link rel="stylesheet" href="/dist/app.css">
  </head>
  <body>
    Hi 2 laurids jjj
    <?php
      echo 'hi';
      $s3_bucket = getenv('APP_ENV');
      echo $s3_bucket;
    ?>
    <img src="/dist/images/JPEG_20181107_144513.jpg" alt="">
  </body>
</html>
