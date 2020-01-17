class Api {
    static baseUrl = "http://localhost:3000"

    static submitNewGame(formData) {
        event.preventDefault()

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(Api.baseUrl + '/api/v1/games', configObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    static submitNewDay(formData) {
        event.preventDefault()

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(Api.baseUrl + '/api/v1/games', configObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    static deleteGame(formData) {
        event.preventDefault()

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData) 
            
        }

        fetch(Api.baseUrl + '/api/v1/games', configObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

}