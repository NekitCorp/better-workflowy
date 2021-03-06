import type { IStorage } from '../common/storage';

export function paintColorHashtagLine(container: HTMLElement, colors: IStorage['colors']) {
    const tags = document.querySelectorAll<HTMLElement>('.contentTag');

    for (const tag of tags) {
        const color = colors.find((c) => `#${c.hashtag}` === tag.innerText);

        if (color) {
            container.style.color = color.color;
            container.style.background = color.background;
        }
    }
}
