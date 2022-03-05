import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'app-faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}

}
