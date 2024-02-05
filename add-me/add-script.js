"use strict";

const addPropertyButton = document.getElementById("add");

const imageInput = document.getElementById("imageInput");
const brandInput = document.getElementById("brandInput");
const nameInput = document.getElementById("nameInput");
const launchDateInput = document.getElementById("launchDateInput");
const platformOsInput = document.getElementById("platformOsInput");
const selfieCameraInput = document.getElementById("selfieCameraInput");
const internalRamInput = document.getElementById("internalRamInput");
const batteryTypeInput = document.getElementById("batteryTypeInput");
const priceEurInput = document.getElementById("priceEurInput");
const techSpecLinkInput = document.getElementById("techSpecLinkInput");

const statusMessages = document.getElementById("statusMessages");

const brands = [
  "Apple",
  "Asus",
  "Google Pixel",
  "Huawei",
  "Motorola",
  "Nokia",
  "OnePlus",
  "Oppo",
  "Samsung",
  "Sony",
  "Xiaomi",
];

brands.forEach((brand) => {
  const addBrand = document.getElementById("brandInput");
  const option = document.createElement("option");
  option.setAttribute("value", brand);
  option.innerText = brand;
  addBrand.append(option);
});

function displayStatus(isOk, text) {
  const statusDiv = document.getElementById("statusMessages");
  const statusText = document.createElement("h1");
  statusDiv.style.color = isOk ? "03d3b2" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

const addCardObj = () => {
  const imageInputValue = document.getElementById("imageInput").value;
  const brandInputValue = document.getElementById("brandInput").value;
  const nameInputValue = document.getElementById("nameInput").value;
  const launchDateInputValue = document.getElementById("launchDateInput").value;
  const platformOsInputValue = document.getElementById("platformOsInput").value;
  const selfieCameraInputValue =
    document.getElementById("selfieCameraInput").value;
  const internalRamInputValue =
    document.getElementById("internalRamInput").value;
  const batteryTypeInputValue =
    document.getElementById("batteryTypeInput").value;
  const priceEurInputValue = document.getElementById("priceEurInput").value;
  const techSpecLinkInputValue =
    document.getElementById("techSpecLinkInput").value;

  const newCard = {
    brand: brandInputValue,
    name: nameInputValue,
    launchDate: launchDateInputValue,
    platformOs: platformOsInputValue,
    selfieCamera: selfieCameraInputValue,
    internalRam: internalRamInputValue,
    batteryType: batteryTypeInputValue,
    priceEur: priceEurInputValue,
    imgUrl: imageInputValue,
    techSpecLink: techSpecLinkInputValue,
  };

  statusMessages.innerHTML = "";

  fetch("https://65bb606a52189914b5bbe878.mockapi.io/phones", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  })
    .then((res) => {
      if (res.ok) {
        displayStatus(res.ok, "Property successfully added.");
        window.location.assign("../index.html");
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((error) => {
      displayStatus(false, `Something went wrong. Server returned: ${error}.`);
    });
};

addPropertyButton.addEventListener("click", addCardObj);
