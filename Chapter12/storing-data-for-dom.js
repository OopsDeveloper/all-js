(async() => {
    const statusDisplay = document.getElementById("status");
    const personDisplay = document.getElementById("person");
    try {
        // The WeakMap that will hold the information related to our DOM elements
        const personMap = new WeakMap();
        await init();

        async function init() {
            const peopleList = document.getElementById("people");
            const people = await getPeople();
            // In this loop, we store the person that relates to each div in the
            // WeakMap using the div as the key
            for (const person of people) {
                const personDiv = createPersonElement(person);
                personMap.set(personDiv, person);
                peopleList.appendChild(personDiv);
            }
        }

        async function getPeople() {
            // This is a stand-in for an operation that would fetch the person
            // data from the server or similar
            return [
                {name: "Joe Bloggs", position: "Front-End Developer"},
                {name: "Abha Patel", position: "Senior Software Architect"},
                {name: "Guo Wong",   position: "Database Analyst"}
            ];
        }

        function createPersonElement(person) {
            const div = document.createElement("div");
            div.className = "person";
            div.innerHTML =
                '<a href="#show" class="remove">X</a> <span class="name"></span>';
            div.querySelector("span").textContent = person.name;
            div.querySelector("a").addEventListener("click", removePerson);
            div.addEventListener("click", showPerson);
            return div;
        }

        function stopEvent(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function showPerson(e) {
            stopEvent(e);
            // Here, we get the person to show by looking up the clicked element
            // in the WeakMap
            const person = personMap.get(this);
            if (person) {
                const {name, position} = person;
                personDisplay.textContent = `${name}'s position is: ${position}`;
            }
        }

        function removePerson(e) {
            stopEvent(e);
            this.closest("div").remove();
        }
    } catch (error) {
        statusDisplay.innerHTML = `Error: ${error.message}`;
    }
})();
