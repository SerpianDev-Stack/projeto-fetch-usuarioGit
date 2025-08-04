import { userDev } from "./js/services/user.js";
import { reposDev } from "./js/services/repositories.js";
import { eventsDev } from "./js/services/events.js";

import { user } from "./js/objects/user.js";
import { screen } from "./js/objects/screen.js";
import { socialDev } from "./js/objects/social.js";

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

    const userResponse = await userDev(userName);

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound();
        return;
    }

    const repositoriesResponse = await reposDev(userName);
    const eventsResponse = await eventsDev(userName);
    const socialResponse = await socialDev(userName);
    const seguidores = socialResponse.seguidores;
    const seguindo = socialResponse.seguindo;

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);

    screen.renderUser(user);
    screen.renderEvents(eventsResponse);
    screen.renderSocialData(seguindo, seguidores);

}

