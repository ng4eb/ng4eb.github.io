import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import {
	faAngleDoubleUp,
	faEllipsisH,
	faPrint
} from '@fortawesome/free-solid-svg-icons';
import {LayoutService} from '../../service/layout.service';

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

	constructor(private _layoutService: LayoutService) {
	}

	toggleOptionsOpen() {
		this.isOptionsOpen = !this.isOptionsOpen;
	}

	scrollToTop() {
		this._layoutService.scrollToTop();
		this.toggleOptionsOpen();
	}

	printThisPage() {
		// TODO
		this.toggleOptionsOpen();
	}

	ngOnInit(): void {
	}

}
