
//funktion för hamburgermeny-knappen
function toggleMenu() {
    const navigationMenu =document.getElementById('navigation-menu');
    navigationMenu.classList.toggle('active');
}

//hämta manyn från JSON
function fetchData() {
    //fetch hämtar JSON-filen
    fetch("/restaurang/myData.json")
        .then(function(response) {
            return response.json();
        })
        //Uppdaterar HTML med JSON-datan
        .then(function(data) {
            document.getElementById("entrees").innerText = data.menuItem1;

            //listan från HTML-filen lokaliseras
            let itemList1 = document.getElementById("menuList1");
            itemList1.innerHTML = "";

            //Loopar JSON-listan och skapar nya element i html för vaje objekt i listan
            data.förrätter.forEach(function(förrätt) {
                //Skapar nytt li-element i html
                let li = document.createElement("li"); 
                //Innehållet i nya li-elementet
                li.innerHTML = "<b>" + förrätt.name + "</b>" + "<br>" + förrätt.description + "<br>" + förrätt.price + ":-";
                //Lägger till i listan
                itemList1.appendChild(li);
            });
            document.getElementById("maincourses").innerText = data.menuItem2;

            let itemList2 = document.getElementById("menuList2");
            itemList2.innerHTML = "";

            data.huvudrätter.forEach(function(huvudrätt) {
                let li = document.createElement("li");
                li.innerHTML = "<b>" + huvudrätt.name + "</b>" + "<br>" + huvudrätt.description + "<br>" + huvudrätt.price + ":-";
                itemList2.appendChild(li);
            });

            document.getElementById("desserts").innerText = data.menuItem3;

            let itemList3 = document.getElementById("menuList3");
            itemList3.innerHTML = "";

            data.efterrätter.forEach(function(efterrätt){
                let li = document.createElement("li");
                li.innerHTML = "<b>" + efterrätt.name + "</b>" + "</br>" + efterrätt.description + "<br>" + efterrätt.price + ":-";
                itemList3.appendChild(li);
            });

            
        })
        .catch(function(error) {
            console.log("Fel vid hämtning av data:", error);
        });
}
fetchData();

//funktion för filtrering av menyn
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

function clearFilter() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
    item.classList.remove('hidden');
    });
}
