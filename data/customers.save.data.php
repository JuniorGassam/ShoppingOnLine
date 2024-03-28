<?php

// Récupérer les données du corps de la requête
$data = file_get_contents('php://input');
$jsonData = json_decode($data);

// Charger les données existantes
$existingData = json_decode(file_get_contents('customers.data.json'), true);

// Ajouter de nouvelles données
$existingData[] = $jsonData;

// Sauvegarder dans le fichier
file_put_contents('customers.data.json', json_encode($existingData));

echo json_encode(['status' => 'success']);
?>
