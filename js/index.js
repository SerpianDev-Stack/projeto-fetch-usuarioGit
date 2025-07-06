import { userDev } from "./services/user.js";
import { reposDev } from "./services/repositories.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

const btn = document.getElementById('btn-search');
const caixaEntrada = document.getElementById('input-search');

btn.addEventListener('click', () => {
    const userName = caixaEntrada.value;
    if (validateEmptyInput(userName)) return;
    getUserData(caixaEntrada.value);
})

caixaEntrada.addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(caixaEntrada.value)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no Github');
        return true;
    }
}

async function getUserData(userName) {
    reposDev(userName).then(reposData => {
        console.log(reposData);
    })

    const userResponse = await userDev(userName);
    const repositoriesResponse = await reposDev(userName);

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound();
        return;
    }

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);

    screen.renderUser(user);
}

