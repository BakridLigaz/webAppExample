<?php
$dbh = include 'db_connect.php';

$selectProjects = 'SELECT p.id,p.date,p.skills,p.note_en,p.note_ru,p.site,c.name as client  FROM projects p INNER JOIN clients c ON p.client = c.id';

$stmt = $dbh->prepare($selectProjects);
$stmt->execute();
$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
$mutProjects = [];
foreach ($projects as $project){
    $sqlImage = 'SELECT * FROM images WHERE project_id =';
    $selectImage = $sqlImage.$project['id'];
    $stmt = $dbh->prepare($selectImage);
    $stmt->execute();
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $project['images']=$images;
    $project['skills']=json_decode($project['skills']);
    array_push($mutProjects,$project);
}

echo json_encode($mutProjects);
?>