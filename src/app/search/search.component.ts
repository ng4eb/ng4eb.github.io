import {
	ChangeDetectionStrategy, ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs';
import {
	AdvancedSearchService
} from '../service/advanced-search.service';

import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {LayoutService} from '../service/layout.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
	faAngleLeft = faAngleLeft;
	query = '';
	searchResults: {title: string, content: string, url: string}[] = [];

	constructor(
		private _route: ActivatedRoute,
		private _advancedSearchService: AdvancedSearchService,
		private _layoutService: LayoutService,
		private _cdr: ChangeDetectorRef
	) {
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
	}

	ngOnInit(): void {
		this._route.queryParams
			.pipe(
				filter(params => params['query']),
				map(params => params['query'])
			)
			.subscribe(query => {
					this.query = query;
					this.searchResults = this._advancedSearchService.fullSearch(this.query);
					this._cdr.detectChanges();
				}
			);
	}

}
