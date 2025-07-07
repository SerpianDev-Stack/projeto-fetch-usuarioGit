async function eventsDev(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`);
    const events = await response.json();

    // const filteredEvents = events.filter(event => true).slice(0, 10);

    const filteredEvents = events.filter(event =>
        event.type === "PushEvent" || event.type === "CreateEvent"
    ).slice(0, 10);

    console.log(filteredEvents)
    return filteredEvents;
    

}



export { eventsDev };