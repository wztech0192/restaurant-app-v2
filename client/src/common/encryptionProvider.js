import jsencrypt from "jsencrypt";

export default new (class {
    constructor() {
        this.cypher = new jsencrypt();
    }
    setPublicKey(key) {
        this.cypher.setPublicKey(key);
    }
    setPrivateKey(key) {
        this.cypher.setPrivateKey(key);
    }
    encrypt(payload) {
        try {
            return this.cypher.encrypt(payload);
        } catch (e) {
            console.error(e);
            return false;
        }
    }
})();
