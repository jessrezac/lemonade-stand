class Api {
    static baseUrl() {
        return "http://localhost:3000/api/v1";
    }
    
    static submitNewGame(formData) {
        console.log(`Submitting new game from ${Api.baseUrl()}`);

        let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
        };

        fetch(Api.baseUrl() + "/games", configObj)
        .then(resp => resp.json())
        .then(data => console.log(data));
    }

    static submitNewDay(formData) {
        console.log(`Submitting new day from ${Api.baseUrl()}`);

        let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
        };

        fetch(Api.baseUrl() + "/games", configObj)
            .then(resp => resp.json())
            .then(data => console.log(data));
    }

    static deleteGame(formData) {
        event.preventDefault();

        let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
        };

        fetch(Api.baseUrl() + "/games", configObj)
            .then(resp => resp.json())
            .then(data => console.log(data));
    }
}
