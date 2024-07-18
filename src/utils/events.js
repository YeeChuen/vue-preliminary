const events = new Map();

export default {
    // add event
    $on(eventName, cbFn) {
        if (!events.has(eventName)) {
            events.set(eventName, [])
        }
        events.get(eventName).push(cbFn)
    },
    // remove event
    $off(eventName) {
        if (events.has(eventName)) {
            events.delete(eventName)
        }
    },
    // trigger the event
    $emit(eventName, data) {
        if (events.has(eventName)) {
            events.get(eventName).forEach((cbFn) => cbFn(data))
        }
    }
}