import Spoiler from './spoiler/spoiler';
import SpoilerBlock from './spoiler/spoiler-block';
import SpoilerContent from './spoiler/spoiler-content';
import SpoilerHeader from './spoiler/spoiler-head';

import Block from "quill/blots/block";
import TextBlot from "quill/blots/text";

// SpoilerBlock.requiredContainer = Spoiler;
// SpoilerContent.requiredContainer = SpoilerBlock;
// SpoilerHeader.requiredContainer = SpoilerBlock;

Spoiler.allowedChildren = [SpoilerBlock, TextBlot, Block];
SpoilerContent.allowedChildren = [Block, TextBlot, Spoiler];
SpoilerBlock.allowedChildren = [SpoilerContent, SpoilerHeader];

export { Spoiler as default, SpoilerBlock, SpoilerContent, SpoilerHeader };
