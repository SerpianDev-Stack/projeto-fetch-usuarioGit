import { baseURL, repositoriesQuantity } from "../variables.js";

async function reposDev(userName) {
    const response = await fetch(`${baseURL}/${userName}/repos?per_page=${repositoriesQuantity}`, {
    });

    if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
    return await response.json();
}

export { reposDev };
