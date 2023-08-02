import axios from "axios";

const API_KEY = "37035646-4d5dc8c85e4153b75d2c00d5f";

axios.defaults.baseURL = "https://pixabay.com/api/";

const searchParams = new URLSearchParams({
    key : API_KEY,
    q: "cat",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: "12",
});

export async function getPhotos(name, page) {
    const {data} = await axios(`?${searchParams}&q=${name}&page=${page}`) 
    return data
};