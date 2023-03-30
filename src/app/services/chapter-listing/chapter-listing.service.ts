import {Injectable} from '@angular/core';
import {
	IsPlatformBrowserService
} from '../is-platform-browser.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {chapterListing} from './chapter-listing';

export type navigationPart = {
	title: string;
	path: string;
	index: number | null
}

@Injectable({
	providedIn: 'root'
})
export class ChapterListingService {
	private readonly _chapterListing = chapterListing;

	private _currentPosition$ = new BehaviorSubject(0);
	private _toExpand$ = new Subject<number>();

	constructor(private _isPlatformBrowserService: IsPlatformBrowserService) {
	}

	getListing() {
		return this._chapterListing;
	}

	getFilteredListing(filterQuery: string) {
		filterQuery = filterQuery.toLowerCase();
		return this._chapterListing.filter(chapter => (
			chapter.title.toLowerCase().includes(filterQuery)
			||
			chapter.parts.some(part => (
				part.title.toLowerCase().includes(filterQuery)
				||
				part.sections?.some(section => (
					section.toLowerCase().includes(filterQuery)
				))
			))
		))
	}

	getNavigation(path: string) {
		const pathArray = path.replace('/book/ch', '')
			.replace('/p', '')
			.split('#')[0]
			.split('')
			.map(s => parseInt(s));
		const currChapter = this._chapterListing[pathArray[0] - 1];
		const currPart = currChapter.parts[pathArray[1] - 1];

		const prev: navigationPart = {
			title: '',
			path: '',
			index: null
		};
		const next: navigationPart = {
			title: '',
			path: '',
			index: null
		};
		// parsing next
		if (currChapter.parts.length > pathArray[1]) {
			next.title = `Ch${pathArray[0]} - P${pathArray[1] + 1} - ${currChapter.parts[pathArray[1]].title}`;
			next.path = `/book/ch${pathArray[0]}/p${pathArray[1] + 1}`
		} else if (this._chapterListing.length > pathArray[0]) {
			next.title = `Ch${pathArray[0] + 1} - P1 - ${this._chapterListing[pathArray[0]].parts[0].title}`;
			next.path = `/book/ch${pathArray[0] + 1}/p1`
			next.index = pathArray[0];
		}
		// parsing prev
		if (1 < pathArray[1]) {
			prev.title = `Ch${pathArray[0]} - P${pathArray[1] - 1} - ${currChapter.parts[pathArray[1] - 2].title}`;
			prev.path = `/book/ch${pathArray[0]}/p${pathArray[1] - 1}`
		} else if (1 < pathArray[0]) {
			const prevChapter = this._chapterListing[pathArray[0] - 2];
			prev.title = `Ch${pathArray[0] - 1} - P${prevChapter.parts.length} - ${this._chapterListing[pathArray[0] - 2].parts[prevChapter.parts.length - 1].title}`;
			prev.path = `/book/ch${pathArray[0] - 1}/p${prevChapter.parts.length}`
			prev.index = pathArray[0] - 2;
		}
		return {
			title: `Ch${pathArray[0]}-P${pathArray[1]} - ${currPart.title}`,
			prev,
			next
		}
	}

	getCurrentPosition$(): Observable<number> {
		return this._currentPosition$;
	}

	setCurrentPosition(index: number) {
		this._currentPosition$.next(index);
	}

	getToExpand$(): Observable<number> {
		return this._toExpand$;
	}

	setToExpand(index: number): void {
		this._toExpand$.next(index);
	}
}
