async function socialDev(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const userData = await response.json();

    return {
        seguidores: userData.followers,
        seguindo: userData.following
    };
}

export { socialDev };

