const character = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
const randomToken = (length) => {
    let token = "";
    for(let i = 0; i < length; i++) {
        token += character.charAt(Math.ceil(Math.random() * character.length));
    }
    return token;
}

module.exports = randomToken;