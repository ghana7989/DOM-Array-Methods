
const main = document.getElementById("main");
const add_user_btn = document.getElementById("add-user");
const double_btn = document.getElementById("double");
const show_millionaires_btn = document.getElementById("show-millionaires");
const sort_btn = document.getElementById("sort");
const calculate_wealth_btn = document.getElementById("calculate-wealth");

let data = []

// Fetching Random Users
getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()
async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api")
    const data = await response.json();
    let user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}
// Double Money 
function doubleMoney() {
    data = data.map(user => {
        user.money = Number(user.money) * 2
        return { ...user }
    })

    updateDom(data)
}

// Sorts the Dom By the richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money)
    updateDom()
}
// This Function Filter the DOm by millionaires
function filterByMillionaires() {

    data = data.filter(user => user.money > 1000000)
    updateDom()
}
// Calculate Over all Wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money),0)
    const wealthElement = document.createElement("div")
    wealthElement.innerHTML=`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)

    // updateDom()
}
// This function adds the newUser from async function getRandomUser
function addData(newUser) {
    data.push(newUser)
    updateDom();
}
function updateDom(providedData = data) {
    // Clear the main Div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    providedData.forEach(person => {
        const element = document.createElement("div")
        element.classList.add("person")
        element.innerHTML = `<stronng>${person.name}</stronng> ${formatMoney(person.money)}`
        main.appendChild(element)
    })
}

// Format Number as money

function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}








// EventListeners

add_user_btn.addEventListener("click", getRandomUser)
double_btn.addEventListener("click", doubleMoney)
sort_btn.addEventListener("click", sortByRichest)
show_millionaires_btn.addEventListener("click", filterByMillionaires)
calculate_wealth_btn.addEventListener("click", calculateWealth)