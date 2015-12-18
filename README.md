哈瑪星共通平台 前端規範
=======================
前端介面版本 2.0

**[oka Li](mailto:okaoka0709@gmail.com)**


<h2>目錄</h2>
* [簡介](#introduce)
  1. [前言](#overview)
  2. [定義](#definition)
  3. [工具](#tools)
* [哲學](#philosophy)
  1. [模組與群組](#module-and-group)
  3. [CSS 選擇器與範圍](#css-selector)
  4. [Javascript 優化](#javascript-optimize)
* [HTML 實作](#html)
  1. [專案目錄結構](#project-directory)
  2. [參數與意義](#html-parameter)
  3. [格線系統](#grid)
  4. [底層、框架與內容](#base-layout)
  5. [模組/群組基本結構](#module-and-group-structure)
  6. [群組類別與結構](#group-structure)
  7. [模組類別與結構](#module-structure)
  8. [組件](#component)
  9. [模組建立原則](#module-establish-principles)
* [Erb 實作](#erb)
  1. [Erb 目錄結構](#erb-directory)
  2. [Erb 樣板語言](#erb-script)
  3. [Erb 運作方式](#erb-run)
  4. [關於 layout 樣板](#erb-layout)
  5. [關於 index 樣板](#erb-index-layout)
  6. [關於 sys/variable](#erb-variable)
  7. [基本 ruby 語法](#basic-ruby-script)
  8. [假字與圖片](#lorem-ipsum-and-picture)
* [CSS/SCSS 實作](#scss)
  1. [SCSS 目錄結構](#scss-directory)
  2. [SCSS](#scss-script)
  3. [類別](#scss-type)
  4. [選擇器邏輯](#selector-logic)
  5. [檔案引入方式](#scss-file-import)
  6. [function 與 variable](#function-and-variable)
  7. [關於 sys/variable](#scss-sys-variable)
  8. [noscript 方法](#scss-noscript)
  9. [hack 方法](#scss-hack)
  10. [rwd 方法](#scss-rwd)
  11. [admin 方法](#scss-admin)
  12. [背景方法](#bg-to-pic)
  13. [文字圖示](#scss-font-icon)
  14. [sprite 圖示](#scss-sprite-picture)
  15. [關於設定數量的方法](#scss-len-function)
  16. [debug](#scss-debug)
* [javascript/requireJS 實作](#js)
  1. [Script 目錄結構](#js-directory)
  2. [requireJS 運作方式](#js-require)
  3. [以 node 呼叫 javascript 檔案](#node-and-files)
  4. [關於 lib/app 與 lib/main](#app-and-main)
  5. [javascript 執行](#run-script)
  6. [關於 cookie.js](#js-cookie)
  7. [關於 jquery.js](#js-jquery)
  8. [關於 group.js](#js-group)
  9. [關於 plugin.js](#js-plugin)


<h2 id="introduce">簡介</h2>

<h3 id="overview">前言</h3>
從現有的拖曳優化。
想要做到的事情：更彈性、改善效能、給設計師更多空間、統一 HTML 規格。
讓 Javascript 共用，減少客製化，增加可自訂部分。
讓網頁開發有標準，訂定醫治的風格，讓檔案可被壓縮。
更容易建立靜態網頁，幫助我們測試，提高品質、效率。

<h3 id="definition">定義</h3>
本規範的範圍包括前台的 HTML 制定、CSS 文件編輯與 javascript 的引用和執行，其中不應包括後端資料的傳輸。但某些涉及後端資料的 Dom 操作則是例外。

<h3 id="tools">工具</h3>
支援的瀏覽器。
使用 html5 class tag，以便於日後轉換。
使用的開發環境：Ruby、Java、Erb、Scss、Compass。
使用的工具：Git、Fireapp、requireJS、normalize、Livereload、jquery。
使用的 Web 標準 HTML4.2 與 HTML5 影音、宣告，ECMAscript 3。

<h2 id="philosophy">哲學</h2>

<h3 id="module-and-group">模組與群組</h3>
網頁由群組與模組堆砌而成。
許多模組組合起來能變一個更大的模組，如選單。
統一 HTML 格式並制定規範。
並且希望在內頁提供標準化範本，提供工程師使用。
說明模組與群組的差別與理念，並且連結至 [模組/群組基本結構](#module-and-group-structure)。

<h3 id="css-selector">CSS 選擇器與範圍</h3>
說明簡化複製樣式的困難度，並且提供許多新方法。
說明如何讓相同模組在不同區塊能呈現不同樣式，減少工程師維護 HTML。

<h3 id="javascript-optimize">Javascript 優化</h3>
說明實作的目標為動態插入、解決相依性問題、套件衝突問題、模組化管理以及提高可維護性。
說明許多模塊都能共用程式，減少客製化。
提高效能，節省流量。


<h2 id="html">HTML 實作</h2>

<h3 id="project-directory">專案目錄結構與其他檔案</h3>
說明專案目錄如 Css、Audio、Video、Images、Prototype、Scripts、Sass。
並說明 apple-touch-icon.png 與 favicon.ico。
說明 config.rb 與 README.md。
說明 .git 目錄與 .gitignore 檔案。
說明 記事 與 說明 檔案。

<h3 id="html-parameter">參數與意義</h3>
說明屬性 data-type 與 data-index、data-child。
說明屬性 data-function 並且連結至 [以 node 呼叫 javascript 檔案](#node-and-files)。
說明屬性 data-js 與 data-admin。
說明屬性 data-width。

<h3 id="grid">格線系統</h3>
說明 data-child 與 data-setLen 的作用，並且實踐的邏輯為何。
連結說明至 [關於設定數量的方法](#scss-len-function)

<h3 id="base-layout">底層、框架與內容</h3>

<h3 id="module-and-group-structure">模組/群組基本結構</h3>
說明如何判定模塊並區分群組/模組。
說明 .header、.content 與 .footer 的內容應如何區別。
列舉群組與模組的基本結構，並且比較 .group-list 與 .list-text、.list-pic 的結構並說明相似性。

<h3 id="group-structure">群組類別與結構</h3>
列舉並說明群組的 3 種類別。

<h3 id="module-structure">模組類別與結構</h3>
列舉並說明模組的 14 種類別。

<h3 id="component">組件</h3>
列舉說明檔案內的所有組件。

<h3 id="module-establish-principles">模組建立原則</h3>
說明建立模組時應當把外框固定，內容組件由小至大。


<h2 id="erb">Erb 實作</h2>

<h3 id="erb-directory">Erb 目錄結構</h3>
解說 Erb 目錄結構，並說明 _layout.html.erb、index.layout.html.erb、index.html.erb、index.html.layout 也是 Erb 的一部分，並提供用途說明。

<h3 id="erb-script">Erb 樣板語言</h3>
簡述 Erb 語言的理念、優勢，並提供說明網站連結。
說明 Erb 語言基於 Ruby，可使用 Ruby 功能，說明如何標註。

<h3 id="erb-run">Erb 運作方式</h3>
說明區塊如何被嵌套，如何傳變數給子模塊。

<h3 id="erb-layout">關於 layout樣板</h3>
演示並說明 _layout.html.erb 的嵌套範例。

<h3 id="erb-index-layout">關於 index樣板</h3>
說明 index.layout.html.erb、index.html.erb 與 index.html.layout 的意義。

<h3 id="erb-variable">關於 sys/variable</h3>
說明全域變數與區域變數，並列舉全域變數的項目。

<h3 id="basic-ruby-script">基本 ruby 語法</h3>
說明迴圈、判斷與隨機的使用方法，並提供說明網站連結。

<h3 id="lorem-ipsum-and-picture">假字與圖片</h3>
演示假字、假段落與其他功能，並提供說明網站連結。


<h2 id="scss">CSS/SCSS 實作</h2>

<h3 id="scss-directory">SCSS 目錄結構</h3>
解說 Scss 目錄結構。

<h3 id="scss-script">SCSS</h3>
簡述 SCSS 語言解決的問題與優勢，並提供說明網站連結。

<h3 id="scss-type">類別</h3>
說明 3 個群組類別 14 個模組類別，與相同類別為何要撰寫在同一支 SCSS 檔案、是如何被寫在一起的。

<h3 id="selector-logic">選擇器邏輯</h3>
說明 .group-list 與 .list-text、.list-pic 的結構相似性，以及 CSS 選擇器選法的不同。並且提示在複製樣式時須注意的事項與權重。
說明什麼該交由 .group 決定，什麼該由群組自己決定。

<h3 id="scss-file-import">檔案引入方式</h3>
說明 SCSS 檔是如何匯成 CSS，並引用至 HTML。

<h3 id="function-and-variable">function 與 variable</h3>
說明 function 與 variable 的用途，並列舉幾個重要的變數說明。

<h3 id="scss-sys-variable">關於 sys/variable</h3>
說明共通平台將為何要帶入 sys/variable，要如何讓 sys/variable 參數取代 base-variable。

<h3 id="scss-noscript">noscript 方法</h3>
先說明目前 noscript 的尷尬處境，再演示如何使用，最後說明如何應用 data-js 與 javascript 實作這個功能。

<h3 id="scss-hack">hack 方法</h3>
解說 @media 的 hack 方式與 variable 中的 hack 物件，並演示如何使用。

<h3 id="scss-rwd">rwd 方法</h3>
說明 rwd 的兩種方法與意義。

<h3 id="scss-admin">admin 方法</h3>
說明 admin 意義與方法。

<h3 id="bg-to-pic">背景方法</h3>
說明 bg-to-pic 使用方法。

<h3 id="scss-font-icon">文字圖示</h3>
說明文字圖示的好處、說明如何增加樣式至 scss ，並演示如何操作 icon-pic 方法。

<h3 id="scss-sprite-picture">sprite 圖示</h3>
說明雪碧圖的好處，並演示如何操作 icon-pic 方法。

<h3 id="scss-len-function">關於設定數量的方法</h3>
列舉並說明 default-min-len、default-len、default-len-hide、set-len、set-len-hide、set-len-rwd 方法。

<h3 id="scss-debug">debug</h3>
說明 $debug 的參數意義。


<h2 id="js">javascript/requireJS 實作</h2>

<h3 id="js-directory">Script 目錄結構</h3>
解說 Script 目錄結構。

<h3 id="js-require">requireJS 運作方式</h3>
介紹 requireJS 的優勢：動態插入、相依性問題、套件衝突、模組化管理，提供說明網站連結。
並解說平台引用的方式能提高管理性。

<h3 id="node-and-files">以 node 呼叫 javascript 檔案</h3>
演示並說明如何在 node 上啟用一個 js模塊 ，說明 data-function 的參數意義與字串解析，同時演示該如何在一個 node 上執行兩支以上的 funciton。
說明檔案放置的位置。
最後說明 .group-list 與 .list-text、.list-pic 的結構相似性，以及他們可以引用同的 function。

<h3 id="app-and-main">關於 lib/app 與 lib/main</h3>
說明 app.js 的 requirejs.config 設定的內容與意義，並解釋 requireJS 在平台上的執行順序。
解釋 main.js 的程式碼，並且稍加說明 lib/domReady.js。

<h3 id="run-script">javascript 執行</h3>
介紹 js 模塊的標準寫法，必須回傳一個 function。說明回傳的執行環境、參數物件。並在最後稍加說明 debug 參數的意義。

<h3 id="js-cookie">關於 cookie.js</h3>
介紹 cookie.js 的想法與用法，並在最後演示如何在模塊內使用 cookie。

<h3 id="js-jquery">關於 jquery.js</h3>
闡述如何在 app.js jquery 的來源，以 jqueryPrivate 回傳一個不影響全域的 jquery，並在最後演示如何在模塊內使用 jquery。

<h3 id="js-group">關於 group.js</h3>
介紹 group.js 的理念、用法。

<h3 id="js-plugin">關於 plugin.js</h3>
介紹 plugin.js 的用途與目前有的功能。