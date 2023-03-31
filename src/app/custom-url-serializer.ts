import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: string): UrlTree {
        const dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }

    serialize(tree: UrlTree) {
        const dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        return path.replace(/%23/g, '#');
    }
}
