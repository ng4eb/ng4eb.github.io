import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {LayoutService} from './service/layout.service';
import {NavigationStart, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {RoutingService} from './service/routing.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	constructor(
		private _layoutService: LayoutService,
		private _routingService: RoutingService,
		private _router: Router
	) {
	}

	ngOnInit() {
		this._layoutService.getIsDarkTheme$().subscribe((bool) => {
			document.body.setAttribute('data-theme', bool ? 'dark' : 'light');
		});
		this._router.events.pipe(
			filter(events => events instanceof NavigationStart),
			map(events => events as NavigationStart),
			map(events => events.url)
		).subscribe({
			next: (url) => {
				this._routingService.updatePath(url);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}
}
