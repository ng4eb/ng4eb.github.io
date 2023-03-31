import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { chapterListing } from '../shared/chapter-listing-service/chapter-listing';
import { LayoutService } from '../layout/layout.service';
import { tocChapterDescription } from './toc-chapter-description';

@Component({
    selector: 'app-toc',
    templateUrl: './toc.component.html',
    styleUrls: ['./toc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TocComponent {
    faAngleLeft = faAngleLeft;
    chapterListing = chapterListing;
    chapterDesc = tocChapterDescription;

    constructor(private _layoutService: LayoutService) {}

    scrollToTop() {
        this._layoutService.scrollToTop(false);
    }

    onClickHashTagLink(hash: string) {
        this._layoutService.onClickHashTagLink(hash);
    }
}
