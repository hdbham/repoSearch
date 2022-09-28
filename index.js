import FetchWrapper from "./fetch-wrapper.js"

const form = document.querySelector("#repos-form");
const userName = document.querySelector("#github-username");
const reposList = document.querySelector("#repos-list");

const GithubAPI = new FetchWrapper("https://api.github.com/users");

form.addEventListener("submit", event => {
    event.preventDefault();
  
    GithubAPI.get(`/${userName.value}/repos`)
    .then(data =>  {
        data.forEach(repo => {
            reposList.insertAdjacentHTML("beforeend", `<li>
                <a href= "https://github.com/${repo.full_name}" target="_blank">
                <h2>${repo.full_name}</h2>
                <p>${repo.description}</p>
                </a>
                </li>`);
        });
    });
});

