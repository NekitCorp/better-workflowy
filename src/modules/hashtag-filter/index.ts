export class HashtagFilter {
    constructor(private filters: IStorage['filters'], private hotkeysManager: IHotkeysManager) {}

    init() {
        for (const filter of this.filters) {
            this.hotkeysManager.setHotKey(`${filter.specialKey}+${filter.key}`, () => {
                const hashRoute = location.hash.split('?q=')[0];

                if (filter.hashtags) {
                    location.hash =
                        hashRoute +
                        '?q=' +
                        filter.hashtags.split(' ').reduce((acc, val) => `${acc}#${val} `, '');
                } else {
                    location.hash = hashRoute;
                }
            });
        }
    }
}
