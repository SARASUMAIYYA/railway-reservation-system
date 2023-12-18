//import config from './config.json'

const baseUrl ="http://localhost:3001"

export function login(body) {
    console.log("login");
    return callPost(baseUrl + '/login', body);
}

export function register(body) {
    console.log("register");
    return callPost(baseUrl + '/register', body);
}

export function routes() {
    console.log("routes");
    return callGet(baseUrl + '/railway/routes');
}

export function route(station) {
    console.log("route");
    return callGet(baseUrl + '/railway/route/' + station);
}

export function trains() {
    console.log("trains");
    return callGet(baseUrl + '/railway/trains/');
}

export function trainsByRoute(route) {
    console.log("trainsByRoute");
    return callGet(baseUrl + '/railway/trains/' + route);
}

export function classes() {
    console.log("classes");
    return callGet(baseUrl + '/railway/classes/');
}

export function schedules() {
    console.log("schedules");
    return callGet(baseUrl + '/railway/schedules/');
}

export function validateCard(body) {
    console.log("validateCard");
    return callPost(baseUrl + '/payment/card', body);
}

export function validatePhone(body) {
    console.log("validatePhone");
    return callPost(baseUrl + '/payment/phone', body);
}

export function makeReservation(body) {
    console.log("makeReservation");
    return callPost(baseUrl + '/railway/reservations', body);
}

export function getReservations(user) {
    console.log("getResrvations",user);
    return callGet(baseUrl + '/railway/reservations/' + user);
}

export function deleteReservation(id) {
    console.log("deleteReservation");
    return callDelete(baseUrl + '/railway/reservations/' + id);
}

export function updateAccount(body, id) {
    console.log("updateAccount");
    return callPut(baseUrl + '/users/' + id, body)
}

export function contact(body) {
    console.log("contact");
    return callPost(baseUrl + '/railway/contact', body);
}

const callGet = (url) => {
    console.log("calget");
    return fetch(url).then(handleres);
}

const callPost = (url, body) => {
    console.log("callpost",url,body);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callPut = (url, body) => {
    console.log("callput");
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callDelete = (url) => {
    console.log("calldelete");
    return fetch(url, {
        method: 'DELETE'
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        console.log(" res in services",res.ok);
        return res.json();
    }
    else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
    }
}