
//funktion för hamburgermeny-knappen
function toggleMenu() {
    const navigationMenu = document.getElementById('navigation-menu');
    navigationMenu.classList.toggle('active');
}

//kod för validering av bookingForm, är något tomt eller fel så syns ett informativt felmeddelande och man kan inte submitta
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const nummer = document.getElementById("number").value;
    const date = document.getElementById("date").value;
    const antal = document.getElementById("antal").value;

    let errorMeddelande = "";

    if (name.trim() === "") {
        errorMeddelande += "Fyll i ett namn!\n";
    }

    const emailPattern = /^[a-öA-Ö0-9._-]+@[a-öA-Ö0-9.-]+\.[a-öA-Ö]{2,6}$/;
    if (!email.match(emailPattern)) {
        errorMeddelande += "Ange en giltig epost-adress!\n";
    }

    const nummerPattern = /^\d{10}$/;
    if (!nummer.match(nummerPattern)) {
        errorMeddelande += "Ange giltigt telefonnummer!\n";
    }

    if (antal <= 0) {
        errorMeddelande += "Ange antal gäster i sällskapet!\n";
    }

    if (date === "") {
        errorMeddelande += "Välj ett datum och tid!\n"
    }


    if (errorMeddelande !== "") {
        document.getElementById("errorMeddelande").style.display = "block";
        document.getElementById("errorMeddelande").innerHTML = errorMeddelande;
    }else {
        document.getElementById("errorMeddelande").style.display = "none";
        alert("Bokning genomförd!");
    }
});