class Api {
    static baseUrl() {
        return "http://localhost:3000/api/v1";
    }
    
    static submitNewGame(formData, game) {
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
        .then(data => game.applyResults(data));
    }

    static submitNewDay(formData, game) {
        console.log(`Submitting new day from ${Api.baseUrl()}`);

        let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
        };

        fetch(Api.baseUrl() + `/games/${game.gameId}`, configObj)
            .then(resp => resp.json())
            .then(data => game.applyResults(data));
    }

    static deleteGame(gameId) {
        event.preventDefault();
        console.log(gameId)

        let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }};

        fetch(Api.baseUrl() + `/games/${gameId}`, configObj)
            .then(resp => resp.json())
            .then(data => console.log(data));
    }
}
