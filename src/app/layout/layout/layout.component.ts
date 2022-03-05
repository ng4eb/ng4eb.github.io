import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {LayoutService} from '../../service/layout.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
	isSidebarOpen$ = this._layoutService.getIsSidebarOpen$();
	isOverlayOpen$ = this._layoutService.getIsOverlayOpen$();
	isAdvancedSearchOpen$ = this._layoutService.getIsAdvacnedSearchOpen$();

	constructor(private _layoutService: LayoutService) {
	}

	closeOverlay() {
		this._layoutService.setIsAdvancedSearchOpen(false);
	}

	ngOnInit(): void {
	}

}
