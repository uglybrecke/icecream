// alert("Hello, icecream!");

document.getElementById("form").onsubmit = () => {
    let isvalid = true;

    //clear errors
    clearErrors();

    let name = document.getElementById("name").value.trim();
    if(name === "") {
        document.getElementById("err-name").style.display = "block";
        isvalid = false;
    }

    let email = document.getElementById("email").value.trim();
    if(email === "") {
        document.getElementById("err-email").style.display = "block";
        isvalid = false;
    }

    //cone
    let coneSelected = false;
    let coneButtons = document.getElementsByName("cone");
    for (let i=0; i<coneButtons.length; i++) {
        if(coneButtons[i].checked) {
            coneSelected = true;
        }
    }
    if (!coneSelected) {
        document.getElementById("err-cone").style.display = "block";
        isvalid = false;
    }

    //flavor
    let flavor = document.getElementById("flavor").value;
    if (flavor == "none") {
        document.getElementById("err-flavor").style.display = "block";
        isvalid = false;
    }

    return isvalid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}