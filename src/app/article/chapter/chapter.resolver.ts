import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const chapterResolver: ResolveFn<string> = (route, state) => {
    const key = state.url.split('/book/')[1].split('?')[0].split('#')[0].replace('/', '');
    return of(key);
};
