<?php
header('Content-type: application/json');

$i = rand(0, 10);

$notifications = [];

if ($i > 4) {
    for($i = 0; $i <= rand(0, 10); $i++) {
        $time = time();
        $notifications[] = [
            "link" => "notification.php/" . $time,
            "message" => "Notification " . $time
        ];
    }
}

echo json_encode($notifications);
