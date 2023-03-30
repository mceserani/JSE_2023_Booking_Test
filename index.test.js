const {
    addToEvents,
    bookTicketsToEvents,
    cancelBookingToEvents
} = require('./manageEvents.js');

describe('addToEvents', () => {
    test('should add an event to the events array', () => {
        const events = [];
        const event = {
            title: 'Titolo',
            dateTime: '01/01/1970 00:00',
            location: 'Luogo',
            maxTickets: 100,
            bookedTickets: 0
        };
        const result = addToEvents(event, events);
        expect(result).toBe('Evento aggiunto con successo!');
        expect(events).toEqual([event]);
        expect(events).toHaveLength(1);
    });
    test('should return an error message if the event is not an object', () => {
        const events = [];
        const event = 'Titolo';
        const result = addToEvents(event, events);
        expect(result).toBe('Errore nell\'aggiunta dell\'evento.');
        expect(events).toEqual([]);
    });
});

describe('bookTicketsToEvents', () => {
    test('should book tickets to an event', () => {
        const events = [{
            title: 'Titolo',
            dateTime: '01/01/1970 00:00',
            location: 'Luogo',
            maxTickets: 100,
            bookedTickets: 0
        }];
        const tickets = {
            eventToBook: '1. Titolo',
            tickets: 10
        };
        const result = bookTicketsToEvents(tickets, events);
        expect(result).toBe('Biglietti prenotati con successo!');
        expect(events[0].bookedTickets).toBe(10);
    });
    test('should return an error message if the event is not an object', () => {
        const events = [{
            title: 'Titolo',
            dateTime: '01/01/1970 00:00',
            location: 'Luogo',
            maxTickets: 100,
            bookedTickets: 0
        }];
        const tickets = {
            eventToBook: '1. Titolo',
            tickets: 110
        };
        const result = bookTicketsToEvents(tickets, events);
        expect(result).toBe('Biglietti insufficienti. Riprova.');
        expect(events[0].bookedTickets).toBe(0);
    });
});

describe('cancelBookingToEvents', () => {
    test('should cancel a booking to an event', () => {
        const events = [{
            title: 'Titolo',
            dateTime: '01/01/1970 00:00',
            location: 'Luogo',
            maxTickets: 100,
            bookedTickets: 10
        }];
        const tickets = {
            eventToCancel: '1. Titolo',
            tickets: 10
        };
        const result = cancelBookingToEvents(tickets, events);
        expect(result).toBe('Prenotazione cancellata con successo!');
        expect(events[0].bookedTickets).toBe(0);
    });
    test('should return an error message if the event is not an object', () => {
        const events = [{
            title: 'Titolo',
            dateTime: '01/01/1970 00:00',
            location: 'Luogo',
            maxTickets: 100,
            bookedTickets: 10
        }];
        const tickets = {
            eventToCancel: '1. Titolo',
            tickets: 110
        };
        const result = cancelBookingToEvents(tickets, events);
        expect(result).toBe('Il numero di biglietti da cancellare è superiore a quelli prenotati. Riprova.');
        expect(events[0].bookedTickets).toBe(10);
    });
});