"use strict";

const cardsContainer = document.querySelector(".cards-container");

const renderCards = (phonesArray) => {
  cardsContainer.innerHTML = "";

  phonesArray.forEach((phone) => {
    const phoneId = phone.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("phone-card");
    cardDiv.dataset.phoneId = phoneId;

    cardDiv.addEventListener("mouseenter", () => {
      techSpecLinkA.style.display = "block";
      removeButton.style.display = "flex";
    });

    cardDiv.addEventListener("mouseleave", () => {
      techSpecLinkA.style.display = "none";
      removeButton.style.display = "none";
    });

    const imagesDiv = document.createElement("div");
    imagesDiv.classList.add("images-box");

    const imgUrl = document.createElement("img");
    imgUrl.src = phone.imgUrl;

    const mainParagraphsDiv = document.createElement("div");
    mainParagraphsDiv.classList.add("main-box");

    const paragraphsDiv = document.createElement("div");
    paragraphsDiv.classList.add("specification-box");

    const brandParagraph = document.createElement("p");
    brandParagraph.innerText = phone.brand;

    const nameParagraph = document.createElement("p");
    nameParagraph.innerText = phone.name;

    const launchDateParagraph = document.createElement("p");
    launchDateParagraph.innerText = phone.launchDate;

    const platformOsParagraph = document.createElement("p");
    platformOsParagraph.innerText = phone.platformOs;

    const selfieCameraParagraph = document.createElement("p");
    selfieCameraParagraph.innerText = phone.selfieCamera;

    const internalRamParagraph = document.createElement("p");
    internalRamParagraph.innerText = phone.internalRam;

    const batteryTypeParagraph = document.createElement("p");
    batteryTypeParagraph.innerText = phone.batteryType;

    const priceEurParagraph = document.createElement("p");
    priceEurParagraph.innerText = `${phone.priceEur} \u20AC`;

    const paragraphsTextDiv = document.createElement("div");
    paragraphsTextDiv.classList.add("description-box");

    const brandTextParagraph = document.createElement("p");
    brandTextParagraph.innerText = "Brand:";

    const nameTextParagraph = document.createElement("p");
    nameTextParagraph.innerText = "Model:";

    const launchDateTextParagraph = document.createElement("p");
    launchDateTextParagraph.innerText = "Announced:";

    const platformOsTextParagraph = document.createElement("p");
    platformOsTextParagraph.innerText = "OS:";

    const selfieCameraTextParagraph = document.createElement("p");
    selfieCameraTextParagraph.innerText = "Selfie Camera:";

    const internalRamTextParagraph = document.createElement("p");
    internalRamTextParagraph.innerText = "Internal Ram:";

    const batteryTypeTextParagraph = document.createElement("p");
    batteryTypeTextParagraph.innerText = "Battery Type:";

    const priceEurTextParagraph = document.createElement("p");
    priceEurTextParagraph.innerText = "Price:";

    const techSpecLinkA = document.createElement("a");
    techSpecLinkA.innerText = "MORE INFO";
    techSpecLinkA.href = phone.techSpecLink;
    techSpecLinkA.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn");
    removeButton.innerText = "Remove card";

    cardsContainer.append(cardDiv);
    cardDiv.append(imagesDiv, mainParagraphsDiv, techSpecLinkA, removeButton);
    imagesDiv.append(imgUrl);
    mainParagraphsDiv.append(paragraphsTextDiv, paragraphsDiv);
    paragraphsTextDiv.append(
      brandTextParagraph,
      nameTextParagraph,
      launchDateTextParagraph,
      platformOsTextParagraph,
      selfieCameraTextParagraph,
      internalRamTextParagraph,
      batteryTypeTextParagraph,
      priceEurTextParagraph
    );
    paragraphsDiv.append(
      brandParagraph,
      nameParagraph,
      launchDateParagraph,
      platformOsParagraph,
      selfieCameraParagraph,
      internalRamParagraph,
      batteryTypeParagraph,
      priceEurParagraph
    );
  });
};

export { renderCards };
