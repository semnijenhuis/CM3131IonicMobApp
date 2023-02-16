class User {

    #username;
    #password;


    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }
}
