import axios from "axios";

export function updateUser(setState, newVal, initialVal, close) {
    axios.put("https://jsonplaceholder.typicode.com/users/" + newVal.id, JSON.stringify(newVal))
        .then(response => {
            newVal = response.data;
            close();
        })
        .catch(err => console.log(err));
    let temp = updateValues(initialVal, newVal);
    setState(temp);
}

export function addUser(setState, newVal, initialVal, close) {
    axios.post("https://jsonplaceholder.typicode.com/users", newVal)
        .then(response => {
            newVal = response.data;
            let temp = initialVal.slice();
            temp.push(newVal);
            setState(temp);
            close();
        })
        .catch(err => console.log(err));
}

function updateValues(initialVal, newVal) {
    let temp = initialVal.slice();
    temp[newVal.id - 1] = newVal;
    return temp;
}
