export class HashtagColor {
    constructor(private colors: IStorage['colors'], private domManager: IDomManager) {}

    public init() {
        this.domManager.subscribe(this.paintColorHashtagLine);
    }

    private paintColorHashtagLine = (container: HTMLElement) => {
        const tags = container.querySelectorAll<HTMLElement>('.contentTag');

        for (const tag of tags) {
            const color = this.colors.find((c) => `#${c.hashtag}` === tag.innerText);

            if (color) {
                container.style.color = color.color;
                container.style.background = color.background;
            }
        }
    };
}
