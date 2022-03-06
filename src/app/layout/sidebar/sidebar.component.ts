import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {LayoutService} from '../../service/layout.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
	ChapterListingService
} from '../../service/chapter-listing.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
	faSearch = faSearch;
	isSidebarOpen$ = this._layoutService.getIsSidebarOpen$();
	chapterListing = this._chapterListingService.getListing();

	constructor(
		private _layoutService: LayoutService,
		private _chapterListingService: ChapterListingService
	) {
	}

	toggleSidebar() {
		this._layoutService.toggleSidebarOpen();
	}

	openAdvancedSearch() {
		this._layoutService.setIsAdvancedSearchOpen(true);
	}

	ngOnInit(): void {
	}

}
