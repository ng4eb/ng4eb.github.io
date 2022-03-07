import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
	ChapterListingService
} from '../../service/chapter-listing.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
	faSearch = faSearch;
	isMenuOpen$ = new BehaviorSubject(false);
	chapterListing = this._chapterListingService.getListing();

	constructor(private _chapterListingService: ChapterListingService) {
	}

	toggleMenuOpen() {
		this.isMenuOpen$.next(!this.isMenuOpen$.value);
	}

	onClickHashTagLink(hash: string) {
		this._chapterListingService.onClickHashTagLink(hash);
		this.toggleMenuOpen();
	}

	ngOnInit(): void {
	}

}
