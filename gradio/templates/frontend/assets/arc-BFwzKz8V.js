import{w as ln,p as an,c as H,s as j,a as B,h as un,e as g,t as tn,b as L,m as _,d as rn,f as o,g as sn,i as on,j as fn}from"./step-bAaxMov6.js";function cn(l){return l.innerRadius}function gn(l){return l.outerRadius}function yn(l){return l.startAngle}function dn(l){return l.endAngle}function mn(l){return l&&l.padAngle}function pn(l,h,E,q,v,A,C,a){var I=E-l,i=q-h,n=C-v,d=a-A,u=d*I-n*i;if(!(u*u<g))return u=(n*(h-A)-d*(l-v))/u,[l+u*I,h+u*i]}function W(l,h,E,q,v,A,C){var a=l-E,I=h-q,i=(C?A:-A)/L(a*a+I*I),n=i*I,d=-i*a,u=l+n,s=h+d,f=E+n,c=q+d,F=(u+f)/2,t=(s+c)/2,m=f-u,y=c-s,R=m*m+y*y,T=v-A,P=u*c-f*s,O=(y<0?-1:1)*L(fn(0,T*T*R-P*P)),S=(P*y-m*O)/R,z=(-P*m-y*O)/R,w=(P*y+m*O)/R,p=(-P*m+y*O)/R,x=S-F,e=z-t,r=w-F,G=p-t;return x*x+e*e>r*r+G*G&&(S=w,z=p),{cx:S,cy:z,x01:-n,y01:-d,x11:S*(v/T-1),y11:z*(v/T-1)}}function hn(){var l=cn,h=gn,E=B(0),q=null,v=yn,A=dn,C=mn,a=null,I=ln(i);function i(){var n,d,u=+l.apply(this,arguments),s=+h.apply(this,arguments),f=v.apply(this,arguments)-un,c=A.apply(this,arguments)-un,F=rn(c-f),t=c>f;if(a||(a=n=I()),s<u&&(d=s,s=u,u=d),!(s>g))a.moveTo(0,0);else if(F>tn-g)a.moveTo(s*H(f),s*j(f)),a.arc(0,0,s,f,c,!t),u>g&&(a.moveTo(u*H(c),u*j(c)),a.arc(0,0,u,c,f,t));else{var m=f,y=c,R=f,T=c,P=F,O=F,S=C.apply(this,arguments)/2,z=S>g&&(q?+q.apply(this,arguments):L(u*u+s*s)),w=_(rn(s-u)/2,+E.apply(this,arguments)),p=w,x=w,e,r;if(z>g){var G=sn(z/u*j(S)),M=sn(z/s*j(S));(P-=G*2)>g?(G*=t?1:-1,R+=G,T-=G):(P=0,R=T=(f+c)/2),(O-=M*2)>g?(M*=t?1:-1,m+=M,y-=M):(O=0,m=y=(f+c)/2)}var J=s*H(m),K=s*j(m),N=u*H(T),Q=u*j(T);if(w>g){var U=s*H(y),V=s*j(y),X=u*H(R),Y=u*j(R),D;if(F<an)if(D=pn(J,K,X,Y,U,V,N,Q)){var Z=J-D[0],$=K-D[1],b=U-D[0],k=V-D[1],nn=1/j(on((Z*b+$*k)/(L(Z*Z+$*$)*L(b*b+k*k)))/2),en=L(D[0]*D[0]+D[1]*D[1]);p=_(w,(u-en)/(nn-1)),x=_(w,(s-en)/(nn+1))}else p=x=0}O>g?x>g?(e=W(X,Y,J,K,s,x,t),r=W(U,V,N,Q,s,x,t),a.moveTo(e.cx+e.x01,e.cy+e.y01),x<w?a.arc(e.cx,e.cy,x,o(e.y01,e.x01),o(r.y01,r.x01),!t):(a.arc(e.cx,e.cy,x,o(e.y01,e.x01),o(e.y11,e.x11),!t),a.arc(0,0,s,o(e.cy+e.y11,e.cx+e.x11),o(r.cy+r.y11,r.cx+r.x11),!t),a.arc(r.cx,r.cy,x,o(r.y11,r.x11),o(r.y01,r.x01),!t))):(a.moveTo(J,K),a.arc(0,0,s,m,y,!t)):a.moveTo(J,K),!(u>g)||!(P>g)?a.lineTo(N,Q):p>g?(e=W(N,Q,U,V,u,-p,t),r=W(J,K,X,Y,u,-p,t),a.lineTo(e.cx+e.x01,e.cy+e.y01),p<w?a.arc(e.cx,e.cy,p,o(e.y01,e.x01),o(r.y01,r.x01),!t):(a.arc(e.cx,e.cy,p,o(e.y01,e.x01),o(e.y11,e.x11),!t),a.arc(0,0,u,o(e.cy+e.y11,e.cx+e.x11),o(r.cy+r.y11,r.cx+r.x11),t),a.arc(r.cx,r.cy,p,o(r.y11,r.x11),o(r.y01,r.x01),!t))):a.arc(0,0,u,T,R,t)}if(a.closePath(),n)return a=null,n+""||null}return i.centroid=function(){var n=(+l.apply(this,arguments)+ +h.apply(this,arguments))/2,d=(+v.apply(this,arguments)+ +A.apply(this,arguments))/2-an/2;return[H(d)*n,j(d)*n]},i.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:B(+n),i):l},i.outerRadius=function(n){return arguments.length?(h=typeof n=="function"?n:B(+n),i):h},i.cornerRadius=function(n){return arguments.length?(E=typeof n=="function"?n:B(+n),i):E},i.padRadius=function(n){return arguments.length?(q=n==null?null:typeof n=="function"?n:B(+n),i):q},i.startAngle=function(n){return arguments.length?(v=typeof n=="function"?n:B(+n),i):v},i.endAngle=function(n){return arguments.length?(A=typeof n=="function"?n:B(+n),i):A},i.padAngle=function(n){return arguments.length?(C=typeof n=="function"?n:B(+n),i):C},i.context=function(n){return arguments.length?(a=n??null,i):a},i}export{hn as d};
//# sourceMappingURL=arc-BFwzKz8V.js.map
