let sets = [];

function getSets() {
    if (localStorage.getItem("sets")) {
        console.log("Loading sets from localStorage");
        sets = JSON.parse(localStorage.getItem("sets"));
    } else {
        let fetchSets = async function () {
            console.log("Fetching sets from server");
            let response = await fetch("https://api.tcgdex.net/v2/en/sets");
            sets = await response.json();
            localStorage.setItem("sets", JSON.stringify(sets));
        };
        fetchSets();
    }
}

getSets();

function addSetToDOM(position) {
    const target = document.querySelector(".set-choice");
    const template = document.querySelector("#template-set");
    let clone = template.cloneNode(true).content;
    if (sets[position].logo) {
        clone.querySelector(".set-img").src = sets[position].logo + ".webp";
        clone.querySelector(".set-img").alt = sets[position].name;
        clone.querySelector(".set-name").style.display = "none";
    } else {
        clone.querySelector(".set-name").innerText = sets[position].name;
        clone.querySelector(".set-img").style.display = "none";
    }
    clone.querySelector(".set").dataset.set = position;
    clone.querySelector(".set").addEventListener("click", (e) => {
        getCards(position);
    });
    target.appendChild(clone);
}

async function getCards(set) {
    const target = document.querySelector(".pulls");
    target.replaceChildren();
    const template = document.querySelector("#template-pull");
    for (let i = 0; i < 10; i++) {
        let clone = template.cloneNode(true).content;
        clone.querySelector(".pull").src = sets[set].logo + ".webp";
        const randomCard = Math.floor(Math.random() * sets[set].cardCount.official) + 1;
        let response = await fetch(`https://api.tcgdex.net/v2/en/sets/${sets[set].id}/${randomCard}`);
        let data = await response.json();
        clone.querySelector(".pull").src = data.image + "/high.webp";
        target.appendChild(clone);
    }
}

addSetToDOM(sets.length - 1);
addSetToDOM(sets.length - 2);
addSetToDOM(sets.length - 3);
addSetToDOM(sets.length - 4);
addSetToDOM(sets.length - 5);
addSetToDOM(sets.length - 6);

getCards(1);
