'use strict';

export default class Event {
    /**
     * @param data
     * @return {Event}
     */
    static parse(data) {
        const d = JSON.parse(data);
        const event = new Event();
        event.setName(d.name);
        event.setValue(d.value);
        return event;
    }

    /**
     * @param name
     * @return {Event}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @param value
     * @return {Event}
     */
    setValue(value) {
        this.value = value;
        return this;
    }

    /**
     * @return {*}
     */
    getName() {
        return this.name;
    }

    /**
     * @return {*}
     */
    getValue() {
        return this.value;
    }

    build() {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    }
}
