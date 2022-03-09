import {
	ChangeDetectionStrategy, ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import {
	faAngleDoubleUp,
	faEllipsisH,
	faPrint
} from '@fortawesome/free-solid-svg-icons';
import {LayoutService} from '../../service/layout.service';
import {
	RoutingService
} from '../../service/routing.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-options-widget',
	templateUrl: './options-widget.component.html',
	styleUrls: ['./options-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsWidgetComponent implements OnInit {
	faEllipsisH = faEllipsisH;
	faAngleDoubleUp = faAngleDoubleUp;
	faPrint = faPrint;
	isOptionsOpen = false;
	url = this._router.url;
	private _path$ = this._routingService.getPath$();
	private _subscription!: Subscription;

	constructor(
		private _layoutService: LayoutService,
		private _routingService: RoutingService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
	}

	toggleOptionsOpen() {
		this.isOptionsOpen = !this.isOptionsOpen;
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
		this.toggleOptionsOpen();
	}

	ngOnInit(): void {
		this._subscription = this._path$.subscribe((path) => {
			this.url = path || this.url;
			this._cdr.detectChanges();
		});
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

}
