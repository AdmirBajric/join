const activePage = () => {
  let currentPageUrl = window.location.href;

  let lastSlashIndex = currentPageUrl.lastIndexOf("/");

  let word = currentPageUrl.substring(
    lastSlashIndex + 1,
    currentPageUrl.length - 5
  );

  if (word !== "help") {
    selectActive();
    const findClass = document.querySelectorAll(`.${word}-sidebar`);

    findClass.forEach((c) => {
      c.classList.add("sidebarBtnActive");
    });
  } else {
    selectActive();
  }
};

setTimeout(() => {
  activePage();
}, 400);

const selectActive = () => {
  const sideBarDesktop = document.querySelector(".side-around");
  const sideBarDesktopActive =
    sideBarDesktop.querySelectorAll(".sidebarBtnActive");
  sideBarDesktopActive.forEach((a) => a.classList.remove("sidebarBtnActive"));

  const sideBarMobile = document.querySelector(".side-container_m");
  const sideBarMobileActive =
    sideBarMobile.querySelectorAll(".sidebarBtnActive");
  sideBarMobileActive.forEach((b) => b.classList.remove("sidebarBtnActive"));
};
