import{_ as g,d as ot,g as mt,s as kt,b as _t,c as xt,p as vt,o as bt,v as wt,e as St,x as Lt,j as G,V as Et}from"./mermaid.core-C7TtMA4K.js";import{o as At}from"./ordinal-BeghXfj9.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";import"./step-bAaxMov6.js";import"./init-Dmth1JHB.js";function Tt(t){for(var n=t.length/6|0,i=new Array(n),a=0;a<n;)i[a]="#"+t.slice(a*6,++a*6);return i}const Mt=Tt("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");function at(t,n){let i;if(n===void 0)for(const a of t)a!=null&&(i<a||i===void 0&&a>=a)&&(i=a);else{let a=-1;for(let h of t)(h=n(h,++a,t))!=null&&(i<h||i===void 0&&h>=h)&&(i=h)}return i}function dt(t,n){let i;if(n===void 0)for(const a of t)a!=null&&(i>a||i===void 0&&a>=a)&&(i=a);else{let a=-1;for(let h of t)(h=n(h,++a,t))!=null&&(i>h||i===void 0&&h>=h)&&(i=h)}return i}function J(t,n){let i=0;if(n===void 0)for(let a of t)(a=+a)&&(i+=a);else{let a=-1;for(let h of t)(h=+n(h,++a,t))&&(i+=h)}return i}function Nt(t){return t.target.depth}function It(t){return t.depth}function Pt(t,n){return n-1-t.height}function gt(t,n){return t.sourceLinks.length?t.depth:n-1}function Ct(t){return t.targetLinks.length?t.depth:t.sourceLinks.length?dt(t.sourceLinks,Nt)-1:0}function Y(t){return function(){return t}}function lt(t,n){return H(t.source,n.source)||t.index-n.index}function ct(t,n){return H(t.target,n.target)||t.index-n.index}function H(t,n){return t.y0-n.y0}function tt(t){return t.value}function Ot(t){return t.index}function Dt(t){return t.nodes}function $t(t){return t.links}function ut(t,n){const i=t.get(n);if(!i)throw new Error("missing: "+n);return i}function ht({nodes:t}){for(const n of t){let i=n.y0,a=i;for(const h of n.sourceLinks)h.y0=i+h.width/2,i+=h.width;for(const h of n.targetLinks)h.y1=a+h.width/2,a+=h.width}}function jt(){let t=0,n=0,i=1,a=1,h=24,b=8,p,k=Ot,s=gt,o,l,_=Dt,x=$t,y=6;function v(){const e={nodes:_.apply(null,arguments),links:x.apply(null,arguments)};return M(e),T(e),N(e),C(e),S(e),ht(e),e}v.update=function(e){return ht(e),e},v.nodeId=function(e){return arguments.length?(k=typeof e=="function"?e:Y(e),v):k},v.nodeAlign=function(e){return arguments.length?(s=typeof e=="function"?e:Y(e),v):s},v.nodeSort=function(e){return arguments.length?(o=e,v):o},v.nodeWidth=function(e){return arguments.length?(h=+e,v):h},v.nodePadding=function(e){return arguments.length?(b=p=+e,v):b},v.nodes=function(e){return arguments.length?(_=typeof e=="function"?e:Y(e),v):_},v.links=function(e){return arguments.length?(x=typeof e=="function"?e:Y(e),v):x},v.linkSort=function(e){return arguments.length?(l=e,v):l},v.size=function(e){return arguments.length?(t=n=0,i=+e[0],a=+e[1],v):[i-t,a-n]},v.extent=function(e){return arguments.length?(t=+e[0][0],i=+e[1][0],n=+e[0][1],a=+e[1][1],v):[[t,n],[i,a]]},v.iterations=function(e){return arguments.length?(y=+e,v):y};function M({nodes:e,links:f}){for(const[c,r]of e.entries())r.index=c,r.sourceLinks=[],r.targetLinks=[];const u=new Map(e.map((c,r)=>[k(c,r,e),c]));for(const[c,r]of f.entries()){r.index=c;let{source:m,target:w}=r;typeof m!="object"&&(m=r.source=ut(u,m)),typeof w!="object"&&(w=r.target=ut(u,w)),m.sourceLinks.push(r),w.targetLinks.push(r)}if(l!=null)for(const{sourceLinks:c,targetLinks:r}of e)c.sort(l),r.sort(l)}function T({nodes:e}){for(const f of e)f.value=f.fixedValue===void 0?Math.max(J(f.sourceLinks,tt),J(f.targetLinks,tt)):f.fixedValue}function N({nodes:e}){const f=e.length;let u=new Set(e),c=new Set,r=0;for(;u.size;){for(const m of u){m.depth=r;for(const{target:w}of m.sourceLinks)c.add(w)}if(++r>f)throw new Error("circular link");u=c,c=new Set}}function C({nodes:e}){const f=e.length;let u=new Set(e),c=new Set,r=0;for(;u.size;){for(const m of u){m.height=r;for(const{source:w}of m.targetLinks)c.add(w)}if(++r>f)throw new Error("circular link");u=c,c=new Set}}function $({nodes:e}){const f=at(e,r=>r.depth)+1,u=(i-t-h)/(f-1),c=new Array(f);for(const r of e){const m=Math.max(0,Math.min(f-1,Math.floor(s.call(null,r,f))));r.layer=m,r.x0=t+m*u,r.x1=r.x0+h,c[m]?c[m].push(r):c[m]=[r]}if(o)for(const r of c)r.sort(o);return c}function B(e){const f=dt(e,u=>(a-n-(u.length-1)*p)/J(u,tt));for(const u of e){let c=n;for(const r of u){r.y0=c,r.y1=c+r.value*f,c=r.y1+p;for(const m of r.sourceLinks)m.width=m.value*f}c=(a-c+p)/(u.length+1);for(let r=0;r<u.length;++r){const m=u[r];m.y0+=c*(r+1),m.y1+=c*(r+1)}A(u)}}function S(e){const f=$(e);p=Math.min(b,(a-n)/(at(f,u=>u.length)-1)),B(f);for(let u=0;u<y;++u){const c=Math.pow(.99,u),r=Math.max(1-c,(u+1)/y);z(f,c,r),P(f,c,r)}}function P(e,f,u){for(let c=1,r=e.length;c<r;++c){const m=e[c];for(const w of m){let L=0,R=0;for(const{source:U,value:Z}of w.targetLinks){let W=Z*(w.layer-U.layer);L+=j(U,w)*W,R+=W}if(!(R>0))continue;let F=(L/R-w.y0)*f;w.y0+=F,w.y1+=F,E(w)}o===void 0&&m.sort(H),O(m,u)}}function z(e,f,u){for(let c=e.length,r=c-2;r>=0;--r){const m=e[r];for(const w of m){let L=0,R=0;for(const{target:U,value:Z}of w.sourceLinks){let W=Z*(U.layer-w.layer);L+=I(w,U)*W,R+=W}if(!(R>0))continue;let F=(L/R-w.y0)*f;w.y0+=F,w.y1+=F,E(w)}o===void 0&&m.sort(H),O(m,u)}}function O(e,f){const u=e.length>>1,c=e[u];d(e,c.y0-p,u-1,f),D(e,c.y1+p,u+1,f),d(e,a,e.length-1,f),D(e,n,0,f)}function D(e,f,u,c){for(;u<e.length;++u){const r=e[u],m=(f-r.y0)*c;m>1e-6&&(r.y0+=m,r.y1+=m),f=r.y1+p}}function d(e,f,u,c){for(;u>=0;--u){const r=e[u],m=(r.y1-f)*c;m>1e-6&&(r.y0-=m,r.y1-=m),f=r.y0-p}}function E({sourceLinks:e,targetLinks:f}){if(l===void 0){for(const{source:{sourceLinks:u}}of f)u.sort(ct);for(const{target:{targetLinks:u}}of e)u.sort(lt)}}function A(e){if(l===void 0)for(const{sourceLinks:f,targetLinks:u}of e)f.sort(ct),u.sort(lt)}function j(e,f){let u=e.y0-(e.sourceLinks.length-1)*p/2;for(const{target:c,width:r}of e.sourceLinks){if(c===f)break;u+=r+p}for(const{source:c,width:r}of f.targetLinks){if(c===e)break;u-=r}return u}function I(e,f){let u=f.y0-(f.targetLinks.length-1)*p/2;for(const{source:c,width:r}of f.targetLinks){if(c===e)break;u+=r+p}for(const{target:c,width:r}of e.sourceLinks){if(c===f)break;u-=r}return u}return v}var et=Math.PI,nt=2*et,V=1e-6,zt=nt-V;function it(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function pt(){return new it}it.prototype=pt.prototype={constructor:it,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,i,a){this._+="Q"+ +t+","+ +n+","+(this._x1=+i)+","+(this._y1=+a)},bezierCurveTo:function(t,n,i,a,h,b){this._+="C"+ +t+","+ +n+","+ +i+","+ +a+","+(this._x1=+h)+","+(this._y1=+b)},arcTo:function(t,n,i,a,h){t=+t,n=+n,i=+i,a=+a,h=+h;var b=this._x1,p=this._y1,k=i-t,s=a-n,o=b-t,l=p-n,_=o*o+l*l;if(h<0)throw new Error("negative radius: "+h);if(this._x1===null)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(_>V)if(!(Math.abs(l*k-s*o)>V)||!h)this._+="L"+(this._x1=t)+","+(this._y1=n);else{var x=i-b,y=a-p,v=k*k+s*s,M=x*x+y*y,T=Math.sqrt(v),N=Math.sqrt(_),C=h*Math.tan((et-Math.acos((v+_-M)/(2*T*N)))/2),$=C/N,B=C/T;Math.abs($-1)>V&&(this._+="L"+(t+$*o)+","+(n+$*l)),this._+="A"+h+","+h+",0,0,"+ +(l*x>o*y)+","+(this._x1=t+B*k)+","+(this._y1=n+B*s)}},arc:function(t,n,i,a,h,b){t=+t,n=+n,i=+i,b=!!b;var p=i*Math.cos(a),k=i*Math.sin(a),s=t+p,o=n+k,l=1^b,_=b?a-h:h-a;if(i<0)throw new Error("negative radius: "+i);this._x1===null?this._+="M"+s+","+o:(Math.abs(this._x1-s)>V||Math.abs(this._y1-o)>V)&&(this._+="L"+s+","+o),i&&(_<0&&(_=_%nt+nt),_>zt?this._+="A"+i+","+i+",0,1,"+l+","+(t-p)+","+(n-k)+"A"+i+","+i+",0,1,"+l+","+(this._x1=s)+","+(this._y1=o):_>V&&(this._+="A"+i+","+i+",0,"+ +(_>=et)+","+l+","+(this._x1=t+i*Math.cos(h))+","+(this._y1=n+i*Math.sin(h))))},rect:function(t,n,i,a){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +i+"v"+ +a+"h"+-i+"Z"},toString:function(){return this._}};function ft(t){return function(){return t}}function Bt(t){return t[0]}function Rt(t){return t[1]}var Vt=Array.prototype.slice;function Ft(t){return t.source}function Ut(t){return t.target}function Wt(t){var n=Ft,i=Ut,a=Bt,h=Rt,b=null;function p(){var k,s=Vt.call(arguments),o=n.apply(this,s),l=i.apply(this,s);if(b||(b=k=pt()),t(b,+a.apply(this,(s[0]=o,s)),+h.apply(this,s),+a.apply(this,(s[0]=l,s)),+h.apply(this,s)),k)return b=null,k+""||null}return p.source=function(k){return arguments.length?(n=k,p):n},p.target=function(k){return arguments.length?(i=k,p):i},p.x=function(k){return arguments.length?(a=typeof k=="function"?k:ft(+k),p):a},p.y=function(k){return arguments.length?(h=typeof k=="function"?k:ft(+k),p):h},p.context=function(k){return arguments.length?(b=k??null,p):b},p}function Gt(t,n,i,a,h){t.moveTo(n,i),t.bezierCurveTo(n=(n+a)/2,i,n,h,a,h)}function Yt(){return Wt(Gt)}function Ht(t){return[t.source.x1,t.y0]}function Xt(t){return[t.target.x0,t.y1]}function qt(){return Yt().source(Ht).target(Xt)}var st=function(){var t=g(function(k,s,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=s);return o},"o"),n=[1,9],i=[1,10],a=[1,5,10,12],h={trace:g(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SANKEY:4,NEWLINE:5,csv:6,opt_eof:7,record:8,csv_tail:9,EOF:10,"field[source]":11,COMMA:12,"field[target]":13,"field[value]":14,field:15,escaped:16,non_escaped:17,DQUOTE:18,ESCAPED_TEXT:19,NON_ESCAPED_TEXT:20,$accept:0,$end:1},terminals_:{2:"error",4:"SANKEY",5:"NEWLINE",10:"EOF",11:"field[source]",12:"COMMA",13:"field[target]",14:"field[value]",18:"DQUOTE",19:"ESCAPED_TEXT",20:"NON_ESCAPED_TEXT"},productions_:[0,[3,4],[6,2],[9,2],[9,0],[7,1],[7,0],[8,5],[15,1],[15,1],[16,3],[17,1]],performAction:g(function(s,o,l,_,x,y,v){var M=y.length-1;switch(x){case 7:const T=_.findOrCreateNode(y[M-4].trim().replaceAll('""','"')),N=_.findOrCreateNode(y[M-2].trim().replaceAll('""','"')),C=parseFloat(y[M].trim());_.addLink(T,N,C);break;case 8:case 9:case 11:this.$=y[M];break;case 10:this.$=y[M-1];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:4,8:5,15:6,16:7,17:8,18:n,20:i},{1:[2,6],7:11,10:[1,12]},t(i,[2,4],{9:13,5:[1,14]}),{12:[1,15]},t(a,[2,8]),t(a,[2,9]),{19:[1,16]},t(a,[2,11]),{1:[2,1]},{1:[2,5]},t(i,[2,2]),{6:17,8:5,15:6,16:7,17:8,18:n,20:i},{15:18,16:7,17:8,18:n,20:i},{18:[1,19]},t(i,[2,3]),{12:[1,20]},t(a,[2,10]),{15:21,16:7,17:8,18:n,20:i},t([1,5,10],[2,7])],defaultActions:{11:[2,1],12:[2,5]},parseError:g(function(s,o){if(o.recoverable)this.trace(s);else{var l=new Error(s);throw l.hash=o,l}},"parseError"),parse:g(function(s){var o=this,l=[0],_=[],x=[null],y=[],v=this.table,M="",T=0,N=0,C=2,$=1,B=y.slice.call(arguments,1),S=Object.create(this.lexer),P={yy:{}};for(var z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,z)&&(P.yy[z]=this.yy[z]);S.setInput(s,P.yy),P.yy.lexer=S,P.yy.parser=this,typeof S.yylloc>"u"&&(S.yylloc={});var O=S.yylloc;y.push(O);var D=S.options&&S.options.ranges;typeof P.yy.parseError=="function"?this.parseError=P.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function d(L){l.length=l.length-2*L,x.length=x.length-L,y.length=y.length-L}g(d,"popStack");function E(){var L;return L=_.pop()||S.lex()||$,typeof L!="number"&&(L instanceof Array&&(_=L,L=_.pop()),L=o.symbols_[L]||L),L}g(E,"lex");for(var A,j,I,e,f={},u,c,r,m;;){if(j=l[l.length-1],this.defaultActions[j]?I=this.defaultActions[j]:((A===null||typeof A>"u")&&(A=E()),I=v[j]&&v[j][A]),typeof I>"u"||!I.length||!I[0]){var w="";m=[];for(u in v[j])this.terminals_[u]&&u>C&&m.push("'"+this.terminals_[u]+"'");S.showPosition?w="Parse error on line "+(T+1)+`:
`+S.showPosition()+`
Expecting `+m.join(", ")+", got '"+(this.terminals_[A]||A)+"'":w="Parse error on line "+(T+1)+": Unexpected "+(A==$?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(w,{text:S.match,token:this.terminals_[A]||A,line:S.yylineno,loc:O,expected:m})}if(I[0]instanceof Array&&I.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+A);switch(I[0]){case 1:l.push(A),x.push(S.yytext),y.push(S.yylloc),l.push(I[1]),A=null,N=S.yyleng,M=S.yytext,T=S.yylineno,O=S.yylloc;break;case 2:if(c=this.productions_[I[1]][1],f.$=x[x.length-c],f._$={first_line:y[y.length-(c||1)].first_line,last_line:y[y.length-1].last_line,first_column:y[y.length-(c||1)].first_column,last_column:y[y.length-1].last_column},D&&(f._$.range=[y[y.length-(c||1)].range[0],y[y.length-1].range[1]]),e=this.performAction.apply(f,[M,N,T,P.yy,I[1],x,y].concat(B)),typeof e<"u")return e;c&&(l=l.slice(0,-1*c*2),x=x.slice(0,-1*c),y=y.slice(0,-1*c)),l.push(this.productions_[I[1]][0]),x.push(f.$),y.push(f._$),r=v[l[l.length-2]][l[l.length-1]],l.push(r);break;case 3:return!0}}return!0},"parse")},b=function(){var k={EOF:1,parseError:g(function(o,l){if(this.yy.parser)this.yy.parser.parseError(o,l);else throw new Error(o)},"parseError"),setInput:g(function(s,o){return this.yy=o||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:g(function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var o=s.match(/(?:\r\n?|\n).*/g);return o?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),s},"input"),unput:g(function(s){var o=s.length,l=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-o),this.offset-=o;var _=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var x=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===_.length?this.yylloc.first_column:0)+_[_.length-l.length].length-l[0].length:this.yylloc.first_column-o},this.options.ranges&&(this.yylloc.range=[x[0],x[0]+this.yyleng-o]),this.yyleng=this.yytext.length,this},"unput"),more:g(function(){return this._more=!0,this},"more"),reject:g(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:g(function(s){this.unput(this.match.slice(s))},"less"),pastInput:g(function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:g(function(){var s=this.match;return s.length<20&&(s+=this._input.substr(0,20-s.length)),(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:g(function(){var s=this.pastInput(),o=new Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+o+"^"},"showPosition"),test_match:g(function(s,o){var l,_,x;if(this.options.backtrack_lexer&&(x={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(x.yylloc.range=this.yylloc.range.slice(0))),_=s[0].match(/(?:\r\n?|\n).*/g),_&&(this.yylineno+=_.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:_?_[_.length-1].length-_[_.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],l=this.performAction.call(this,this.yy,this,o,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var y in x)this[y]=x[y];return!1}return!1},"test_match"),next:g(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var s,o,l,_;this._more||(this.yytext="",this.match="");for(var x=this._currentRules(),y=0;y<x.length;y++)if(l=this._input.match(this.rules[x[y]]),l&&(!o||l[0].length>o[0].length)){if(o=l,_=y,this.options.backtrack_lexer){if(s=this.test_match(l,x[y]),s!==!1)return s;if(this._backtrack){o=!1;continue}else return!1}else if(!this.options.flex)break}return o?(s=this.test_match(o,x[_]),s!==!1?s:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:g(function(){var o=this.next();return o||this.lex()},"lex"),begin:g(function(o){this.conditionStack.push(o)},"begin"),popState:g(function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:g(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:g(function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},"topState"),pushState:g(function(o){this.begin(o)},"pushState"),stateStackSize:g(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:g(function(o,l,_,x){switch(_){case 0:return this.pushState("csv"),4;case 1:return 10;case 2:return 5;case 3:return 12;case 4:return this.pushState("escaped_text"),18;case 5:return 20;case 6:return this.popState("escaped_text"),18;case 7:return 19}},"anonymous"),rules:[/^(?:sankey-beta\b)/i,/^(?:$)/i,/^(?:((\u000D\u000A)|(\u000A)))/i,/^(?:(\u002C))/i,/^(?:(\u0022))/i,/^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i,/^(?:(\u0022)(?!(\u0022)))/i,/^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i],conditions:{csv:{rules:[1,2,3,4,5,6,7],inclusive:!1},escaped_text:{rules:[6,7],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7],inclusive:!0}}};return k}();h.lexer=b;function p(){this.yy={}}return g(p,"Parser"),p.prototype=h,h.Parser=p,new p}();st.parser=st;var X=st,Q=[],K=[],q=new Map,Qt=g(()=>{Q=[],K=[],q=new Map,wt()},"clear"),Kt=class{constructor(t,n,i=0){this.source=t,this.target=n,this.value=i}static{g(this,"SankeyLink")}},Zt=g((t,n,i)=>{Q.push(new Kt(t,n,i))},"addLink"),Jt=class{constructor(t){this.ID=t}static{g(this,"SankeyNode")}},te=g(t=>{t=St.sanitizeText(t,ot());let n=q.get(t);return n===void 0&&(n=new Jt(t),q.set(t,n),K.push(n)),n},"findOrCreateNode"),ee=g(()=>K,"getNodes"),ne=g(()=>Q,"getLinks"),ie=g(()=>({nodes:K.map(t=>({id:t.ID})),links:Q.map(t=>({source:t.source.ID,target:t.target.ID,value:t.value}))}),"getGraph"),se={nodesMap:q,getConfig:g(()=>ot().sankey,"getConfig"),getNodes:ee,getLinks:ne,getGraph:ie,addLink:Zt,findOrCreateNode:te,getAccTitle:mt,setAccTitle:kt,getAccDescription:_t,setAccDescription:xt,getDiagramTitle:vt,setDiagramTitle:bt,clear:Qt},yt=class rt{static{g(this,"Uid")}static{this.count=0}static next(n){return new rt(n+ ++rt.count)}constructor(n){this.id=n,this.href=`#${n}`}toString(){return"url("+this.href+")"}},re={left:It,right:Pt,center:Ct,justify:gt},oe=g(function(t,n,i,a){const{securityLevel:h,sankey:b}=ot(),p=Lt.sankey;let k;h==="sandbox"&&(k=G("#i"+n));const s=h==="sandbox"?G(k.nodes()[0].contentDocument.body):G("body"),o=h==="sandbox"?s.select(`[id="${n}"]`):G(`[id="${n}"]`),l=b?.width??p.width,_=b?.height??p.width,x=b?.useMaxWidth??p.useMaxWidth,y=b?.nodeAlignment??p.nodeAlignment,v=b?.prefix??p.prefix,M=b?.suffix??p.suffix,T=b?.showValues??p.showValues,N=a.db.getGraph(),C=re[y];jt().nodeId(d=>d.id).nodeWidth(10).nodePadding(10+(T?15:0)).nodeAlign(C).extent([[0,0],[l,_]])(N);const S=At(Mt);o.append("g").attr("class","nodes").selectAll(".node").data(N.nodes).join("g").attr("class","node").attr("id",d=>(d.uid=yt.next("node-")).id).attr("transform",function(d){return"translate("+d.x0+","+d.y0+")"}).attr("x",d=>d.x0).attr("y",d=>d.y0).append("rect").attr("height",d=>d.y1-d.y0).attr("width",d=>d.x1-d.x0).attr("fill",d=>S(d.id));const P=g(({id:d,value:E})=>T?`${d}
${v}${Math.round(E*100)/100}${M}`:d,"getText");o.append("g").attr("class","node-labels").attr("font-size",14).selectAll("text").data(N.nodes).join("text").attr("x",d=>d.x0<l/2?d.x1+6:d.x0-6).attr("y",d=>(d.y1+d.y0)/2).attr("dy",`${T?"0":"0.35"}em`).attr("text-anchor",d=>d.x0<l/2?"start":"end").text(P);const z=o.append("g").attr("class","links").attr("fill","none").attr("stroke-opacity",.5).selectAll(".link").data(N.links).join("g").attr("class","link").style("mix-blend-mode","multiply"),O=b?.linkColor??"gradient";if(O==="gradient"){const d=z.append("linearGradient").attr("id",E=>(E.uid=yt.next("linearGradient-")).id).attr("gradientUnits","userSpaceOnUse").attr("x1",E=>E.source.x1).attr("x2",E=>E.target.x0);d.append("stop").attr("offset","0%").attr("stop-color",E=>S(E.source.id)),d.append("stop").attr("offset","100%").attr("stop-color",E=>S(E.target.id))}let D;switch(O){case"gradient":D=g(d=>d.uid,"coloring");break;case"source":D=g(d=>S(d.source.id),"coloring");break;case"target":D=g(d=>S(d.target.id),"coloring");break;default:D=O}z.append("path").attr("d",qt()).attr("stroke",D).attr("stroke-width",d=>Math.max(1,d.width)),Et(void 0,o,0,x)},"draw"),ae={draw:oe},le=g(t=>t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g,"").replaceAll(/([\n\r])+/g,`
`).trim(),"prepareTextForParsing"),ce=g(t=>`.label {
      font-family: ${t.fontFamily};
    }`,"getStyles"),ue=ce,he=X.parse.bind(X);X.parse=t=>he(le(t));var ke={styles:ue,parser:X,db:se,renderer:ae};export{ke as diagram};
//# sourceMappingURL=sankeyDiagram-3MH5UGAL-CRAb_NPi.js.map
