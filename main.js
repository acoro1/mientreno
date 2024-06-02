document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var trainButton = document.getElementById('trainButton');
    var notTrainButton = document.getElementById('notTrainButton');
    var submitReasonButton = document.getElementById('submitReason');
    var reasonDiv = document.getElementById('reasonDiv');
    var reasonInput = document.getElementById('reason');
    var trainedDaysCountEl = document.getElementById('trainedDays');
    var notTrainedDaysCountEl = document.getElementById('notTrainedDays');
    var currentDayEl = document.getElementById('currentDay');
    var selectedDayEl = document.getElementById('selectedDay');
    var profilePic = document.getElementById('profilePic');
    var fileInput = document.getElementById('fileInput');

    var trainedDaysCount = 0;
    var notTrainedDaysCount = 0;
    var selectedDate = null;

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function fetchEvents() {
        fetch('backend.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(event => {
                    calendar.addEvent({
                        id: event.fecha,
                        title: event.estado,
                        start: event.fecha,
                        extendedProps: {
                            razon: event.razon
                        },
                        className: event.estado === 'Entrenado' ? 'trained' : 'not-trained'
                    });
                    if (event.estado === 'Entrenado') {
                        trainedDaysCount++;
                    } else {
                        notTrainedDaysCount++;
                    }
                });
                trainedDaysCountEl.textContent = trainedDaysCount;
                notTrainedDaysCountEl.textContent = notTrainedDaysCount;
            });
    }

    function saveEvent(date, estado, razon) {
        fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha: date, estado: estado, razon: razon })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Event saved successfully');
            } else {
                console.error('Error saving event:', data.error);
            }
        });
    }

    var today = new Date();
    var todayStr = formatDate(today);
    currentDayEl.textContent = todayStr;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        firstDay: 1,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            selectedDate = info.dateStr;
            selectedDayEl.textContent = selectedDate;

            var event = calendar.getEventById(selectedDate);
            if (event && event.extendedProps.razon) {
                alert('Motivo: ' + event.extendedProps.razon);
            }
        },
        dayCellDidMount: function(info) {
            var cellDateStr = formatDate(info.date);
            if (cellDateStr === todayStr) {
                info.el.classList.add('fc-day-today');
            }
        },
        events: []
    });

    function updateEvent(date, newClass, newTitle, razon) {
        var existingEvent = calendar.getEventById(date);

        if (existingEvent) {
            if (existingEvent.classNames.includes(newClass)) {
                return; // Si ya está marcado como tal, no hacer nada
            }
            existingEvent.remove(); // Remover el evento existente
            if (existingEvent.classNames.includes('trained')) {
                trainedDaysCount--;
            } else if (existingEvent.classNames.includes('not-trained')) {
                notTrainedDaysCount--;
            }
        }

        calendar.addEvent({
            id: date,
            title: newTitle,
            start: date,
            extendedProps: {
                razon: razon
            },
            className: newClass
        });

        if (newClass === 'trained') {
            trainedDaysCount++;
        } else if (newClass === 'not-trained') {
            notTrainedDaysCount++;
        }

        trainedDaysCountEl.textContent = trainedDaysCount;
        notTrainedDaysCountEl.textContent = notTrainedDaysCount;
    }

    trainButton.addEventListener('click', function() {
        if (selectedDate) {
            reasonDiv.style.display = 'none';
            reasonInput.value = '';
            updateEvent(selectedDate, 'trained', 'Entrenado', '');
            saveEvent(selectedDate, 'Entrenado', '');
        }
    });

    notTrainButton.addEventListener('click', function() {
        if (selectedDate) {
            reasonDiv.style.display = 'block';
        }
    });

    submitReasonButton.addEventListener('click', function() {
        if (selectedDate && reasonInput.value.trim() !== '') {
            updateEvent(selectedDate, 'not-trained', 'No entrenado: ' + reasonInput.value.trim(), reasonInput.value.trim());
            saveEvent(selectedDate, 'No entrenado', reasonInput.value.trim());
            reasonDiv.style.display = 'none';
            reasonInput.value = '';
        }
    });

    profilePic.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    });

    calendar.render();
    fetchEvents();
});
