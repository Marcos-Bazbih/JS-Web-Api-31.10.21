const showGif = () => {
    itemsSection.innerHTML = `<img src="./naruto.gif" alt="" id="gifLoader">`
}
const stopGif = () => {
    gifLoader.style.display = "none"
}


const getApi = async (api_Url, searchName) => {
    try {
        showGif();
        return await fetch(`${api_Url}${searchName}`)
            .then(res => res.json())
    } catch (err) {
        return err;
    }
    finally {
        stopGif();
    }
}

const showItems = (array) => {
    for (let item of array) {
        itemsSection.innerHTML += `<article class="itemDiv">
        <img src="${item.image_url}">
        <div class="itemInfo">
        <p>Title: ${item.title}</p>
        <p>Rated: ${item.rated}</p>
        <p>Number of episodes: ${item.episodes}</p>
        <p>Score: ${item.score}</p>
        <p><a href="${item.url}" target="blank">link</a></p>
        </div>
    </article>`
    }
}

searchBarSection.onsubmit = (event) => {
    event.preventDefault();
    itemsSection.innerHTML = "";
    getApi(`https://api.jikan.moe/v3/search/anime?q=${searchIdInput.value}`)
        .then(res => showItems(res.results))
}