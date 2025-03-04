document.addEventListener("DOMContentLoaded", () => {
  const itemList = document.querySelector(".itemList");
  const buttons = document.querySelectorAll("button");

  let menuData = [];

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("📌 데이터 로드 확인:", data);
      menuData = data.menu;
      displayItems(menuData);
    })
    .catch((error) => console.error("🚨 데이터 로드 오류:", error));

  function displayItems(items) {
    itemList.innerHTML = items
      .map(
        (item) => `
      <li class="item">
        <img src="${item.img}" alt="${item.name}" />
        <div class="itemInfo">
          <div class="itemPrice">
            <p>${item.name}</p>
            <p class="itemPr">${item.price}원</p>
          </div>
          <p>${item.text}</p>
        </div>
      </li>
    `
      )
      .join("");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.textContent;

      if (category === "All") {
        displayItems(menuData);
      } else {
        const filteredItems = menuData.filter((item) => item.tag === category);
        displayItems(filteredItems);
      }
    });
  });
});
