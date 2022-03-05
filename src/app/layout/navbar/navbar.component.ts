import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
	faSearch = faSearch;
	isMenuOpen$ = new BehaviorSubject(false);

	constructor() {
	}

	toggleMenuOpen() {
		this.isMenuOpen$.next(!this.isMenuOpen$.value);
	}

	ngOnInit(): void {
	}

}
