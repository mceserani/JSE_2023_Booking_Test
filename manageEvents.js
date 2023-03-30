function addToEvents (event, events){
    try{
        event.bookedTickets = 0;
        if (!event.title || !event.dateTime || !event.location || !event.maxTickets) {
            throw new Error('Inserisci tutti i dati richiesti.');
        }
        events.push(event);
        return 'Evento aggiunto con successo!';
    } catch (error) {
        return 'Errore nell\'aggiunta dell\'evento.';
    }
}

function bookTicketsToEvents(tickets,events){
    try{
        const eventIndex = parseInt(tickets.eventToBook.split('.')[0]) - 1;
        const event = events[eventIndex];
        const availableTickets = event.maxTickets - event.bookedTickets;
        if (tickets.tickets <= availableTickets) {
        event.bookedTickets += tickets.tickets;
        return 'Biglietti prenotati con successo!';
        } else {
        return `Biglietti insufficienti. Riprova.`;
        }
    } catch (error) {
        return 'Errore nella prenotazione dei biglietti.' + error.message;
    }
}

function cancelBookingToEvents(tickets,events){
    try{
        const eventIndex = parseInt(tickets.eventToCancel.split('.')[0]) - 1;
        const event = events[eventIndex];
        if (tickets.tickets <= event.bookedTickets) {
            event.bookedTickets -= tickets.tickets;
            return 'Prenotazione cancellata con successo!';
        } else {
            return 'Il numero di biglietti da cancellare è superiore a quelli prenotati. Riprova.';
        }
    } catch (error) {
        return 'Errore nella cancellazione della prenotazione.' + error.message;
    }
}

module.exports = {
    addToEvents,
    bookTicketsToEvents,
    cancelBookingToEvents
}