let sets = [];

function getSets() {
    if (localStorage.getItem("sets")) {
        console.log("Loading sets from localStorage")
        sets = JSON.parse(localStorage.getItem("sets"));
    } else {
        let fetchSets = async function () {
            console.log("Fetching sets from server")
            let response = await fetch("https://api.tcgdex.net/v2/en/sets");
            sets = await response.json();
            localStorage.setItem("sets", JSON.stringify(sets))
        };
        fetchSets();
    }
}

getSets();

function addSetToDOM(position) {
    const target = document.querySelector(".set-choice")
    const template = document.querySelector("#template-set")
    let clone = template.cloneNode(true).content
    clone.querySelector(".set-img").src = sets[position].logo + ".webp"
    target.appendChild(clone)
}
addSetToDOM(0)
addSetToDOM(1)
addSetToDOM(2)
addSetToDOM(3)
addSetToDOM(4)
addSetToDOM(5)
addSetToDOM(6)