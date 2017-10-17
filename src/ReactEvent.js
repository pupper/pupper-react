'use strict';

export default class ReactEvent {
    /**
     * @param data
     * @return {ReactEvent}
     */
    static parse(data) {
        const d = JSON.parse(data);
        const event = new ReactEvent();
        event.setName(d.name);
        event.setValue(d.value);
        return event;
    }

    /**
     * @param name
     * @return {ReactEvent}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @param value
     * @return {ReactEvent}
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
