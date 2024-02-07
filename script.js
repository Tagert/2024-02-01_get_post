"use strict";

import { userLogin } from "./src/user-login.js";
import { renderCards } from "./src/render-cards.js";

const cardsContainer = document.querySelector(".cards-container");
const foundedItems = document.getElementById("foundItems");
const sortSelectElement = document.getElementById("sort");
const brandSelectElement = document.getElementById("brand");
const loginCard = document.querySelector(".login-card");

const loginWrapper = document.getElementById("loginWrapper");
const loginButtonInfo = document.querySelector(".btn-info");
const loginButton = document.getElementById("btn");

let phonesData = [];

// const renderCards = (phonesArray) => {
//   cardsContainer.innerHTML = "";

//   phonesArray.forEach((phone) => {
//     const phoneId = phone.id;

//     const cardDiv = document.createElement("div");
//     cardDiv.classList.add("phone-card");
//     cardDiv.dataset.phoneId = phoneId;

//     cardDiv.addEventListener("mouseenter", () => {
//       techSpecLinkA.style.display = "block";
//       removeButton.style.display = "flex";
//     });

//     cardDiv.addEventListener("mouseleave", () => {
//       techSpecLinkA.style.display = "none";
//       removeButton.style.display = "none";
//     });

//     const imagesDiv = document.createElement("div");
//     imagesDiv.classList.add("images-box");

//     const imgUrl = document.createElement("img");
//     imgUrl.src = phone.imgUrl;

//     const mainParagraphsDiv = document.createElement("div");
//     mainParagraphsDiv.classList.add("main-box");

//     const paragraphsDiv = document.createElement("div");
//     paragraphsDiv.classList.add("specification-box");

//     const brandParagraph = document.createElement("p");
//     brandParagraph.innerText = phone.brand;

//     const nameParagraph = document.createElement("p");
//     nameParagraph.innerText = phone.name;

//     const launchDateParagraph = document.createElement("p");
//     launchDateParagraph.innerText = phone.launchDate;

//     const platformOsParagraph = document.createElement("p");
//     platformOsParagraph.innerText = phone.platformOs;

//     const selfieCameraParagraph = document.createElement("p");
//     selfieCameraParagraph.innerText = phone.selfieCamera;

//     const internalRamParagraph = document.createElement("p");
//     internalRamParagraph.innerText = phone.internalRam;

//     const batteryTypeParagraph = document.createElement("p");
//     batteryTypeParagraph.innerText = phone.batteryType;

//     const priceEurParagraph = document.createElement("p");
//     priceEurParagraph.innerText = `${phone.priceEur} \u20AC`;

//     const paragraphsTextDiv = document.createElement("div");
//     paragraphsTextDiv.classList.add("description-box");

//     const brandTextParagraph = document.createElement("p");
//     brandTextParagraph.innerText = "Brand:";

//     const nameTextParagraph = document.createElement("p");
//     nameTextParagraph.innerText = "Model:";

//     const launchDateTextParagraph = document.createElement("p");
//     launchDateTextParagraph.innerText = "Announced:";

//     const platformOsTextParagraph = document.createElement("p");
//     platformOsTextParagraph.innerText = "OS:";

//     const selfieCameraTextParagraph = document.createElement("p");
//     selfieCameraTextParagraph.innerText = "Selfie Camera:";

//     const internalRamTextParagraph = document.createElement("p");
//     internalRamTextParagraph.innerText = "Internal Ram:";

//     const batteryTypeTextParagraph = document.createElement("p");
//     batteryTypeTextParagraph.innerText = "Battery Type:";

//     const priceEurTextParagraph = document.createElement("p");
//     priceEurTextParagraph.innerText = "Price:";

//     const techSpecLinkA = document.createElement("a");
//     techSpecLinkA.innerText = "MORE INFO";
//     techSpecLinkA.href = phone.techSpecLink;
//     techSpecLinkA.target = "_blank";

//     const removeButton = document.createElement("button");
//     removeButton.setAttribute("class", "btn");
//     removeButton.innerText = "Remove card";

//     cardsContainer.append(cardDiv);
//     cardDiv.append(imagesDiv, mainParagraphsDiv, techSpecLinkA, removeButton);
//     imagesDiv.append(imgUrl);
//     mainParagraphsDiv.append(paragraphsTextDiv, paragraphsDiv);
//     paragraphsTextDiv.append(
//       brandTextParagraph,
//       nameTextParagraph,
//       launchDateTextParagraph,
//       platformOsTextParagraph,
//       selfieCameraTextParagraph,
//       internalRamTextParagraph,
//       batteryTypeTextParagraph,
//       priceEurTextParagraph
//     );
//     paragraphsDiv.append(
//       brandParagraph,
//       nameParagraph,
//       launchDateParagraph,
//       platformOsParagraph,
//       selfieCameraParagraph,
//       internalRamParagraph,
//       batteryTypeParagraph,
//       priceEurParagraph
//     );
//   });
// };

