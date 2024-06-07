export class HashtagColor {
    constructor(private colors: IStorage['colors'], private domManager: IDomManager) {}

    public init() {
        for (const node of document.querySelectorAll('.innerContentContainer')) {
            this.paintColorHashtagLine(node as HTMLElement);
        }

        this.domManager.subscribeToContentChanges(this.paintColorHashtagLine);
    }

    private paintColorHashtagLine = (node: HTMLElement) => {
        if (node.matches('.innerContentContainer')) {
            const tags = node.querySelectorAll<HTMLElement>('.contentTag');

            for (const tag of tags) {
                const color = this.colors.find((c) => `#${c.hashtag}` === tag.innerText);

                if (color) {
                    node.style.color = color.color;
                    node.style.background = color.background;
                }
            }
        }
    };
}
