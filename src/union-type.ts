type NameOrNameArray = string | string[] | number;

function createName(name: NameOrNameArray) {
    if (typeof name === "string") {
        return name;
    } else if (typeof name === 'number') {
        return name;
    }
    else {
        return name.join(" ");
    }
}

var greetingMessage = `Greetings, ${ createName(["Sam", "Smith"]) }`;
alert(greetingMessage);