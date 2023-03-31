import { Injectable } from '@angular/core';
import { ChapterListingService } from '../shared/chapter-listing-service/chapter-listing.service';
import { articleKey } from '../article/chapter/seo';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { chapters } from '../article/chapter/chapters';

@Injectable({
    providedIn: 'root'
})
export class AdvancedSearchService {
    private _markdownsFolder = 'assets/markdowns/';
    private _fileNames = chapters.map((chapter) => `${chapter}.md`);
    private _listing = this._chapterListingService.getListing();

    constructor(private _chapterListingService: ChapterListingService, private _http: HttpClient) {}

    private _markdowns: Record<string, string> = {};

    set markdowns(markdowns: Record<string, string>) {
        this._markdowns = markdowns;
    }

    quickSearch(query: string) {
        return this._search(query, 3);
    }

    fullSearch(query: string) {
        return this._search(query);
    }

    loadMarkdownFiles(): Observable<Record<string, string>> {
        const observables = this._fileNames.map((fileName) =>
            this._http.get(`${this._markdownsFolder}${fileName}`, { responseType: 'text' }).pipe(
                map((content) => ({
                    [fileName.replace('.md', '')]: content
                }))
            )
        );
        return forkJoin(observables).pipe(map((arrayOfObjects) => arrayOfObjects.reduce((acc, obj) => ({ ...acc, ...obj }), {})));
    }

    private _search(query: string, max?: number) {
        const resultKeys: articleKey[] = [];
        const results: any[] = [];
        const keys = Object.keys(this._markdowns) as articleKey[];
        for (let i = 0; i < keys.length; i++) {
            if (max != undefined && max <= 0) break;
            if (this._markdowns[keys[i]].toLowerCase().includes(query.toLowerCase())) {
                resultKeys.push(keys[i]);
                max != undefined && max--;
            }
        }
        resultKeys.forEach((key) => {
            const preIndices = key.toLowerCase().replace('ch', '').replace('p', '').split('');
            const indices = [];
            indices.push(parseInt(preIndices[0]) - 1);
            indices.push(parseInt(preIndices[1]) - 1);
            results.push({
                title: `Ch${preIndices[0]} - P${preIndices[1]} - ${this._listing[indices[0]].parts[indices[1]].title}`,
                content:
                    this._markdowns[key]
                        .substring(0, max == undefined ? 300 : 100)
                        .replace(/\n/g, ' ')
                        .replace(/#/g, '')
                        .trim() + '...',
                url: `/book/ch${preIndices[0]}/p${preIndices[1]}`,
                query
            });
        });
        return results;
    }
}
