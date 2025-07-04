import { baseURL } from "../variables.js";
async function userDev(userName) {
    const response = await fetch(`${baseURL}/${userName}`);
    return await response.json();
}

export { userDev };