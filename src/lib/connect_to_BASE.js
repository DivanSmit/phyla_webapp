// @ts-nocheck
const backendIp = import.meta.env.VITE_BACKEND_IP;
const backendPort = import.meta.env.VITE_BACKEND_PORT;
const ngrok = `http://192.168.137.1:9001/erl/http_session_gen_server/fetchdata`;
// let ngrok = "http://localhost:9001"+"/erl/http_session_gen_server/fetchdata";

export async function get_data(Tag1 = "", Tag2 = "INFO") {

    let MSG = {subject: "INFO", queryParam:Tag2, tag: Tag1};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));
        // Capture the start time
        const startTime = Date.now();
        const response = await fetch(url);
        // Capture the end time
        const endTime = Date.now();
        // Calculate and print the latency
        const latency = endTime - startTime;
        console.log(`Latency: ${latency} ms`);
        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function data_exchange(Cap = "", Tag1 = "INFO", Tag2) {

    let MSG = {subject: "data_exchange_capabilities", cap:Cap, tag1: Tag1, tag2:Tag2};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));
        // Capture the start time
        const startTime = Date.now();
        const response = await fetch(url);
        // Capture the end time
        const endTime = Date.now();
        // Calculate and print the latency
        const latency = endTime - startTime;
        console.log(`Latency: ${latency} ms`);
        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function spawnInstance(Tag = "", Param = "") {

    let MSG = {subject: "SPAWN", queryParam:"SPAWN", tag: Tag, param: Param};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function userInteraction(User = "", Param = "", data = '') {

    let MSG = {subject: "USERInteract", user: User, param: Param, tag: "TASKS", taskID: data};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function getuserData(User = "", Param = "") {
    let MSG = {subject: "UserData", user: User, param: Param, tag: "INFO"};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));

        // Capture the start time
        const startTime = Date.now();
        const response = await fetch(url);
        // Capture the end time
        const endTime = Date.now();
        // Calculate and print the latency
        const latency = endTime - startTime;
        console.log(`Latency: ${latency} ms`);

        if (response.ok) {
            const data = await response.json();
            
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }

    } catch (error) {
        console.error('Error:', error);
        return [];
    }

    const endTime = Date.now();

}

export async function newComponent(User = "", Param = "") {

    let MSG = {subject: "newComponent", user: User, param: Param};

    try {
        let url = new URL(ngrok);
        url.searchParams.append("MSG", JSON.stringify(MSG));
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.error('Request failed:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
