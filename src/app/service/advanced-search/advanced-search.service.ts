import {Injectable} from '@angular/core';
import {
	ChapterListingService
} from '../chapter-listing/chapter-listing.service';
import {markdowns, mdKey} from './markdowns';

@Injectable({
	providedIn: 'root'
})
export class AdvancedSearchService {

	private _markdowns = markdowns;

	private _listing = this._chapterListingService.getListing();

	constructor(private _chapterListingService: ChapterListingService) {
	}

	quickSearch(query: string) {
		return this._search(query, 3);
	}

	fullSearch(query: string) {
		return this._search(query);
	}

	private _search(query: string, max?: number) {
		const resultKeys: mdKey[] = [];
		const results: any[] = [];
		const keys = Object.keys(this._markdowns) as mdKey[];
		for (let i = 0; i < keys.length; i++) {
			if (max != undefined && max <= 0) break;
			if (this._markdowns[keys[i]].toLowerCase().includes(query)) {
				resultKeys.push(keys[i]);
				max != undefined && max--;
			}
		}
		resultKeys.forEach((key) => {
			const preIndices = key.toLowerCase().replace('ch', '').replace('p', '').split('');
			const indices = [];
			indices.push(parseInt(preIndices[0]) - 1);
			indices.push(parseInt(preIndices[1]) - 1);
			results.push({
				title: `Ch${preIndices[0]} - P${preIndices[1]} - ${this._listing[indices[0]].parts[indices[1]].title}`,
				content: this._markdowns[key].substring(0, max == undefined ? 300 : 100).replace(/\n/g, ' ').replace(/#/g, '').trim() + '...',
				url: `/book/ch${preIndices[0]}/p${preIndices[1]}`
			})
		})
		return results;
	}
}
