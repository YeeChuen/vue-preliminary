const pagesKey = "pages";

let pagesJson = localStorage.getItem(pagesKey);
let pagesStore = JSON.parse(pagesJson);

const init = function () {
  if (pagesStore === null || pagesStore === "") {
    localStorage.setItem(pagesKey, JSON.stringify([]));
  }
  pagesJson = localStorage.getItem(pagesKey);
  pagesStore = JSON.parse(pagesJson);
};

function save() {
  localStorage.setItem(pagesKey, JSON.stringify(pagesStore));
}

export default {
  getAllPages() {
    init();
    return pagesStore;
  },
  getAllPublishedPages() {
    init();
    return pagesStore.filter((page) => {
      return page.publish});
  },
  getPageById(pageId) {
    return pagesStore.find((page) => page.id === parseInt(pageId));
  },
  createPage(newPage) {
    newPage.link = newPage.link.replaceAll(" ", "-");
    newPage.content = newPage.content.split("\n");
    pagesStore = [newPage, ...pagesStore];
    save();
  },
  updatePage(updatedPage, pageId) {
    updatedPage.link = updatedPage.link.replaceAll(" ", "-");
    updatedPage.content = updatedPage.content.split("\n");
    pagesStore = pagesStore.map((page) => {
      if (page.id === pageId) {
        return { ...updatedPage };
      } else {
        return page;
      }
    });
    save();
  },
  deletePage(pageId) {
    pagesStore = pagesStore.filter((page) => {
      return page.id !== pageId;
    });
    save();
  },
};
