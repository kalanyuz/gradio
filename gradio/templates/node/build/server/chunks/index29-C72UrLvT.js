import { E as ExternalTokenizer, L as LRParser, C as ContextTracker } from './index12-D9fTsc9i.js';
import { s as styleTags, t as tags, d as syntaxTree, i as ifNotIn, j as completeFromList, L as LRLanguage, e as indentNodeProp, g as delimitedIndent, f as foldNodeProp, c as foldInside, h as LanguageSupport, I as IterMode, l as snippetCompletion, k as NodeWeakMap } from './Index13-dQegdi_t.js';
import './ssr-FJHii0oS.js';
import './2-DWTiTXXU.js';
import './index-BJuG1GWC.js';
import 'tty';
import 'path';
import 'url';
import 'fs';
import './Component--bfMfOuT.js';
import './Example6-CLl1pGqC.js';

const printKeyword = 1, indent = 201, dedent = 202, newline$1 = 203, blankLineStart = 204, newlineBracketed = 205, eof = 206, formatString1Content = 207, formatString1Brace = 2, formatString1End = 208, formatString2Content = 209, formatString2Brace = 3, formatString2End = 210, formatString1lContent = 211, formatString1lBrace = 4, formatString1lEnd = 212, formatString2lContent = 213, formatString2lBrace = 5, formatString2lEnd = 214, ParenL = 26, ParenthesizedExpression = 27, TupleExpression = 51, ComprehensionExpression = 52, BracketL = 57, ArrayExpression = 58, ArrayComprehensionExpression = 59, BraceL = 61, DictionaryExpression = 62, DictionaryComprehensionExpression = 63, SetExpression = 64, SetComprehensionExpression = 65, ArgList = 67, subscript = 251, FormatString = 74, importList = 270, TypeParamList = 115, ParamList = 133, SequencePattern = 154, MappingPattern = 155, PatternArgList = 158;
const newline = 10, carriageReturn = 13, space = 32, tab = 9, hash = 35, parenOpen = 40, dot = 46, braceOpen = 123, singleQuote = 39, doubleQuote = 34, backslash = 92;
const bracketed = /* @__PURE__ */ new Set([
  ParenthesizedExpression,
  TupleExpression,
  ComprehensionExpression,
  importList,
  ArgList,
  ParamList,
  ArrayExpression,
  ArrayComprehensionExpression,
  subscript,
  SetExpression,
  SetComprehensionExpression,
  FormatString,
  DictionaryExpression,
  DictionaryComprehensionExpression,
  SequencePattern,
  MappingPattern,
  PatternArgList,
  TypeParamList
]);
function isLineBreak(ch) {
  return ch == newline || ch == carriageReturn;
}
const newlines = new ExternalTokenizer((input, stack) => {
  let prev;
  if (input.next < 0) {
    input.acceptToken(eof);
  } else if (stack.context.depth < 0) {
    if (isLineBreak(input.next))
      input.acceptToken(newlineBracketed, 1);
  } else if (((prev = input.peek(-1)) < 0 || isLineBreak(prev)) && stack.canShift(blankLineStart)) {
    let spaces = 0;
    while (input.next == space || input.next == tab) {
      input.advance();
      spaces++;
    }
    if (input.next == newline || input.next == carriageReturn || input.next == hash)
      input.acceptToken(blankLineStart, -spaces);
  } else if (isLineBreak(input.next)) {
    input.acceptToken(newline$1, 1);
  }
}, { contextual: true });
const indentation = new ExternalTokenizer((input, stack) => {
  let cDepth = stack.context.depth;
  if (cDepth < 0)
    return;
  let prev = input.peek(-1);
  if (prev == newline || prev == carriageReturn) {
    let depth = 0, chars = 0;
    for (; ; ) {
      if (input.next == space)
        depth++;
      else if (input.next == tab)
        depth += 8 - depth % 8;
      else
        break;
      input.advance();
      chars++;
    }
    if (depth != cDepth && input.next != newline && input.next != carriageReturn && input.next != hash) {
      if (depth < cDepth)
        input.acceptToken(dedent, -chars);
      else
        input.acceptToken(indent);
    }
  }
});
function IndentLevel(parent, depth) {
  this.parent = parent;
  this.depth = depth;
  this.hash = (parent ? parent.hash + parent.hash << 8 : 0) + depth + (depth << 4);
}
const topIndent = new IndentLevel(null, 0);
function countIndent(space2) {
  let depth = 0;
  for (let i = 0; i < space2.length; i++)
    depth += space2.charCodeAt(i) == tab ? 8 - depth % 8 : 1;
  return depth;
}
const trackIndent = new ContextTracker({
  start: topIndent,
  reduce(context, term) {
    return context.depth < 0 && bracketed.has(term) ? context.parent : context;
  },
  shift(context, term, stack, input) {
    if (term == indent)
      return new IndentLevel(context, countIndent(input.read(input.pos, stack.pos)));
    if (term == dedent)
      return context.parent;
    if (term == ParenL || term == BracketL || term == BraceL)
      return new IndentLevel(context, -1);
    return context;
  },
  hash(context) {
    return context.hash;
  }
});
const legacyPrint = new ExternalTokenizer((input) => {
  for (let i = 0; i < 5; i++) {
    if (input.next != "print".charCodeAt(i))
      return;
    input.advance();
  }
  if (/\w/.test(String.fromCharCode(input.next)))
    return;
  for (let off = 0; ; off++) {
    let next = input.peek(off);
    if (next == space || next == tab)
      continue;
    if (next != parenOpen && next != dot && next != newline && next != carriageReturn && next != hash)
      input.acceptToken(printKeyword);
    return;
  }
});
function formatString(quote, len, content, brace, end) {
  return new ExternalTokenizer((input) => {
    let start = input.pos;
    for (; ; ) {
      if (input.next < 0) {
        break;
      } else if (input.next == braceOpen) {
        if (input.peek(1) == braceOpen) {
          input.advance(2);
        } else {
          if (input.pos == start) {
            input.acceptToken(brace, 1);
            return;
          }
          break;
        }
      } else if (input.next == backslash) {
        input.advance();
        if (input.next >= 0)
          input.advance();
      } else if (input.next == quote && (len == 1 || input.peek(1) == quote && input.peek(2) == quote)) {
        if (input.pos == start) {
          input.acceptToken(end, len);
          return;
        }
        break;
      } else {
        input.advance();
      }
    }
    if (input.pos > start)
      input.acceptToken(content);
  });
}
const formatString1 = formatString(singleQuote, 1, formatString1Content, formatString1Brace, formatString1End);
const formatString2 = formatString(doubleQuote, 1, formatString2Content, formatString2Brace, formatString2End);
const formatString1l = formatString(singleQuote, 3, formatString1lContent, formatString1lBrace, formatString1lEnd);
const formatString2l = formatString(doubleQuote, 3, formatString2lContent, formatString2lBrace, formatString2lEnd);
const pythonHighlighting = styleTags({
  'async "*" "**" FormatConversion FormatSpec': tags.modifier,
  "for while if elif else try except finally return raise break continue with pass assert await yield match case": tags.controlKeyword,
  "in not and or is del": tags.operatorKeyword,
  "from def class global nonlocal lambda": tags.definitionKeyword,
  import: tags.moduleKeyword,
  "with as print": tags.keyword,
  Boolean: tags.bool,
  None: tags.null,
  VariableName: tags.variableName,
  "CallExpression/VariableName": tags.function(tags.variableName),
  "FunctionDefinition/VariableName": tags.function(tags.definition(tags.variableName)),
  "ClassDefinition/VariableName": tags.definition(tags.className),
  PropertyName: tags.propertyName,
  "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
  Comment: tags.lineComment,
  Number: tags.number,
  String: tags.string,
  FormatString: tags.special(tags.string),
  UpdateOp: tags.updateOperator,
  "ArithOp!": tags.arithmeticOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  AssignOp: tags.definitionOperator,
  Ellipsis: tags.punctuation,
  At: tags.meta,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace,
  ".": tags.derefOperator,
  ", ;": tags.separator
});
const spec_identifier = { __proto__: null, await: 48, or: 58, and: 60, in: 64, not: 66, is: 68, if: 74, else: 76, lambda: 80, yield: 98, from: 100, async: 106, for: 108, None: 168, True: 170, False: 170, del: 184, pass: 188, break: 192, continue: 196, return: 200, raise: 208, import: 212, as: 214, global: 218, nonlocal: 220, assert: 224, type: 229, elif: 242, while: 246, try: 252, except: 254, finally: 256, with: 260, def: 264, class: 274, match: 285, case: 291 };
const parser = LRParser.deserialize({
  version: 14,
  states: "#&jO`Q#yOOP$bOSOOO%kQ&nO'#HcOOQS'#Cq'#CqOOQS'#Cr'#CrO'ZQ#xO'#CpO(|Q&nO'#HbOOQS'#Hc'#HcOOQS'#DW'#DWOOQS'#Hb'#HbO)jQ#xO'#DaO)}Q#xO'#DhO*_Q#xO'#DlOOQS'#Dw'#DwO*rO,UO'#DwO*zO7[O'#DwO+SOWO'#DxO+_O`O'#DxO+jOpO'#DxO+uO!bO'#DxO-wQ&nO'#HSOOQS'#HS'#HSO'ZQ#xO'#HRO/ZQ&nO'#HROOQS'#Ee'#EeO/rQ#xO'#EfOOQS'#HQ'#HQO/|Q#xO'#HPOOQV'#HP'#HPO0XQ#xO'#F]OOQS'#Ge'#GeO0^Q#xO'#F[OOQV'#IY'#IYOOQV'#HO'#HOOOQV'#Ft'#FtQ`Q#yOOO'ZQ#xO'#CsO0lQ#xO'#DPO0sQ#xO'#DTO1RQ#xO'#HgO1cQ&nO'#EYO'ZQ#xO'#EZOOQS'#E]'#E]OOQS'#E_'#E_OOQS'#Ea'#EaO1wQ#xO'#EcO2_Q#xO'#EgO0XQ#xO'#EiO2rQ&nO'#EiO0XQ#xO'#ElO/rQ#xO'#EoO0XQ#xO'#EqO/rQ#xO'#EwO/rQ#xO'#EzO2}Q#xO'#E|O3UQ#xO'#FRO3aQ#xO'#E}O/rQ#xO'#FRO0XQ#xO'#FTO0XQ#xO'#FYO3fQ#xO'#F_P3mO#xO'#G}POOO)CBq)CBqOOQS'#Cg'#CgOOQS'#Ch'#ChOOQS'#Ci'#CiOOQS'#Cj'#CjOOQS'#Ck'#CkOOQS'#Cl'#ClOOQS'#Cn'#CnO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO3xQ#xO'#DqOOQS,5:[,5:[O4]Q#xO'#HqOOQS,5:_,5:_O4jQMlO,5:_O4oQ&nO,59[O0lQ#xO,59dO0lQ#xO,59dO0lQ#xO,59dO7_Q#xO,59dO7dQ#xO,59dO7kQ#xO,59lO7rQ#xO'#HbO8xQ#xO'#HaOOQS'#Ha'#HaOOQS'#D^'#D^O9aQ#xO,59cO'ZQ#xO,59cO9oQ#xO,59cOOQS,59{,59{O9tQ#xO,5:TO'ZQ#xO,5:TOOQS,5:S,5:SO:SQ#xO,5:SO:XQ#xO,5:ZO'ZQ#xO,5:ZO'ZQ#xO,5:XOOQS,5:W,5:WO:jQ#xO,5:WO:oQ#xO,5:YOOOO'#F|'#F|O:tO,UO,5:cOOQS,5:c,5:cOOOO'#F}'#F}O:|O7[O,5:cO;UQ#xO'#DyOOOW'#GO'#GOO;fOWO,5:dOOQS,5:d,5:dO;UQ#xO'#D}OOO`'#GR'#GRO;qO`O,5:dO;UQ#xO'#EOOOOp'#GS'#GSO;|OpO,5:dO;UQ#xO'#EPOOO!b'#GT'#GTO<XO!bO,5:dOOQS'#GU'#GUO<dQ&nO,5:lO?UQ&nO,5=mO?oQ!LUO,5=mO@`Q&nO,5=mOOQS,5;Q,5;QO@wQ#yO'#G_OBZQ#xO,5;aOOQV,5=k,5=kOBfQ&nO'#ITOB}Q#xO,5;wOOQS-E:c-E:cOOQV,5;v,5;vO3[Q#xO'#FTOOQV-E9r-E9rOCVQ&nO,59_OE^Q&nO,59kOEwQ#xO'#HdOFSQ#xO'#HdO0XQ#xO'#HdOF_Q#xO'#DVOFgQ#xO,59oOFlQ#xO'#HhO'ZQ#xO'#HhO/rQ#xO,5>ROOQS,5>R,5>RO/rQ#xO'#EUOOQS'#EV'#EVOGZQ#xO'#GWOGkQ#xO,59OOGkQ#xO,59OO)pQ#xO,5:rOGyQ&nO'#HjOOQS,5:u,5:uOOQS,5:},5:}OH^Q#xO,5;ROHoQ#xO,5;TOOQS'#GZ'#GZOH}Q&nO,5;TOI]Q#xO,5;TOIbQ#xO'#IWOOQS,5;W,5;WOIpQ#xO'#ISOOQS,5;Z,5;ZOJRQ#xO,5;]O3aQ#xO,5;cO3aQ#xO,5;fOJZQ&nO'#IZO'ZQ#xO'#IZOJeQ#xO,5;hO2}Q#xO,5;hO/rQ#xO,5;mO0XQ#xO,5;oOJjQ#yO'#ExOKvQ#{O,5;iO! [Q#xO'#I[O3aQ#xO,5;mO! gQ#xO,5;oO! oQ#xO,5;tO! zQ&nO,5;yO'ZQ#xO,5;yPOOO,5=i,5=iP!!ROSO,5=iP!!WO#xO,5=iO!${Q&nO1G.lO!%SQ&nO1G.lO!'sQ&nO1G.lO!'}Q&nO1G.lO!*hQ&nO1G.lO!*{Q&nO1G.lO!+`Q#xO'#HpO!+nQ&nO'#HSO/rQ#xO'#HpO!+xQ#xO'#HoOOQS,5:],5:]O!,QQ#xO,5:]O!,VQ#xO'#HrO!,bQ#xO'#HrO!,uQ#xO,5>]OOQS'#Du'#DuOOQS1G/y1G/yOOQS1G/O1G/OO!-uQ&nO1G/OO!-|Q&nO1G/OO0lQ#xO1G/OO!.iQ#xO1G/WOOQS'#D]'#D]O/rQ#xO,59vOOQS1G.}1G.}O!.pQ#xO1G/gO!/QQ#xO1G/gO!/YQ#xO1G/hO'ZQ#xO'#HiO!/_Q#xO'#HiO!/dQ&nO1G.}O!/tQ#xO,59kO!0zQ#xO,5>XO!1[Q#xO,5>XO!1dQ#xO1G/oO!1iQ&nO1G/oOOQS1G/n1G/nO!1yQ#xO,5>SO!2pQ#xO,5>SO/rQ#xO1G/sO!3_Q#xO1G/uO!3dQ&nO1G/uO!3tQ&nO1G/sOOQS1G/r1G/rOOQS1G/t1G/tOOOO-E9z-E9zOOQS1G/}1G/}OOOO-E9{-E9{O!4UQ#xO'#H|O/rQ#xO'#H|O!4dQ#xO,5:eOOOW-E9|-E9|OOQS1G0O1G0OO!4oQ#xO,5:iOOO`-E:P-E:PO!4zQ#xO,5:jOOOp-E:Q-E:QO!5VQ#xO,5:kOOO!b-E:R-E:ROOQS-E:S-E:SO!5bQ!LUO1G3XO!6RQ&nO1G3XO'ZQ#xO,5<qOOQS,5<q,5<qOOQS-E:T-E:TOOQS,5<y,5<yOOQS-E:]-E:]OOQV1G0{1G0{O0XQ#xO'#GYO!6jQ&nO,5>oOOQS1G1c1G1cO!7RQ#xO1G1cOOQS'#DX'#DXO/rQ#xO,5>OOOQS,5>O,5>OO!7WQ#xO'#FuO!7cQ#xO,59qO!7kQ#xO1G/ZO!7uQ&nO,5>SOOQS1G3m1G3mOOQS,5:p,5:pO!8fQ#xO'#HROOQS,5<r,5<rOOQS-E:U-E:UO!8wQ#xO1G.jOOQS1G0^1G0^O!9VQ#xO,5>UO!9gQ#xO,5>UO/rQ#xO1G0mO/rQ#xO1G0mO0XQ#xO1G0oOOQS-E:X-E:XO!9xQ#xO1G0oO!:TQ#xO1G0oO!:YQ#xO,5>rO!:hQ#xO,5>rO!:vQ#xO,5>nO!;^Q#xO,5>nO!;oQ#xO'#EsO/rQ#xO1G0wO!;zQ#xO1G0wO!<PQ#{O1G0}O!?bQ#{O1G1QO!BpQ#xO,5>uO!BzQ#xO,5>uO!CSQ&nO,5>uO/rQ#xO1G1SO!C^Q#xO1G1SO3aQ#xO1G1XO! gQ#xO1G1ZOOQV,5;d,5;dO!CcQ#zO,5;dO!ChQ#{O1G1TO!F|Q#xO'#GbO3aQ#xO1G1TO3aQ#xO1G1TO!G^Q#xO,5>vO!GkQ#xO,5>vO0XQ#xO,5>vOOQV1G1X1G1XO!GsQ#xO'#FVO!HUQMlO1G1ZO!H^Q#xO1G1ZOOQV1G1`1G1`O3aQ#xO1G1`O!HcQ#xO1G1`O!HkQ#xO'#FaOOQV1G1e1G1eO! zQ&nO1G1ePOOO1G3T1G3TP!HpOSO1G3TOOQS,5>[,5>[OOQS'#Dr'#DrO/rQ#xO,5>[O!HuQ#xO,5>ZO!IYQ#xO,5>ZOOQS1G/w1G/wO!IbQ#xO,5>^O!IrQ#xO,5>^O!IzQ#xO,5>^O!J_Q#xO,5>^O!JoQ#xO,5>^OOQS1G3w1G3wOOQS7+$j7+$jO!7kQ#xO7+$rO!LbQ#xO1G/OO!LiQ#xO1G/OOOQS1G/b1G/bOOQS,5<c,5<cO'ZQ#xO,5<cOOQS7+%R7+%RO!LpQ#xO7+%ROOQS-E9u-E9uOOQS7+%S7+%SO!MQQ#xO,5>TO'ZQ#xO,5>TOOQS7+$i7+$iO!MVQ#xO7+%RO!M_Q#xO7+%SO!MdQ#xO1G3sOOQS7+%Z7+%ZO!MtQ#xO1G3sO!M|Q#xO7+%ZOOQS,5<b,5<bO'ZQ#xO,5<bO!NRQ#xO1G3nOOQS-E9t-E9tO!NxQ#xO7+%_OOQS7+%a7+%aO# WQ#xO1G3nO# uQ#xO7+%aO# zQ#xO1G3tO#![Q#xO1G3tO#!dQ#xO7+%_O#!iQ#xO,5>hO##PQ#xO,5>hO##PQ#xO,5>hO##_O$ISO'#D{O##jO#tO'#H}OOOW1G0P1G0PO##oQ#xO1G0POOO`1G0T1G0TO##wQ#xO1G0TOOOp1G0U1G0UO#$PQ#xO1G0UOOO!b1G0V1G0VO#$XQ#xO1G0VO#$aQ!LUO7+(sO#%QQ&nO1G2]P#%kQ#xO'#GVOOQS,5<t,5<tOOQS-E:W-E:WOOQS7+&}7+&}OOQS1G3j1G3jOOQS,5<a,5<aOOQS-E9s-E9sOOQS7+$u7+$uO#%xQ#xO,5=mO#&cQ#xO,5=mO#&tQ&nO,5<dO#'XQ#xO1G3pOOQS-E9v-E9vOOQS7+&X7+&XO#'iQ#xO7+&XOOQS7+&Z7+&ZO#'wQ#xO'#IVO0XQ#xO'#IUO#(]Q#xO7+&ZOOQS,5<w,5<wO#(hQ#xO1G4^OOQS-E:Z-E:ZOOQS,5<s,5<sO#(vQ#xO1G4YOOQS-E:V-E:VO0XQ#xO'#EtO#)^Q#xO'#EtO#)iQ#xO'#IXO#)qQ#xO,5;_OOQS7+&c7+&cO/rQ#xO7+&cO#)vQ#{O7+&iO!GPQ#xO'#G`O3aQ#xO7+&iO3aQ#xO7+&lO#-XQ&nO,5<{O'ZQ#xO,5<{O#-cQ#xO1G4aOOQS-E:_-E:_O#-mQ#xO1G4aO3aQ#xO7+&nO/rQ#xO7+&nOOQV7+&s7+&sO!HUQMlO7+&uO!H^Q#xO7+&uO`Q#yO1G1OOOQV-E:`-E:`O3aQ#xO7+&oO3aQ#xO7+&oOOQV,5<|,5<|O#-uQ#xO,5<|O!GPQ#xO,5<|OOQV7+&o7+&oO#.QQ#{O7+&oO#1`Q#xO,5<}O#1kQ#xO1G4bOOQS-E:a-E:aO#1xQ#xO1G4bO#2QQ#xO'#I^O#2`Q#xO'#I^O0XQ#xO'#I^OOQS'#I^'#I^O#2kQ#xO'#I]OOQS,5;q,5;qO#2sQ#xO,5;qO/rQ#xO'#FXOOQV7+&u7+&uO3aQ#xO7+&uOOQV7+&z7+&zO3aQ#xO7+&zO#2xQ#zO,5;{OOQV7+'P7+'PPOOO7+(o7+(oO#2}Q#xO1G3vOOQS,5<f,5<fO#3]Q#xO1G3uOOQS-E9x-E9xO#3pQ#xO,5<gO#3{Q#xO,5<gO#4`Q#xO1G3xOOQS-E9y-E9yO#4pQ#xO1G3xO#4xQ#xO1G3xO#5YQ#xO1G3xO#4pQ#xO1G3xOOQS<<H^<<H^O#5eQ&nO1G1}OOQS<<Hm<<HmP#5rQ#xO'#FwO7kQ#xO1G3oO#6PQ#xO1G3oO#6UQ#xO<<HmOOQS<<Hn<<HnO#6fQ#xO7+)_OOQS<<Hu<<HuO#6vQ&nO1G1|P#7gQ#xO'#FvO#7tQ#xO7+)`O#8UQ#xO7+)`O#8^Q#xO<<HyO#8cQ#xO7+)YOOQS<<H{<<H{O#9YQ#xO,5<eO'ZQ#xO,5<eOOQS-E9w-E9wOOQS<<Hy<<HyOOQS,5<k,5<kO/rQ#xO,5<kO#9_Q#xO1G4SOOQS-E9}-E9}O#9uQ#xO1G4SO;UQ#xO'#D|OOOO'#GQ'#GQO#:TO$ISO,5:gOOO#l,5>i,5>iOOOW7+%k7+%kOOO`7+%o7+%oOOOp7+%p7+%pOOO!b7+%q7+%qO#:`Q#xO1G3XO#:yQ#xO1G3XP'ZQ#xO'#FxO/rQ#xO<<IsO#;[Q#xO,5>qO#;mQ#xO,5>qO0XQ#xO,5>qO#<OQ#xO,5>pOOQS<<Iu<<IuP0XQ#xO'#G]P/rQ#xO'#GXOOQS,5;`,5;`O#<TQ#xO,5>sO#<cQ#xO,5>sOOQS1G0y1G0yOOQS<<I}<<I}OOQV-E:^-E:^O3aQ#xO<<JTOOQV,5<z,5<zO3aQ#xO,5<zOOQV<<JT<<JTOOQV<<JW<<JWO#<kQ&nO1G2gP#<uQ#xO'#GaO#<|Q#xO7+){O#=WQ#{O<<JYO3aQ#xO<<JYOOQV<<Ja<<JaO3aQ#xO<<JaO!HUQMlO<<JaO#@fQ#{O7+&jOOQV<<JZ<<JZO#@pQ#{O<<JZOOQV1G2h1G2hO0XQ#xO1G2hO#DOQ#xO1G2hO3aQ#xO<<JZO0XQ#xO1G2iP/rQ#xO'#GcO#DZQ#xO7+)|O#DhQ#xO7+)|OOQS'#FW'#FWO/rQ#xO,5>xO#DpQ#xO,5>xOOQS,5>x,5>xO#D{Q#xO,5>wO#E^Q#xO,5>wOOQS1G1]1G1]OOQS,5;s,5;sOOQV<<Jf<<JfO#EfQ#xO1G1gOOQS7+)b7+)bP#EkQ#xO'#FzO#E{Q#xO1G2RO#F`Q#xO1G2RO#FpQ#xO1G2RP#F{Q#xO'#F{O#GYQ#xO7+)dO#GjQ#xO7+)dO#GjQ#xO7+)dO#GrQ#xO7+)dO#HSQ#xO7+)ZO7kQ#xO7+)ZOOQSAN>XAN>XO#HmQ#xO<<LzOOQSAN>eAN>eO/rQ#xO1G2PO#H}Q&nO1G2PP#IXQ#xO'#FyOOQS1G2V1G2VP#IfQ#xO'#GPO#IsQ#xO7+)nO#JZQ#xO,5:hOOOO-E:O-E:OO#JfQ#xO7+(sOOQSAN?_AN?_O#KPQ#xO,5<vO#KeQ#xO1G4]OOQS-E:Y-E:YO#KvQ#xO1G4]OOQS1G4[1G4[OOQS,5<x,5<xO#LXQ#xO1G4_OOQS-E:[-E:[OOQVAN?oAN?oOOQV1G2f1G2fO3aQ#xOAN?tO#LgQ#{OAN?tOOQVAN?{AN?{O3aQ#xOAN?{OOQV<<JU<<JUO3aQ#xOAN?uO3aQ#xO7+(SOOQV7+(S7+(SO0XQ#xO7+(SOOQVAN?uAN?uOOQS7+(T7+(TO$ uQ#xO<<MhOOQS1G4d1G4dO/rQ#xO1G4dOOQS,5=O,5=OO$!SQ#xO1G4cOOQS-E:b-E:bOOQU'#Gf'#GfO$!eQ#zO7+'RO$!pQ#xO'#FbO$#hQ#xO7+'mO$#xQ#xO7+'mOOQS7+'m7+'mO$$TQ#xO<<MOO$$eQ#xO<<MOO$$eQ#xO<<MOO$$mQ#xO'#HkOOQS<<Lu<<LuO$$wQ#xO<<LuOOQS7+'k7+'kOOOO1G0S1G0SO$%bQ#xO1G0SO0XQ#xO1G2bP0XQ#xO'#G[O$%jQ#xO7+)wO$%{Q#xO7+)wP!;oQ#xO'#G^OOQVG25`G25`O3aQ#xOG25`OOQVG25gG25gOOQVG25aG25aOOQV<<Kn<<KnO3aQ#xO<<KnOOQS7+*O7+*OP$&^Q#xO'#GdOOQU-E:d-E:dOOQV<<Jm<<JmO$'QQ&nO'#FdOOQS'#Ff'#FfO$'bQ#xO'#FeO$(SQ#xO'#FeOOQS'#Fe'#FeO$(XQ#xO'#I`O$!pQ#xO'#FlO$!pQ#xO'#FlO$(pQ#xO'#FmO$!pQ#xO'#FnO$(wQ#xO'#IaOOQS'#Ia'#IaO$)fQ#xO,5;|OOQS<<KX<<KXO$)nQ#xO<<KXO$*OQ#xOANBjO$*`Q#xOANBjO$*hQ#xO'#HlOOQS'#Hl'#HlO0sQ#xO'#DeO$+RQ#xO,5>VOOQSANBaANBaOOOO7+%n7+%nOOQS7+'|7+'|O$+jQ#xO<<McOOQVLD*zLD*zOOQVANAYANAYO4jQMlO'#GhO$+{Q&nO,5<VO$!pQ#xO'#FpOOQS,5<Z,5<ZOOQS'#Fg'#FgO$,mQ#xO,5<PO$,rQ#xO,5<POOQS'#Fj'#FjO$!pQ#xO'#GgO$-dQ#xO,5<TO$.OQ#xO,5>zO$.`Q#xO,5>zO0XQ#xO,5<SO$.qQ#xO,5<WO$.vQ#xO,5<WO$!pQ#xO'#IbO$.{Q#xO'#IbO$/QQ#xO,5<XOOQS,5<Y,5<YO'ZQ#xO'#FsOOQU1G1h1G1hO3aQ#xO1G1hOOQSAN@sAN@sO$/VQ#xOG28UO$/gQ#xO,5:POOQS1G3q1G3qOOQS,5=S,5=SOOQS-E:f-E:fO$/lQ&nO'#FdO$/sQ#xO'#IcO$0RQ#xO'#IcO$0ZQ#xO,5<[OOQS1G1k1G1kO$0`Q#xO1G1kO$0eQ#xO,5=ROOQS-E:e-E:eO$1PQ#xO,5=VO$1hQ#xO1G4fOOQS-E:i-E:iOOQS1G1n1G1nOOQS1G1r1G1rO$1xQ#xO,5>|O$!pQ#xO,5>|OOQS1G1s1G1sO$2WQ&nO,5<_OOQU7+'S7+'SO$$mQ#xO1G/kO$!pQ#xO,5<]O$2_Q#xO,5>}O$2fQ#xO,5>}OOQS1G1v1G1vOOQS7+'V7+'VP$!pQ#xO'#GkO$2nQ#xO1G4hO$2xQ#xO1G4hO$3QQ#xO1G4hOOQS7+%V7+%VO$3`Q#xO1G1wO$3nQ&nO'#FdO$3uQ#xO,5=UOOQS,5=U,5=UO$4TQ#xO1G4iOOQS-E:h-E:hO$!pQ#xO,5=TO$4[Q#xO,5=TO$4aQ#xO7+*SOOQS-E:g-E:gO$4kQ#xO7+*SO$!pQ#xO,5<^P$!pQ#xO'#GjO$4sQ#xO1G2oO$!pQ#xO1G2oP$5RQ#xO'#GiO$5YQ#xO<<MnO$5dQ#xO1G1xO$5rQ#xO7+(ZO7kQ#xO'#DPO7kQ#xO,59dO7kQ#xO,59dO7kQ#xO,59dO$6QQ&nO,5=mO7kQ#xO1G/OO/rQ#xO1G/ZO/rQ#xO7+$rP$6eQ#xO'#GVO'ZQ#xO'#HRO$6rQ#xO,59dO$6wQ#xO,59dO$7OQ#xO,59oO$7TQ#xO1G/WO0sQ#xO'#DTO7kQ#xO,59l",
  stateData: "$7f~O%pOS%eOSUOS%dPQ~OPiOXfOhtOjYOquOu!UOxvO!RwO!S!QO!V!XO!W!WO!ZZO!_[O!jeO!ueO!veO!weO#OyO#QzO#S{O#U|O#W}O#[!OO#^!PO#a!RO#b!RO#d!SO#f!TO#o!VO#r!YO#v!ZO#x![O#}!]O$QmO$S!^O%|RO%}RO&RSO&SWO&h]O&i^O&l_O&o`O&saO&tbO&ucO~O%d!_O~OX!fOa!fOc!gOj!nO!Z!pO!h!rO%w!aO%x!bO%y!cO%z!dO%{!dO%|!eO%}!eO&O!fO&P!fO&Q!fO~Om&VXn&VXo&VXp&VXq&VXr&VXu&VX|&VX}&VX!{&VX#j&VX%c&VX%f&VX&X&VXi&VX!V&VX!W&VX&Y&VX!Y&VX!^&VX!S&VX#_&VXv&VX!n&VX~P$gOhtOjYO!ZZO!_[O!jeO!ueO!veO!weO%|RO%}RO&RSO&SWO&h]O&i^O&l_O&o`O&saO&tbO&ucO~O|&UX}&UX#j&UX%c&UX%f&UX&X&UX~Om!uOn!vOo!tOp!tOq!wOr!xOu!yO!{&UX~P(hOX#POi#ROq0zOx1YO!RwO~P'ZOX#TOq0zOx1YO!Y#UO~P'ZOX#XOc#YOq0zOx1YO!^#ZO~P'ZO&j#^O&k#`O~O&m#aO&n#`O~OQ#cO%g#dO%h#fO~OR#gO%i#hO%j#fO~OS#jO%k#kO%l#fO~OT#mO%m#nO%n#fO~OX%vXa%vXc%vXj%vXm%vXn%vXo%vXp%vXq%vXr%vXu%vX|%vX!Z%vX!h%vX%w%vX%x%vX%y%vX%z%vX%{%vX%|%vX%}%vX&O%vX&P%vX&Q%vXi%vX!V%vX!W%vX~O&h]O&i^O&l_O&o`O&saO&tbO&ucO}%vX!{%vX#j%vX%c%vX%f%vX&X%vX&Y%vX!Y%vX!^%vX!S%vX#_%vXv%vX!n%vX~P,QO|#sO}%uX!{%uX#j%uX%c%uX%f%uX&X%uX~Oq0zOx1YO~P'ZO#j#vO%c#xO%f#xO~O&SWO~O!V#}O#x![O#}!]O$QmO~OquO~P'ZOX$SOc$TO&SWO}yP~OX$XOq0zOx1YO!S$YO~P'ZO}$[O!{$aO&X$]O#j!|X%c!|X%f!|X~OX$XOq0zOx1YO#j#VX%c#VX%f#VX~P'ZOq0zOx1YO#j#ZX%c#ZX%f#ZX~P'ZO!h$gO!u$gO&SWO~OX$rO~P'ZO!W$tO#v$uO#x$vO~O}$wO~OX%OO~P'ZOU%QO%c%PO%p%RO~OX%[Oc%[Oi%^Oq0zOx1YO~P'ZOq0zOx1YO}%aO~P'ZO&g%cO~Oc!gOj!nO!Z!pO!h!rOXdaadamdandaodapdaqdardauda|da}da!{da#jda%cda%fda%wda%xda%yda%zda%{da%|da%}da&Oda&Pda&Qda&Xdaida!Vda!Wda&Yda!Yda!^da!Sda#_davda!nda~Op%hO~Oq%hO~P'ZOq0zO~P'ZOm0|On0}Oo0{Op0{Oq1UOr1VOu1ZOi&UX!V&UX!W&UX&Y&UX!Y&UX!^&UX!S&UX#_&UX!n&UX~P(hO&Y%jOi&TX|&TX!V&TX!W&TX!Y&TX}&TX~Oi%lO|%mO!V%qO!W%pO~Oi%lO~O|%tO!V%qO!W%pO!Y&aX~O!Y%xO~O|%yO}%{O!V%qO!W%pO!^&[X~O!^&PO~O!^&QO~O&j#^O&k&SO~O&m#aO&n&SO~OX&VOq0zOx1YO!RwO~P'ZOQ#cO%g#dO%h&YO~OR#gO%i#hO%j&YO~OS#jO%k#kO%l&YO~OT#mO%m#nO%n&YO~OX!taa!tac!taj!tam!tan!tao!tap!taq!tar!tau!ta|!ta}!ta!Z!ta!h!ta!{!ta#j!ta%c!ta%f!ta%w!ta%x!ta%y!ta%z!ta%{!ta%|!ta%}!ta&O!ta&P!ta&Q!ta&X!tai!ta!V!ta!W!ta&Y!ta!Y!ta!^!ta!S!ta#_!tav!ta!n!ta~P#yO|&bO}%ua!{%ua#j%ua%c%ua%f%ua&X%ua~P$gOX&dOquOxvO}%ua!{%ua#j%ua%c%ua%f%ua&X%ua~P'ZO|&bO}%ua!{%ua#j%ua%c%ua%f%ua&X%ua~OPiOXfOquOxvO!RwO!S!QO#OyO#QzO#S{O#U|O#W}O#[!OO#^!PO#a!RO#b!RO#d!SO#f!TO#j%RX%c%RX%f%RX~P'ZO#j#vO%c&iO%f&iO~O!h&jOj&wX%c&wX#_&wX#j&wX%f&wX#^&wX~Oj!nO%c&lO~Omgangaogapgaqgargauga|ga}ga!{ga#jga%cga%fga&Xgaiga!Vga!Wga&Yga!Yga!^ga!Sga#_gavga!nga~P$gOusa|sa}sa#jsa%csa%fsa&Xsa~Om!uOn!vOo!tOp!tOq!wOr!xO!{sa~PDuO&X&nO|&WX}&WX~O&SWO|&WX}&WX~O|&qO}yX~O}&sO~O|%yO#j&[X%c&[X%f&[Xi&[X}&[X!^&[X!n&[X&X&[X~OX1TOq0zOx1YO!RwO~P'ZO&X$]O#jWa%cWa%fWa~O|&|O#j&^X%c&^X%f&^Xp&^X~P$gO|'PO!S'OO#j#Za%c#Za%f#Za~O#_'QO#j#]a%c#]a%f#]a~O!h$gO!u$gO#^'SO&SWO~O#^'SO~O|'UO#j&zX%c&zX%f&zX~O|'WO#j&vX%c&vX%f&vX}&vX~O!Z'YO&X'ZO~O|'_Op&}X~P$gOp'bO~OPiOXfOquOxvO!RwO!S!QO#OyO#QzO#S{O#U|O#W}O#[!OO#^!PO#a!RO#b!RO#d!SO#f!TO%c'gO~P'ZOv'kO#s'iO#t'jOP#qaX#qah#qaj#qaq#qau#qax#qa!R#qa!S#qa!V#qa!W#qa!Z#qa!_#qa!j#qa!u#qa!v#qa!w#qa#O#qa#Q#qa#S#qa#U#qa#W#qa#[#qa#^#qa#a#qa#b#qa#d#qa#f#qa#o#qa#r#qa#v#qa#x#qa#}#qa$Q#qa$S#qa%`#qa%|#qa%}#qa&R#qa&S#qa&h#qa&i#qa&l#qa&o#qa&s#qa&t#qa&u#qa%b#qa%f#qa~O|'lO#_'nO}'OX~Oj'pO!Z'YO~Oj!nO}$wO!Z'YO~O}'vO~P$gO%c'yO~OU'zO%c'yO~OX!fOa!fOc!gOj!nO!Z!pO!h!rO%y!cO%z!dO%{!dO%|!eO%}!eO&O!fO&P!fO&Q!fOmYinYioYipYiqYirYiuYi|Yi}Yi!{Yi#jYi%cYi%fYi%wYi&XYiiYi!VYi!WYi&YYi!YYi!^Yi!SYi#_YivYi!nYi~O%x!bO~P!!`O%xYi~P!!`OX!fOa!fOc!gOj!nO!Z!pO!h!rO%|!eO%}!eO&O!fO&P!fO&Q!fOmYinYioYipYiqYirYiuYi|Yi}Yi!{Yi#jYi%cYi%fYi%wYi%xYi%yYi&XYiiYi!VYi!WYi&YYi!YYi!^Yi!SYi#_YivYi!nYi~O%z!dO%{!dO~P!%ZO%zYi%{Yi~P!%ZOc!gOj!nO!Z!pO!h!rOmYinYioYipYiqYirYiuYi|Yi}Yi!{Yi#jYi%cYi%fYi%wYi%xYi%yYi%zYi%{Yi%|Yi%}Yi&XYiiYi!VYi!WYi&YYi!YYi!^Yi!SYi#_YivYi!nYi~OX!fOa!fO&O!fO&P!fO&Q!fO~P!(XOXYiaYi&OYi&PYi&QYi~P!(XO!V%qO!W%pOi&dX|&dX~O&X'|O&Y'|O~P,QO|(OOi&cX~Oi(QO~O|(RO}(TO!Y&fX~Oq0zOx1YO|(RO}(UO!Y&fX~P'ZO!Y(WO~Oo!tOp!tOq!wOr!xOmliuli|li}li!{li#jli%cli%fli&Xli~On!vO~P!,zOnli~P!,zOm0|On0}Oo0{Op0{Oq1UOr1VO~Ov(YO~P!.TOX(_Oi(`Oq0zOx1YO~P'ZOi(`O|(aO~Oi(cO~O!W(eO~Oi(fO|(aO!V%qO!W%pO~P$gOm0|On0}Oo0{Op0{Oq1UOr1VOisa!Vsa!Wsa&Ysa!Ysa!^sa!Ssa#_savsa!nsa~PDuOX(_Oq0zOx1YO!Y&aa~P'ZO|(iO!Y&aa~O!Y(jO~O|(iO!V%qO!W%pO!Y&aa~P$gOX(nOq0zOx1YO!^&[a#j&[a%c&[a%f&[ai&[a}&[a!n&[a&X&[a~P'ZO|(oO!^&[a#j&[a%c&[a%f&[ai&[a}&[a!n&[a&X&[a~O!^(rO~O|(oO!V%qO!W%pO!^&[a~P$gO|(uO!V%qO!W%pO!^&ba~P$gO|(xO}&pX!^&pX!n&pX~O}({O!^(}O!n)OO~O}({O!^)PO!n)QO~O}({O!^)RO!n)SO~O}({O!^)TO!n)UO~OX&dOquOxvO}%ui!{%ui#j%ui%c%ui%f%ui&X%ui~P'ZO|)VO}%ui!{%ui#j%ui%c%ui%f%ui&X%ui~O!h&jOj&wa%c&wa#_&wa#j&wa%f&wa#^&wa~O%c)[O~OX$SOc$TO&SWO~O|&qO}ya~OquOxvO~P'ZO|(oO#j&[a%c&[a%f&[ai&[a}&[a!^&[a!n&[a&X&[a~P$gO|)aO#j%uX%c%uX%f%uX&X%uX~O&X$]O#jWi%cWi%fWi~O#j&^a%c&^a%f&^ap&^a~P'ZO|)dO#j&^a%c&^a%f&^ap&^a~OX)hOj)jO&SWO~O#^)kO~O&SWO#j&za%c&za%f&za~O|)mO#j&za%c&za%f&za~Oq0zOx1YO#j&va%c&va%f&va}&va~P'ZO|)pO#j&va%c&va%f&va}&va~OX)rOc)rO&SWO~O&X)wO~Ov)zO#m)yOP#kiX#kih#kij#kiq#kiu#kix#ki!R#ki!S#ki!V#ki!W#ki!Z#ki!_#ki!j#ki!u#ki!v#ki!w#ki#O#ki#Q#ki#S#ki#U#ki#W#ki#[#ki#^#ki#a#ki#b#ki#d#ki#f#ki#o#ki#r#ki#v#ki#x#ki#}#ki$Q#ki$S#ki%`#ki%|#ki%}#ki&R#ki&S#ki&h#ki&i#ki&l#ki&o#ki&s#ki&t#ki&u#ki%b#ki%f#ki~Ov){OP#niX#nih#nij#niq#niu#nix#ni!R#ni!S#ni!V#ni!W#ni!Z#ni!_#ni!j#ni!u#ni!v#ni!w#ni#O#ni#Q#ni#S#ni#U#ni#W#ni#[#ni#^#ni#a#ni#b#ni#d#ni#f#ni#o#ni#r#ni#v#ni#x#ni#}#ni$Q#ni$S#ni%`#ni%|#ni%}#ni&R#ni&S#ni&h#ni&i#ni&l#ni&o#ni&s#ni&t#ni&u#ni%b#ni%f#ni~OX)}Op&}a~P'ZO|*OOp&}a~O|*OOp&}a~P$gOp*SO~O%a*WO~Ov*ZO#s'iO#t*YOP#qiX#qih#qij#qiq#qiu#qix#qi!R#qi!S#qi!V#qi!W#qi!Z#qi!_#qi!j#qi!u#qi!v#qi!w#qi#O#qi#Q#qi#S#qi#U#qi#W#qi#[#qi#^#qi#a#qi#b#qi#d#qi#f#qi#o#qi#r#qi#v#qi#x#qi#}#qi$Q#qi$S#qi%`#qi%|#qi%}#qi&R#qi&S#qi&h#qi&i#qi&l#qi&o#qi&s#qi&t#qi&u#qi%b#qi%f#qi~OX*^Oq0zOx1YO}$wO~P'ZOq0zOx1YO}'Oa~P'ZO|*bO}'Oa~OX*fOc*gOi*jO&O*hO&SWO~O}$wO'R*lO~Oj'pO~Oj!nO}$wO~O%c*qO~O%c*sO~OX%[Oc%[Oq0zOx1YOi&ca~P'ZO|*vOi&ca~Oq0zOx1YO}*yO!Y&fa~P'ZO|*zO!Y&fa~Oq0zOx1YO|*zO}*}O!Y&fa~P'ZOq0zOx1YO|*zO!Y&fa~P'ZO|*zO}*}O!Y&fa~Oo0{Op0{Oq1UOr1VOilimliuli|li!Vli!Wli&Yli!Yli}li!^li#jli%cli%fli!Sli#_livli!nli&Xli~On0}O~P!JzOnli~P!JzOX(_Oi+SOq0zOx1YO~P'ZOp+UO~Oi+SO|+WO~Oi+XO~OX(_Oq0zOx1YO!Y&ai~P'ZO|+YO!Y&ai~O!Y+ZO~OX(nOq0zOx1YO!^&[i#j&[i%c&[i%f&[ii&[i}&[i!n&[i&X&[i~P'ZO|+^O!V%qO!W%pO!^&bi~O|+aO!^&[i#j&[i%c&[i%f&[ii&[i}&[i!n&[i&X&[i~O!^+bO~Oc+dOq0zOx1YO!^&bi~P'ZO|+^O!^&bi~O!^+fO~OX+hOq0zOx1YO}&pa!^&pa!n&pa~P'ZO|+iO}&pa!^&pa!n&pa~O!_+lO&r+mO!^!oX~O!^+oO~O}({O!^+pO~O}({O!^+qO~O}({O!^+rO~O}({O!^+sO~OX&dOquOxvO}%uq!{%uq#j%uq%c%uq%f%uq&X%uq~P'ZO|$yi}$yi!{$yi#j$yi%c$yi%f$yi&X$yi~P$gOX&dOquOxvO~P'ZOX&dOq0zOx1YO#j%ua%c%ua%f%ua&X%ua~P'ZO|+tO#j%ua%c%ua%f%ua&X%ua~O|$la#j$la%c$la%f$lap$la~P$gO#j&^i%c&^i%f&^ip&^i~P'ZO|+wO#j#Zq%c#Zq%f#Zq~O|+xO#_+zO#j&yX%c&yX%f&yXi&yX~OX+|Oj)jO&SWO~O&SWO#j&zi%c&zi%f&zi~Oq0zOx1YO#j&vi%c&vi%f&vi}&vi~P'ZO}$[O|#hX!Y#hX~O|,QO!Y&{X~O!Y,SO~Ov,VO#m)yOP#kqX#kqh#kqj#kqq#kqu#kqx#kq!R#kq!S#kq!V#kq!W#kq!Z#kq!_#kq!j#kq!u#kq!v#kq!w#kq#O#kq#Q#kq#S#kq#U#kq#W#kq#[#kq#^#kq#a#kq#b#kq#d#kq#f#kq#o#kq#r#kq#v#kq#x#kq#}#kq$Q#kq$S#kq%`#kq%|#kq%}#kq&R#kq&S#kq&h#kq&i#kq&l#kq&o#kq&s#kq&t#kq&u#kq%b#kq%f#kq~Op%Ta|%Ta~P$gOX)}Op&}i~P'ZO|,^Op&}i~O|,hO}$wO#_,hO~O#t,jOP#qqX#qqh#qqj#qqq#qqu#qqx#qq!R#qq!S#qq!V#qq!W#qq!Z#qq!_#qq!j#qq!u#qq!v#qq!w#qq#O#qq#Q#qq#S#qq#U#qq#W#qq#[#qq#^#qq#a#qq#b#qq#d#qq#f#qq#o#qq#r#qq#v#qq#x#qq#}#qq$Q#qq$S#qq%`#qq%|#qq%}#qq&R#qq&S#qq&h#qq&i#qq&l#qq&o#qq&s#qq&t#qq&u#qq%b#qq%f#qq~O#_,kO|%Va}%Va~Oq0zOx1YO}'Oi~P'ZO|,mO}'Oi~O}$[O&X,oOi'QX|'QX~O&SWOi'QX|'QX~O|,sOi'PX~Oi,uO~O%a,xO~O!V%qO!W%pOi&di|&di~OX%[Oc%[Oq0zOx1YOi&ci~P'ZO},{O|$oa!Y$oa~Oq0zOx1YO},|O|$oa!Y$oa~P'ZOq0zOx1YO}*yO!Y&fi~P'ZO|-PO!Y&fi~Oq0zOx1YO|-PO!Y&fi~P'ZO|-PO}-SO!Y&fi~Oi$ki|$ki!Y$ki~P$gOX(_Oq0zOx1YO~P'ZOp-UO~OX(_Oi-VOq0zOx1YO~P'ZOX(_Oq0zOx1YO!Y&aq~P'ZO|$ji!^$ji#j$ji%c$ji%f$jii$ji}$ji!n$ji&X$ji~P$gOX(nOq0zOx1YO~P'ZOc+dOq0zOx1YO!^&bq~P'ZO|-WO!^&bq~O!^-XO~OX(nOq0zOx1YO!^&[q#j&[q%c&[q%f&[qi&[q}&[q!n&[q&X&[q~P'ZO}-YO~OX+hOq0zOx1YO}&pi!^&pi!n&pi~P'ZO|-_O}&pi!^&pi!n&pi~O!_+lO&r+mO!^!oa~OX&dOq0zOx1YO#j%ui%c%ui%f%ui&X%ui~P'ZO|-bO#j%ui%c%ui%f%ui&X%ui~O&SWO#j&ya%c&ya%f&yai&ya~O|-eO#j&ya%c&ya%f&yai&ya~Oi-hO~OX)rOc)rO&SWO!Y&{a~O|-jO!Y&{a~Op%Ti|%Ti~P$gOX)}O~P'ZOX)}Op&}q~P'ZOv-nOP#pyX#pyh#pyj#pyq#pyu#pyx#py!R#py!S#py!V#py!W#py!Z#py!_#py!j#py!u#py!v#py!w#py#O#py#Q#py#S#py#U#py#W#py#[#py#^#py#a#py#b#py#d#py#f#py#o#py#r#py#v#py#x#py#}#py$Q#py$S#py%`#py%|#py%}#py&R#py&S#py&h#py&i#py&l#py&o#py&s#py&t#py&u#py%b#py%f#py~O%b-rO%f-rO~P`O#t-sOP#qyX#qyh#qyj#qyq#qyu#qyx#qy!R#qy!S#qy!V#qy!W#qy!Z#qy!_#qy!j#qy!u#qy!v#qy!w#qy#O#qy#Q#qy#S#qy#U#qy#W#qy#[#qy#^#qy#a#qy#b#qy#d#qy#f#qy#o#qy#r#qy#v#qy#x#qy#}#qy$Q#qy$S#qy%`#qy%|#qy%}#qy&R#qy&S#qy&h#qy&i#qy&l#qy&o#qy&s#qy&t#qy&u#qy%b#qy%f#qy~O|-vO}$wO#_-vO~Oq0zOx1YO}'Oq~P'ZO|-yO}'Oq~O&X,oOi'Qa|'Qa~OX*fOc*gO&O*hO&SWOi'Pa~O|-}Oi'Pa~O$V.RO~OX%[Oc%[Oq0zOx1YO~P'ZOq0zOx1YO}.SO|$oi!Y$oi~P'ZOq0zOx1YO|$oi!Y$oi~P'ZO}.SO|$oi!Y$oi~Oq0zOx1YO}*yO~P'ZOq0zOx1YO}*yO!Y&fq~P'ZO|.VO!Y&fq~Oq0zOx1YO|.VO!Y&fq~P'ZOu.YO!V%qO!W%pOi&]q!Y&]q!^&]q|&]q~P!.TOc+dOq0zOx1YO!^&by~P'ZO|$mi!^$mi~P$gOc+dOq0zOx1YO~P'ZOX+hOq0zOx1YO~P'ZOX+hOq0zOx1YO}&pq!^&pq!n&pq~P'ZO}({O!^.^O!n._O~OX&dOq0zOx1YO#j%uq%c%uq%f%uq&X%uq~P'ZO#_.`O|%Oa#j%Oa%c%Oa%f%Oai%Oa~O&SWO#j&yi%c&yi%f&yii&yi~O|.bO#j&yi%c&yi%f&yii&yi~OX)rOc)rO&SWO!Y&{i~Ov.fOP#p!RX#p!Rh#p!Rj#p!Rq#p!Ru#p!Rx#p!R!R#p!R!S#p!R!V#p!R!W#p!R!Z#p!R!_#p!R!j#p!R!u#p!R!v#p!R!w#p!R#O#p!R#Q#p!R#S#p!R#U#p!R#W#p!R#[#p!R#^#p!R#a#p!R#b#p!R#d#p!R#f#p!R#o#p!R#r#p!R#v#p!R#x#p!R#}#p!R$Q#p!R$S#p!R%`#p!R%|#p!R%}#p!R&R#p!R&S#p!R&h#p!R&i#p!R&l#p!R&o#p!R&s#p!R&t#p!R&u#p!R%b#p!R%f#p!R~Oq0zOx1YO}'Oy~P'ZOX*fOc*gO&O*hO&SWOi'Pi~O$V.RO%b.nO%f.nO~OX.xOj.vO!Z.uO!_.wO!j.qO!v.sO!w.sO%}.pO&SWO&h]O&i^O&l_O~Oq0zOx1YO|$oq!Y$oq~P'ZO}.}O|$oq!Y$oq~Oq0zOx1YO}*yO!Y&fy~P'ZO|/OO!Y&fy~Oq0zOx/SO~P'ZOu.YO!V%qO!W%pOi&]y!Y&]y!^&]y|&]y~P!.TO}({O!^/VO~O&SWO#j&yq%c&yq%f&yqi&yq~O|/XO#j&yq%c&yq%f&yqi&yq~OX*fOc*gO&O*hO&SWO~Oj/^O!h/[O|$WX#_$WX%w$WXi$WX~Ou$WX}$WX!Y$WX!^$WX~P$&lO%|/`O%}/`Ou$XX|$XX}$XX#_$XX%w$XX!Y$XXi$XX!^$XX~O!j/bO~O|/fO#_/hO%w/cOu'SX}'SX!Y'SXi'SX~Oc/kO~P$!|Oj/^Ou'TX|'TX}'TX#_'TX%w'TX!Y'TXi'TX!^'TX~Ou/oO}$wO~Oq0zOx1YO|$oy!Y$oy~P'ZOq0zOx1YO}*yO!Y&f!R~P'ZO|/sO!Y&f!R~Oi&`Xu&`X!V&`X!W&`X!Y&`X!^&`X|&`X~P!.TOu.YO!V%qO!W%pOi&_a!Y&_a!^&_a|&_a~O&SWO#j&yy%c&yy%f&yyi&yy~O!h/[Oj$_au$_a|$_a}$_a#_$_a%w$_a!Y$_ai$_a!^$_a~O!j/|O~O%|/`O%}/`Ou$Xa|$Xa}$Xa#_$Xa%w$Xa!Y$Xai$Xa!^$Xa~O%w/cOu$]a|$]a}$]a#_$]a!Y$]ai$]a!^$]a~Ou'Sa}'Sa!Y'Sai'Sa~P$!pO|0ROu'Sa}'Sa!Y'Sai'Sa~O!Y0UO~Oi0UO~O}0WO~O!^0XO~Oq0zOx1YO}*yO!Y&f!Z~P'ZO}0[O~O&X0]O~P$&lO|0^O#_/hO%w/cOi'VX~O|0^Oi'VX~Oi0`O~O!j0aO~O#_/hOu%Za|%Za}%Za%w%Za!Y%Zai%Za!^%Za~O#_/hO%w/cOu%_a|%_a}%_a!Y%_ai%_a~Ou'Si}'Si!Y'Sii'Si~P$!pO|0cO#_/hO%w/cO!^'Ua~O}$ga~P$gOi'Va~P$!pO|0kOi'Va~Oc0mO!^'Ui~P$!|O|0oO!^'Ui~O|0oO#_/hO%w/cO!^'Ui~O#_/hO%w/cOi$ei|$ei~O&X0rO~P$&lO#_/hO%w/cOi%^a|%^a~Oi'Vi~P$!pO}0uO~Oc0mO!^'Uq~P$!|O|0wO!^'Uq~O#_/hO%w/cO|%]i!^%]i~Oc0mO~P$!|Oc0mO!^'Uy~P$!|O#_/hO%w/cOi$fi|$fi~O#_/hO%w/cO|%]q!^%]q~O|+tO#j%ua%c%ua%f%ua&X%ua~P$gOX&dOq0zOx1YO~P'ZOp1PO~Oq1PO~P'ZO}1QO~Ov1RO~P!.TO&i&l&t&u&h&o&s&S&h~",
  goto: "!?b'WPPPPPPPP'XP'a*|+f,P,k-W-tP.cP'a/S/S'aPPP'a2oPPPPPP2o5fPP5fP7y8S>fPP>i?Z?^PP'a'aPP?vPP'a'aPP'a'a'a'a'a?z@t'aP@wP@}EXHxPH|IYI^IbIf'aPPPIjIs'XP'X'XP'XP'XP'XP'XP'X'X'XP'XPP'XPP'XP'XPIyJVJ_PJfJlPJfPJfJfPPPJfPLzPMTM_MeLzPJfMnPJfPMuM{PNPNe! S! mNPNP! s!!QNPNPNPNP!!f!!l!!o!!t!!w!#R!#X!#e!#w!#}!$X!$_!${!%R!%X!%_!%i!%o!%u!%{!&R!&X!&k!&u!&{!'R!'X!'c!'i!'o!'u!'{!(V!(]!(g!(m!(v!(|!)]!)e!)o!)vPPPPPPPPPPPPPPPPP!)|!*P!*V!*`!*j!*uPPPPPPPPPPPP!/l!1Q!5T!8hPP!8p!9S!9]!:U!9{!:_!:e!:h!:k!:n!:v!;gPPPPPPPPP!;j!;yPPPP!<i!<u!=R!=X!=b!=e!=h!=n!=t!=z!=}P!>V!>`!?[!?_]jOs#v$w*W,d(TeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)V)X)a)d)p)w)y)}*O*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+d+h+i+l+t+v+w,O,],^,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/o/s0[0z0{0|0}1P1Q1R1S1T1V1Z}!hQ#r$P$b$q$}%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!P!iQ#r$P$b$q$}%S%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!R!jQ#r$P$b$q$}%S%T%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!T!kQ#r$P$b$q$}%S%T%U%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!V!lQ#r$P$b$q$}%S%T%U%V%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!X!mQ#r$P$b$q$}%S%T%U%V%W%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O!]!mQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1O(TTOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)V)X)a)d)p)w)y)}*O*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+d+h+i+l+t+v+w,O,],^,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/o/s0[0z0{0|0}1P1Q1R1S1T1V1Z&iVOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)V)X)a)p)w)y*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+h+i+l+t+w,O,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/s0[0z0{0|0}1P1Q1R1S1V1Z%sXOYZ[isw}!O!S!U!V!Z!n!p#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)V)X)a)p)w)y*S*W*^*b*l*v*y*z*}+T+W+Y+]+^+a+h+i+l+t+w,O,d,l,m,p,z,{,|-O-P-S-W-Y-[-^-_-b-y-{.S.V.}/O/s1Q1R1SQ$VvQ/t/SR1W1Y'zeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(R(T(U(Y(_(a(e(i(n(o(u(x)V)X)a)d)p)w)y)}*O*S*W*^*b*l*y*z*}+T+U+W+Y+]+^+a+d+h+i+l+t+v+w,O,],^,d,l,m,p,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/o/s0[0z0{0|0}1P1Q1R1S1T1V1ZW#ym!P!Q$hW$Rv&q/S1YQ$j!RQ$n!TQ${![Q$|!]W%Z!n(O*v,zS&p$S$TQ'e$vQ)Y&jQ)h'QU)i'S)j)kU)l'U)m+}W)s'Y,Q-j.dQ*d'nW*e'p,s-}.lQ,P)rS,r*f*gY-d+x-e.a.b/XQ-g+zQ-t,hQ-x,kQ.j-vl.o.R.u.v.x/d/f/k0R0W0]0b0m0r0uQ/W.`Q/l.wQ/x/^Q0T/hU0h0^0k0sX0n0c0o0v0wR&o$R!_!|YZ!U!V!p%a%m%t(R(T(U(a(i)y*y*z*}+T+W+Y,{,|-O-P-S.S.V.}/O/sR%k!{Q#QYQ&W#cQ&Z#gQ&]#jQ&_#mQ&x$^Q&{$aR-`+lT/R.Y0[![!oQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1OQ&m#zQ't$|R*p'uR'}%ZQ%d!rR/v/[(SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)V)X)a)d)p)w)y)}*O*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+d+h+i+l+t+v+w,O,],^,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/o/s0[0z0{0|0}1P1Q1R1S1T1V1ZS#pd#q!P.s.R.u.v.w.x/^/d/f/k0R0W0]0^0b0c0k0m0o0r0s0u0v0w(SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)V)X)a)d)p)w)y)}*O*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+d+h+i+l+t+v+w,O,],^,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/o/s0[0z0{0|0}1P1Q1R1S1T1V1ZT#pd#qT#d`#ee(|&W&Z&]&_)O)Q)S)U-`._T+m({+nT#ha#iT#kb#lT#nc#oQ$`xQ,P)sR,q*eX$^x$_$`&zQ'[$nQ'r${Q'u$|R*V'eQ)t'YV-i,Q-j.dZlOs$w*W,dXpOs*W,dQ$x!YQ']$oQ'^$pQ'o$zQ's$|Q*T'dQ*['iQ*_'jQ*`'kQ*m'qS*o't'uQ,W)yQ,Y)zQ,Z){Q,_*RS,a*U*nQ,e*YQ,f*ZS,g*]*^Q,w*pQ-l,VQ-m,XQ-o,`S-p,b,cQ-u,iQ-w,jQ.e-nQ.g-qQ.h-sQ.i-tQ/Y.fQ/Z.jQ/p.{R0Z/qWpOs*W,dR#|oQ'q${S*U'e'rR,c*VQ,p*eR-{,qQ*n'qQ,b*UR-q,cZnOos*W,dQ'w$}R*r'xT.P,x.Qu.z.R.u.v.x/^/d/f/k0R0W0]0^0b0k0m0r0s0ut.z.R.u.v.x/^/d/f/k0R0W0]0^0b0k0m0r0s0uQ/l.wX0n0c0o0v0w!P.r.R.u.v.w.x/^/d/f/k0R0W0]0^0b0c0k0m0o0r0s0u0v0wQ/a.qR/}/bg/d.t/e/y0Q0V0e0g0i0t0x0yu.y.R.u.v.x/^/d/f/k0R0W0]0^0b0k0m0r0s0uX/_.o.y/x0hR/z/^V0j0^0k0sR/q.{QsOS$Os,dR,d*WQ&r$UR)_&rS%z#W$WS(p%z(sT(s%}&tQ%n#OQ%u#SW(b%n%u(g(kQ(g%rR(k%wQ&}$bR)e&}Q(v&OQ+_(qT+e(v+_Q(P%]R*w(PS(S%`%aY*{(S*|-Q.W/PU*|(T(U(VU-Q*}+O+PS.W-R-SR/P.XQ#_^R&R#_Q#b_R&T#bQ#e`R&X#eQ(y&US+j(y+kR+k(zQ+n({R-a+nQ#iaR&[#iQ#lbR&^#lQ#ocR&`#oQ#qdR&a#qQ#tgQ&c#rW&f#t&c)b+uQ)b&wR+u1OQ$_xS&y$_&zR&z$`Q'X$lR)q'XQ&k#yR)Z&kQ$h!QR'R$hQ+y)iS-f+y.cR.c-gQ'V$jR)n'VQ,R)tR-k,RQ#wkR&h#wQ)x']R,U)xQ'`$qS*P'`*QR*Q'aQ'h$xR*X'hQ'm$yS*c'm,nR,n*dQ,t*iR.O,tWoOs*W,dR#{oQ.Q,xR.m.Qd/e.t/y0Q0V0e0g0i0t0x0yR0P/eU/].o/x0hR/w/]Q0d0VS0p0d0qR0q0eS0_/y/zR0l0_Q/g.tR0S/gR!`PXrOs*W,dWqOs*W,dR'f$wYkOs$w*W,dR&g#v[xOs#v$w*W,dR&x$^&hQOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)V)X)a)p)w)y*S*W*^*b*l*v*y*z*}+T+U+W+Y+]+^+a+h+i+l+t+w,O,d,l,m,p,z,{,|-O-P-S-U-W-Y-[-^-_-b-y-{.S.V.Y.}/O/s0[0z0{0|0}1P1Q1R1S1V1ZQ!sTQ#rfQ$PtU$by%p(eS$q!W$tQ$}!^Q%S!hQ%T!iQ%U!jQ%V!kQ%W!lQ%X!mQ%r#PQ%w#TQ%}#XQ&O#YQ&t$XQ'a$rQ'x%OQ)W&dU)c&|)d+vW)|'_*O,],^Q+R(_Q+[(nQ,[)}Q-Z+dQ0Y/oR1O1TQ#OYQ#SZQ$o!UQ$p!VQ%`!pQ(V%a^(^%m%t(a(i+T+W+Y^*x(R*z-O-P.V/O/sQ+O(TQ+P(UQ,X)yQ,}*yQ-R*}Q.T,{Q.U,|Q.X-SQ.|.SR/r.}[gOs#v$w*W,d!^!{YZ!U!V!p%a%m%t(R(T(U(a(i)y*y*z*}+T+W+Y,{,|-O-P-S.S.V.}/O/sQ#W[Q#uiS$Ww}Q$e!OW$l!S$a'b*SS$y!Z$uW%Y!n(O*v,zY&U#c#g#j#m+l`&e#s&b)V)X)a+t-b1SQ&u$YQ&v$[Q&w$^Q'{%[Q(]%kW(m%y(o+]+aQ(q%{Q(z&VQ)]&oS)`&s1QQ)f'OQ)g'PU)o'W)p,OQ)v'ZQ*]'iY*a'l*b,l,m-yQ*t'}S+Q(Y1RW+c(u+^-W-[W+g(x+i-^-_Q,T)wQ,i*^Q,v*lQ-]+hQ-c+wQ-z,pQ.]-YR.k-{hUOs#s#v$w&b&s(Y)V)X*W,d%Y!zYZ[iw}!O!S!U!V!Z!n!p#c#g#j#m$Y$[$^$a$u%[%a%k%m%t%y%{&V&o'O'P'W'Z'b'i'l'}(O(R(T(U(a(i(o(u(x)a)p)w)y*S*^*b*l*v*y*z*}+T+W+Y+]+^+a+h+i+l+t+w,O,l,m,p,z,{,|-O-P-S-W-Y-[-^-_-b-y-{.S.V.}/O/s1Q1R1SQ$QuW%e!t!x0{1VQ%f!uQ%g!vQ%i!yQ%s0zS(X%h1PQ(Z0|Q([0}Q-T+UQ.[-US/Q.Y0[R1X1ZU$Uv/S1YR)^&q[hOs#v$w*W,da!}Y#c#g#j#m$^$a+lQ#][Q$ZwR$d}Q%o#OQ%v#SQ%|#WQ'{%YQ(h%rQ(l%wQ(t%}Q(w&OQ+`(qQ,y*tQ.Z-TQ/U.[R/u/TQ$cyQ(d%pR+V(eQ/T.YR0f0[R#VZR#[[R%_!nQ%]!nV*u(O*v,z!]!qQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)W)c)|+R+[,[-Z0Y1OR%b!pQ&W#cQ&Z#gQ&]#jQ&_#mR-`+lQ(}&WQ)P&ZQ)R&]Q)T&_Q+p)OQ+q)QQ+r)SQ+s)UQ.^-`R/V._Q$m!SQ&{$aQ*R'bR,`*SQ#zmQ$f!PQ$i!QR'T$hQ)h'SR+|)kQ)h'SQ+{)jR+|)kR$k!RR)u'YXqOs*W,dQ$s!WR'c$tQ$z!ZR'd$uR*k'pQ*i'pV-|,s-}.lQ.{.RQ/i.uR/j.vU.t.R.u.vQ/n.xQ/y/^Q0O/dU0Q/f0R0bQ0V/kQ0e0WQ0g0]U0i0^0k0sQ0t0mQ0x0rR0y0uR/m.wR/{/^",
  nodeNames: "⚠ print { { { { Comment Script AssignStatement * BinaryExpression BitOp BitOp BitOp BitOp ArithOp ArithOp @ ArithOp ** UnaryExpression ArithOp BitOp AwaitExpression await ) ( ParenthesizedExpression BinaryExpression or and CompareOp in not is UnaryExpression ConditionalExpression if else LambdaExpression lambda ParamList VariableName AssignOp , : NamedExpression AssignOp YieldExpression yield from TupleExpression ComprehensionExpression async for LambdaExpression ] [ ArrayExpression ArrayComprehensionExpression } { DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression CallExpression ArgList AssignOp MemberExpression . PropertyName Number String FormatString FormatReplacement FormatConversion FormatSpec FormatReplacement FormatReplacement FormatReplacement FormatReplacement ContinuedString Ellipsis None Boolean TypeDef AssignOp UpdateStatement UpdateOp ExpressionStatement DeleteStatement del PassStatement pass BreakStatement break ContinueStatement continue ReturnStatement return YieldStatement PrintStatement RaiseStatement raise ImportStatement import as ScopeStatement global nonlocal AssertStatement assert TypeDefinition type TypeParamList TypeParam StatementGroup ; IfStatement Body elif WhileStatement while ForStatement TryStatement try except finally WithStatement with FunctionDefinition def ParamList AssignOp TypeDef ClassDefinition class DecoratedStatement Decorator At MatchStatement match MatchBody MatchClause case CapturePattern LiteralPattern ArithOp ArithOp AsPattern OrPattern LogicOp AttributePattern SequencePattern MappingPattern StarPattern ClassPattern PatternArgList KeywordPattern KeywordPattern Guard",
  maxTerm: 283,
  context: trackIndent,
  nodeProps: [
    ["group", -15, 8, 88, 90, 91, 93, 95, 97, 99, 101, 102, 103, 105, 108, 111, 113, "Statement Statement", -22, 10, 20, 23, 27, 42, 51, 52, 58, 59, 62, 63, 64, 65, 66, 69, 72, 73, 74, 82, 83, 84, 85, "Expression", -10, 117, 119, 122, 124, 125, 129, 131, 136, 138, 141, "Statement", -9, 146, 147, 150, 151, 153, 154, 155, 156, 157, "Pattern"],
    ["openedBy", 25, "(", 56, "[", 60, "{"],
    ["closedBy", 26, ")", 57, "]", 61, "}"]
  ],
  propSources: [pythonHighlighting],
  skippedNodes: [0, 6],
  repeatNodeCount: 38,
  tokenData: "%-W#sR!`OX%TXY=|Y[%T[]=|]p%Tpq=|qr@_rsDOst!+|tu%Tuv!Nnvw#!|wx#$Wxy#:Uyz#;Yz{#<^{|#>x|}#@S}!O#AW!O!P#Ci!P!Q#N_!Q!R$!y!R![$&w![!]$1e!]!^$3s!^!_$4w!_!`$7c!`!a$8m!a!b%T!b!c$;U!c!d$<b!d!e$>W!e!h$<b!h!i$H[!i!t$<b!t!u%#r!u!w$<b!w!x$Fl!x!}$<b!}#O%%z#O#P?d#P#Q%'O#Q#R%(S#R#S$<b#S#T%T#T#U$<b#U#V$>W#V#Y$<b#Y#Z$H[#Z#f$<b#f#g%#r#g#i$<b#i#j$Fl#j#o$<b#o#p%)^#p#q%*S#q#r%+^#r#s%,S#s$g%T$g;'S$<b;'S;=`$>Q<%lO$<b!n%^]&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n&^]&r!b&jSOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n'^]&r!b&jSOr%Trs(Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!f(^Z&r!b&jSOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)UZ&r!bOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)|Z&r!bOw(Vwx*ox#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!b*tT&r!bO#o*o#p#q*o#r;'S*o;'S;=`+T<%lO*o!b+WP;=`<%l*o!f+`W&r!bO#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`.d;=`<%l+x<%lO(VS+}V&jSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS,gVOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-PUOw+xx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-fRO;'S+x;'S;=`-o;=`O+xS-tW&jSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l+x<%lO+xS.aP;=`<%l+x!f.iW&jSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l(V<%lO+x!f/UP;=`<%l(V!n/`]&r!b&mWOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n0`]&r!b&mWOr%Trs&Vsw%Twx1Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!j1`Z&r!b&mWOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j2WZ&r!bOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3OZ&r!bOr1Xrs*os#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3vW&r!bO#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`6z;=`<%l4`<%lO1XW4eV&mWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W4}VOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5gUOr4`s#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5|RO;'S4`;'S;=`6V;=`O4`W6[W&mWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l4`<%lO4`W6wP;=`<%l4`!j7PW&mWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l1X<%lO4`!j7lP;=`<%l1X!n7tW&r!bO#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T[8eX&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9VX&jSOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9wX&jSOr8^rs+xsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[:iX&mWOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;ZX&mWOr8^rs9Qsw8^wx4`x#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;yRO;'S8^;'S;=`<S;=`O8^[<ZY&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l8^<%lO8^[<|P;=`<%l8^!n=WY&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l%T<%lO8^!n=yP;=`<%l%T#s>Xc&r!b&jS&mW%p!TOX%TXY=|Y[%T[]=|]p%Tpq=|qr%Trs&Vsw%Twx/Xx#O%T#O#P?d#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s?i[&r!bOY%TYZ=|Z]%T]^=|^#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T!q@hd&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#T%T#T#UBz#U#f%T#f#gBz#g#hBz#h#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qBR]oR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qCV]!nR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cDXa&r!b&jS&hsOYE^YZ%TZ]E^]^%T^rE^rs!)|swE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cEia&r!b&jS&mW&hsOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cFw]&r!b&jS&hsOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cGya&r!b&mW&hsOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxIOx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cIXa&r!b&mW&hsOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxJ^x#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#_Jg_&r!b&mW&hsOYJ^YZ1XZ]J^]^1X^rJ^rsKfs#OJ^#O#PL`#P#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`!!o<%lOJ^#_KmZ&r!b&hsOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#_LeW&r!bO#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`! r;=`<%lL}<%lOJ^{MUZ&mW&hsOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l<%lOL}{M|V&hsOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`{NfRO;'SL};'S;=`No;=`OL}{Nv[&mW&hsOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lL}<%lOL}{! oP;=`<%lL}#_! y[&mW&hsOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lJ^<%lOL}#_!!rP;=`<%lJ^#c!!zW&r!bO#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!(q;=`<%l!#d<%lOE^!P!#m]&jS&mW&hsOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!$mX&jS&hsOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P!%a]&mW&hsOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!&Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!&a]&mW&hsOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwxL}x#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!']RO;'S!#d;'S;=`!'f;=`O!#d!P!'o^&jS&mW&hsOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%l!#d<%lO!#d!P!(nP;=`<%l!#d#c!(z^&jS&mW&hsOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%lE^<%lO!#d#c!)yP;=`<%lE^#c!*V]&r!b&jS&hsOr%Trs!+Osw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c!+ZZ&nW&r!b&jS&lsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#s!,XaU!T&r!b&jS&mWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!-gaU!T&r!b&jSOY!+|YZ%TZ]!+|]^%T^r!+|rs!.lsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!.uaU!T&r!b&jSOY!+|YZ%TZ]!+|]^%T^r!+|rs!/zsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#k!0T_U!T&r!b&jSOY!/zYZ(VZ]!/z]^(V^w!/zwx!1Sx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!1Z_U!T&r!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!2Yx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!2a_U!T&r!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!3`x#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#g!3gZU!T&r!bOY!3`YZ*oZ]!3`]^*o^#o!3`#o#p!4Y#p#q!3`#q#r!4Y#r;'S!3`;'S;=`!4t<%lO!3`!T!4_TU!TOY!4YZ]!4Y^;'S!4Y;'S;=`!4n<%lO!4Y!T!4qP;=`<%l!4Y#g!4wP;=`<%l!3`#k!5R[U!T&r!bOY!/zYZ(VZ]!/z]^(V^#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!9s;=`<%l+x<%lO!/z!X!6OZU!T&jSOY!5wYZ+xZ]!5w]^+x^w!5wwx!6qx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!6vZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!7ix#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!7nZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!4Yx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!8fWU!TOY!5wYZ+xZ]!5w]^+x^;'S!5w;'S;=`!9O;=`<%l+x<%lO!5w!X!9TW&jSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!5w<%lO+x!X!9pP;=`<%l!5w#k!9xW&jSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!/z<%lO+x#k!:eP;=`<%l!/z#s!:qaU!T&r!b&mWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!;vx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!<PaU!T&r!b&mWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!=Ux#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#o!=__U!T&r!b&mWOY!=UYZ1XZ]!=U]^1X^r!=Urs!>^s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!>e_U!T&r!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!?ds#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!?k_U!T&r!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!3`s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!@q[U!T&r!bOY!=UYZ1XZ]!=U]^1X^#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!Ec;=`<%l4`<%lO!=U!]!AnZU!T&mWOY!AgYZ4`Z]!Ag]^4`^r!Agrs!Bas#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!BfZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!CXs#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!C^ZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!4Ys#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!DUWU!TOY!AgYZ4`Z]!Ag]^4`^;'S!Ag;'S;=`!Dn;=`<%l4`<%lO!Ag!]!DsW&mWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!Ag<%lO4`!]!E`P;=`<%l!Ag#o!EhW&mWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!=U<%lO4`#o!FTP;=`<%l!=U#s!F_[U!T&r!bOY!+|YZ%TZ]!+|]^%T^#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Mq;=`<%l8^<%lO!+|!a!G^]U!T&jS&mWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!H^]U!T&jSOY!GTYZ8^Z]!GT]^8^^r!GTrs!IVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!I^]U!T&jSOY!GTYZ8^Z]!GT]^8^^r!GTrs!5wsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!J^]U!T&mWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!KVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!K^]U!T&mWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!Agx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!L[WU!TOY!GTYZ8^Z]!GT]^8^^;'S!GT;'S;=`!Lt;=`<%l8^<%lO!GT!a!L{Y&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!GT<%lO8^!a!MnP;=`<%l!GT#s!MxY&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!+|<%lO8^#s!NkP;=`<%l!+|#b!Ny_&PQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b#!T]!{r&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b##X_%yQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#$aa&r!b&mW&hsOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#8Ux#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#%qa&r!b&jS&mW&hsOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#'Pa&r!b&jS&hsOY#%fYZ%TZ]#%f]^%T^r#%frs#(Usw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#(_a&r!b&jS&hsOY#%fYZ%TZ]#%f]^%T^r#%frs#)dsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#Z#)m_&r!b&jS&hsOY#)dYZ(VZ]#)d]^(V^w#)dwx#*lx#O#)d#O#P#+f#P#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#/u<%lO#)d#Z#*sZ&r!b&hsOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#Z#+kW&r!bO#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#.x;=`<%l#,T<%lO#)dw#,[Z&jS&hsOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r<%lO#,Tw#-SV&hsOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xw#-lRO;'S#,T;'S;=`#-u;=`O#,Tw#-|[&jS&hsOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#,T<%lO#,Tw#.uP;=`<%l#,T#Z#/P[&jS&hsOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#)d<%lO#,T#Z#/xP;=`<%l#)d#c#0U]&r!b&mW&hsOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#1SW&r!bO#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#6y;=`<%l#1l<%lO#%f!P#1u]&jS&mW&hsOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#2u]&jS&hsOY#1lYZ8^Z]#1l]^8^^r#1lrs#3nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#3u]&jS&hsOY#1lYZ8^Z]#1l]^8^^r#1lrs#,Tsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#4uX&mW&hsOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P#5eRO;'S#1l;'S;=`#5n;=`O#1l!P#5w^&jS&mW&hsOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#1l<%lO#1l!P#6vP;=`<%l#1l#c#7S^&jS&mW&hsOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#%f<%lO#1l#c#8RP;=`<%l#%f#c#8_]&r!b&mW&hsOr%Trs&Vsw%Twx#9Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#9cZ&kS&r!b&mW&isOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#c#:a]js&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#;e]iR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#<iaXs&r!b&jS&mWOr%Trs&Vsw%Twx/Xxz%Tz{#=n{!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#=y_cR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#?T_%|s&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#@_]|R&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s#Ac`%}s&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`!a#Be!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#O#Bp]'R`&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Cta!hQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!O%T!O!P#Dy!P!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#ES_&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!O%T!O!P#FR!P#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#F^]!us&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Gbi!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#GV#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#IYc&r!b&jS&mWOr%Trs&Vsw%Twx/Xx{%T{|#Je|}%T}!O#Je!O!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Jn_&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Kxe!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#Km#S#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Mf]!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Nja&OR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!P%T!P!Q$ o!Q!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$ z_&QQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$#Uw!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!d%T!d!e$(w!e!g%T!g!h#IP!h!l%T!l!m#MZ!m!q%T!q!r$+m!r!z%T!z!{$.]!{#O%T#O#P7o#P#R%T#R#S$&w#S#U%T#U#V$(w#V#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#c%T#c#d$+m#d#l%T#l#m$.]#m#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$%x_&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$'Sk!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S$&w#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$)Qb&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$*eb!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$+va&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$-Wa!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$.fe&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$0Se!jq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$1p_}!T&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`$2o!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q$2z]&YR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$4O]#js&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$5SaoR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!^%T!^!_$6X!_!`Av!`!aAv!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$6d_%zQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$7n_&Xs&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$8x`oR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`!a$9z!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$:V_%{Q&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$;c_aQ$QP&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$<oe&r!b&jS&mW&g`&SsOr%Trs&Vsw%Twx/Xx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$>TP;=`<%l$<b#s$>ei&r!b&jS&mW&g`&SsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g$Fl#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$@]a&r!b&jS&hsOYE^YZ%TZ]E^]^%T^rE^rs$AbswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#c$Ak]&r!b&jS&hsOr%Trs$Bdsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$BmZ&r!b&jS&lsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$Cia&r!b&mW&hsOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx$Dnx#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c$Dw]&r!b&mW&hsOr%Trs&Vsw%Twx$Epx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_$EyZ&r!b&mW&isOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s$Fye&r!b&jS&mW&g`&SsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$Hii&r!b&jS&mW&g`&SsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!t$<b!t!u%!S!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g%!S#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$Ja]&r!b&jS&ssOr%Trs$KYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$Ka]&r!b&jSOr%Trs$LYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$LcZ&r!b&jS&usOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$M_]&r!b&mW&osOr%Trs&Vsw%Twx$NWx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$N_]&r!b&mWOr%Trs&Vsw%Twx% Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_% aZ&r!b&mW&tsOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s%!ae&r!b&jS&mW&g`&SsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s%$Pm&r!b&jS&mW&g`&SsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!h$<b!h!i%!S!i!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#U$<b#U#V$Fl#V#Y$<b#Y#Z%!S#Z#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c%&V]!Zs&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%'Z]!YR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b%(__%xQ&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a%)gX!_#T&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#c%*__%wR&r!b&jS&mWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%+gX!^!e&jS&mWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#a%,_]&Rq&r!b&jS&mWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T",
  tokenizers: [legacyPrint, indentation, newlines, formatString1, formatString2, formatString1l, formatString2l, 0, 1, 2, 3, 4, 5, 6],
  topRules: { "Script": [0, 7] },
  specialized: [{ term: 234, get: (value) => spec_identifier[value] || -1 }],
  tokenPrec: 7372
});
const cache = /* @__PURE__ */ new NodeWeakMap();
const ScopeNodes = /* @__PURE__ */ new Set([
  "Script",
  "Body",
  "FunctionDefinition",
  "ClassDefinition",
  "LambdaExpression",
  "ForStatement",
  "MatchClause"
]);
function defID(type) {
  return (node, def, outer) => {
    if (outer)
      return false;
    let id = node.node.getChild("VariableName");
    if (id)
      def(id, type);
    return true;
  };
}
const gatherCompletions = {
  FunctionDefinition: /* @__PURE__ */ defID("function"),
  ClassDefinition: /* @__PURE__ */ defID("class"),
  ForStatement(node, def, outer) {
    if (outer)
      for (let child = node.node.firstChild; child; child = child.nextSibling) {
        if (child.name == "VariableName")
          def(child, "variable");
        else if (child.name == "in")
          break;
      }
  },
  ImportStatement(_node, def) {
    var _a, _b;
    let { node } = _node;
    let isFrom = ((_a = node.firstChild) === null || _a === void 0 ? void 0 : _a.name) == "from";
    for (let ch = node.getChild("import"); ch; ch = ch.nextSibling) {
      if (ch.name == "VariableName" && ((_b = ch.nextSibling) === null || _b === void 0 ? void 0 : _b.name) != "as")
        def(ch, isFrom ? "variable" : "namespace");
    }
  },
  AssignStatement(node, def) {
    for (let child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == "VariableName")
        def(child, "variable");
      else if (child.name == ":" || child.name == "AssignOp")
        break;
    }
  },
  ParamList(node, def) {
    for (let prev = null, child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == "VariableName" && (!prev || !/\*|AssignOp/.test(prev.name)))
        def(child, "variable");
      prev = child;
    }
  },
  CapturePattern: /* @__PURE__ */ defID("variable"),
  AsPattern: /* @__PURE__ */ defID("variable"),
  __proto__: null
};
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached)
    return cached;
  let completions = [], top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if (gather && gather(node2, def, top) || !top && ScopeNodes.has(node2.name))
        return false;
      top = false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node))
        completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}
