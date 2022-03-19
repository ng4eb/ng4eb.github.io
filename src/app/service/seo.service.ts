import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  path: string;
  imageConfig?: {
    image: string;
    width?: string;
    height?: string;
    alt?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
      private _title: Title,
      private _meta: Meta
  ) { }

  setSEO(SEOConfig: SEOConfig) {
    // basics
    this._title.setTitle(`${SEOConfig.title} - ng4eb`);
    this._meta.updateTag({name: 'description', content: SEOConfig.description});
    this._meta.updateTag({name: 'url', content: `https://www.ng4eb.com${SEOConfig.path}`});
    // open graph
    this._meta.updateTag({name: 'og:title', content: `${SEOConfig.title} - ng4eb`});
    this._meta.updateTag({name: 'og:description', content: SEOConfig.description});
    this._meta.updateTag({name: 'og:url', content: `https://www.ng4eb.com${SEOConfig.path}`});
    SEOConfig.imageConfig && this._meta.updateTag({name: 'og:image', content: SEOConfig.imageConfig.image});
    SEOConfig.imageConfig?.width && this._meta.updateTag({name: 'og:image:width', content: SEOConfig.imageConfig.width});
    SEOConfig.imageConfig?.height && this._meta.updateTag({name: 'og:image:height', content: SEOConfig.imageConfig.height});
    SEOConfig.imageConfig?.alt && this._meta.updateTag({name: 'og:image:alt', content: SEOConfig.imageConfig.alt});
    // twitter
    this._meta.updateTag({name: 'twitter:title', content: `${SEOConfig.title} - ng4eb`});
    this._meta.updateTag({name: 'twitter:description', content: SEOConfig.description});
    this._meta.updateTag({name: 'twitter:url', content: `https://www.ng4eb.com${SEOConfig.path}`});
    this._meta.updateTag({name: 'twitter:card', content: 'summary'});
  }
}
