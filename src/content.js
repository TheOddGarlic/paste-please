import { get } from "./plugins/functions/storage";
let triesLeft = 10;

updateImages();
const interval = setInterval(updateImages, 1500);

async function updateImages() {
  if (triesLeft >= 0) {
    let { options } = await get("options");

    if (options.extensionEnabled) {
      for (let i in document.querySelectorAll("a")) {
        let link = document.querySelectorAll("a")[i];

        if (
          link?.attributes?.href?.textContent.includes("pastebin.com") &&
          new URL(link?.attributes?.href?.textContent).hostname == "pastebin.com"
        ) {
          link.attributes.href.textContent = link.attributes.href.textContent.replace("pastebin.com", "pastebinp.com");
        }
      }
      chrome.storage.sync.set({
        stats: {
          latestUnblock: Date.now()
        }
      });
      triesLeft--;
    }
  } else clearInterval(interval);
}
