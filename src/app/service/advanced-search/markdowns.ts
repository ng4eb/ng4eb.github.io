import {
	ch1P1Markdown
} from '../../article/ch1-p1/ch1-p1.markdown';
import {
	ch1P2Markdown
} from '../../article/ch1-p2/ch1-p2.markdown';
import {
	ch2P1Markdown
} from '../../article/ch2-p1/ch2-p1.markdown';
import {
	ch2P2Markdown
} from '../../article/ch2-p2/ch2-p2.markdown';
import {
	ch2P3Markdown
} from '../../article/ch2-p3/ch2-p3.markdown';
import {
	ch3P1Markdown
} from '../../article/ch3-p1/ch3-p1.markdown';
import {
	ch3P2Markdown
} from '../../article/ch3-p2/ch3-p2.markdown';
import {
	ch3P3Markdown
} from '../../article/ch3-p3/ch3-p3.markdown';
import {
	ch3P4Markdown
} from '../../article/ch3-p4/ch3-p4.markdown';
import {
	ch4P1Markdown
} from '../../article/ch4-p1/ch4-p1.markdown';
import {
	ch4P2Markdown
} from '../../article/ch4-p2/ch4-p2.markdown';
import {
	ch5P1Markdown
} from '../../article/ch5-p1/ch5-p1.markdown';
import {
	ch5P2Markdown
} from '../../article/ch5-p2/ch5-p2.markdown';

export const markdowns = {
	ch1p1: ch1P1Markdown,
	ch1p2: ch1P2Markdown,
	ch2p1: ch2P1Markdown,
	ch2p2: ch2P2Markdown,
	ch2p3: ch2P3Markdown,
	ch3p1: ch3P1Markdown,
	ch3p2: ch3P2Markdown,
	ch3p3: ch3P3Markdown,
	ch3p4: ch3P4Markdown,
	ch4p1: ch4P1Markdown,
	ch4p2: ch4P2Markdown,
	ch5p1: ch5P1Markdown,
	ch5p2: ch5P2Markdown
}

export type mdKey = keyof typeof markdowns;
