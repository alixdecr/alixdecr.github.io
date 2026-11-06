function setEndYear() {

    document.querySelector("#end-year").textContent = new Date().getFullYear();
}

function createTocEntries() {

    const nav = document.querySelector("nav");
    const sections = document.querySelectorAll("h2,h3");
    const ul = document.createElement("ul");
    nav.append(ul);

    for(const s of sections) {

        const name = s.innerText;
        const tag = s.tagName.toLowerCase();
        const li = document.createElement("li");
        const a = document.createElement("a");

        let sec = "sec";

        if(tag === "h3") {
            li.className = "toc-subsec";
            sec = "subsec";
        }

        const id = sec + "-" + name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/[\s-]+/g, "-");

        s.id = id;
        a.href = `#${id}`;
        a.textContent = name;

        li.append(a);
        ul.append(li);
    }
}