<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MI ENTRENO</title>
    <link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.css' rel='stylesheet' />
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>MI ENTRENO</h1>
           
            <div class="profile-container">
                <img src="C:\xampp\htdocs\MiEntreno\descarga.jpg" alt="Foto de perfil" class="profile-pic" id="profilePic">
                <input type="file" id="fileInput" accept="image/*" style="display:none;">
            </div>
            
            <p class="btn1">Usuario: <span class="username">Nombre de Usuario</span></p>
        </header>
        <div class="content">
            <div class="left">
                <div id="calendar"></div>
            </div>
            <div class="right">
                <p class="btn1">Día actual: <span id="currentDay"></span></p>
                <p class="btn1">Día marcado: <span id="selectedDay"></span></p>
                <button class="train-button" id="trainButton">Sí, he entrenado</button>
                <button class="not-train-button" id="notTrainButton">No, no he entrenado</button>
                <div id="reasonDiv" style="display: none;">
                    <label for="reason" class="btn1">¿Por qué?</label>
                    <input type="text" id="reason" class="btn1" />
                    <button id="submitReason">Guardar</button>
                </div>
                <div class="counters">
                    <p class="btn1">Días entrenados este mes: <span id="trainedDays">0</span></p>
                    <p class="btn1">Días no entrenados este mes: <span id="notTrainedDays">0</span></p>
                </div>
            </div>
        </div>
    </div>

    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/locales-all.min.js'></script>
    <script src="main.js"></script>
</body>
</html>
