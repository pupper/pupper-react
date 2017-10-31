export default class Event {

    /**
     * @param {string} jsonData event in JSON form
     * @return {Event} data in Event form
     */
    static parse (jsonData) {
        const data = JSON.parse(jsonData);
        return new Event()
            .setName(data.name)
            .setValue(data.value);
    }

    /**
     * @param {string} name Event name/identifier
     * @return {Event} Fluent interface
     */
    setName (name) {
        this.name = name;
        return this;
    }

    /**
     * @param {*} value Event value/data
     * @return {Event} Fluent interface
     */
    setValue (value) {
        this.value = value;
        return this;
    }

    /**
     * @return {string} Event name/identifier
     */
    getName () {
        return this.name;
    }

    /**
     * @return {*} Event value/data
     */
    getValue () {
        return this.value;
    }

    /**
     * @return {string} Event in JSON form
     */
    build () {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    }
}
