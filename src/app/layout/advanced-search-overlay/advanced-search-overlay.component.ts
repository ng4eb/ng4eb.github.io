import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {LayoutService} from '../../service/layout.service';

@Component({
  selector: 'app-advanced-search-overlay',
  templateUrl: './advanced-search-overlay.component.html',
  styleUrls: ['./advanced-search-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedSearchOverlayComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // if esc is pressed
    if(event.keyCode == 27){
      this._layoutService.setIsAdvancedSearchOpen(false);
    }
  }
  faSearch = faSearch

  constructor(private _layoutService: LayoutService) { }

  ngOnInit(): void {
  }

}
