import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RoutingService {
	private _path = new BehaviorSubject('');

	constructor() {
	}

	updatePath(path: string) {
		this._path.next(path);
	}

	getPath(): Observable<string> {
		return this._path;
	}

}
