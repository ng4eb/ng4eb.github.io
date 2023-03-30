import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {LayoutService} from '../../services/layout.service';

@Component({
	selector: 'app-theme-switch',
	templateUrl: './theme-switch.component.html',
	styleUrls: ['./theme-switch.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchComponent implements OnInit {
	faSun = faSun;
	faMoon = faMoon;
	isDarkTheme? = this._layoutService.getIsDarkTheme$();

	constructor(private _layoutService: LayoutService) {
	}

	toggleTheme() {
		this._layoutService.toggleTheme();
	}

	ngOnInit(): void {
	}

}
