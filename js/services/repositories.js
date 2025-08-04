import { baseURL, repositoriesQuantity } from "../variables.js";
const token = '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'

async function reposDev(userName) {
    const response = await fetch(`${baseURL}/${userName}/repos?per_page=${repositoriesQuantity}`, {
        headers: {
            Authorization: `token ${token}`
        }
    });

    if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
    return await response.json();
}

export { reposDev };
