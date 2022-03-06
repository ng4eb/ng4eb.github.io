import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {LayoutService} from '../service/layout.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	isDarkTheme$ = this._layoutService.getIsDarkTheme$();

	constructor(private _layoutService: LayoutService) {
	}

	ngOnInit(): void {
	}

}
