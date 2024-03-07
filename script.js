'use strict';

let dezimalInput = document.querySelector("#input");
let btn = document.querySelector("#btn");
let clear = document.querySelector("#clear");
let output = document.querySelector("#output");

const checkboxDezimal = document.getElementById('checkboxDecimal');
const checkboxBinär = document.getElementById('checkboxBinary');

const popup = document.querySelector(".popup");


btn.addEventListener("click", function () {
    if (checkboxDezimal.checked) { // Dezimal zu Binär

        if (isValidIP(input.value)) {
            const ipv4Address = input.value;
            const octets = ipv4Address.split('.');

            const binaryIPv4WithDots = octets.map(octet => {
                const binary = parseInt(octet, 10).toString(2);
                const paddedBinary = '00000000'.substring(binary.length) + binary;
                return paddedBinary.match(/.{1,8}/g).join('.');
            }).join('.');
            console.log(binaryIPv4WithDots);
            output.innerHTML = binaryIPv4WithDots;
        } else {
            alert(input.value + " ist keine gültige IP-Adresse.");
        }

    } else if (checkboxBinär.checked) { // Binär zu Dezimal
        if (isValidBinaryIP(input.value)) {

        } else {
            alert(input.value + ' ist keine gültige binäre IP-Adresse.');
        }
        const binaryString = input.value.split('.');
        const binaryArray = binaryString.map(octet => {
            return '00000000'.substring(octet.length) + octet;
        });
        const decimalArray = binaryArray.map(binary => parseInt(binary, 2));
        const ipAddress = decimalArray.join('.');
        output.innerHTML = ipAddress;
    } else {
        alert("Bitte wählen Sie eine Option aus");
    }
});

checkboxDezimal.addEventListener('change', function () {
    if (this.checked) {
        checkboxBinär.checked = false;
    }
});

checkboxBinär.addEventListener('change', function () {
    if (this.checked) {
        checkboxDezimal.checked = false;
    }
});

clear.addEventListener("click", function () {
    input.value = "";
    output.innerHTML = "";
});


// IP Validation
function isValidIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) {
        return false;
    }

    const octets = ip.split('.');
    for (let i = 0; i < 4; i++) {
        const octetValue = parseInt(octets[i]);
        if (isNaN(octetValue) || octetValue < 0 || octetValue > 255) {
            return false; 
        }
    }

    return true;
}

// Binary IP Validation
function isValidBinaryIP(binaryIP) {
    const binaryRegex = /^([01]{8}\.){3}[01]{8}$/;
    if (!binaryRegex.test(binaryIP)) {
        return false;
    }

    const octets = binaryIP.split('.');
    for (let i = 0; i < 4; i++) {
        const octetValue = parseInt(octets[i], 2);
        if (isNaN(octetValue) || octetValue < 0 || octetValue > 255) {
            return false; 
        }
    }

    return true; 
}


// Copy to Clipboard
function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.value = output.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

output.addEventListener("click", () => {
    popup.classList.add("active");
    copyToClipboard();
})

popup.addEventListener("animationend", () => {
    popup.classList.remove("active");
})
