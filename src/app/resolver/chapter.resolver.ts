import {Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {mdKey} from '../article/markdowns';

@Injectable({
	providedIn: 'root'
})
export class ChapterResolver implements Resolve<mdKey> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<mdKey> {
		const key = state.url.split('/book/')[1].split('?')[0].split('#')[0].replace('/','');
		return of(key as mdKey);
	}
}
