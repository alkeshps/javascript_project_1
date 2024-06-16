// Varibale declaration
let inputField = document.getElementById("brandinput");
let addBtn = document.getElementById("btn");
let addedList = document.getElementById("brandlist");
let inputData;
let inputDataArray = [];
// create set data to local storage function
function setLocalStorage() {
  localStorage.setItem("brandnames", JSON.stringify(inputDataArray));
}

// create get data from local storage function
function getLocalStorage() {
  if (localStorage.getItem("brandnames")) {
    inputDataArray = JSON.parse(localStorage.getItem("brandnames"));
    buildUi();
  }
}

// create buid ui function
function buildUi() {
  addedList.textContent = "";
  inputDataArray.forEach((item) => {
    // create DOM li
    let li = document.createElement("li");
    let spanEl = document.createElement("span");
    li.appendChild(spanEl);
    li.style.cssText =
      "width: 300px; background-color: #CCCCFF; align-items: center; padding: 16px; border-radius: 8px; margin-bottom: 16px; animation : 0.5s ease-in-out; animation-name : slideIn; display: flex; justify-content: space-between;";
    spanEl.innerText = item;
    addedList.appendChild(li);
    inputField.value = "";
    inputField.focus();

    // Create edit button
    let editBtn = document.createElement("img");
    editBtn.classList.add("edit");
    editBtn.style.cssText =
      "width: 32px; padding: 8px;  margin-left: auto; margin-right: 8px;";

    editBtn.addEventListener("mouseenter", function () {
      editBtn.style.cssText =
        "background-color: #FFFFFF; width: 32px; padding: 8px; border-radius: 48%; margin-left: auto; margin-right: 8px;";
    });

    editBtn.addEventListener("mouseleave", function () {
      editBtn.style.cssText =
        "background-color: #CCCCFF; width: 32px; padding: 8px; margin-left: auto; margin-right: 8px; ";
    });

    editBtn.src = "/Images/editbtn.svg";
    li.appendChild(editBtn);

    // Create Remove button
    let removeBtn = document.createElement("img");
    removeBtn.classList.add("remove");

    removeBtn.style.cssText = "width: 32px; padding: 8px; border-radius: 100%;";

    removeBtn.addEventListener("mouseenter", function () {
      removeBtn.style.cssText =
        "background-color: #FFFFFF; width: 32px; padding: 8px; border-radius: 100%;";
    });

    removeBtn.addEventListener("mouseleave", function () {
      removeBtn.style.cssText =
        "background-color: #CCCCFF; width: 32px; padding: 8px; border-radius: 100%;";
    });

    removeBtn.src = "/Images/removebtn.svg";
    li.appendChild(removeBtn);
  });
}

// create removeBrandList function
function removeBrandList(event) {
  if (event.target.classList[0] === "remove") {
    let item = event.target.parentElement;
    item.classList.add("slideOut");
    item.addEventListener("transitionend", function () {
      item.remove();
    });
  }
}

// create editBrandList function
function editBrandList(event) {
  if (event.target.classList[0] == "edit") {
    let editValue = prompt("Edit Brand Name");
    let item = event.target.parentElement;
    let spanEl = item.querySelector("span");
    spanEl.innerText = editValue;
  }
}

// create addBrandList function
function addBrandList() {
  inputData = inputField.value;

  inputDataArray.push(inputData);

  // set data to localStorage
  setLocalStorage();

  // get data from localStorage
  getLocalStorage();
}

// ADD - button event listener
addBtn.addEventListener("click", addBrandList);

// ADD - Enter Key event listener
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBrandList();
  }
});

// REMOVE - event listener
addedList.addEventListener("click", removeBrandList);

// EDIT - event listener
addedList.addEventListener("click", editBrandList);

getLocalStorage();
