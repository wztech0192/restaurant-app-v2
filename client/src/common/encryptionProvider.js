import jsencrypt from "jsencrypt";

export default new (class {
    STORAGE_NAME = "encryptionProvider";

    constructor() {
        this.cypher = new jsencrypt();
    }

    promptPublicKey() {
        const key = window.prompt("Private Key:", process.env.REACT_APP_ENCRYPTION_TESTING_PRIVATE_KEY);
        if (key) this.setPrivateKey(key);
    }

    setPublicKey(key) {
        this.cypher.setPublicKey(key);
    }

    setPrivateKey(key) {
        if (key) {
            localStorage.setItem(this.STORAGE_NAME, key);
        } else {
            key = localStorage.getItem(this.STORAGE_NAME, key);
        }
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

    decrypt(payload) {
        try {
            return this.cypher.decrypt(payload);
        } catch (e) {
            console.error(e);
            return false;
        }
    }
})();
