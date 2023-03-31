import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChapterComponent } from './chapter/chapter.component';

@NgModule({
    declarations: [ArticleComponent, ChapterComponent],
    imports: [CommonModule, ArticleRoutingModule, SharedModule, MarkdownModule.forChild(), FontAwesomeModule]
})
export class ArticleModule {}
