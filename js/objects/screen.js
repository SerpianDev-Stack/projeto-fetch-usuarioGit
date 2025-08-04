const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
        <img src="${user.avatarUrl}" alt="Foto de perfil do usuário">
        <div class="data">
         <h1> ${user.name ?? 'Não possui nome cadastrado 😒'} </h1>
         <p>${user.bio ?? 'Não possui bio cadastrada 😒'} </p>
        </div>
        </div>`;

        let repositoriesItens = '';
        user.repositories.forEach(repo =>
            repositoriesItens += `
    <li>
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <span> - ${repo.language ?? 'Linguagem não informada'}</span><br>
      ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 👀 ${repo.watchers_count}
    </li>
  `
        );

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
        <div class="repositories section">
          <h2>Repositórios</h2>
          <ul>${repositoriesItens}</ul>
        </div>`;
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encotrado. Verifique se o nome do usuário está correto.</h3>"
    },

    renderEvents(events) {
        const eventsSection = document.querySelector('.events');

        if (!events.length) {
            eventsSection.innerHTML = "<h2>Eventos Recentes</h2><p>Esse usuário não possui eventos públicos.</p>";
            return;
        }

        eventsSection.innerHTML = "<h2>Eventos Recentes:</h2>";

        events.forEach(event => {
            const repoName = event.repo.name;
            const message = event.type === "PushEvent"
                ? event.payload.commits?.[0]?.message || "Sem mensagem de commit"
                : "Sem mensagem de commit";

            const eventElement = document.createElement("div");
            eventElement.innerText = `${repoName} - ${message}`;
            eventsSection.appendChild(eventElement);
        });
    },

    renderSocialData(seguindo, seguidores) {
        document.querySelector('.user-stats').innerHTML = `<p>Seguidores: ${seguidores}</p><p>Seguindo: ${seguindo} </p`;
    }
};

export { screen };