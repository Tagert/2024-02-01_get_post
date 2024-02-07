"use script";

const cardsContainer = document.querySelector(".cards-container");
const foundedItems = document.getElementById("foundItems");
const sortSelectElement = document.getElementById("sort");
const brandSelectElement = document.getElementById("brand");
const loginCard = document.querySelector(".login-card");

const loginWrapper = document.getElementById("loginWrapper");
const loginButtonInfo = document.querySelector(".btn-info");
const loginButton = document.getElementById("btn");

let phonesData = [];

export {
  cardsContainer,
  foundedItems,
  sortSelectElement,
  brandSelectElement,
  loginCard,
  loginWrapper,
  loginButtonInfo,
  loginButton,
  phonesData,
};
