import Spoiler from './spoiler/spoiler';
import SpoilerBlock from './spoiler/spoiler-block';
import SpoilerContent from './spoiler/spoiler-content';
import SpoilerHeader from './spoiler/spoiler-head';

import Block from "quill/blots/block";
import TextBlot from "quill/blots/text";
import Inline from "quill/blots/inline";

Spoiler.allowedChildren = [ SpoilerBlock ];
Spoiler.defaultChild = 'spoiler-block';

SpoilerContent.allowedChildren = [Block, TextBlot, Spoiler, Inline];
SpoilerContent.defaultChild = 'p';

SpoilerBlock.allowedChildren = [SpoilerContent, SpoilerHeader];
SpoilerBlock.defaultChild = 'spoiler-header';

export { Spoiler as default, SpoilerBlock, SpoilerContent, SpoilerHeader };
