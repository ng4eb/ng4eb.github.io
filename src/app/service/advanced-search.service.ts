import { Injectable } from '@angular/core';
import {ch1P1Markdown} from '../article/ch1-p1/ch1-p1.markdown';
import {ch1P2Markdown} from '../article/ch1-p2/ch1-p2.markdown';
import {ch2P1Markdown} from '../article/ch2-p1/ch2-p1.markdown';
import {ch2P2Markdown} from '../article/ch2-p2/ch2-p2.markdown';
import {ch2P3Markdown} from '../article/ch2-p3/ch2-p3.markdown';
import {ch3P1Markdown} from '../article/ch3-p1/ch3-p1.markdown';
import {ch3P2Markdown} from '../article/ch3-p2/ch3-p2.markdown';
import {ch3P3Markdown} from '../article/ch3-p3/ch3-p3.markdown';
import {
  ChapterListingService
} from './chapter-listing.service';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  private _markdowns = {
    ch1p1: ch1P1Markdown,
    ch1p2: ch1P2Markdown,
    ch2p1: ch2P1Markdown,
    ch2p2: ch2P2Markdown,
    ch2p3: ch2P3Markdown,
    ch3p1: ch3P1Markdown,
    ch3p2: ch3P2Markdown,
    ch3p3: ch3P3Markdown
  };

  private _listing = this._chapterListingService.getListing();

  constructor(private _chapterListingService: ChapterListingService) { }

  private _search(query: string, max?: number) {
    const resultKeys: mdKey[] = [];
    const results: any[] = [];
    type mdKey = keyof typeof this._markdowns;
    const keys = Object.keys(this._markdowns) as mdKey[];
    for (let i = 0; i < keys.length; i++) {
      if (max != undefined && max <= 0) break;
      if (this._markdowns[keys[i]].toLowerCase().includes(query)) {
        resultKeys.push(keys[i]);
        max != undefined && max--;
      }
    }
    resultKeys.forEach((key) => {
      const preIndices = key.replace('ch', '').replace('p', '').split('');
      const indices = [];
      indices.push(parseInt(preIndices[0]) - 1);
      indices.push(parseInt(preIndices[1]) - 1);
      results.push({
        title: `Ch${preIndices[0]} - P${preIndices[1]} - ${this._listing[indices[0]].parts[indices[1]].title}`,
        content: this._markdowns[key].substring(0, max == undefined ? 300 : 100).replace(/\n/g, ' ').replace(/#/g, '').trim() + '...',
        url: `/book/ch${preIndices[0]}/p${preIndices[1]}`
      })
    })
    return results;
  }

  quickSearch(query: string) {
    return this._search(query, 3);
  }

  fullSearch(query: string) {
    return this._search(query);
  }
}
