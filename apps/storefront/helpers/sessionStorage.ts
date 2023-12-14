const obj = {
    sessionStorage:
        typeof window !== 'undefined' ? window.sessionStorage : null,
};

const sessionStorage = {
    getItem(key) {
        if (!obj.sessionStorage) return;
        let stringValue = obj.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);

            if (expirationDate > new Date()) {
                return value.value;
            } else {
                obj.sessionStorage.removeItem(key);
            }
        }
        return null;
    },

    setItem(key, value, expirationInMin = 30) {
        if (!obj.sessionStorage) return;

        let expirationDate = new Date(
            new Date().getTime() + 60000 * expirationInMin
        );
        console.log('expirationDate', expirationDate);
        let newValue = {
            value: value,
            expirationDate: expirationDate.toISOString(),
        };
        obj.sessionStorage.setItem(key, JSON.stringify(newValue));
    },
};

export default sessionStorage;