const Identifier = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/;
const dontComplete = ["String", "FormatString", "Comment", "PropertyName"];
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1)
    return null;
  let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
  if (!isWord && !context.explicit)
    return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name))
      options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier
  };
}
const globals = /* @__PURE__ */ [
  "__annotations__",
  "__builtins__",
  "__debug__",
  "__doc__",
  "__import__",
  "__name__",
  "__loader__",
  "__package__",
  "__spec__",
  "False",
  "None",
  "True"
].map((n) => ({ label: n, type: "constant" })).concat(/* @__PURE__ */ [
  "ArithmeticError",
  "AssertionError",
  "AttributeError",
  "BaseException",
  "BlockingIOError",
  "BrokenPipeError",
  "BufferError",
  "BytesWarning",
  "ChildProcessError",
  "ConnectionAbortedError",
  "ConnectionError",
  "ConnectionRefusedError",
  "ConnectionResetError",
  "DeprecationWarning",
  "EOFError",
  "Ellipsis",
  "EncodingWarning",
  "EnvironmentError",
  "Exception",
  "FileExistsError",
  "FileNotFoundError",
  "FloatingPointError",
  "FutureWarning",
  "GeneratorExit",
  "IOError",
  "ImportError",
  "ImportWarning",
  "IndentationError",
  "IndexError",
  "InterruptedError",
  "IsADirectoryError",
  "KeyError",
  "KeyboardInterrupt",
  "LookupError",
  "MemoryError",
  "ModuleNotFoundError",
  "NameError",
  "NotADirectoryError",
  "NotImplemented",
  "NotImplementedError",
  "OSError",
  "OverflowError",
  "PendingDeprecationWarning",
  "PermissionError",
  "ProcessLookupError",
  "RecursionError",
  "ReferenceError",
  "ResourceWarning",
  "RuntimeError",
  "RuntimeWarning",
  "StopAsyncIteration",
  "StopIteration",
  "SyntaxError",
  "SyntaxWarning",
  "SystemError",
  "SystemExit",
  "TabError",
  "TimeoutError",
  "TypeError",
  "UnboundLocalError",
  "UnicodeDecodeError",
  "UnicodeEncodeError",
  "UnicodeError",
  "UnicodeTranslateError",
  "UnicodeWarning",
  "UserWarning",
  "ValueError",
  "Warning",
  "ZeroDivisionError"
].map((n) => ({ label: n, type: "type" }))).concat(/* @__PURE__ */ [
  "bool",
  "bytearray",
  "bytes",
  "classmethod",
  "complex",
  "float",
  "frozenset",
  "int",
  "list",
  "map",
  "memoryview",
  "object",
  "range",
  "set",
  "staticmethod",
  "str",
  "super",
  "tuple",
  "type"
].map((n) => ({ label: n, type: "class" }))).concat(/* @__PURE__ */ [
  "abs",
  "aiter",
  "all",
  "anext",
  "any",
  "ascii",
  "bin",
  "breakpoint",
  "callable",
  "chr",
  "compile",
  "delattr",
  "dict",
  "dir",
  "divmod",
  "enumerate",
  "eval",
  "exec",
  "exit",
  "filter",
  "format",
  "getattr",
  "globals",
  "hasattr",
  "hash",
  "help",
  "hex",
  "id",
  "input",
  "isinstance",
  "issubclass",
  "iter",
  "len",
  "license",
  "locals",
  "max",
  "min",
  "next",
  "oct",
  "open",
  "ord",
  "pow",
  "print",
  "property",
  "quit",
  "repr",
  "reversed",
  "round",
  "setattr",
  "slice",
  "sorted",
  "sum",
  "vars",
  "zip"
].map((n) => ({ label: n, type: "function" })));
const snippets = [
  /* @__PURE__ */ snippetCompletion("def ${name}(${params}):\n	${}", {
    label: "def",
    detail: "function",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for ${name} in ${collection}:\n	${}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("while ${}:\n	${}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("try:\n	${}\nexcept ${error}:\n	${}", {
    label: "try",
    detail: "/ except block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if ${}:\n	\n", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if ${}:\n	${}\nelse:\n	${}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("class ${name}:\n	def __init__(self, ${params}):\n			${}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("import ${module}", {
    label: "import",
    detail: "statement",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("from ${module} import ${names}", {
    label: "from",
    detail: "import",
    type: "keyword"
  })
];
const globalCompletion = /* @__PURE__ */ ifNotIn(dontComplete, /* @__PURE__ */ completeFromList(/* @__PURE__ */ globals.concat(snippets)));
function innerBody(context) {
  let { node, pos } = context;
  let lineIndent = context.lineIndent(pos, -1);
  let found = null;
  for (; ; ) {
    let before = node.childBefore(pos);
    if (!before) {
      break;
    } else if (before.name == "Comment") {
      pos = before.from;
    } else if (before.name == "Body" || before.name == "MatchBody") {
      if (context.baseIndentFor(before) + context.unit <= lineIndent)
        found = before;
      node = before;
    } else if (before.name == "MatchClause") {
      node = before;
    } else if (before.type.is("Statement")) {
      node = before;
    } else {
      break;
    }
  }
  return found;
}
function indentBody(context, node) {
  let base = context.baseIndentFor(node);
  let line = context.lineAt(context.pos, -1), to = line.from + line.text.length;
  if (/^\s*($|#)/.test(line.text) && context.node.to < to + 100 && !/\S/.test(context.state.sliceDoc(to, context.node.to)) && context.lineIndent(context.pos, -1) <= base)
    return null;
  if (/^\s*(else:|elif |except |finally:|case\s+[^=:]+:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base)
    return null;
  return base + context.unit;
}
const pythonLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "python",
  parser: /* @__PURE__ */ parser.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Body: (context) => {
          var _a;
          let inner = innerBody(context);
          return (_a = indentBody(context, inner || context.node)) !== null && _a !== void 0 ? _a : context.continue();
        },
        MatchBody: (context) => {
          var _a;
          let inner = innerBody(context);
          return (_a = indentBody(context, inner || context.node)) !== null && _a !== void 0 ? _a : context.continue();
        },
        IfStatement: (cx) => /^\s*(else:|elif )/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        "ForStatement WhileStatement": (cx) => /^\s*else:/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        TryStatement: (cx) => /^\s*(except |finally:|else:)/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        MatchStatement: (cx) => {
          if (/^\s*case /.test(cx.textAfter))
            return cx.baseIndent + cx.unit;
          return cx.continue();
        },
        "TupleExpression ComprehensionExpression ParamList ArgList ParenthesizedExpression": /* @__PURE__ */ delimitedIndent({ closing: ")" }),
        "DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "}" }),
        "ArrayExpression ArrayComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "]" }),
        "String FormatString": () => null,
        Script: (context) => {
          var _a;
          let inner = innerBody(context);
          return (_a = inner && indentBody(context, inner)) !== null && _a !== void 0 ? _a : context.continue();
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "ArrayExpression DictionaryExpression SetExpression TupleExpression": foldInside,
        Body: (node, state) => ({ from: node.from + 1, to: node.to - (node.to == state.doc.length ? 0 : 1) })
      })
    ]
  }),
  languageData: {
    closeBrackets: {
      brackets: ["(", "[", "{", "'", '"', "'''", '"""'],
      stringPrefixes: [
        "f",
        "fr",
        "rf",
        "r",
        "u",
        "b",
        "br",
        "rb",
        "F",
        "FR",
        "RF",
        "R",
        "U",
        "B",
        "BR",
        "RB"
      ]
    },
    commentTokens: { line: "#" },
    // Indent logic logic are triggered upon below input patterns
    indentOnInput: /^\s*([\}\]\)]|else:|elif |except |finally:|case\s+[^:]*:?)$/
  }
});
function python() {
  return new LanguageSupport(pythonLanguage, [
    pythonLanguage.data.of({ autocomplete: localCompletionSource }),
    pythonLanguage.data.of({ autocomplete: globalCompletion })
  ]);
}

export { globalCompletion, localCompletionSource, python, pythonLanguage };
//# sourceMappingURL=index29-C72UrLvT.js.map
