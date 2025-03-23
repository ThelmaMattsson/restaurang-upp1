//javascript för order-sidan
//hamburgermeny-knapp
function toggleMenu() {
    const navigationMenu = document.getElementById('navigation-menu');
    navigationMenu.classList.toggle('active');
}

//hämtar menyn från json och skriver den i html-element, samma som menyn men med number-input och uppdatering av totalpris
function fetchData() {
    //Fetch hämtar JSON-filen
    fetch("/restaurang/myData.json")
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            //Uppdaterar HTML med JSON-datan
            document.getElementById("entrees").innerText = data.menuItem1;
            
            let itemList1 = document.getElementById("menuList1");
            itemList1.innerHTML = "";
            
            //Skapar rätter för förrätter samt number-input
            data.förrätter.forEach(function(förrätt) {
                let li = document.createElement("li");
                li.innerHTML = `<b>${förrätt.name}</b><br>${förrätt.description}<br>${förrätt.price} kr<br><input type="number" id="quantity-${förrätt.name}" value="0" min="0" data-price="${förrätt.price}" />`;
                itemList1.appendChild(li);

                //Lägg till eventlistener för att uppdatera totalpriset när användaren ändrar antal rätter
                document.getElementById(`quantity-${förrätt.name}`).addEventListener("input", updateTotalPrice);
            });

            document.getElementById("maincourses").innerText = data.menuItem2;

            let itemList2 = document.getElementById("menuList2");
            itemList2.innerHTML = "";

            //Skapar rätter för huvudrätter samt number-input
            data.huvudrätter.forEach(function(huvudrätt) {
                let li = document.createElement("li");
                li.innerHTML = `<b>${huvudrätt.name}</b><br>${huvudrätt.description}<br>${huvudrätt.price} kr<br><input type="number" id="quantity-${huvudrätt.name}" value="0" min="0" data-price="${huvudrätt.price}" />`;
                itemList2.appendChild(li);

                //Lägger till eventlistener för att uppdatera totalpriset när användaren ändrar antal rätter
                document.getElementById(`quantity-${huvudrätt.name}`).addEventListener("input", updateTotalPrice);
            });

            document.getElementById("desserts").innerText = data.menuItem3;

            let itemList3 = document.getElementById("menuList3");
            itemList3.innerHTML = "";

            //Skapar rätter för efterrätter och number-input
            data.efterrätter.forEach(function(efterrätt){
                let li = document.createElement("li");
                li.innerHTML = `<b>${efterrätt.name}</b><br>${efterrätt.description}<br>${efterrätt.price} kr<br><input type="number" id="quantity-${efterrätt.name}" value="0" min="0" data-price="${efterrätt.price}" />`;
                itemList3.appendChild(li);

                //Lägg till eventlistener för att uppdatera totalpriset när användaren ändrar antalet rätter
                document.getElementById(`quantity-${efterrätt.name}`).addEventListener("input", updateTotalPrice);
            });
            
        })
        .catch(function(error) {
            console.log("Fel vid hämtning av data:", error);
        });
}

//Funktion som uppdaterar totalpriset
function updateTotalPrice() {
    let totalPrice = 0;
    
    //Gå igenom alla number-input och uppdatera totalpris
    const allQuantities = document.querySelectorAll('input[type="number"]');
    allQuantities.forEach(function(input) {
        let quantity = parseInt(input.value) || 0;
        let price = parseFloat(input.dataset.price);
        totalPrice += quantity * price;
    });
    
    //Visa totalapris
    document.querySelector("#totalPris h3").innerText = `Totalpris: ${totalPrice} kr`;
}

fetchData();

//Funktion för filtrering av menyn
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
    if (item.classList.contains(category)) {
        item.classList.remove('hidden');
    } else {
        item.classList.add('hidden');
    }
    });
}
//funktion för att ta bort filtreringen
function clearFilter() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
    item.classList.remove('hidden');
    });
}