const fetchApi = async () => {
  try {
    const res = await fetch(
      "https://65bb606a52189914b5bbe878.mockapi.io/phones"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }
    const phones = await res.json();
    phones.sort((a, b) => (a.brand > b.brand ? 1 : -1));
    foundedItems.innerText = phones.length;
    phonesData = phones;
    return phones;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const deleteAndRefresh = async (phoneId) => {
  try {
    const res = await fetch(
      `https://65bb606a52189914b5bbe878.mockapi.io/phones/${phoneId}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to delete phone with id ${phoneId}. Status code: ${res.status}`
      );
    }

    console.log(`Phone with id ${phoneId} has been deleted.`);
    await initPage();
  } catch (error) {
    console.error(error);
  }
};

const initPage = async () => {
  const phones = await fetchApi();
  renderCards(phones);
};

const filterAndRender = async (selectedBrand, selectedSortOption) => {
  let filteredPhonesArray = [...phonesData];

  if (selectedBrand !== "All") {
    filteredPhonesArray = filteredPhonesArray.filter(
      (phone) => phone.brand === selectedBrand
    );
  }

  const sortingFunction = sortFunctions[selectedSortOption] || ((a, b) => 0);
  const sortedPhonesArray = filteredPhonesArray.sort(sortingFunction);

  renderCards(sortedPhonesArray);

  foundedItems.innerText = sortedPhonesArray.length;
};

const sortFunctions = {
  sortName: (a, b) => a.brand.localeCompare(b.brand),
  sortPriceDes: (a, b) => b.priceEur - a.priceEur,
  sortPriceAs: (a, b) => a.priceEur - b.priceEur,
};

brandSelectElement.addEventListener("change", async () => {
  const selectedBrand = brandSelectElement.value;
  const selectedSortOption = sortSelectElement.value;
  await filterAndRender(selectedBrand, selectedSortOption);
});

sortSelectElement.addEventListener("change", async () => {
  const selectedBrand = brandSelectElement.value;
  const selectedSortOption = sortSelectElement.value;
  await filterAndRender(selectedBrand, selectedSortOption);
});

cardsContainer.addEventListener("click", async (event) => {
  const removeButton = event.target.closest(".btn");
  if (removeButton) {
    const cardDiv = removeButton.closest(".phone-card");
    const phoneId = cardDiv.dataset.phoneId;
    await deleteAndRefresh(phoneId);
  }
});

loginWrapper.addEventListener("click", () => {
  loginCard.classList.toggle("active-login-card");
});

// const userLogin = () => {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const passwordRegex = /^.{6,}$/;

//   const userName = document.getElementById("userName");
//   const password = document.getElementById("password");
//   const userNameValue = document.getElementById("userName").value;
//   const passwordValue = document.getElementById("password").value;
//   const errorElement = document.querySelector(".error");
//   const userNameInfo = document.querySelector(".username-info");
//   const passwordInfo = document.querySelector(".password-info");
//   const loginCard = document.querySelector(".login-card");

//   const isValidEmail = emailRegex.test(userNameValue);
//   const isValidPassword = passwordRegex.test(passwordValue);

//   const resetLoginWindow = () => {
//     loginCard.classList.remove("active-login-card");
//     userName.setAttribute("style", "border: 0.1rem solid black;");
//     password.setAttribute("style", "border: 0.1rem solid black;");
//     errorElement.textContent = "";
//     userName.value = "";
//     password.value = "";
//     userNameInfo.textContent = "";
//     passwordInfo.textContent = "";
//   };

//   if (isValidEmail && isValidPassword) {
//     localStorage.setItem("userName", userNameValue);
//     errorElement.textContent = "Login was successful.";
//     errorElement.style.color = "green";
//     setTimeout(resetLoginWindow, 2000);
//   } else {
//     errorElement.textContent = "";
//   }

//   if (userNameValue === "") {
//     userNameInfo.textContent = "Please enter an email.";
//     userNameInfo.style.color = "brown";
//   } else if (!isValidEmail) {
//     userNameInfo.textContent = "Please provide a properly formatted email.";
//     userNameInfo.style.color = "brown";
//   } else {
//     userName.setAttribute("style", "border: 0.1rem solid green;");
//     userNameInfo.textContent = "";
//   }

//   if (passwordValue === "") {
//     passwordInfo.textContent = "Please enter a password.";
//     passwordInfo.style.color = "brown";
//   } else if (!isValidPassword) {
//     passwordInfo.textContent = "Password must be at least 6 characters";
//     passwordInfo.style.color = "brown";
//   } else {
//     password.setAttribute("style", "border: 0.1rem solid green;");
//     passwordInfo.textContent = "";
//   }
// };

loginButton.addEventListener("click", userLogin);

initPage();
