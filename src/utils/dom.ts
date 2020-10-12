// <span class="contentTag" title="Filter #text">
//     #
//     <span class="contentTagText">text</span>
//     <span class="contentTagNub" />
// </span>
export function createHashtag(text: string) {
    const container = document.createElement("span");
    container.className = "contentTag";
    container.title = `Filter #${text}`;
    container.append("#");

    const contentTagText = document.createElement("span");
    contentTagText.className = "contentTagText";
    contentTagText.append(text);

    const contentTagNub = document.createElement("span");
    contentTagNub.className = "contentTagNub";

    container.append(contentTagText);
    container.append(contentTagText);

    return container;
}
