import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  url: string;
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
    this._title.setTitle(SEOConfig.title);
    this._meta.addTag({name: 'description', content: SEOConfig.description});
    this._meta.addTag({name: 'url', content: SEOConfig.url});
    // open graph
    this._meta.addTag({name: 'og:title', content: SEOConfig.title});
    this._meta.addTag({name: 'og:description', content: SEOConfig.description});
    this._meta.addTag({name: 'og:url', content: SEOConfig.url});
    SEOConfig.imageConfig && this._meta.addTag({name: 'og:image', content: SEOConfig.imageConfig.image});
    SEOConfig.imageConfig?.width && this._meta.addTag({name: 'og:image:width', content: SEOConfig.imageConfig.width});
    SEOConfig.imageConfig?.height && this._meta.addTag({name: 'og:image:height', content: SEOConfig.imageConfig.height});
    SEOConfig.imageConfig?.alt && this._meta.addTag({name: 'og:image:alt', content: SEOConfig.imageConfig.alt});
    // twitter
    this._meta.addTag({name: 'twitter:title', content: SEOConfig.title});
    this._meta.addTag({name: 'twitter:description', content: SEOConfig.description});
    this._meta.addTag({name: 'twitter:url', content: SEOConfig.url});
    this._meta.addTag({name: 'twitter:card', content: 'summary'});
  }
}
