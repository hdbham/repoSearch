class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}
const profilePicture = document.querySelector("#profile-picture");
const userInfo = document.querySelector("#user-info");

const form = document.querySelector("#repos-form");
const userName = document.querySelector("#github-username");
const reposList = document.querySelector("#repos-list");

const GithubAPI = new FetchWrapper("https://api.github.com/users");

form.addEventListener("submit", event => {
    event.preventDefault();
  
    GithubAPI.get(`/${userName.value}`)
    .then(data => {
        userInfo.innerHTML = ""
        userInfo.classList.add(`show`)
        userInfo.insertAdjacentHTML("beforeend",`<img src="${data.avatar_url}">`) 
        console.log(`${data}`);
        userInfo.insertAdjacentHTML("beforeend",`<h1> ${data.name} </h1>`) 
    })
   
    GithubAPI.get(`/${userName.value}/repos`)
    .then(data =>  {
        reposList.innerHTML = ""
        data.forEach(repo => {
            console.log(repo)
            reposList.insertAdjacentHTML("beforeend", `<li>
                <a href="https://github.com/${repo.full_name}" target="_blank">
                <p> ${repo.pushed_at.toString().substring(0,10)} </p>
                <h2>${repo.full_name}</h2>
                <p>${repo.description}</p>
                </a>
                </li>`);
        });
    })
});