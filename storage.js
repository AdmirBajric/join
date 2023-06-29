const STORAGE_TOKEN = "Q0PV46GL6FMMI9AYQ838I4531P8DMA2I6YX0JTJP";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

const setItem = async (key, value) => {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    }).then((res) => res.json());
};

const getItem = async (key) => {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
};