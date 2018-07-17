<template>
  <div class="post contentRight">
    <div class="blogheader">
      <h1 class="blogtitle">{{topic ? topic.title : ''}}</h1>
      <div class="blogmetainfo">
        {{topic.createdAt | moment('YYYY-MM-DD')}}
        <span class="infodivider">/</span>
        {{tags ? tags.map(i=>typeof i === 'object' ? i.name : i).join(', ') : ''}}
      </div>
      <div class="blogmetainfo" v-if="multiLang">
        <div class="checkbox checkbox-inline">
          <input  type="checkbox" id="cn" value="cn" v-model="displayedLang">
          <label for="cn">中文</label>
        </div>
        <div class="checkbox checkbox-inline">
          <input type="checkbox" id="en" value="en" v-model="displayedLang">
          <label for="en">English</label>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="blogdata">
      <vue-markdown :source="latestContent" :postrender="lang"></vue-markdown>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import VueMarkdown from '@/components/editor/md/VueMarkdown'

  const moment = require('moment')
  export default {
    name: 'TopicPreview',
    props: ['straight', 'multiLang', 'plain','topic','tags','disableComment'],
    components: {
      VueMarkdown
    },
    computed: {
      latestContent (){
        return this.topic ? this.topic.content : ''
      }
    },
    mounted (){
      this.$nextTick(()=>this.prism())
    },
    watch: {
      latestContent(newTopic){
        if(newTopic) {
          this.prism()
        }
      }
    },
    methods: {
      prism (){
        /* PrismJS 1.11.0
http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+java+json+python+sql */
        var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={manual:_self.Prism&&_self.Prism.manual,disableWorkerMessageHandler:_self.Prism&&_self.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=n.util.clone(e[a]));return r;case"Array":return e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var r=n.util.clone(n.languages[e]);for(var a in t)r[a]=t[a];return r},insertBefore:function(e,t,r,a){a=a||n.languages;var l=a[e];if(2==arguments.length){r=arguments[1];for(var i in r)r.hasOwnProperty(i)&&(l[i]=r[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==t)for(var i in r)r.hasOwnProperty(i)&&(o[i]=r[i]);o[s]=l[s]}return n.languages.DFS(n.languages,function(t,n){n===a[e]&&t!=e&&(this[t]=o)}),a[e]=o},DFS:function(e,t,r,a){a=a||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],r||l),"Object"!==n.util.type(e[l])||a[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||a[n.util.objId(e[l])]||(a[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,a)):(a[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,a)))}},plugins:{},highlightAll:function(e,t){n.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,r){var a={callback:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var l,i=a.elements||e.querySelectorAll(a.selector),o=0;l=i[o++];)n.highlightElement(l,t===!0,a.callback)},highlightElement:function(t,r,a){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1].toLowerCase(),i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,t.parentNode&&(o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l));var s=t.textContent,g={element:t,language:l,grammar:i,code:s};if(n.hooks.run("before-sanity-check",g),!g.code||!g.grammar)return g.code&&(n.hooks.run("before-highlight",g),g.element.textContent=g.code,n.hooks.run("after-highlight",g)),n.hooks.run("complete",g),void 0;if(n.hooks.run("before-highlight",g),r&&_self.Worker){var u=new Worker(n.filename);u.onmessage=function(e){g.highlightedCode=e.data,n.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,a&&a.call(g.element),n.hooks.run("after-highlight",g),n.hooks.run("complete",g)},u.post >>>Message(JSON.stringify({language:g.language,code:g.code,immediateClose:!0}))}else g.highlightedCode=n.highlight(g.code,g.grammar,g.language),n.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,a&&a.call(t),n.hooks.run("after-highlight",g),n.hooks.run("complete",g)},highlight:function(e,t,a){var l=n.tokenize(e,t);return r.stringify(n.util.encode(l),a)},matchGrammar:function(e,t,r,a,l,i,o){var s=n.Token;for(var g in r)if(r.hasOwnProperty(g)&&r[g]){if(g==o)return;var u=r[g];u="Array"===n.util.type(u)?u:[u];for(var c=0;c<u.length;++c){var h=u[c],f=h.inside,d=!!h.lookbehind,m=!!h.greedy,p=0,y=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var b=a,k=l;b<t.length;k+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof s)){h.lastIndex=0;var _=h.exec(w),P=1;if(!_&&m&&b!=t.length-1){if(h.lastIndex=k,_=h.exec(e),!_)break;for(var A=_.index+(d?_[1].length:0),j=_.index+_[0].length,x=b,O=k,N=t.length;N>x&&(j>O||!t[x].type&&!t[x-1].greedy);++x)O+=t[x].length,A>=O&&(++b,k=O);if(t[b]instanceof s||t[x-1].greedy)continue;P=x-b,w=e.slice(k,O),_.index-=k}if(_){d&&(p=_[1].length);var A=_.index+p,_=_[0].slice(p),j=A+_.length,S=w.slice(0,A),C=w.slice(j),M=[b,P];S&&(++b,k+=S.length,M.push(S));var E=new s(g,f?n.tokenize(_,f):_,y,_,m);if(M.push(E),C&&M.push(C),Array.prototype.splice.apply(t,M),1!=P&&n.matchGrammar(e,t,r,b,k,!0,g),i)break}else if(i)break}}}}},tokenize:function(e,t){var r=[e],a=t.rest;if(a){for(var l in a)t[l]=a[l];delete t.rest}return n.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var r=n.hooks.all;r[e]=r[e]||[],r[e].push(t)},run:function(e,t){var r=n.hooks.all[e];if(r&&r.length)for(var a,l=0;a=r[l++];)a(t)}}},r=n.Token=function(e,t,n,r,a){this.type=e,this.content=t,this.alias=n,this.length=0|(r||"").length,this.greedy=!!a};if(r.stringify=function(e,t,a){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var l={type:e.type,content:r.stringify(e.content,t,a),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:a};if(e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}n.hooks.run("wrap",l);var o=Object.keys(l.attributes).map(function(e){return e+'="'+(l.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+l.tag+' class="'+l.classes.join(" ")+'"'+(o?" "+o:"")+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(n.disableWorkerMessageHandler||_self.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,a=t.code,l=t.immediateClose;_self.post >>>Message(n.highlight(a,n.languages[r],r)),l&&_self.close()},!1),_self.Prism):_self.Prism;var a=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return a&&(n.filename=a.src,n.manual||a.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
        Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
        Prism.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css",greedy:!0}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
        Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(?:true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
        Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript",greedy:!0}}),Prism.languages.js=Prism.languages.javascript;
        Prism.languages.java=Prism.languages.extend("clike",{keyword:/\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,number:/\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,operator:{pattern:/(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,lookbehind:!0}}),Prism.languages.insertBefore("java","function",{annotation:{alias:"punctuation",pattern:/(^|[^.])@\w+/,lookbehind:!0}});
        Prism.languages.json={property:/"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,string:{pattern:/"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,greedy:!0},number:/\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,punctuation:/[{}[\]);,]/,operator:/:/g,"boolean":/\b(?:true|false)\b/i,"null":/\bnull\b/i},Prism.languages.jsonp=Prism.languages.json;
        Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"triple-quoted-string":{pattern:/("""|''')[\s\S]+?\1/,greedy:!0,alias:"string"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"function":{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},keyword:/\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,"boolean":/\b(?:True|False|None)\b/,number:/\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,punctuation:/[{}[\];(),.:]/};
        Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,greedy:!0,lookbehind:!0},variable:/@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,"function":/\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,"boolean":/\b(?:TRUE|FALSE|NULL)\b/i,number:/\b-?(?:0x)?\d*\.?[\da-f]+\b/,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};
      },
      backOnClick: function () {
        this.showTopics = false
        this.$emit('article-closed')
      },
      lang (htmlData) {
//        if (this.rawHtmlData === null) {
        if (htmlData !== '' && htmlData !== null) {
          this.rawHtmlData = htmlData
        }
        return htmlData
//        }
        let reg = this.availableLang
          .filter(i => !this.displayedLang.includes(i))
          .map(j => 'lang="' + j + '"')
          .join('|')
        return this.rawHtmlData.split('\n')
          .filter(i => !i.match(reg))
          .join('\n')
      },
      getThumb: function () {
        this.thumb = this.topic && this.topic.thumbnail ? this.topic.thumbnail : 'images/postimage1.jpg'
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        showTopics: false,
        thumb: 'images/postimage1.jpg',
        rawHtmlData: null,
        displayedLang: ['cn', 'en'],
        availableLang: ['cn', 'en', 'fr']
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .comments{
    padding-top: 100px;
  }
  th{padding:.5em;border:1px solid #ddd !important;line-height:1.5;}
  .checkbox {
    padding-left: 20px;
  }
  .checkbox label {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding-left: 5px;
  }
  .checkbox label::before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 17px;
    height: 17px;
    left: 0;
    margin-left: -20px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    background-color: #fff;
    -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
    -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
    transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  }
  .checkbox label::after {
    display: inline-block;
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    top: 0;
    margin-left: -20px;
    padding-left: 3px;
    padding-top: 1px;
    font-size: 11px;
    color: #555555;
    line-height: 1.4;
  }
  .checkbox input[type="checkbox"],
  .checkbox input[type="radio"] {
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
  .checkbox input[type="checkbox"]:focus + label::before,
  .checkbox input[type="radio"]:focus + label::before {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .checkbox input[type="checkbox"]:checked + label::after,
  .checkbox input[type="radio"]:checked + label::after {
    font-family: 'icomoon';
    content: "\e901";
  }
  .checkbox input[type="checkbox"]:indeterminate + label::after,
  .checkbox input[type="radio"]:indeterminate + label::after {
    display: block;
    content: "";
    width: 10px;
    height: 3px;
    background-color: #555555;
    border-radius: 2px;
    margin-left: -16.5px;
    margin-top: 7px;
  }
  .checkbox input[type="checkbox"]:disabled,
  .checkbox input[type="radio"]:disabled {
    cursor: not-allowed;
  }
  .checkbox input[type="checkbox"]:disabled + label,
  .checkbox input[type="radio"]:disabled + label {
    opacity: 0.65;
  }
  .checkbox input[type="checkbox"]:disabled + label::before,
  .checkbox input[type="radio"]:disabled + label::before {
    background-color: #eeeeee;
    cursor: not-allowed;
  }
  .checkbox.checkbox-circle label::before {
    border-radius: 50%;
  }
  .checkbox.checkbox-inline {
    margin-top: 0;
  }

  .checkbox-primary input[type="checkbox"]:checked + label::before,
  .checkbox-primary input[type="radio"]:checked + label::before {
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .checkbox-primary input[type="checkbox"]:checked + label::after,
  .checkbox-primary input[type="radio"]:checked + label::after {
    color: #fff;
  }

  .checkbox-danger input[type="checkbox"]:checked + label::before,
  .checkbox-danger input[type="radio"]:checked + label::before {
    background-color: #d9534f;
    border-color: #d9534f;
  }
  .checkbox-danger input[type="checkbox"]:checked + label::after,
  .checkbox-danger input[type="radio"]:checked + label::after {
    color: #fff;
  }

  .checkbox-info input[type="checkbox"]:checked + label::before,
  .checkbox-info input[type="radio"]:checked + label::before {
    background-color: #5bc0de;
    border-color: #5bc0de;
  }
  .checkbox-info input[type="checkbox"]:checked + label::after,
  .checkbox-info input[type="radio"]:checked + label::after {
    color: #fff;
  }

  .checkbox-warning input[type="checkbox"]:checked + label::before,
  .checkbox-warning input[type="radio"]:checked + label::before {
    background-color: #f0ad4e;
    border-color: #f0ad4e;
  }
  .checkbox-warning input[type="checkbox"]:checked + label::after,
  .checkbox-warning input[type="radio"]:checked + label::after {
    color: #fff;
  }

  .checkbox-success input[type="checkbox"]:checked + label::before,
  .checkbox-success input[type="radio"]:checked + label::before {
    background-color: #5cb85c;
    border-color: #5cb85c;
  }
  .checkbox-success input[type="checkbox"]:checked + label::after,
  .checkbox-success input[type="radio"]:checked + label::after {
    color: #fff;
  }

  .checkbox-primary input[type="checkbox"]:indeterminate + label::before,
  .checkbox-primary input[type="radio"]:indeterminate + label::before {
    background-color: #337ab7;
    border-color: #337ab7;
  }

  .checkbox-primary input[type="checkbox"]:indeterminate + label::after,
  .checkbox-primary input[type="radio"]:indeterminate + label::after {
    background-color: #fff;
  }

  .checkbox-danger input[type="checkbox"]:indeterminate + label::before,
  .checkbox-danger input[type="radio"]:indeterminate + label::before {
    background-color: #d9534f;
    border-color: #d9534f;
  }

  .checkbox-danger input[type="checkbox"]:indeterminate + label::after,
  .checkbox-danger input[type="radio"]:indeterminate + label::after {
    background-color: #fff;
  }

  .checkbox-info input[type="checkbox"]:indeterminate + label::before,
  .checkbox-info input[type="radio"]:indeterminate + label::before {
    background-color: #5bc0de;
    border-color: #5bc0de;
  }

  .checkbox-info input[type="checkbox"]:indeterminate + label::after,
  .checkbox-info input[type="radio"]:indeterminate + label::after {
    background-color: #fff;
  }

  .checkbox-warning input[type="checkbox"]:indeterminate + label::before,
  .checkbox-warning input[type="radio"]:indeterminate + label::before {
    background-color: #f0ad4e;
    border-color: #f0ad4e;
  }

  .checkbox-warning input[type="checkbox"]:indeterminate + label::after,
  .checkbox-warning input[type="radio"]:indeterminate + label::after {
    background-color: #fff;
  }

  .checkbox-success input[type="checkbox"]:indeterminate + label::before,
  .checkbox-success input[type="radio"]:indeterminate + label::before {
    background-color: #5cb85c;
    border-color: #5cb85c;
  }

  .checkbox-success input[type="checkbox"]:indeterminate + label::after,
  .checkbox-success input[type="radio"]:indeterminate + label::after {
    background-color: #fff;
  }

  .radio {
    padding-left: 20px;
  }
  .radio label {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding-left: 5px;
  }
  .radio label::before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 17px;
    height: 17px;
    left: 0;
    margin-left: -20px;
    border: 1px solid #cccccc;
    border-radius: 50%;
    background-color: #fff;
    -webkit-transition: border 0.15s ease-in-out;
    -o-transition: border 0.15s ease-in-out;
    transition: border 0.15s ease-in-out;
  }
  .radio label::after {
    display: inline-block;
    position: absolute;
    content: " ";
    width: 11px;
    height: 11px;
    left: 3px;
    top: 3px;
    margin-left: -20px;
    border-radius: 50%;
    background-color: #555555;
    -webkit-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -o-transform: scale(0, 0);
    transform: scale(0, 0);
    -webkit-transition: -webkit-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
    -moz-transition: -moz-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
    -o-transition: -o-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
    transition: transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
  }
  .radio input[type="radio"] {
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
  .radio input[type="radio"]:focus + label::before {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .radio input[type="radio"]:checked + label::after {
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  .radio input[type="radio"]:disabled {
    cursor: not-allowed;
  }
  .radio input[type="radio"]:disabled + label {
    opacity: 0.65;
  }
  .radio input[type="radio"]:disabled + label::before {
    cursor: not-allowed;
  }
  .radio.radio-inline {
    margin-top: 0;
  }

  .radio-primary input[type="radio"] + label::after {
    background-color: #337ab7;
  }
  .radio-primary input[type="radio"]:checked + label::before {
    border-color: #337ab7;
  }
  .radio-primary input[type="radio"]:checked + label::after {
    background-color: #337ab7;
  }

  .radio-danger input[type="radio"] + label::after {
    background-color: #d9534f;
  }
  .radio-danger input[type="radio"]:checked + label::before {
    border-color: #d9534f;
  }
  .radio-danger input[type="radio"]:checked + label::after {
    background-color: #d9534f;
  }

  .radio-info input[type="radio"] + label::after {
    background-color: #5bc0de;
  }
  .radio-info input[type="radio"]:checked + label::before {
    border-color: #5bc0de;
  }
  .radio-info input[type="radio"]:checked + label::after {
    background-color: #5bc0de;
  }

  .radio-warning input[type="radio"] + label::after {
    background-color: #f0ad4e;
  }
  .radio-warning input[type="radio"]:checked + label::before {
    border-color: #f0ad4e;
  }
  .radio-warning input[type="radio"]:checked + label::after {
    background-color: #f0ad4e;
  }

  .radio-success input[type="radio"] + label::after {
    background-color: #5cb85c;
  }
  .radio-success input[type="radio"]:checked + label::before {
    border-color: #5cb85c;
  }
  .radio-success input[type="radio"]:checked + label::after {
    background-color: #5cb85c;
  }

  input[type="checkbox"].styled:checked + label:after,
  input[type="radio"].styled:checked + label:after {
    font-family: 'icomoon';
    content: "\e901";
  }
  input[type="checkbox"] .styled:checked + label::before,
  input[type="radio"] .styled:checked + label::before {
    color: #fff;
  }
  input[type="checkbox"] .styled:checked + label::after,
  input[type="radio"] .styled:checked + label::after {
    color: #fff;
  }
  .checkbox label{
    overflow: visible;
  }
  .post >>> a,.post >>> a:hover{
    color: red;
  }
  .toc a,.toc a:hover{
    color: black;
  }
  .toc ul,.toc li{
    font-size:16px;
    list-style-type: none !important;
  }
  .post{
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch; overflow-x: hidden;
    /*height: 100vh;*/
  }
  .post >>>image{
    height: 100%;
    background-size: cover;
    background-position: center center;
    transform: scale(1.2);

    /*background: no-repeat 50%;*/
  }
  .post >>>imagearea{
    height: 100%;
  }
  .no-anim{
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }







  html {
    height: 100%;
    margin: 0px;
    padding: 0px;
  }

  body {
    font: 14px/18px Verdana, Arial, Helvetica, sans-serif, "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    color: #fff;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    float: left;
    display: block;
    background-color: #000 !important;
  }
  .no-gutter [class*='col-'] {
    padding-right: 0;
    padding-left: 0;
  }
  .row.no-gutter {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /*
  RESET & CLEARFIX
  */

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label,
  figure {
    margin: 0;
    padding: 0;
    /*overflow: hidden;*/
  }
  /** {*/
  /*margin: 0;*/
  /*padding: 0;*/
  /*}*/

  .post >>> img {
    width: 100%
  }

  html:embed {
    display: none;
  }
  a,
  a:active,
  a:focus {
    outline: none;
  }
  /*
  FONTS DECLARATION
  */
  @font-face {
    font-family: 'montserratbold';
    src: url('/static/fonts/montserrat-bold-webfont.eot');
    src: url('/static/fonts/montserrat-bold-webfont-.eot#iefix') format('embedded-opentype'), url('/static/fonts/montserrat-bold-webfont.woff2') format('woff2'), url('/static/fonts/montserrat-bold-webfont.woff') format('woff'), url('/static/fonts/montserrat-bold-webfont.ttf') format('truetype'), url('/static/fonts/montserrat-bold-webfont.svg#montserratbold') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'FuturaBT-Medium';
    src: url('/static/fonts/FuturaBT-Medium_gdi.eot');
    src: url('/static/fonts/FuturaBT-Medium_gdi-.eot#iefix') format('embedded-opentype'), url('/static/fonts/FuturaBT-Medium_gdi.woff') format('woff'), url('/static/fonts/FuturaBT-Medium_gdi.ttf') format('truetype'), url('/static/fonts/FuturaBT-Medium_gdi.svg#FuturaBT-Medium') format('svg');
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    unicode-range: U+0020-25CA;
  }


  /* latin-ext */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url(/static/fonts/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url(/static/fonts/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    src: local('Raleway Medium'), local('Raleway-Medium'), url(/static/fonts/1Ptrg8zYS_SKggPNwN4rWqhPANqczVsq4A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    src: local('Raleway Medium'), local('Raleway-Medium'), url(/static/fonts/1Ptrg8zYS_SKggPNwN4rWqZPANqczVs.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    src: local('Raleway SemiBold'), local('Raleway-SemiBold'), url(/static/fonts/1Ptrg8zYS_SKggPNwPIsWqhPANqczVsq4A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    src: local('Raleway SemiBold'), local('Raleway-SemiBold'), url(/static/fonts/1Ptrg8zYS_SKggPNwPIsWqZPANqczVs.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }


  /*
  5. PORTFOLIO
  */

  #contactus, #aboutus{
    overflow: hidden;
    height: 100%;
  }
  #thumbnails {
    clear: both;
    background: #000;
    /*z-index: 10;*/
  }
  /*#thumbnails * {*/

  /*-webkit-transition: all 1s ease-in-out;*/
  /*-moz-transition: all 1s ease-in-out;*/
  /*-o-transition: all 1s ease-in-out;*/
  /*transition: all 1s ease-in-out;*/
  /*}*/
  /*
      END PORTFOLIO THUMBS
  */
  /*
      5.2. PORTFOLIO BOXES
  */

  figure {
    background-position: center center;
    background-size: cover;
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.4) inset;
  }
  figure:hover {
    padding: 0;
    cursor: pointer;
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset;
  }

  figure.mainImage:hover {
    box-shadow: none;
  }

  .hiddenscroll {
    overflow: auto!important;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  div.bigerImage {
    height: 100% !important;
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
  }
  .bigerImage .big {
    width: 100%;
    height: 100% !important;
    z-index: 100;
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
  }
  .ColumnLOne {
    left: 0;
  }
  .ColumnLTwo {
    left: 25%;
  }
  .ColumnLThree {
    left: 50%;
  }
  .ColumnRTwo {
    right: 25%
  }
  .ColumnROne {
    right: 0;
  }
  .row {
    position: relative;
    overflow: hidden;
  }
  /*
      END PORTFOLIO BOXES
  */
  /*
      5.3. ANIMATIONS
  */

  .smallimg {
    position: fixed;
    top: 80px;
    cursor: pointer;
    left: -600px;
    z-index: 2147483647;
    color: #FFF;
    background: #ff303b;
    float: left;
    display: block;
    padding: 6px 10px 7px;
    opacity: 1;
    -webkit-transition: all 3s ease-in-out;
    -moz-transition: all 3s ease-in-out;
    -o-transition: all 3s ease-in-out;
    transition: all 3s ease-in-out;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    color: #FFF;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
  }
  .smallimg.leftpos {
    left: 20px;
  }
  .smallimg.newpos {
    left: -600px!important;
  }
  div.bigerImage .ColumnRTwo {
    right: -50%;
  }
  div.bigerImage .ColumnROne {
    right: 0%;
    -webkit-transition-delay: 0.3s;
    -moz-transition-delay: 0.3s;
  }
  div.bigerImage[data-id="three"] .ColumnROne {
    right: -100%;
    -webkit-transition-delay: 0.3s;
    -moz-transition-delay: 0.3s;
  }
  figure {
    top: 0px;
    -webkit-transition-delay: 4s;
    -moz-transition-delay: 4s;
  }
  div.bottomRow figure {
    top: 100%;
  }
  div.bottomRow figure + figure {
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
  }
  div.bottomRow figure + figure + figure {
    -webkit-transition-delay: 0.2s;
    -moz-transition-delay: 0.2s
  }
  div.bottomRow figure + figure + figure + figure {
    -webkit-transition-delay: 0.3s;
    -moz-transition-delay: 0.3s
  }
  figure {
    -webkit-transition: all 0.8s ease-in-out;
    -moz-transition: all 0.8s ease-in-out;
    -o-transition: all 0.8s ease-in-out;
    transition: all 0.8s ease-in-out;
  }
  div.bottomRownew figure {
    top: 100%;
  }
  figure  {
    width: 65%;
    position: absolute;
    z-index: 1111;
    background: #FFF;
    right: -150%;
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
  }
  /*figure  .content-r-inner {*/
  /*padding: 50px 0px 50px 0;*/
  /*}*/
  figure.animq img {
    margin-left: -10%;
    -webkit-transition-delay: 0.3s;
    -moz-transition-delay: 0.3s;
  }
  figure.animq  {
    right: 0;
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
  }
  .moreImageContainer  {
    position: fixed;
  }
  /*
      END ANIMATIONS
  */
  /*
      5.4. CONTENT
  */

  figure .content {
    padding-left: 30px;
    padding-right: 30px;
    z-index: 10;
    left: 0;
    opacity: 1;
  }
  figure .contentsqz {
    padding-left: 30px;
    padding-right: 30px;
    position: absolute!important;
    z-index: 10;
    bottom: 15%;
    left: 0;
    opacity: 0;
    width: 30%;
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
    display: none!important;
  }
  .big .content {
    bottom: 0;
    display: table;
    height: 100%;
    left: 0;
    margin: auto;
    opacity: 1;
    padding-left: 0px;
    padding-right: 0px;
    position: absolute !important;
    right: 0;
    text-align: center;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .callpost .content {
    background: none;
    display: table;
    position: relative !important;
    height: inherit;
    left: auto;
    margin: auto;
    opacity: 1;
    padding: 30px !important;
    right: auto;
    text-align: left;
    transform: scale(1);
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    width: auto;
    z-index: 10;
  }
  .content-wraper {
    display: table-cell;
    margin: auto;
    vertical-align: bottom !important;
  }
  .content {
    width: 100% !important;
  }
  .bigerImage .content {
    padding-left: 30px;
    padding-right: 30px;
    position: absolute!important;
    z-index: 10;
    bottom: 14%;
    left: 0;
    opacity: 1;
    background: none;
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: scale(1);
    text-align: left;
    height: auto;
    width: auto;
    right: auto;
    top: auto;
  }
  figure .content h2 {
    color: #fff;
    font-family: FuturaBT-Medium,sans-serif, "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    font-size: 40px;
    font-weight: normal;
    letter-spacing: 0;
    line-height: 47px;
    margin-bottom: 20px;
  }
  figure .content .excerpt {
    color: white;
    font-family: Raleway;
    font-size: 16px;
    line-height: 22px;
    width: 60%;
    margin-bottom: 20px;
  }
  .bigerImage .content h2 {
    margin-top: 0%;
  }
  figure .contentsqz h2 {
    font-family: 'Lato', sans-serif;
    font-weight: 800;
    color: #FFF;
    text-transform: uppercase;
    padding-left: 0px;
    line-height: 24px;
    font-size: 22px;
    letter-spacing: 2px;
  }
  figure .content .post >>>info {
    color: #fff;
    font-family: "FuturaBT-Medium", sans-serif, "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    font-size: 12px;
    font-weight: bold;
    left: 0;
    letter-spacing: 2px;
  }
  figure .content .post >>>info span {
    float: right;
    font-family: Playfair Display;
    font-size: 12px;
    font-style: italic;
  }
  .big .content h2,
  .bigerImage .content h2 {
    font-family: montserratbold;
    font-weight: normal;
    color: #FFF;
    line-height: 24px;
    font-size: 22px;
    text-transform: uppercase;
    padding-left: 0px;
    letter-spacing: 2px;
  }
  .big .content h2 span,
  .bigerImage .content h2 span {
    font-family: 'Inconsolata', sans-serif;
    font-weight: 300;
    color: #FFF;
    text-transform: none;
    font-size: 16px;
    letter-spacing: 0px;
  }
  figure.mainImage .content h2 span {} figure.anim .content {
                                         opacity: 1;
                                       }
  figure.anim .contentsqz {
    opacity: 1;
  }
  .close {
    position: absolute;
    right: 30px;
    top: 30px;
    background: URL(images/close.png) no-repeat 0 0;
    float: left;
    display: block;
    text-decoration: none;
    text-indent: -9999px;
    overflow: hidden;
    cursor: pointer;
    width: 11px;
    height: 11px;
    z-index: 111111111;
  }
  /*
      END CONTENT
  */


  /*
  END PORTFOLIO
  */
  /*
  6. POSTS
  */

  #landingpage {
    /*background-image: url("/images/menubak.jpg");*/
    background-color: white;
    background-position: center center;
    background-size: cover;
  }
  #aboutus,
  #contactus,


  #thumbnails .scalediv {
    height: 100%;
  }

  #team .scalediv {
    height: 100%;
  }

  #blog .scalediv {
    height: 100%;
  }
  /*#aboutus .content-r-inner {*/
  /*padding: 0;*/
  /*}*/




  #aboutus aside,
  #contactus aside {
    width: 35%;
    float: left;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  #blog aside,



  /*
      6.1. RIGHT SIDE AREA FOR CONTENT DISPLAY
  */

  /* {*/
  /*font-size: 14px;*/
  /*color: #000;*/
  /*height: 100%;*/
  /*margin: 0 0px;*/
  /*position: relative;*/
  /*overflow: hidden;*/
  /*}*/
  /*.comt-date {*/
  /*float: left;*/
  /*font-family: Playfair Display;*/
  /*font-style: italic;*/
  /*margin-right: 10px;*/
  /*}*/
  /*.reply-button {*/
  /*font-family: Playfair Display;*/
  /*font-style: italic;*/
  /*}*/
  /*.reply-button a {*/
  /*margin-left: 10px;*/
  /*}*/
  /*.comt-author > h4 {*/
  /*margin-bottom: 3px;*/
  /*}*/
  .content-r-inner {
    padding: 110px;
  }
  /*!* h2 {*!*/
  /*!*font-family: "montserratbold";*!*/
  /*!*font-size: 91px;*!*/
  /*!*font-weight: normal;*!*/
  /*!*letter-spacing: -4px;*!*/
  /*!*line-height: 115px;*!*/
  /*!*}*!*/
  /*figure.big  .post >>> {*/
  /*overflow: auto!important;*/
  /*position: relative;*/
  /*z-index: 9999999;*/
  /*}*/
  /*!* h2 span {*!*/
  /*!*!*background: URL(images/sep.png) repeat-x 0px 27px;*!*!*/

  /*!*padding-left: 12px;*!*/
  /*!*padding-right: 12px;*!*/
  /*!*}*!*/
  /*!*#blog  h2 {*!*/
  /*!*margin-top: 40px;*!*/
  /*!*}*!*/
  /*!* p {*!*/
  /*!*margin: 30px 0;*!*/
  /*!*font-size: 16px;*!*/
  /*!*line-height: 22.85px;*!*/
  /*!*color: #424141;*!*/
  /*!*font-family: 'Inconsolata';*!*/
  /*!*}*!*/
  /*!* p.sep {*!*/
  /*!*width: 3%;*!*/
  /*!*margin: 10px auto;*!*/
  /*!*height: 5px;*!*/
  /*!*overflow: hidden;*!*/
  /*!*background: #000;*!*/
  /*!*clear: both;*!*/
  /*!*}*!*/
  /*!*#blog  p.sep {*!*/
  /*!*width: 10%;*!*/
  /*!*margin: 0px auto 10px auto;*!*/
  /*!*background: #d5d5d5;*!*/
  /*!*height: 2px;*!*/
  /*!*}*!*/

  /*!* h3 {*!*/
  /*!*font-size: 26px;*!*/
  /*!*font-weight: bold;*!*/
  /*!*font-family: 'Lato', sans-serif;*!*/
  /*!*padding: 85px 0 25px 0;*!*/
  /*!*line-height: 24px;*!*/
  /*!*text-align: center;*!*/
  /*!*color: #040404;*!*/
  /*!*}*!*/
  /*!*#contactus  h3 {*!*/
  /*!*color: #000;*!*/
  /*!*font-family: "montserrat";*!*/
  /*!*font-size: 38px;*!*/
  /*!*font-weight: 200;*!*/
  /*!*line-height: 52px;*!*/
  /*!*padding: 50px 0 0;*!*/
  /*!*text-align: left;*!*/
  /*!*}*!*/
  /*!* .socialmedia {*!*/
  /*!*padding: 50px 0;*!*/
  /*!*}*!*/
  /*!* .socialmedia li {*!*/
  /*!*float: none;*!*/
  /*!*margin-right: 15px;*!*/
  /*!*width: auto!important;*!*/
  /*!*display: inline-block;*!*/
  /*!*}*!*/
  /*!* .socialmedia li:last-child {*!*/
  /*!*margin-left: 0px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a {*!*/
  /*!*float: left;*!*/
  /*!*display: block;*!*/
  /*!*width: 18px;*!*/
  /*!*height: 24px;*!*/
  /*!*overflow: hidden;*!*/
  /*!*text-indent: -9999px;*!*/
  /*!*background: URL(images/socialmedia.png) no-repeat 0 1px;*!*/
  /*!*padding: 0px!important;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.behence {*!*/
  /*!*background-position: -227px 2px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.behence:hover {*!*/
  /*!*background-position: -227px -28px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.pinterest {*!*/
  /*!*background-position: -181px 0px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.pinterest:hover {*!*/
  /*!*background-position: -181px -30px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.linkedin {*!*/
  /*!*background-position: -143px 0px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.linkedin:hover {*!*/
  /*!*background-position: -143px -30px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.dribble {*!*/
  /*!*background-position: -94px 1px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.dribble:hover {*!*/
  /*!*background-position: -94px -29px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.twitter {*!*/
  /*!*background-position: -47px 2px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.twitter:hover {*!*/
  /*!*background-position: -47px -28px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.facebook {*!*/
  /*!*background-position: 0px 2px;*!*/
  /*!*}*!*/
  /*!* .socialmedia li a.facebook:hover {*!*/
  /*!*background-position: 0px -28px;*!*/
  /*!*}*!*/
  /*!* .bottom {*!*/
  /*!*border-top: 1px solid #ccc;*!*/
  /*!*height: 100px;*!*/
  /*!*bottom: 0px;*!*/
  /*!*position: absolute;*!*/
  /*!*width: 100%;*!*/
  /*!*}*!*/
  /*!* .contactform {*!*/
  /*!*display: block;*!*/
  /*!*clear: both;*!*/
  /*!*padding: 60px 0px 10px 0px;*!*/
  /*!*overflow: hidden;*!*/
  /*!*width: 100%;*!*/
  /*!*margin: 0px auto;*!*/
  /*!*text-align: center;*!*/
  /*!*}*!*/
  /*!* .contactform div.lft {*!*/
  /*!*display: block;*!*/
  /*!*width: 100%;*!*/
  /*!*float: left;*!*/
  /*!*padding-bottom: 12px;*!*/
  /*!*}*!*/
  /*!* .contactform div.rgt {*!*/
  /*!*display: block;*!*/
  /*!*padding-bottom: 12px;*!*/
  /*!*}*!*/
  /*!* .contactform div div {*!*/
  /*!*float: left;*!*/
  /*!*width: 30%;*!*/
  /*!*margin-right: 5%;*!*/
  /*!*}*!*/
  /*!* .contactform div div:last-child {*!*/
  /*!*margin-right: 0%;*!*/
  /*!*}*!*/
  /*!*.contactform LABEL {*!*/
  /*!*display: block;*!*/
  /*!*clear: both;*!*/
  /*!*padding: 5px 0px 8px 0px;*!*/
  /*!*font-weight: 700;*!*/
  /*!*letter-spacing: 2px;*!*/
  /*!*font-size: 14px;*!*/
  /*!*color: #000;*!*/
  /*!*font-family: 'Lato', sans-serif;*!*/
  /*!*}*!*/
  /*.contactform INPUT[type="text"],*/
  /*.contactform INPUT[type="email"],*/
  /*.contactform INPUT[type="url"] {*/
  /*display: block;*/
  /*clear: both;*/
  /*padding: 13px 6px 16px 8px;*/
  /*letter-spacing: 2px;*/
  /*font-size: 15px;*/
  /*color: #fff;*/
  /*border-bottom: #000 1px solid;*/
  /*width: 100%;*/
  /*margin-bottom: 38px;*/
  /*-webkit-appearance: none;*/
  /*background: transparent none repeat scroll 0 0;*/
  /*outline: none;*/
  /*font-family: Source Sans Pro;*/
  /*border-width: 0 0 1px;*/
  /*}*/
  /*.contactform TEXTAREA {*/
  /*display: block;*/
  /*clear: both;*/
  /*padding: 13px 6px 16px 8px;*/
  /*font-weight: normal;*/
  /*letter-spacing: 2px;*/
  /*font-size: 15px;*/
  /*color: #fff;*/
  /*border-bottom: #000 1px solid;*/
  /*border-top: 0px;*/
  /*border-left: 0px;*/
  /*border-right: 0px;*/
  /*background: transparent none repeat scroll 0 0;*/
  /*width: 100%;*/
  /*margin-bottom: 38px;*/
  /*-webkit-appearance: none;*/
  /*outline: none;*/
  /*height: 100px;*/
  /*font-family: Source Sans Pro;*/
  /*}*/
  /*.contactform INPUT[type="submit"] {*/
  /*-webkit-appearance: none;*/
  /*border: 0px solid #000;*/
  /*background: transparent none repeat scroll 0 0;*/
  /*color: #000;*/
  /*height: 50px;*/
  /*width: 120px;*/
  /*font-weight: normal;*/
  /*margin: 0;*/
  /*font-family: montserrat;*/
  /*font-size: 14px;*/
  /*outline: 0px;*/
  /*cursor: pointer;*/
  /*-webkit-transition: all 0.8s ease-in-out;*/
  /*-moz-transition: all 0.8s ease-in-out;*/
  /*-o-transition: all 0.8s ease-in-out;*/
  /*transition: all 0.8s ease-in-out;*/
  /*text-transform: uppercase;*/
  /*border-bottom: #000 1px solid;*/
  /*}*/
  /*.cent {*/
  /*color: #000;*/
  /*font-family: montserratbold;*/
  /*font-size: 14px;*/
  /*letter-spacing: 2px;*/
  /*line-height: 22.85px;*/
  /*text-transform: uppercase;*/
  /*}*/
  /*!**/
  /*END RIGHT SIDE AREA FOR CONTENT DISPLAY*/
  /**!*/
  /*!**/
  /*END POSTS*/
  /**!*/


  /*.moreImages {*/
  /*position: absolute;*/
  /*bottom: 20px;*/
  /*right: -4000px;*/
  /*background: URL(images/moreimages.png) no-repeat 0 0;*/
  /*color: #fff;*/
  /*padding: 7px 10px;*/
  /*z-index: 100;*/
  /*text-decoration: none;*/
  /*font-weight: bold;*/
  /*width: 50px;*/
  /*height: 31px;*/
  /*text-indent: -9999px;*/
  /*overflow: hidden;*/
  /*}*/
  /*.animqueht .moreImages {*/
  /*background-size: 100% auto;*/
  /*bottom: 30px;*/
  /*right: 30px;*/
  /*width: 16px;*/
  /*}*/
  /*.moreImageContainer {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*z-index: 10;*/
  /*position: fixed;*/
  /*overflow: hidden;*/
  /*left: 1200%;*/
  /*background-color: #000;*/
  /*top: 0px;*/
  /*}*/
  /*!***** Moreimages of the Boxes ******!*/

  /*
  9 COMMENT FORM
  */
  /*.comment {*/
  /*border-bottom: 1px solid #ccc;*/
  /*clear: both;*/
  /*float: left;*/
  /*padding: 50px 40px;*/
  /*width: 100%;*/
  /*}*/
  /*.comment {*/
  /*border-bottom: 1px solid #ccc;*/
  /*clear: both;*/
  /*float: left;*/
  /*padding: 30px 40px;*/
  /*width: 100%;*/
  /*}*/
  .main-comment {
    border-bottom: medium none;
    border-top: 1px solid #ccc;
  }
  .sub-comment {
    border-bottom: medium none;
    padding: 0 0 30px 110px;
  }
  .sub-comment-last {
    padding: 0 0 30px 110px;
  }
  .comment-form label {
    color: #7e7e7e;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 1px;
  }
  .comment-form input,
  textarea {
    border: 1px solid #ccc;
    padding: 7px;
    text-indent: 10px;
    width: 100%;
  }
  .comment-form input,
  textarea {
    border: 1px solid #ccc;
    padding: 7px;
    text-indent: 10px;
    width: 100%;
    display: table;
    margin: auto;
  }
  .comment-count {
    font-family: Playfair Display;
    font-style: italic;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .comment-form{
    margin-bottom: 50px;
  }
  .comments-section {
    margin-bottom: 50px;
  }
  .featured-cmt {
    background: #e5e7e6 none repeat scroll 0 0;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    margin-bottom: 50px;
    margin-top: 20px;
  }

  .submit-button:hover {
    background: #000 none repeat scroll 0 0;
    color: #fff;
  }
  .submit-button {
    background: #fff none repeat scroll 0 0;
    border-color: #ccc !important;
    margin-top: 10px;
    width: 160px !important;
  }
  /*
  END COMMENT FORM
  */
  /*
  10 THEME BASED CSS
  */
  #contactus ,
  #aboutus  {
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
  }
  .mobilemenu {
    background: url("/images/mobilemenu.png") no-repeat scroll 0 0 rgba(0, 0, 0, 0);
    float: right;
    height: 31px;
    margin: 13px 24px;
    overflow: hidden;
    text-indent: -9999px;
    width: 33px;
    display: none;
    cursor: pointer;
  }
  .explr {
    display: block;
    position: relative;
    height: 100%;
    float: left;
    width: 100%;
  }
  figure.clickImage .explrht {
    height: 100%!important;
  }
  .clear {
    clear: both;
  }
  .touch {
    color: #000;
    float: right;
    font-family: Raleway;
    font-size: 14px;
    letter-spacing: 2px;
    margin: 4px 15px 0 0;
  }
  .link {
    color: #000;
    text-decoration: none;
  }
  .link:hover {
    color: #FF2600;
    text-decoration: none;
  }
  .socialpost{
    list-style-type: none;
  }
  #landingpage .socialpost {
    margin-left: 15px;
  }
  .socialpost li {
    float: left;
    margin-right: 20px;
    text-align: left;
  }
  .socialpost a {
    color: #000;
  }
  .socialpost i {
    font-size: 17px;
  }
  .socialpost a:hover {
    color: #FF2600;
  }
  .blogsub {
    color: #080808;
    font-family: Merriweather;
    font-size: 12px;
    font-style: italic;
    font-weight: 300;
  }
  .blogtitle {
    font-family: "FuturaBT-Medium", sans-serif, "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    font-weight: bold;
    line-height: 65px;
    letter-spacing: 0;
    margin-bottom: 0px;
    margin-top: 30px !important;
  }
  .blogmetainfo {
    color: #606060;
    font-family: "Raleway";
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }
  .infodivider {
    color: red;
    font-size: 25px;
    margin: 0 10px;
    vertical-align: middle;
  }
  .blogdata {
    color: #666666;
    /*font-family: "Raleway";*/
    font-size: 16px;
    font-weight: normal;
    /*letter-spacing: 1px;*/
    line-height: 40px;
    margin: 0 15px;

  }
  .post >>>  p,.post >>> pre {
    margin-bottom: 60px !important;
  }
  .post >>>  h1,.post >>> h2,.post >>> h3,.post >>> h4,.post >>> h5,.post >>> h6 {
    color: #000 !important;
    margin-bottom: 60px !important;
  }
  .post >>>  ol, .post >>> ul{
    margin-bottom: 60px !important;
  }
  b, strong{
    color: #000 !important;
  }
  .space10ud {
    margin: 30px 0;
  }
  .blogheader {
    margin: 0 15px;
  }
  .blogheadergride {
    margin: 0 20px;
  }
  .blogquestion {
    color: #000;
    font-family: montserratbold;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 22.85px;
  }
  .team-footer a {
    font-size: 15px;
  }
  .team-footer i {
    font-size: 18px;
  }
  .boximage {
    text-align: center;
  }
  .subtitle {
    color: #fff;
    font-family: montserratbold;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 22.85px;
    text-transform: uppercase;
  }
  .right-content-box {
    position: relative;
  }
  .right-content-inner {
    height: 100%;
    position: absolute;
  }
  .right-content-table {
    display: table;
    height: 100%;
  }
  .right-content-table-cell {
    display: table-cell;
    vertical-align: middle;
  }
  @media (max-width: 991px) {
    .sa5a {
      border-right: none;
    }
    .cent {
      text-align: center;
    }
    .sad {
      text-align: center;
    }
    .contentarea {
      margin: 0 20px;
    }
  }
  @media (max-width: 767px) {
    .right-content-inner {
      position: relative;
    }
  }
  @media (max-width: 810px) {
    figure .content .excerpt {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    figure .content .excerpt {
      width: 100%;
      margin-bottom: 10px;
      font-size: 14px;
    }
    figure .content h2 {
      font-size: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }
    .callpost .content {
      padding: 60px 30px 30px 30px !important;
    }
  }
  @media (max-width: 1199px) {
    .cent {
      text-align: center;
      margin: 20px 0;
    }
    .sad {
      text-align: center;
    }
  }
  @media all and (max-width: 1200px) and (min-width: 760px) {
     .blogtitle {
      line-height: 50px;
    }
    /* h2 {*/
    /*font-size: 51px;*/
    /*letter-spacing: 0;*/
    /*line-height: 65px;*/
    /*margin-bottom: 0;*/
    /*}*/
     .contactform div div {
      margin-right: 5%;
      width: 100%;
    }
  }
  @media all and (max-device-width: 1300px) and (min-device-width: 1201px) {
    /* h2 {*/
    /*font-size: 62px;*/
    /*letter-spacing: -1;*/
    /*line-height: 85px;*/
    /*margin-bottom: 0;*/
    /*}*/
  }
  @media all and (max-device-width: 1500px) and (min-device-width: 1301px) {
    /* h2 {*/
    /*font-size: 70px;*/
    /*letter-spacing: -1;*/
    /*line-height: 85px;*/
    /*margin-bottom: 0;*/
    /*}*/
  }
  @media all and (max-device-width: 1220px) and (min-device-width: 1041px),
  all and (max-width: 1220px) and (min-width: 1041px) {
    .socialmedia ul li {
      float: right !important;
      margin-left: 18px;
      width: auto !important;
    }
    .content-r-inner {
      padding: 50px;
    }
  }
  /***** Ipad Landscape mode display *****/

  @media all and (max-device-width: 1040px) and (min-device-width: 811px) and (orientation: landscape),
  all and (max-width: 1040px) and (min-width: 811px) and (orientation: landscape) {
    .socialmedia ul li {
      float: right !important;
      margin-left: 12px;
      width: auto !important;
    }
    .content-r-inner {
      padding: 50px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
      /*overflow: hidden;*/
    }
    .toc {
      display: none;
    }
    figure.big .post >>>contentarea {
      margin: 0 50px;
    }
    #aboutus .servicebox .service {
      float: left;
      padding: 0 2%;
      text-align: center;
      width: 46%;
    }
    figure img {
      height: 100%;
      width: 100%;
    }
    .big .content {
      background: none;
      bottom: 14%;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    .callpost .content {
      background: none;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    #top-bar div {
      width: 63%;
    }
    #top-bar ul li {
      width: 15%;
    }
    #top-bar ul li a {
      font-size: 14px;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  @media all and (max-device-width: 1040px) and (min-device-width: 811px),
  all and (max-width: 1040px) and (min-width: 811px) {
    .socialmedia ul li {
      float: right !important;
      margin-left: 12px;
      width: auto !important;
    }
    .socialmedia {
      padding: 0 1%;
    }
    .big .content {
      background: none;
      bottom: 14%;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    .callpost .content {
      background: none;
      display: table;
      position: relative !important;
      height: inherit;
      left: auto;
      margin: auto;
      opacity: 1;
      padding: 30px !important;
      right: auto;
      text-align: left;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    figure .content .excerpt {
      margin-bottom: 10px;
      width: 100%;
    }
    figure .content h2 {
      font-size: 35px;
      line-height: 35px;
    }
    figure .content h2 {
      margin-top: 0;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  /***** Ipad Portrait mode display *****/

  @media all and (max-device-width: 810px) and (min-device-width: 760px) and (orientation: portrait),
  all and (max-width: 810px) and (min-width: 760px) and (orientation: portrait) {
    .toc {
      display: none;
    }
    body {
      overflow: visible;
    }
    figure.big {
      width: 100%;
    }
    .innerrow {
      width: 100%!important;
    }
    .ColumnRTwo {
      left: 0;
    }
    .ColumnROne {
      right: 0;
    }
    .ColumnLTwo {
      left: 0;
    }
    .mobilemenu {
      display: block;
    }
    figure  {
      position: relative!important;
      right: 0%;
      width: 100%;
      z-index: 1111;
      -webkit-transition: all 2s ease-in-out;
      -moz-transition: all 2s ease-in-out;
      -o-transition: all 2s ease-in-out;
      transition: all 2s ease-in-out;
      height: 0;
    }
    figure img {
      position: relative;
      float: left;
    }
    figure.anim img {
      margin-left: 0%;
    }
    figure.anim .contentsqz {
      opacity: 0;
    }
    figure.anim .content {
      opacity: 1;
    }
    figure.anim  {
      height: 620px;
      right: 0;
      transition-delay: 0.1s;
      position: relative!important;
      -webkit-transition: all 2s ease-in-out;
      -moz-transition: all 2s ease-in-out;
      -o-transition: all 2s ease-in-out;
      transition: all 2s ease-in-out;
    }
    div.bigerImage .ColumnROne {
      right: 0;
    }
    /*figure  .content-r-inner {*/
    /*padding: 30px 0;*/
    /*}*/
    /* h2 {*/
    /*font-size: 40px;*/
    /*line-height: 40px;*/
    /*padding: 25px 0 15px;*/
    /*}*/
    /* p {*/
    /*font-size: 13px;*/
    /*line-height: 19px;*/
    /*margin: 20px 0;*/
    /*}*/
    #top-bar div {
      float: left !important;
      width: 46%;
    }
    .socialmedia ul li {
      float: right !important;
      margin-left: 20px;
      width: auto !important;
    }
    #menu,
    #menumobile {
      width: 100%!important;
      position: fixed;
      z-index: 9;
      top: -1280px;
      background: rgba(255, 255, 255, 0.8);
      height: 100%!important;
    }
    #menumobile ul {
      margin-top: 30%;
    }
    #menumobile.act {
      overflow: scroll;
      padding-top: 70px;
      top: 0;
    }
    #menu ul li,
    #menumobile ul li {
      width: 100%;
      margin: 0px;
      float: none;
      display: block;
    }
    #top-bar {
      overflow: visible;
    }
    #top-bar ul li a,
    #menumobile ul li a {
      background: none;
    }
    .lessImages {
      display: none;
    }
    .big .content,
    .bigerImage .content {
      position: fixed;
    }
    .smallimg {
      top: 80px;
    }
    .post >>>image {
      float: left;
      height: 100%;
      background-position: top center;
    }
    .post >>>s .previous {
      bottom: 0px;
      right: -1px;
    }
    .post >>>s .post >>>contentarea .post >>> {
      /*float: left;*/
      /*height: 100% !important;*/
    }
    #aboutus aside,
    #contactus aside {
      float: left;
      height: 50%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }
    #blog aside,
    .post >>>s aside {
      float: left;
      height: 275px;
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .post >>>image {
      width: 100%;
    }
    #aboutus section,
    .post >>>s section,
    #contactus section,
    #blog section {
      width: 100%;
    }

    .pt-page {
      display: none;
    }
    .pt-page-current,
    .pt-page-current1,
    .no-js .pt-page {
      display: block;
    }
    #aboutus .servicebox .service {
      float: left;
      padding: 0 2%;
      text-align: center;
      width: 46%;
    }
    #aboutus .servicebox .service figure {
      float: none;
      height: auto !important;
      margin: 0 auto;
      position: static !important;
      text-align: center;
      width: auto !important;
    }
    #aboutus .servicebox .service figure img {
      float: none;
      height: auto !important;
      position: static !important;
      width: auto !important;
    }
    .content-r-inner {
      padding: 50px;
    }
    #blog .post >>>contentarea,
    .post >>>s .post >>>contentarea {
      margin: 0 0px;
    }
    #blog .post >>>contentarea .post >>> {
      float: left;
    }
    #blog .next {
      top: 0;
      right: auto;
    }
    .post >>>s .next {
      top: 0;
      right: auto;
    }
    #blog .previous {
      bottom: 0px;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
    }
    figure.animqueht  {
      height: 650px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animque {
      height: 1030px!important;
    }
    .bigerImage .big.animque {
      height: 1030px !important;
    }
    .big.animqueht .content {
      bottom: 34%;
    }
    .big.animqueht .explr img {
      margin-top: -40px;
    }
    figure.clickImage .explrht {
      height: inherit !important;
    }
    .animqueht .moreImages {
      background-size: 100% auto;
      bottom: 100px;
      right: 20px;
      width: 16px;
    }
    .moreImageContainer {
      background: none;
    }
    figure img {
      height: 100%;
      width: auto;
    }
    /*#blog ,*/
    /*.post >>>s  {*/
    /*overflow-y: auto;-webkit-overflow-scrolling: touch; overflow-x: hidden;*/
    /*}*/
    .post >>>{
      height: 100%;
    }
    div.bigerImage[data-id="three"] .ColumnROne {
      right: 0%;
      transition-delay: 0.3s;
    }
    .smallimg {
      display: none;
    }
    .post >>>s {
      height: 100%!important;
    }
    .big .content {
      background: none;
      bottom: 14%;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    .callpost .content {
      background: none;
      bottom: 14%;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    #top-bar .socialmedia {
      display: none;
    }
    .cent {
      text-align: center;
    }
    /* h2 {*/
    /*font-size: 58px;*/
    /*letter-spacing: 0;*/
    /*line-height: 60px;*/
    /*margin-bottom: 10px;*/
    /*padding: 25px 0 15px;*/
    /*text-align: left;*/
    /*}*/
    .sa3 {
      padding: 4%;
      width: 92%;
    }
    .sa7 {
      padding: 4%;
      width: 92%;
    }
  }
  /***** Mobile overall mode display *****/

  @media all and (max-device-width: 759px) and (min-device-width: 200px),
  all and (max-width: 759px) and (min-width: 200px) {
    .toc {
      display: none;
    }
    .post >>>{
      height: 100%;
    }
    body {
      overflow: visible;
    }
    figure.big {
      width: 100%;
    }
    .innerrow {
      width: 100%!important;
    }
    .ColumnRTwo {
      left: 0;
    }
    .ColumnROne {
      right: 0;
    }
    .ColumnLTwo {
      left: 0;
    }
    figure img {
      width: 100%;
    }
    .mobilemenu {
      display: block;
    }
    figure  {
      position: relative!important;
      right: 0%;
      width: 100%;
      z-index: 1111;
      -webkit-transition: all 2s ease-in-out;
      -moz-transition: all 2s ease-in-out;
      -o-transition: all 2s ease-in-out;
      transition: all 2s ease-in-out;
      height: 0;
    }
    figure img {
      position: relative;
      float: left;
    }
    figure.anim img {
      margin-left: 0%;
    }
    figure.anim .contentsqz {
      opacity: 0;
    }
    figure.anim .content {
      opacity: 1;
    }
    figure.anim  {
      height: 620px;
      right: 0;
      transition-delay: 0.1s;
      position: relative!important;
      -webkit-transition: all 2s ease-in-out;
      -moz-transition: all 2s ease-in-out;
      -o-transition: all 2s ease-in-out;
      transition: all 2s ease-in-out;
    }
    div.bigerImage .ColumnROne {
      right: 0;
    }
    /*figure  .content-r-inner {*/
    /*padding: 30px 0;*/
    /*}*/
    /* h2 {*/
    /*font-size: 44px;*/
    /*letter-spacing: 0;*/
    /*line-height: 50px;*/
    /*padding: 25px 0 15px;*/
    /*text-align: left;*/
    /*margin-bottom: 10px;*/
    /*}*/
    .cent {
      text-align: center;
    }
     p {
      /*line-height: 19px;*/
      /*margin: 20px;*/
    }
     li {
      line-height: 19px;
      margin: 20px;
    }
    #top-bar div {
      float: left !important;
      width: 46%;
    }
    .socialmedia ul li {
      float: right !important;
      margin-left: 13px;
      width: auto !important;
    }
    #menu, #menumobile{
      width: 100%!important;
      position: fixed;
      z-index: 9;
      top: -200%;
      background: rgba(255, 255, 255, 0.8);
    }
    #menumobile.act {
      /*overflow: scroll;*/
      padding-top: 70px;
      /*height: 100%;*/
      top: 0;
    }
    #menumobile ul {
      margin-top: 5%;
    }
    #menumobile ul li {
      width: 100%;
      margin: 0px;
      float: none;
      display: block;
    }
    #top-bar {
      overflow: visible;
    }
    #top-bar ul li a {
      background: none;
    }
    .lessImages {
      display: none;
    }
    .big .content,
    .bigerImage .content {
      position: fixed;
    }
    .smallimg {
      top: 80px;
    }
    .post >>>s aside {
      width: 100%;
    }
    .post >>>s section {
      width: 100%;
    }
    .post >>>image {
      background-position: center top;
      background-size: Over;
      float: left;
      height: 100%;
    }
    /*.post >>>s .next { top: 0px; }*/

    .post >>>s .previous {
      bottom: 0px;
      right: -1px;
    }
    .post >>>s .post >>>contentarea .post >>> {
      /*float: left;*/
      height: 100% !important;
    }
    #aboutus aside,
    #contactus aside {
      float: left;
      height: 50%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }
    #blog aside,
    .post >>>s aside {
      float: left;
      height: 275px;
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .post >>>image {
      width: 100%;
    }
    .post >>>s section,
    #aboutus section,
    #contactus section,
    #blog section {
      width: 100%;
    }
    .pt-page {
      display: none;
    }
    .pt-page-current,
    .pt-page-current1,
    .no-js .pt-page {
      display: block;
    }
    #aboutus .servicebox .service {
      float: left;
      padding: 0 2%;
      text-align: center;
      width: 46%;
    }
    #aboutus .servicebox .service figure {
      float: none;
      height: auto !important;
      margin: 0 auto;
      position: static !important;
      text-align: center;
      width: auto !important;
    }
    #aboutus .servicebox .service figure img {
      float: none;
      height: auto !important;
      position: static !important;
      width: auto !important;
    }
    .content-r-inner {
      padding: 50px;
    }
    #blog .post >>>contentarea,
    .post >>>s .post >>>contentarea {
      margin: 0 0px;
    }
    #blog .post >>>contentarea .post >>>,
    .post >>>s .post >>>contentarea .post >>> {
      /*float: left;*/
    }
    #blog .next {
      right: auto;
      top: 0;
    }
    .post >>>s .next {
      right: auto;
      top: 0;
    }
    #blog .previous,
    .post >>>s .previous {
      bottom: 0px;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
    }
    figure.animqueht  {
      height: 650px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animque {
      height: 1030px!important;
    }
    .bigerImage .big.animque {
      height: 1030px !important;
    }
    .big.animqueht .content {
      bottom: 28%;
    }
    .big.animqueht .explr img {
      margin-top: -29px;
    }
    figure.clickImage .explrht {
      height: inherit !important;
    }
    .moreImageContainer {
      width: 100%;
      height: 100%;
      z-index: 10;
      position: fixed;
      overflow: hidden;
      left: 1200%;
      background: none;
      top: 50px;
    }
    .smallimg {
      display: none;
    }
    .big .content {
      background: none;
      bottom: 14%;
      display: block;
      height: auto;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      position: absolute !important;
      right: auto;
      text-align: left;
      top: auto;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    .callpost .content {
      background: none;
      display: table;
      position: relative ! important;
      height: inherit;
      left: auto;
      margin: auto;
      opacity: 1;
      padding-left: 30px;
      padding-right: 30px;
      right: auto;
      text-align: left;
      transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      width: auto;
      z-index: 10;
    }
    .content-wraper {
      display: table-cell;
      vertical-align: middle;
      margin: auto;
    }
    #top-bar .socialmedia {
      display: none;
    }
    .sa3 {
      padding: 4%;
      width: 92%;
    }
    .sa7 {
      padding: 4%;
      width: 92%;
    }
    .sa5 {
      padding: 4%;
      width: 92%;
    }
     .blogtitle {
      line-height: 50px;
    }
    .blogsub {
      text-align: center;
    }
    .blogsub {
      font-size: 13px;
    }
  }
  @media all and (max-device-width: 759px) and (min-device-width: 200px) and (orientation: portrait),
  all and (max-width: 759px) and (min-width: 200px) and (orientation: portrait) {
    #menumobile ul {
      margin-top: 10%;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  /***** Phablet portrait mode display *****/

  @media screen and (max-width: 650px) and (min-width: 501px),
  screen and (max-device-width: 650px) and (min-device-width: 501px) {
    #aboutus aside,
    #contactus aside,
    .post >>>s aside,
    #blog aside,
    #blog .post >>>image,
    .post >>>s .post >>>image {
      float: left;
      height: 275px !important;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
    }
    .big.animqueht .content {
      bottom: 30%;
    }
    .toc {
      display: none;
    }
    figure.animqueht  {
      height: 870px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animque {
      height: 1080px!important;
    }
    .bigerImage .big.animque {
      height: 1080px !important;
    }
    #menumobile ul {
      margin-top: 5%;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  /***** Small screen Mobile portrait mode display *****/

  @media screen and (max-width: 370px) and (min-width: 340px),
  screen and (max-device-width: 370px) and (min-device-width: 340px) {
    #aboutus aside,
    #contactus aside,
    .post >>>s aside,
    #blog aside,
    #blog .post >>>image {
      float: left;
      height: 275px !important;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
    }
    .big.animqueht .content {
      bottom: 34%;
    }
    .toc {
      display: none;
    }
    figure.animqueht  {
      height: 1040px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animque {
      height: 1220px!important;
    }
    .bigerImage .big.animque {
      height: 1220px !important;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  /***** Iphone Overall mode display *****/

  @media screen and (max-width: 500px) and (min-width: 200px),
  screen and (max-device-width: 500px) and (min-device-width: 200px) {
    .big .content,
    .bigerImage .content {} .big .content h2,
                            .bigerImage .content h2 {
                              font-size: 14px;
                              line-height: 16px;
                            }
    .big .content h2 span,
    .bigerImage .content h2 span {
      font-size: 16px;
    }
    .toc {
      display: none;
    }
    figure .content {
      padding-left: 20px;
      padding-right: 20px;
    }
    figure .content h2,
    figure .contentsqz h2 {
      font-size: 14px;
      line-height: 16px;
    }
    figure .content h2 span,
    figure .contentsqz h2 span {
      font-size: 16px;
    }
    .post >>>contentarea {
      margin: 0 20px;
    }
    /* h2 {*/
    /*font-size: 29px;*/
    /*letter-spacing: 0;*/
    /*line-height: 35px;*/
    /*padding: 25px 0 15px;*/
    /*text-align: left;*/
    /*margin-bottom: 0px;*/
    /*}*/
    #top-bar .socialmedia {
      display: none;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animqueht  {
      height: 1098px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    .big.animqueht .content {
      bottom: 28%;
    }
    .big.animqueht .explr img {
      margin-top: -20px;
    }
    .content-r-inner {
      padding: 0 10px !important;
    }
     h2 span {
      /*background: url("/images/sep.png") repeat-x scroll 0 17px rgba(0, 0, 0, 0);*/
    }
     p.sep {
      width: 13%;
    }
    #contactus  h3 {
      font-size: 22px;
      line-height: 24px;
      padding: 45px 0 5px;
    }
     .contactform div.lft {
      width: 100%;
      padding-bottom: 0;
    }
    .contactform INPUT[type="text"] {
      margin-bottom: 14px;
    }
     .contactform div.rgt {
      width: 100%;
    }
     .contactform div.submit {
      clear: both;
      -webkit-appearance: none;
    }
    .contactform TEXTAREA {
      margin-bottom: 0;
    }
    #aboutus .servicebox .service {
      width: 96%;
    }
     .socialmedia li {
      margin-right: 14px;
    }
    #blog  .blog-cont,
    .post >>>s  .blog-cont {
      margin: 20px auto;
      width: 80%;
    }
    #blog .comment,
    .post >>>s .comment {
      margin: 20px 0 0;
      width: 100%;
    }
    #blog .comment .comt-txt span.comt-date,
    .post >>>s .comment .comt-txt span.comt-date {
      clear: both;
      float: left;
    }
     .contactform {
      padding: 30px 0 10px;
    }
    figure.animque {
      height: 1330px!important;
    }
    .bigerImage .big.animque {
      height: 1330px !important;
    }
    figure.big  .post >>> {
      overflow: scroll;
      height: 100% !important;
    }
    figure.clickImage .explrht {
      height: auto !important;
    }
    #menumobile {
      height: 100% !important;
    }
    figure img {
      height: 100%;
      width: 100%;
    }
    /*#blog ,*/
    /*.post >>>s  {*/
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow-x: hidden;*/
    /*}*/
    .post >>>{
      height:100%
    }

    #top-bar .socialmedia {
      display: none;
    }
    .sa3 {
      padding: 4%;
      width: 92%;
    }
    .sa7 {
      padding: 4%;
      width: 92%;
    }
     .blogtitle {
      line-height: 50px;
    }
    .blogmetainfo {
      font-size: 12px;
    }
    .infodivider {
      font-size: 16px;
      margin: 0 3px;
    }
    #blog .sa2 {
      width: 100%;
    }
     .contactform div div {
      margin-right: 5%;
      width: 100%;
    }
    .callpost .content {
      top: inherit;
    }
    figure .content .excerpt {
      width: 100%;
    }
    figure .content h2,
    figure .contentsqz h2 {
      font-size: 25px;
      line-height: 26px;
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 399px) and (min-width: 300px) and (max-height: 900px) and (min-height: 780px),
  screen and (max-device-width: 399px) and (min-device-width: 300px) and (max-device-height: 900px) and (min-device-height: 780px) {
    figure.animqueht  {
      height: 1110px;
      transition: all 3s ease-in-out 2s;
    }
    .big.animqueht .content {
      bottom: 48%;
    }
  }
  @media screen and (max-width: 499px) and (min-width: 400px) and (max-height: 900px) and (min-height: 780px),
  screen and (max-device-width: 499px) and (min-device-width: 400px) and (max-device-height: 900px) and (min-device-height: 780px) {
    figure.animqueht  {
      height: 1000px;
      transition: all 3s ease-in-out 2s;
    }
  }
  @media screen and (max-width: 649px) and (min-width: 500px) and (max-height: 900px) and (min-height: 780px),
  screen and (max-device-width: 649px) and (min-device-width: 580px) and (max-device-height: 900px) and (min-device-height: 780px) {
    figure.animqueht  {
      height: 770px;
      transition: all 3s ease-in-out 2s;
    }
  }
  @media screen and (max-width: 758px) and (min-width: 650px) and (max-height: 900px) and (min-height: 780px),
  screen and (max-device-width: 758px) and (min-device-width: 650px) and (max-device-height: 900px) and (min-device-height: 780px) {
    figure.animqueht  {
      height: 690px;
      transition: all 3s ease-in-out 2s;
    }
  }
  @media screen and (max-width: 810px) and (min-width: 775px) and (max-height: 900px) and (min-height: 780px),
  screen and (max-device-width: 810px) and (min-device-width: 775px) and (max-device-height: 900px) and (min-device-height: 780px) {
    figure.animqueht  {
      height: 850px;
      transition: all 3s ease-in-out 2s;
    }
  }
  @media screen and (max-width: 700px) and (min-width: 550px) and (max-height: 400px) and (min-height: 360px),
  screen and (max-device-width: 700px) and (min-device-width: 550px) and (max-device-height: 400px) and (min-device-height: 360px) {
    figure.animqueht  {
      height: 770px;
    }
  }
  @media screen and (max-width: 549px) and (min-width: 300px) and (max-height: 359px) and (min-height: 300px),
  screen and (max-device-width: 549px) and (min-device-width: 300px) and (max-device-height: 359px) and (min-device-height: 300px) {
    figure.animqueht  {
      height: 1110px;
    }
  }
  @media screen and (max-width: 500px) and (min-width: 400px),
  screen and (max-device-width: 500px) and (min-device-width: 400px) {
    #menumobile ul {
      margin-top: 2%;
    }
  }
  @media screen and (max-width: 500px) and (min-width: 400px) and (orientation: portrait),
  screen and (max-device-width: 500px) and (min-device-width: 400px) and (orientation: portrait) {
    #menumobile ul {
      margin-top: 40%;
    }
  }
  /***** Iphone Landscape mode display *****/

  @media screen and (max-width: 660px) and (min-width: 400px) and (orientation: landscape),
  screen and (max-device-width: 660px) and (min-device-width: 400px) and (orientation: landscape) {
    #aboutus aside,
    #contactus aside,
    .post >>>s aside,
    #blog aside,
    #blog .post >>>image,
    .post >>>s .post >>>image {
      float: left;
      height: 275px !important;
    }
    figure.anim  {
      height: 0px;
      bottom: 0px;
      position: absolute!important;
    }
    .big.animqueht .content {
      bottom: 45%;
    }
    figure.animqueht  {
      height: 800px;
      -webkit-transition: all 3s ease-in-out;
      -moz-transition: all 3s ease-in-out;
      -o-transition: all 3s ease-in-out;
      transition: all 3s ease-in-out;
      -webkit-transition-delay: 2s;
      -moz-transition-delay: 2s;
      transition-delay: 2s;
    }
    figure.animque {
      height: 970px!important;
    }
    .bigerImage .big.animque {
      height: 970px !important;
    }
    .big.animqueht .content {
      bottom: 42%;
    }
    .animqueht .moreImages {
      bottom: 98px;
      right: 30px;
      width: 16px;
    }
    #menumobile ul {
      margin-top: 2%;
    }
    #top-bar .socialmedia {
      display: none;
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #000;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #000;
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #000;
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #000;
  }
  @media screen and (max-width: 1040px) {
    figure img {
      opacity: 1 !important;
    }
    figure.anim img {
      opacity: 1 !important;
    }
    .pagetitle {
      bottom: 40px !important;
    }
  }
  .team-skills .sa5a:first-child {
    padding: 0;
  }
  .team-skills .boximage:first-child {
    padding: 0;
  }
  .last-skill .sa5a:last-child {
    padding: 0;
  }
  .last-skill .boximage:last-child {
    padding: 0;
  }
  .col-centered {
    float: none;
    margin: 0 auto;
  }
  .contact-main {
    color: #ffffff;
    font-family: montserratbold;
    font-size: 20px;
    letter-spacing: 2px;
    line-height: 30px;
    margin-top: 20px;
  }
  .contact-cap {
    color: red;
    display: inline-block;
    font-family: montserratbold;
    font-size: 40px;
    font-weight: bold;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);
  }
  .contact-info {
    padding: 100px 0 0;
  }
  .contact-sub {
    color: #d7d5d6;
    font-family: montserrat;
    font-size: 14px;
    font-weight: normal;
    padding: 30px 0;
  }
  @media (max-width: 767px) {
    .socialpost {
      display: table;
      margin: 0 auto;
      padding: 10px 0;
    }
    .touch {
      display: table;
      margin: 0 auto;
      padding: 10px 0;
    }
  }
  .divider30 {
    display: inline-block;
    padding: 30px;
    width: 100%;
  }
  .owl-item {
    width: 493px !important;
    border-right: 1px solid #808080;
  }
  @media (min-width: 1200px) {
    .skill-fix {
      display: none;
    }
    .skill-scroll {
      display: block;
    }
  }
  @media (max-width: 1199px) {
    .skill-fix {
      display: block;
    }
    .skill-scroll {
      display: none;
    }
    .sa5a {
      border-right: none;
      padding: 30px 0;
      float: left;
    }
    .team-skills .sa5a:first-child {
      padding: 30px 0;
    }
    .team-skills .sa5a:last-child {
      padding: 30px 0;
    }
  }
  #landingpage .sad {
    width: 285px;
    text-align: left;
  }
  /*@media (min-width: 1199px) {*/
  /*#landingpage  h2 {*/
  /*font-size: 110px;*/
  /*letter-spacing: -5px;*/
  /*line-height: 90px;*/
  /*padding: 20px 0;*/
  /*}*/
  /*}*/
  .parent {
    display: table;
    height: 100%;
    width: 100%;
  }
  .child {
    display: table-cell;
    vertical-align: middle;
  }
  .footer-box {
    bottom: 30px;
    position: absolute;
    width: 100%;
  }
  .footer .socialpost > li {
    display: inline-block !important;
    padding: 0 10px;
    width: auto !important;
  }
  .footer .touch {
    color: #000;
    float: unset;
    font-family: lato;
    text-align: center;
  }
  .footer .socialpost {
    margin-top: 10% !important;
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .footer a {
    padding: 0 !important;
  }
  @media (max-width: 800px) {
    .landing-box {
      top: 50px;
      bottom: auto;
    }
  }

  /*#landingpage  h2 {*/
  /*font-family: "montserrat";*/
  /*font-weight: 900;*/
  /*}*/
  /*@media (max-width: 810px) {*/
  /*.team .content-r-inner > h2 {*/
  /*text-align: center;*/
  /*}*/
  /*}*/
  .pad20 {
    padding: 20px;
  }
  @media (max-width: 810px) {
    #top-bar div {
      width: 69%;
    }
    #top-bar ul li a,
    #menumobile ul li a {
      font-size: 15px;
    }
  }
  .resume-taglin {
    color: #fff;
    font-family: Source Sans Pro;
    font-size: 25px;
    font-style: italic;
    line-height: 33px;
    padding: 20px 0;
  }
  .resume-download-button {
    padding: 20px 0;
  }
  .resume-title {
    color: #000;
    font-family: montserratbold;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 22.85px;
    text-transform: uppercase;
  }
  .resume-meta {
    color: #1297E2 !important;
  }
  .white {
    color: #fff;
    padding: 20px 0 0 0;
  }
  .education-line {
    border: 1px solid rgb(52, 161, 217);
    position: absolute;
    top: 52px;
    width: 110%;
    margin-left: 5px;
    z-index: -1;
  }
  .edu-info .col-sm-6 {
    padding: 15px;
  }
  .edu-info .col-md-3 {
    padding: 15px;
  }
  .edu-info .col-sm-4 {
    padding: 15px;
  }
  .border-right {
    border-right: 2px solid rgb(52, 161, 217);
  }
  .circle-responsive {
    background: #ddd none repeat scroll 0 0;
    border-radius: 50%;
    height: 150px;
    width: 150px;
  }
  .circle-content {
    color: #000;
    font-family: montserrat;
    font-size: 13px;
    line-height: 21px;
    padding-top: 60px;
    text-align: center;
    text-indent: 0;
  }
  .color-DB872D {
    background: #db872d none repeat scroll 0 0 !important;
    margin: 0 auto;
    position: relative;
    z-index: 40;
  }
  .color-DE6F7F {
    background: #de6f7f none repeat scroll 0 0 !important;
    left: -79px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -85px;
    position: relative;
    z-index: 30;
  }
  .color-65AC50 {
    background: #65ac50 none repeat scroll 0 0 !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: -151px;
    position: relative;
    right: -81px;
    z-index: 20;
  }
  .color-DD56F1 {
    background: #dd56f1 none repeat scroll 0 0 !important;
    margin: -83px auto 0;
    position: relative;
    z-index: 10;
  }
  .codeskillicon {
    padding: 30px 0;
  }
  @media (max-width: 1199px) {
    .skillset-pad {
      padding-left: 0px;
    }
    .no-pad {
      padding-left: 0px !important;
    }
  }
  @media (max-width: 767px) {
    .no-pad-xs {
      padding-left: 0px !important;
    }
  }
  @media (max-width: 360px) {
    .color-DE6F7F {
      left: -59px;
      margin-top: -65px;
    }
    .color-65AC50 {
      right: -61px;
    }
  }
  .landingpage .subtitle {
    color: #fff;
    text-align: center;
  }
  .landingpage h2 {
    color: #fff;
    text-align: center;
  }
  .landingpage .sad {
    color: #fff;
    text-align: center !important;
  }
  .landingpage .link {
    color: #fff;
  }
  .landingpage .socialpost a {
    color: #fff;
  }
  .no-pad-home {
    padding: 0px !important;
  }
  #contactus .contact-info i {
    color: #fff;
  }
  #contactus h2 {
    color: #fff;
  }
  #contactus a {
    color: #fff;
  }
  #contactus::-webkit-input-placeholder {
    color: #fff;
  }
  #contactus:-moz-placeholder {
    color: #fff;
    opacity: 1;
  }
  #contactus::-moz-placeholder {
    color: #fff;
    opacity: 1;
  }
  #contactus:-ms-input-placeholder {
    color: #fff;
  }
  #contactus .submit > input {
    color: #fff !important;
  }
  #aboutus .subtitle {
    color: #000;
  }
  .file-icon {
    color: #fff !important;
    font-size: 140px !important;
  }
  .navy-blue {
    color: #337ab7;
    font-size: 19px;
  }
  .dateformate {
    font-size: 17px;
    font-style: italic;
    font-family: Merriweather;
  }
  .skill-fix .sad {
    max-width: none !important;
  }
  .post >>>s .content-r-inner {
    padding: 0 50px;
  }
  #top-bar ul li {
    margin-left: 35px !important;
    margin-right: 35px !important;
    width: auto !important;
  }
  .author-title {
    margin: auto;
    display: table;
  }
  .content-image {
    height: 361px;
    position: relative;
  }
  .pagetitle {
    color: #000;
    font-family: FuturaBT-Medium;
    font-size: 50px;
    padding: 0 15px;

    position: absolute;
    top: 100px;
  }
  .pagetitle .title {
    line-height: normal;
  }

  .pagesubtitle {
    color: #000;
    font-family: Raleway;
    top: 50px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    position: relative;
    text-transform: uppercase;
  }
  .content-image-width {
    width: 100%;
    position: relative;
    width: 100%;
  }
  .nopadding-left {
    padding-left: 0px !important;
  }
  .yearstyle {
    padding-right: 0px !important;
    overflow: hidden;
  }
  .cource-image {
    max-width: 90%;
  }
  .about-images {
    max-width: 100%;
  }
  .circlepad {
    padding-top: 70px;
  }
  .mask {
    background-color: #000;
    border: 0 none;
    height: 7px;
    top: 30px;
    position: relative;
    width: 70px;
  }
  /*
  10 END THEME BASED CSS
  */


  .fold-enter-active {
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-animation: rotateUnfoldRight .7s both ease;
    animation: rotateUnfoldRight .7s both ease;
  }
  .fold-leave-active {
    -webkit-animation: moveToLeftFade .7s ease both;
    animation: moveToLeftFade .7s ease both;

  }
  @-webkit-keyframes moveToLeftFade {
    from { }
    to { opacity: 0.7; -webkit-transform: translateX(-100%); transform: translateX(-100%); }
  }
  @keyframes moveToLeftFade {
    from { }
    to { opacity: 0.7; -webkit-transform: translateX(-100%); transform: translateX(-100%); }
  }
  @-webkit-keyframes rotateUnfoldRight {
    from { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); }
  }
  @keyframes rotateUnfoldRight {
    from { opacity: 0; -webkit-transform: translateX(100%) rotateY(90deg); transform: translateX(100%) rotateY(90deg); }
  }

  .post >>> code[class*="language-"],
  .post >>> pre[class*="language-"] {
    color: #f8f8f2;
    background: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  .post >>>pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  .post >>>:not(pre) > code[class*="language-"],
  .post >>>pre[class*="language-"] {
    background: #272822;
  }

  /* Inline code */
  .post >>>:not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
  }

  .post >>>.token.comment,
  .post >>>.token.prolog,
  .post >>>.token.doctype,
  .post >>>.token.cdata {
    color: slategray;
  }

  .post >>>.token.punctuation {
    color: #f8f8f2;
  }

  .post >>>.namespace {
    opacity: .7;
  }

  .post >>>.token.property,
  .post >>>.token.tag,
  .post >>>.token.constant,
  .post >>>.token.symbol,
  .post >>>.token.deleted {
    color: #f92672;
  }

  .post >>>.token.boolean,
  .post >>>.token.number {
    color: #ae81ff;
  }

  .post >>> .token.selector,
  .post >>> .token.attr-name,
  .post >>>.token.string,
  .post >>>.token.char,
  .post >>>.token.builtin,
  .post >>>.token.inserted {
    color: #a6e22e;
  }

  .post >>>.token.operator,
  .post >>>.token.entity,
  .post >>>.token.url,
  .post >>>.language-css .token.string,
  .post >>>.style .token.string,
  .post >>>.token.variable {
    color: #f8f8f2;
  }

  .post >>>.token.atrule,
  .post >>>.token.attr-value,
  .post >>>.token.function {
    color: #e6db74;
  }

  .post >>>.token.keyword {
    color: #66d9ef;
  }

  .post >>>.token.regex,
  .post >>>.token.important {
    color: #fd971f;
  }

  .post >>>.token.important,
  .post >>>.token.bold {
    font-weight: bold;
  }
  .post >>> .token.italic {
    font-style: italic;
  }

  .post >>> .token.entity {
    cursor: help;
  }

</style>
