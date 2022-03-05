import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {LayoutService} from './service/layout.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	constructor(private _layoutService: LayoutService) {
	}

	ngOnInit() {
		this._layoutService.getIsDarkTheme$().subscribe((bool) => {
			document.body.setAttribute('data-theme', bool ? 'dark' : 'light');
		});
	}
}
