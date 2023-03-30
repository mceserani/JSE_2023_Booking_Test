const { addToEvents, bookTicketsToEvents, cancelBookingToEvents } = require('./manageEvents.js');

import('inquirer').then((inquirerModule) => {

    const events = [];

    const inquirer = inquirerModule.default;

    function main() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Cosa vuoi fare?',
            choices: [
            'Aggiungi evento',
            'Visualizza eventi',
            'Prenota biglietti',
            'Cancella prenotazione',
            'Esci',
            ],
        },
        ])
        .then((answers) => {
        switch (answers.action) {
            case 'Aggiungi evento':
            addEvent();
            break;
            case 'Visualizza eventi':
            viewEvents();
            break;
            case 'Prenota biglietti':
            bookTickets();
            break;
            case 'Cancella prenotazione':
            cancelBooking();
            break;
            case 'Esci':
            process.exit();
        }
        });
    }

    function addEvent() {
    
        inquirer
        .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Titolo dell\'evento:',
            validate: (value) => {
            if (value.length > 0) {
                return true;
            } else {
                return 'Inserisci un titolo.';
            }
            },
        },
        {
            type: 'input',
            name: 'dateTime',
            message: 'Data e ora dell\'evento (es. 01/01/2023 18:00):',
            validate: (value) => {
                if (value.length > 0 && value.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}$/)) {
                    return true;
                } else {
                    return 'Inserisci una data e un orario.';
                }
            },
        },
        {
            type: 'input',
            name: 'location',
            message: 'Luogo dell\'evento:',
            validate: (value) => {
                if (value.length > 0) {
                    return true;
                } else {
                    return 'Inserisci un luogo.';
                }
            },
        },
        {
            type: 'number',
            name: 'maxTickets',
            message: 'Numero massimo di biglietti disponibili:',
            validate: (value) => {
                if (value > 0) {
                    return true;
                } else {
                    return 'Inserisci un numero di biglietti maggiore di 0.';
                }
            },
        },
        ])
        .then((event) => {
        console.log(addToEvents(event, events));
        main();
        });

    }

    function viewEvents() {
        events.forEach((event, index) => {
            console.log(`\nEvento ${index + 1}:`);
            console.log(`Titolo: ${event.title}`);
            console.log(`Data e ora: ${event.dateTime}`);
            console.log(`Luogo: ${event.location}`);
            console.log(`Biglietti disponibili: ${event.maxTickets - event.bookedTickets}`);
        });
        main();
    }

    function bookTickets() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'eventToBook',
            message: 'Per quale evento vuoi prenotare biglietti?',
            choices: events.map((event, index) => `${index + 1}. ${event.title}`),
        },
        {
            type: 'number',
            name: 'tickets',
            message: 'Quanti biglietti vuoi prenotare?',
            validate: (value) => {
                if (value > 0) {
                    return true;
                } else {
                    return 'Inserisci un numero di biglietti maggiore di 0.';
                }
            },
        },
        ])
        .then((answers) => {
            console.log(bookTicketsToEvents(answers, events));
            main();
        });
    }

    function cancelBooking() {
        inquirer
        .prompt([
            {
            type: 'list',
            name: 'eventToCancel',
            message: 'Per quale evento vuoi cancellare la prenotazione?',
            choices: events.map((event, index) => `${index + 1}. ${event.title}`),
            },
            {
            type: 'number',
            name: 'tickets',
            message: 'Quanti biglietti vuoi cancellare?',
            },
        ]).then((answers) => {
            console.log(cancelBookingToEvents(answers, events));
            main();
        });
    }

    main();

});