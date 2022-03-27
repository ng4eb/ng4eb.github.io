import {mdKey} from './markdowns';
import {SEOConfig} from '../service/seo.service';
import {ch1P1Seo} from './ch1-p1/ch1-p1.seo';
import {ch1P2Seo} from './ch1-p2/ch1-p2.seo';
import {ch2P1Seo} from './ch2-p1/ch2-p1.seo';
import {ch2P2Seo} from './ch2-p2/ch2-p2.seo';
import {ch2P3Seo} from './ch2-p3/ch2-p3.seo';
import {ch3P1Seo} from './ch3-p1/ch3-p1.seo';
import {ch3P2Seo} from './ch3-p2/ch3-p2.seo';
import {ch3P3Seo} from './ch3-p3/ch3-p3.seo';
import {ch3P4Seo} from './ch3-p4/ch3-p4.seo';
import {ch4P1Seo} from './ch4-p1/ch4-p1.seo';
import {ch4P2Seo} from './ch4-p2/ch4-p2.seo';
import {ch5P1Seo} from './ch5-p1/ch5-p1.seo';
import {ch5P2Seo} from './ch5-p2/ch5-p2.seo';
import {ch6P1Seo} from './ch6-p1/ch6-p1.seo';
import {ch6P2Seo} from './ch6-p2/ch6-p2.seo';

export const seos: Record<mdKey, SEOConfig> = {
	ch1p1: ch1P1Seo,
	ch1p2: ch1P2Seo,
	ch2p1: ch2P1Seo,
	ch2p2: ch2P2Seo,
	ch2p3: ch2P3Seo,
	ch3p1: ch3P1Seo,
	ch3p2: ch3P2Seo,
	ch3p3: ch3P3Seo,
	ch3p4: ch3P4Seo,
	ch4p1: ch4P1Seo,
	ch4p2: ch4P2Seo,
	ch5p1: ch5P1Seo,
	ch5p2: ch5P2Seo,
	ch6p1: ch6P1Seo,
	ch6p2: ch6P2Seo,
}
