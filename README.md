
哈瑪星共通平台 前端規範
=======================
前端介面版本 2.0

[oka Li](mailto:okaoka0709@gmail.com)




<h2>目錄</h2>
* [簡介](#introduce)
  1. [前言](#overview)
  2. [定義](#definition)
  3. [工具](#environment-and-tools)
* [哲學](#philosophy)
  1. [模塊：模組與群組](#module-and-group)
  2. [CSS 選擇器與範圍](#css-selector)
  3. [Javascript 優化](#javascript-optimize)
* [HTML 實作](#html)
  1. [專案目錄結構](#project-directory)
  2. [參數與意義](#html-parameter)
  3. [底層、框架與內容](#base-layout)
  4. [模塊基礎結構](#module-and-group-structure)
  5. [群組類別與結構](#group-structure)
  6. [模組類別與結構](#module-structure)
  7. [組件](#component)
  9. [以 class name 表示狀態](#use-class-name-to-show-status)
* [Erb 實作](#erb)
  1. [Erb 目錄結構](#erb-directory)
  2. [Erb 樣板語言](#erb-script)
  3. [Erb 運作方式](#erb-run)
  4. [關於 layout 樣板](#erb-layout)
  5. [關於 index 樣板](#erb-index-layout)
  6. [關於 sys/variable](#erb-variable)
  7. [假字與圖片](#lorem-ipsum-and-picture)
* [CSS/SCSS 實作](#scss)
  1. [SCSS 目錄結構](#scss-directory)
  2. [SCSS](#scss-script)
  3. [格線系統](#grid)
  4. [類別](#scss-type)
  5. [選擇器邏輯](#selector-logic)
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
  5. [關於 jquery.js](#js-jquery)
  6. [關於 cookie.js](#js-cookie)
  7. [關於 getNode.js](#js-getNode)
  8. [關於 fix.js](#js-fix)




<h2 id="introduce">簡介</h2>
<h3 id="overview">前言</h3>
第一版共通平台發展出拖曳的方法、群組/模組的概念，在第二版得到進一步的整理，發揮更強大的彈性。

群組從單純的排版物件，進化成主選單、跑馬燈、輪播等等的主架構。
想像把幾個選單模組放入群組，它們搖身一變成了主選單。而主選單在手機側欄、側邊欄、header、footer 甚至內頁都能呈現出不同的樣式，所以工程師只需要維護同一份 HTML 就好，極大的簡化了工作。

模組的 HTML 規範被統一，讓它們可以套用彼此的樣式，甚至能與其他模組/群組共享 javascript 程式。

第二版推翻了許多舊版本的框架，能實踐更多元的版型。不論主選單放在上、下、左、右哪一邊，第二版都可以輕鬆的實現，拓展了設計師的視野。也能減少許多客製，增進專案執行的效率。

模組與群組上新增了一些屬性，讓使用者透過參數來控制顯示的項目，增加了不少彈性。
而內頁的 HTML 一直無法被統一風格的問題，透過提供 HTML 範本給工程師解決，以減少設計師維護的模組數量。

javascript 方面，減少了不必要的引入，並透過新的方法減省流量，不僅加快速度，也增加可維護性。

新平台引進一種稱為 Erb 的樣板語言，提高設計師在建立靜態網頁的效率，且能匯出隨機的項目及文字數量，幫助我們測試網頁的可靠性。


<h3 id="definition">定義</h3>
本文件規範的範圍包括前台的 HTML 制定、CSS 與 javascript 的引用和執行，不應干涉後端資料的傳輸。但某些涉及後端資料的 Dom 操作則是例外。


<h3 id="environment-and-tools">環境與工具</h3>
我們支援 IE8 以上的瀏覽器，並做到優雅降級。
因為平台仍繼續維護 IE8，所以雖然使用 html5 宣告，但還是以 html4.2 版的標籤為主。許多 html5 的語意標籤被轉化為 class name，便於日後轉換平台至 html5。唯二的例外是視訊模組與音訊模組，他們使用了 html5 撥放器，但平台也提供了相應的外掛供 IE8、IE9 所使用。

<table>
  <tr>
    <th>開發環境</th>
    <td>Ruby、Java、Erb、Scss、Compass。</td>
  </tr>
  <tr>
    <th>工具</th>
    <td>Git、Fire.app、requireJS、normalize、jquery。</td>
  </tr>
</table>

note: 開發環境雖然可以自行建置，但還是推薦使用 Fire.app。




<h2 id="philosophy">哲學</h2>
<h3 id="module-and-group">模塊：模組與群組</h3>
新平台基於兩種模塊：群組與模組。

群組本身並沒有內容，是一種協助排版的模塊。
模組則是一塊有意義的內容，如：天氣模組、資訊模組。

前端網頁的構成，應由模塊堆砌而成，不應有例外。
當我們需要一個複合型的模組，應該使用現有模組去堆砌出來。例如把日曆與選單加入到群組，該群組就類似於成為帶選單的日曆模組。

模組有兩種命名方式，一是依照模組的意義命名，例如：weather(天氣)、logo(標誌)。
另一種是依照模組的樣式命名，例如：pic-block(圖片區塊)。

一般來說，首頁模組、偏向使用意義命名，而內頁模組應以樣式命名，以便於作為範本使用。

更多模塊的規範，可參閱 [模塊基礎結構](#module-and-group-structure) 章節。


<h3 id="css-selector">CSS 選擇器與範圍</h3>
我們將 html 整理之後，大致可以歸類出數種結構，而相同/相似結構的模塊，樣式會被寫在同一個檔案中。
由於同一類別的模塊結構完全相同，因此可直接套用同一類別的其他樣式。
.group-list 與 .list-text、.list-pic 這三個類別相當程度上也可以套用彼此的樣式，唯群組與模組指定選擇器的方式稍有不同，需多加注意。

樣式可依照區域有所變更，例如指定主選單在手機側欄、側邊欄、header、footer 與內頁時呈現不同的樣式，更多框架區塊可參閱 [底層、框架與內容](#base-layout) 章節。

平台提供了許多指定寬度的新方法，尤其是讓使用者透過參數來控制顯示的項目，增加了不少彈性。


<h3 id="javascript-optimize">Javascript 優化</h3>
以往新增/修改 javascript 程式，必須在 head 標籤中引入，時間一久往往會不知道哪些程式在做什麼，進而造成維護上的問題，同時也引入不少實際上並沒有被使用的部分，浪費不少資源。
另一個問題在於程式執行後，無法得知哪一隻程式在控制當前節點，時常令人困擾。

此版本平台使用 requireJS 解決這些問題，動態載入應執行的檔案。新的規則也能很容易的判別哪隻程式控制當前節點。
也順勢解決相依性問題、套件衝突的問題等等。

此外由於 html 有可依循的結構，因此許多模塊能夠共享程式。如輪播模組可被 .group-list 與 .list-text、.list-pic 這三個類別所使用，減少客製化。




<h2 id="html">HTML 實作</h2>
<h3 id="project-directory">專案目錄結構與其他檔案</h3>
以下是專案目錄結構圖及說明。

    - 專案目錄
      |- .git
      |- .sass-cache
      |- Audio
      |- Css
      |- Document
      |- Erb
      |- Images
      |- Prototype
      |- Sass
      |- Script
      |- Video
      |- .gitignore
      |- _index_layout.html.erb
      |- _layout.html.erb
      |- apple-touch-icon.png
      |- config.rb
      |- favicon.ico
      |- index.html.erb
      |- index.html.layout
      |- README.md

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>.git</td>
    <td>存放 git 版本管理庫的目錄。</td>
  </tr>
  <tr>
    <td>.sass-cache</td>
    <td>存放 Sass 編譯暫存檔案的目錄。</td>
  </tr>
  <tr>
    <td>Audio</td>
    <td>存放音訊檔案的目錄。</td>
  </tr>
  <tr>
    <td>Css</td>
    <td>存放 css 文件的目錄。</td>
  </tr>
  <tr>
    <td>Document</td>
    <td>存放其他相關文件的目錄。</td>
  </tr>
  <tr>
    <td>Erb</td>
    <td>存放 Erb 樣板與模組的目錄。</td>
  </tr>
  <tr>
    <td>Images</td>
    <td>存放圖片、文字圖示的目錄。</td>
  </tr>
  <tr>
    <td>Prototype</td>
    <td>存放專案雛形、原始圖檔的目錄。</td>
  </tr>
  <tr>
    <td>Sass</td>
    <td>存放所有 Scss 相關檔案的目錄。</td>
  </tr>
  <tr>
    <td>Script</td>
    <td>存放所有 js 文件的目錄。</td>
  </tr>
  <tr>
    <td>Video</td>
    <td>存放視訊檔案的目錄。</td>
  </tr>
  <tr>
    <td>.gitignore</td>
    <td>紀錄 Git 排除名單的文件。</td>
  </tr>
  <tr>
    <td>_index_layout.html.erb</td>
    <td>index.html.erb 的樣板。</td>
  </tr>
  <tr>
    <td>_layout.html.erb</td>
    <td>所有內面的樣板。</td>
  </tr>
  <tr>
    <td>apple-touch-icon.png</td>
    <td>apple 系統的較大 icon 圖片。</td>
  </tr>
  <tr>
    <td>config.rb</td>
    <td>關於 compass、sass 的設定文件。</td>
  </tr>
  <tr>
    <td>favicon.ico</th>
    <td>網頁 icon 圖示</td>
  </tr>
  <tr>
    <td>index.html.erb</td>
    <td>以 Erb 撰寫的首頁。</td>
  </tr>
  <tr>
    <td>index.html.layout</td>
    <td>指定 _index_layout.html.erb 為 index.html.erb 樣板的設定文件。</td>
  </tr>
  <tr>
    <td>README.md</td>
    <td>專案說明文件，即本文。</td>
  </tr>
</table>

<h3 id="html-parameter">參數與意義</h3>
我們使用 html5 data-* 屬性來為 css 及 javascript 做一些事，用以強化整體規範與便利性。

一般的模塊具有屬性 data-type、data-index、data-child、data-function、data-setlen，而 body 則有屬性 data-js、data-admin，特殊屬性有 data-width，以下將這幾種屬性的用途、意義等一一說明。

<table>
  <tr>
    <th>屬性</th>
    <th>意義</th>
    <th>說明</th>
    <th>歸屬</th>
  </tr>
  <tr>
    <td>data-type</td>
    <td>模塊類型</td>
    <td>標示該模塊的類型，0 代表該模塊為模組，1到4分別為不同類別的群組，更多說明請至 <a href="#group-structure">群組類別與結構</a> 章節。</td>
    <td>模塊</td>
  </tr>
  <tr>
    <td>data-index</td>
    <td>模塊或項目順序</td>
    <td>標示該模塊在父模中的順序、標示項目在清單中的順序。</td>
    <td>模塊、項目(li)</td>
  </tr>
  <tr>
    <td>data-child</td>
    <td>子模塊或子項目數量</td>
    <td>標示該模塊包含的子模塊數量、標示該清單的子項目數量。</td>
    <td>群組、清單(ul)</td>
  </tr>
  <tr>
    <td>data-function</td>
    <td>呼叫模塊程式</td>
    <td>提供一組 javascript 物件字串，用以呼叫程式模塊，更多說明請至 <a href="#node-and-files">以 node 呼叫 javascript 檔案</a> 章節。</td>
    <td>模塊、body</td>
  </tr>
  <tr>
    <td>data-setlen</td>
    <td>設定模塊顯示項目</td>
    <td>設定內容項目顯示的數量。設計師可設定該模塊是否開啟這項功能，更多說明請至 <a href="#scss-len-function">關於設定數量的方法</a> 章節。</td>
    <td>模塊</td>
  </tr>
  <tr>
    <td>data-js</td>
    <td>javascript 提示</td>
    <td>提示用戶是否開啟 javascript。</td>
    <td>body</td>
  </tr>
  <tr>
    <td>data-admin</td>
    <td>管理者提示</td>
    <td>提示用戶是否為系統管理者。</td>
    <td>body</td>
  </tr>
  <tr>
    <td>data-width</td>
    <td>選單寬度</td>
    <td>設定子模塊的 content 選單寬度，主要用於主選單，單位是基本寬度的倍數。</td>
    <td>項目(li)</td>
  </tr>
</table>

<h3 id="base-layout">底層、框架與內容</h3>
在共通平台第二版重構了許多框架，他們都是群組， 框架 class name 會以 sys(系統級) 與 base(基礎級) 前輟。
前輟 sys 是系統級節點，樣式由此節點開始撰寫，而不應在 html、body、form 寫入任何樣式。網頁內容也應由此節點開始堆砌。
前輟 base 是*基礎級*節點，代表它應被固定，而不能被拖曳改變排列。
以下將一層一層的介紹它們的意義。

sys-root 是一組群組，是平台版面根節點，所有網頁的內容皆由它開始延伸，讓我們先看 HTML 示意：

    <body>
      <div class="sys-root">
        網頁內容由此開始
      </div>
    </body>

在 sys-root 之下有 base-mobile、base-extend 與 base-wrapper 三個主要區塊：

base-mobile: 行動側欄。通常會放置主選單、分享模組等。  
base-extend: 漂浮在瀏覽器上的物件層。通常會放置回到最頂按鈕等等。  
base-wrapper: 網頁頁面框架。

    <body>
      <div class="sys-root">
      
        <div class="base-mobile">
          行動版側欄
        </div>
        <div class="base-extend">
          漂浮物件層
        </div>
        <div class="base-wrapper">
          網頁頁面框架
        </div>
        
      </div>
    </body>

base-wrapper 中分 base-header、base-content、base-footer 三個次要區塊：

base-header: 網頁頁首。通常放置主選單、LOGO模組等。  
base-content: 網頁主要內容。  
base-footer: 網頁頁尾。通常放置一些網站資訊。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">
        
          <div class="base-header">
            網頁頁首
          </div>
          <div class="base-content">
            網頁主要內容
          </div>
          <div class="base-footer">
            網頁頁尾
          </div>
        
        </div>
      </div>
    </body>

依據首頁/內頁框架區塊的不同，可區分 base-module-area 與base-page-area：

base-module-area: 模組區塊。可放置各種模組。在內頁時該區塊會顯示在 base-page-area 之上。  
base-page-area: 內頁框架。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">
          <div class="base-header">
          </div>
          <div class="base-content">
          
            <div class="base-module-area">
              模組
            </div>
            <div class="base-page-area">
              內頁
            </div>
            
          </div>
          <div class="base-footer">
          </div>
        </div>
      </div>
    </body>

進入到內頁之後，base-page-area 分為兩個區塊是 base-aside 與 base-section：

base-aside: 內頁側欄。通常放置主選單或次選單。  
base-section: 內頁內容。

    <html>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="base-extend">
          </div>
          <div class="base-wrapper">
            <div class="base-header">
            </div>
            <div class="base-content">
              <div class="base-module-area">
              </div>
              <div class="base-page-area">
              
                <div class="base-aside">
                  內頁側欄
                </div>
                <div class="base-section">
                  內頁內容
                </div>
                
              </div>
            </div>
            <div class="base-footer">
            </div>
          </div>
        </div>
      </body>
    </html>

最後，如果在內頁內容中有包含文章區塊，base-section 區塊會包含最後一個固定框架 base-article：

base-article: 內頁文章區塊。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">
          <div class="base-header">
          </div>
          <div class="base-content">
            <div class="base-module-area">
            </div>
            <div class="base-page-area">
              <div class="base-aside">
              </div>
              <div class="base-section">
              
                <div class="base-article">
                  內頁文章
                </div>
                
              </div>
            </div>
          </div>
          <div class="base-footer">
          </div>
        </div>
      </div>
    </body>

以下以列表說明各框架具體內容與說明：

<table>
  <tr>
    <th>框架</th>
    <th>意義</th>
    <th>說明</th>
    <th>層級</th>
  </tr>
  <tr>
    <td>.sys-root</td>
    <td>平台版面根節點</td>
    <td>樣式由此節點開始撰寫，而不應在 html、body、form 寫入任何樣式。網頁內容也應由此節點開始堆砌。</td>
    <td>1</td>
  </tr>
  <tr>
    <td>.base-mobile</td>
    <td>行動版側欄</td>
    <td>行動側欄框架。通常會放置主選單、分享模組等。</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-extend</td>
    <td>漂浮物件層</td>
    <td>漂浮在瀏覽器上的物件層。通常會放置回到最頂按鈕等等。</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-wrapper</td>
    <td>網頁頁面框架</td>
    <td>網頁頁面框架。</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-header</td>
    <td>網頁頁首</td>
    <td>通常放置主選單、LOGO模組等。</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-content</td>
    <td>網頁主要內容</td>
    <td>網頁主要內容。</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-footer</td>
    <td>網頁頁尾</td>
    <td>通常放置一些網站資訊。</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-module-area</td>
    <td>模組區塊</td>
    <td>可放置各種模組。在內頁時該區塊會顯示在 base-page-area 之上。</td>
    <td>4</td>
  </tr>
  <tr>
    <td>.base-page-area</td>
    <td>內頁區塊</td>
    <td>內頁框架。</td>
    <td>4</td>
  </tr>
  <tr>
    <td>.base-aside</td>
    <td>內頁側欄</td>
    <td>通常放置主選單或次選單。</td>
    <td>5</td>
  </tr>
  <tr>
    <td>.base-section</td>
    <td>內頁內容</td>
    <td>內頁內容。</td>
    <td>5</td>
  </tr>
  <tr>
    <td>.base-article</td>
    <td>內頁文章</td>
    <td>內頁文章區塊。</td>
    <td>6</td>
  </tr>
</table>

要記得每一層框架都是一個群組，而群組有其特定的結構，以上僅是結構示意，關於群組結構請參閱 [模塊基礎結構](#module-and-group-structure) 章節。


<h3 id="module-and-group-structure">模塊基礎結構</h3>
模塊是平台網頁的基礎單位，分為群組與模組。
只要該模組同時含有屬性 data-index 與 data-type，該節點就是模塊的起始節點。
模塊由 header、content、footer 3個區塊組成，以下將列表說明他們的意義：

<table>
  <tr>
    <th>區塊</th>
    <th>意義</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>header</td>
    <td>標頭</td>
    <td>該模組的標題，不論是否具有標題，模塊都將具有 header 區塊。</td>
  </tr>
  <tr>
    <td>content</td>
    <td>內容</td>
    <td>模組表達的意義。</td>
  </tr>
  <tr>
    <td>inner</td>
    <td>附加資訊</td>
    <td>通常用來放置上一則、下一則、更多、RSS等附加操作。若該模塊不須附加操作，那麼該模塊將沒有 footer 區塊</td>
  </tr>
</table>

模塊起始層下有一個 .inner 層，header、.inner 層用來輔助排版，以下列出模塊基本結構。

    <data-index data-type>
      <div class="inner">
        <div class="header">
          <div class="inner">
            標頭
          </div>
        </div>
        <div class="content">
          <div class="inner">
            內容
          </div>
        </div>
        <div class="footer">
          <div class="inner">
            附加資訊
          </div>
        </div>
      </div>
    </div>

模塊的 data-type 屬性指明了該模塊是群組還是模組，以下列舉 data-type 屬性的5個類別。

<table>
  <tr>
    <th>值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>0</td>
    <td>標示該模塊為模組。</td>
  </tr>
  <tr>
    <td>1</td>
    <td>標示該模塊為分割群組。</td>
  </tr>
  <tr>
    <td>2</td>
    <td>標示該模塊為頁籤群組。</td>
  </tr>
  <tr>
    <td>3</td>
    <td>標示該模塊為單欄群組。</td>
  </tr>
  <tr>
    <td>4</td>
    <td>標示該模塊為清單群組。</td>
  </tr>
</table>

關於群組類別，請參閱 [群組類別與結構](#group-structure) 章節。


<h3 id="group-structure">群組類別與結構</h3>
群組是一個無內容的模塊，主要用於裝載其他的模塊，因此常利用它構成需要的框架。
群組分為分割、頁籤、單欄與清單，以下針對這四種模組的意義作說明。

<h4>分割群組</h4>
分割群組會依照 [格線系統](#grid) 均分子模塊，例如分割模組裡有兩個模塊，那麼子模塊的寬度則各為 50%，該規則可設定 data-setlen 屬性覆蓋，關於此規則請參閱 [關於設定數量的方法](#scss-len-function) 章節。

以下是分割群組的 html 格式：

    <data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            子模塊
          </div>
        </div>
      </div>
    </div>

<h4>頁籤群組</h4>
提供切換頁籤功能的群組。
該模塊 content 具有一個列表，第一個項目是頁籤模組、第二個項目以後依序放入加入的子模塊。
頁籤模組的 content 具有一個列表，依序為此頁籤群組的子模塊 header 文字。
一般情況下，頁籤群組的子模塊 header 區塊應被隱藏。
在無 javascript 環境下，子模塊 header 區塊應被顯示，而隱藏頁籤模組。

以下是頁籤群組的 html 格式：

    <data-index data-type="2">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <ul data-child>
              <li data-index="1">
                
                   <data-index data-type="0">
                      <div class="inner">
                        <div class="header">
                          <div class="inner">
                            <h4><span><a>頁籤模組</a></span></h4>
                          </div>
                        </div>
                        <div class="content">
                          <div class="inner">
                            <ul data-child>
                              <li data-index="1"><span><a>依序加入子模塊 header文字...</a></span><li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                
              </li>
              <li data-index="2">依序加入子模塊...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>單欄群組</h4>
相對於分割群組，單欄群組並不分割子模塊，而是依順序由上而下排列。

以下是單欄群組的 html 格式：

    <data-index data-type="3">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            子模塊
          </div>
        </div>
      </div>
    </div>

<h4>清單群組</h4>
清單群組的 content 具有一個清單，而子模塊會被依序放入該清單的項目中。因為此模塊的結構與模組類別 list-text、 list-pic 的結構相似，因此可共用 javascript，樣式雖然在某種程度上也以可共用，但選擇器的指定方法稍有不同，需稍加注意。

以下是清單群組的 html 格式：

    <data-index data-type="3">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <ul data-child>
              <li>依序加入子模塊...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


<h3 id="module-structure">模組類別與結構</h3>
與群組類別相仿，模組也分為14種類別，但不論屬於何種類別，模組的 data-type 永遠是0。
類別的意義在於區分模組的結構，例如該模組是一個列表且以圖片為主體，則屬於 list-pic 類別。
模組使用 class name 區別類別，每個模組都應同時包含兩種 class，分別是類別 class 與自定義 class，例如選單模組：

    <div calss="list-text nav" data-type="0" data-index="1">

list-text 是類別 class，而 nav 是自定義 class，以說明此模組是選單。以下列舉出14種類別的意義、說明與參考格式：

<h4>area-audio</h4>
音訊模組，以 html5 audio 為主體的模組。以下是 area-audio 類別的 html 參考格式：

    <class="area-audio" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <div class="audio">
              <audio controls="">
                <source src="#" type="audio/ogg">
                <source src="#" type="audio/mpeg">
                <object data="Audio/MHXSEagle.mp3">
                  <param name="filename" value="#">
                  <param name="Showcontrols" value="true">
                  <param name="autoStart" value="false">
                </object>
                <span>您的瀏覽器不支援 html5 撥放器，請<a href="#">下載媒體</a>於本機播放。</span>
              </audio>
            </div>
            <div class="essay">
              <div class="caption"><span>內容標題</span></div>
              <div class="label">
                <ul>
                  <li><span><i class="mark">標籤</i></span></li>
                </ul>
              </div>
              <div class="paragraph">
                <p><span>內容簡介</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<h4>area-customize</h4>
客製的模組，如： google map 模組。以下是 area-customize 類別的 html 參考格式：

    <class="area-customize" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            ...
          </div>
        </div>
      </div>
    </div>

<h4>area-editor</h4>
客戶可以使用文字編輯器編輯內文的模組，如：下方地址。以下是 area-editor 類別的 html 參考格式：

    <class="area-editor" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            使用者編輯文字
          </div>
        </div>
      </div>
    </div>

<h4>area-essay</h4>
參雜文字與圖片，以文字為主體的模組，如：最新消息。以下是 area-essay 類別的 html 參考格式，請注意 area-essay 的內標標題應為 .caption ：

    <class="area-essay" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <a href="#" class="divition">
              <div class="image"><span style="background-image: url('#')"><img src="#" alt=""></span></div>
              <div class="essay">
                <div class="caption"><span>內容標題</span></div>
                <div class="label">
                  <ul>
                    <li><span><i class="mark">標籤</i></span></li>
                  </ul>
                </div>
                <div class="paragraph">
                  <p><span>內容簡介</span></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

<h4>area-figure</h4>
參雜文字與圖片，以圖片為主體的模組，如：相簿模組。以下是 area-figure 類別的 html 參考格式，請注意 area-figure 的內標標題應為 .figcaption ：

    <class="area-figure" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <a href="#" class="divition">
              <div class="image"><span style="background-image: url('#')"><img src="#" alt=""></span></div>
              <div class="essay">
                <div class="figcaption"><span>內容標題</span></div>
                <div class="label">
                  <ul>
                    <li><span><i class="mark">標籤</i></span></li>
                  </ul>
                </div>
                <div class="paragraph">
                  <p><span>內容簡介</span></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

<h4>area-form</h4>
以表單為主體的模組，如：搜尋模組。以下是 area-form 類別的 html 參考格式：

    <class="area-form" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <div class="fieldset">
              <span class="text"><input type="text"></span>
              <span class="submit"><a href="#">送出</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>

<h4>area-iframe</h4>
以 iframe 為主體的模組。以下是 area-iframe 類別的 html 參考格式：

    <class="area-iframe" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <div class="iframe">
              <iframe src="#" frameborder="0" allowfullscreen=""></iframe>
            </div>
            <div class="essay">
              <div class="caption"><span>內容標題</span></div>
              <div class="label">
                <ul>
                  <li><span><i class="mark">標題</i></span></li>
                </ul>
              </div>
              <div class="paragraph">
                <p><span>內容簡介</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<h4>area-table</h4>
以表格為主體的模組。以下是 area-table 類別的 html 參考格式：

    <class="area-table" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <table>
              <tbody>
                <tr>
                  <td>內容</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

<h4>area-video</h4>
視訊模組，以 html5 video 為主體的模組。以下是 area-video 類別的 html 參考格式：

    <class="area-video" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <div class="video">
              <video controls="">
                <source src="#" type="video/webm">
                <source src="#" type="video/ogg">
                <source src="#" type="video/mp4">
                <object classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112">
                  <param name="filename" value="#">
                  <param name="Showcontrols" value="true">
                  <param name="autoStart" value="false">
                </object>
                <span>您的瀏覽器不支援 html5 撥放器，請<a href="#">下載媒體</a>於本機播放。</span>
              </video>
            </div>
            <div class="essay">
              <div class="caption"><span>內容標題</span></div>
              <div class="label">
                <ul>
                  <li><span><i class="mark">標籤</i></span></li>
                </ul>
              </div>
              <div class="paragraph">
                <p><span>內容簡介</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<h4>list-multiple</h4>
多重清單模組，如：頁次導航列。以下是 area-audio 類別的 list-multiple 參考格式：

    <class="list-multiple" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <ul data-child><li><span><a><i class="mark">標籤</i>依序加入清單與項目...</a></span></li></ul>
          </div>
        </div>
      </div>
    </div>

<h4>list-pic</h4>
圖片清單模組，如：標章模組。以下是 list-pic 類別的 html 參考格式：

    <class="list-text" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <ul data-child>
              <li><span style="background-image: url('#');"><a href="#"><img src="#" alt=""></a></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>list-text</h4>
文字清單模組，如：選單。以下是 list-text 類別的 html 參考格式：

    <class="list-text" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <ul data-child>
              <li><span><a><i class="mark">標籤</i>依序加入文字項目...</a></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>simple-pic</h4>
只顯示一張圖片的模組，如：圖片模組。以下是 simple-pic 類別的 html 參考格式：

    <class="simple-pic" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <span style="background-image: url('#');"><a href="#"><img src="#" alt=""></a></span>
          </div>
        </div>
      </div>
    </div>

<h4>simple-text</h4>
只敘述一行文字的文字模組，如：LOGO 模組。以下是 simple-text 類別的 html 參考格式：

    <class="simple-text" data-index data-type="0">
      <div class="inner">
        <div class="header">
          <div class="inner">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="content">
          <div class="inner">
            <span><a>文字</a></span>
          </div>
        </div>
      </div>
    </div>


<h3 id="component">組件</h3>
模組的 content 是一塊有意義的內容，content 由組件組成，有規則可依循。
以下先一一列出可用的組件(emmet 格式)。

<table>
  <tr>
    <th colspan="2">表單類</th>
  </tr>
  <tr>
    <td>表單主題區塊</td>
    <td>div.form></td>
  </tr>
  <tr>
    <td>表單區塊</td>
    <td>.fieldset></td>
  </tr>
  <tr>
    <td>表單標題組件</td>
    <td>.legend>a{可選}>span>{標題文字}</td>
  </tr>
  <tr>
    <td rowspan="23">輸入框組件</td>
    <td>span.button>input[type='button']</td>
  </tr>
  <tr>
    <td>span.checkbox>input[type='checkbox']</td>
  </tr>
  <tr>
    <td>span.color>input[type='color']</td>
  </tr>
  <tr>
    <td>span.date>input[type='date']</td>
  </tr>
  <tr>
    <td>span.datetime>input[type='datetime']</td>
  </tr>
  <tr>
    <td>span.datetime_local>input[type='datetime-local']</td>
  </tr>
  <tr>
    <td>span.email>input[type='email']</td>
  </tr>
  <tr>
    <td>span.file>input[type='file']</td>
  </tr>
  <tr>
    <td>span.hidden>input[type='hidden']</td>
  </tr>
  <tr>
    <td>span.input_image>input[type='image']</td>
  </tr>
  <tr>
    <td>span.month>input[type='month']</td>
  </tr>
  <tr>
    <td>span.number>input[type='number']</td>
  </tr>
  <tr>
    <td>span.input>input[type='password']</td>
  </tr>
  <tr>
    <td>span.radio>input[type='radio']</td>
  </tr>
  <tr>
    <td>span.range>input[type='range']</td>
  </tr>
  <tr>
    <td>span.reset>input[type='reset']</td>
  </tr>
  <tr>
    <td>span.search>input[type='search']</td>
  </tr>
  <tr>
    <td>span.submit>input[type='submit']</td>
  </tr>
  <tr>
    <td>span.tel>input[type='tel']</td>
  </tr>
  <tr>
    <td>span.text>input[type='text']</td>
  </tr>
  <tr>
    <td>span.time>input[type='time']</td>
  </tr>
  <tr>
    <td>span.url>input[type='url']</td>
  </tr>
  <tr>
    <td>span.week>input[type='week']</td>
  </tr>
  <tr>
    <td>標籤組件</td>
    <td>span.label>label{可選}</td>
  </tr>
  <tr>
    <td>勾選框組件</td>
    <td>span.checkbox>(input[type='checkbox'])+(span.label>label)</td>
  </tr>
  <tr>
    <td>單選框組件</td>
    <td>span.checkbox>(input[type='radio'])+(span.label>label)</td>
  </tr>
  <tr>
    <td rowspan="2">文字輸入框組件</td>
    <td>div.textarea>textarea</td>
  </tr>
  <tr>
    <td>span.textarea>textarea</td>
  </tr>
  <tr>
    <td rowspan="2">選擇框組件</td>
    <td>div.select>select>option>{文字}</td>
  </tr>
  <tr>
    <td>span.select>select>option>{文字}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">表格類</th>
  </tr>
  <tr>
    <td>表格主題區塊</td>
    <td>div.table></td>
  </tr>
  <tr>
    <td>表格區塊</td>
    <td>table></td>
  </tr>
  <tr>
    <td>表格標題區塊</td>
    <td>thead></td>
  </tr>
  <tr>
    <td>表格內容區塊</td>
    <td>tbody></td>
  </tr>
  <tr>
    <td>表格附加資訊區塊</td>
    <td>tfoot></td>
  </tr>
  <tr>
    <td rowspan="2">表格內容組件</td>
    <td>tr>td>span>a{可選}</td>
  </tr>
  <tr>
    <td>tr>th>span>a{可選}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">清單類</th>
  </tr>
  <tr>
    <td rowspan="2">清單主題區塊</td>
    <td>div.list></td>
  </tr>
  <tr>
    <td>a.list></td>
  </tr>
  <tr>
    <td rowspan="2">清單區塊</td>
    <td>ul></td>
  </tr>
  <tr>
    <td>ol></td>
  </tr>
  <tr>
    <td>項目</td>
    <td>li>span>a{可選}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">標籤類</th>
  </tr>
  <tr>
    <td>標籤主題區塊</td>
    <td>div.label></td>
  </tr>
  <tr>
    <td>標籤區塊</td>
    <td>ul></td>
  </tr>
  <tr>
    <td>項目</td>
    <td>li>span>a{可選}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">內文類</th>
  </tr>
  <tr>
    <td rowspan="2">內文主題區塊</td>
    <td>div.essay></td>
  </tr>
  <tr>
    <td>a.essay></td>
  </tr>
  <tr>
    <td rowspan="2">內文區塊</td>
    <td>div.paragraph</td>
  </tr>
  <tr>
    <td>a.paragraph></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>div.caption>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <td rowspan="6">標題內文組件</td>
    <td>h1>span>a{可選}</td>
  </tr>
  <tr>
    <td>h2>span>a{可選}</td>
  </tr>
  <tr>
    <td>h3>span>a{可選}</td>
  </tr>
  <tr>
    <td>h4>span>a{可選}</td>
  </tr>
  <tr>
    <td>h5>span>a{可選}</td>
  </tr>
  <tr>
    <td>h6>span>a{可選}</td>
  </tr>
  <tr>
    <td>段落文字組件</td>
    <td>p>span>a{可選}>{文字}</td>
  </tr>
  <tr>
    <td>簡單文字組件</td>
    <td>span>a{可選}>{文字}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">圖片類</th>
  </tr>
  <tr>
    <td rowspan="2">圖片主題區塊</td>
    <td>div.figure></td>
  </tr>
  <tr>
    <td>a.figure></td>
  </tr>
  <tr>
    <td rowspan="2">圖片區塊</td>
    <td>div.images></td>
  </tr>
  <tr>
    <td>a.images></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>div.figcaption>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <td>複數圖片組件</td>
    <td>div.image>span>a{可選}>img</td>
  </tr>
  <tr>
    <td>簡單圖片組件</td>
    <td>span>a{可選}>img</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">標題類</th>
  </tr>
  <tr>
    <td rowspan="2">標題主題區塊</td>
    <td>div.heading></td>
  </tr>
  <tr>
    <td>a.heading></td>
  </tr>
  <tr>
    <td rowspan="2">標題區塊</td>
    <td>div.caption></td>
  </tr>
  <tr>
    <td>a.caption></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">區塊類</th>
  </tr>
  <tr>
    <td rowspan="2">區塊</td>
    <td>div.division></td>
  </tr>
  <tr>
    <td>a.division></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">視訊類</th>
  </tr>
  <tr>
    <td>視訊主題區塊</td>
    <td>.video></td>
  </tr>
  <tr>
    <td>視訊區塊</td>
    <td>video></td>
  </tr>
  <tr>
    <td>視訊</td>
    <td>source</td>
  </tr>
  <tr>
    <td>註解</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">音訊類</th>
  </tr>
  <tr>
    <td>音訊主題區塊</td>
    <td>.audio></td>
  </tr>
  <tr>
    <td>音訊區塊</td>
    <td>audio></td>
  </tr>
  <tr>
    <td>音訊</td>
    <td>source</td>
  </tr>
  <tr>
    <td>註解</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
</table>

組件依模組樣式呈現需求，由小區塊到大區塊堆砌，例如使用 div.paragraph>p>span 即可滿足排版需求，則不用用到 div.essay>div.paragraph>p>span。
所有組件均可隨意使用。


<h3 id="use-class-name-to-show-status">以 class name 表示狀態</h3>
在撰寫動態切換時，我們經常使用 class name 切換，該 class name 應使用狀態命名。
例如手機側欄被打開，切換的 class name 應取名為：is-open。
反之，將fat footer 關閉，使用的 class name 應取名為： is-close。

取名原則：與自然瀏覽狀態相對的狀態。
例如手機側欄在自然瀏覽狀態下為關閉，使用者必須去開啟側欄，因此切換狀態的應取名為：is-open。
反之，fat footer 在自然瀏覽狀態下為開啟，使用者必須去關閉才會隱藏，引此切換的 class name 應取名為： is-close。

注意，切換狀態的 class name 只應出現在 li 或 模上，不應出現在模組中或其他地方。
假如切換狀態的行為是發生在清單群組上，那麼切換的狀態應寫在清單群組的 li 上。
若切換狀態的行為是發生在該模組中，那麼切換的狀態應寫在模組上。


<h2 id="erb">Erb 實作</h2>
<h3 id="erb-directory">Erb 目錄結構</h3>
以下是 Erb 目錄結構圖及說明。

    - 專案目錄
      |- Erb
      |   |- base
      |   |   |- _base-article.html.erb
      |   |   |- _base-aside.html.erb
      |   |   |- _base-content_index.html.erb
      |   |   |- _base-content_page.html.erb
      |   |   |- _base-extend.html.erb
      |   |   |- _base-footer.html.erb
      |   |   |- _base-header.html.erb
      |   |   |- _base-mobile.html.erb
      |   |   |- _base-module-area_index.html.erb
      |   |   |- _base-module-area_page.html.erb
      |   |   |- _base-page-area.html.erb
      |   |   |- _base-section.html.erb
      |   |   |- _base-wrapper.html.erb
      |   |- group
      |   |   |- 群組模塊...
      |   |- module
      |   |   |- 模組模塊...
      |   |- page
      |   |   |- 內頁...
      |   |- sys
      |   |   |- _icon.html.erb
      |   |   |- _meta.html.erb
      |   |   |- _script.html.erb
      |   |   |- _style.html.erb
      |   |   |- _test.html.erb
      |   |   |- _title.html.erb
      |   |   |- _variable.html.erb
      |   |- _prototype.html.erb

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>base</td>
    <td>存放 base 框架樣板的目錄</td>
  </tr>
  <tr>
    <td>base/_base-article.html.erb</td>
    <td>編輯 base-article 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-aside.html.erb</td>
    <td>編輯 base-aside 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-content_index.html.erb</td>
    <td>編輯 base-content 樣板的文件，供首頁使用。</td>
  </tr>
  <tr>
    <td>base/_base-content_page.html.erb</td>
    <td>編輯 base-content 樣板的文件，供內頁使用。</td>
  </tr>
  <tr>
    <td>base/_base-extend.html.erb</td>
    <td>編輯 base-extend 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-footer.html.erb</td>
    <td>編輯 base-footer 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-header.html.erb</td>
    <td>編輯 base-header 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-mobile.html.erb</td>
    <td>編輯 base-mobile 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-module-area_index.html.erb</td>
    <td>編輯 base-module-area 樣板的文件，供首頁使用。</td>
  </tr>
  <tr>
    <td>base/_base-module-area_page.html.erb</td>
    <td>編輯 base-module-area 樣板的文件，供內頁使用。</td>
  </tr>
  <tr>
    <td>base/_base-page-area.html.erb</td>
    <td>編輯 base-page-area 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-section.html.erb</td>
    <td>編輯 base-section 樣板的文件。</td>
  </tr>
  <tr>
    <td>base/_base-wrapper.html.erb</td>
    <td>編輯 base-wrapper 樣板的文件。</td>
  </tr>
  <tr>
    <td>group</td>
    <td>存放 group 樣板的目錄。</td>
  </tr>
  <tr>
    <td>module</td>
    <td>存放 module 樣板的目錄。</td>
  </tr>
  <tr>
    <td>page</td>
    <td>存放內頁內容樣板的目錄。</td>
  </tr>
  <tr>
    <td>sys</td>
    <td>存放 head 設定的樣板如：icon、meta、script、style、title，另有測試用的 test 與全域變數設定檔 variable。</td>
  </tr>
  <tr>
    <td>sys/_icon.html.erb</td>
    <td>設定 ico 引入的文件。</td>
  </tr>
  <tr>
    <td>sys/_meta.html.erb</td>
    <td>設定 meta 設定的文件。</td>
  </tr>
  <tr>
    <td>sys/_script.html.erb</td>
    <td>設定網頁 script 引入的文件。</td>
  </tr>
  <tr>
    <td>sys/_style.html.erb</td>
    <td>設定網頁樣式引入的文件。</td>
  </tr>
  <tr>
    <td>sys/_test.html.erb</td>
    <td>測試用的文件。</td>
  </tr>
  <tr>
    <td>sys/_title.html.erb</td>
    <td>設定網頁 title 的文件。</td>
  </tr>
  <tr>
    <td>sys/_variable.html.erb</td>
    <td>設定 Erb 全域變數的文件。</td>
  </tr>
  <tr>
    <td>_prototype.html.erb</td>
    <td>樣板範本，示範如何傳遞參數。</td>
  </tr>
</table>


<h3 id="erb-script">Erb 樣板語言</h3>
Erb 樣板語言主要是幫助我們把 html 模組化，並且提供隨機的內容與字元長度，以幫助我們測試版型。
我們可以將個頁面一致的 html 存成一個檔案，在檢視時自動嵌套，簡化維護的難度。
Erb 主要基於 Ruby 語言，因此可以使用許多 Ruby 語言的方法如陣列、物件、迴圈等等。
更多 Erb 樣板語言範本與功能請見 [fire.app Erb 樣板語言簡介](http://fireapp.kkbox.com/doc/tw/tutorial_1.html)、[Ruby on Rails 實戰聖經 Action View - 樣板設計](https://ihower.tw/rails4/actionview.html)。


<h3 id="erb-run">Erb 運作方式</h3>
樣板是一段 HTML，在樣板中，我們可以輕易地嵌入另一塊樣板，達成 HTML 模組化，以下我將示範如何嵌套一個 .html.erb 檔。

    <div class="base-article" data-index="1" data-type="3" data-child="4"><div class="inner">
      <div class="header"><div class="inner">
      </div><h3><span><a>嵌套範本</a></span></h3></div>
      <div class="content"><div class="inner">
      
        <!--嵌套 /Erb/module/sample -->
        <%= render :partial => "/Erb/module/sample" %>
    		
      </div></div>
    </div></div>

我們可藉由演示的語法嵌入另一個 .html.erb 檔案，以下將演示如何帶參數進 /Erb/module/_sample.html.erb 檔案中。

    <div class="base-article" data-index="1" data-type="3" data-child="4"><div class="inner">
      <div class="header"><div class="inner">
      </div><h3><span><a>嵌套範本</a></span></h3></div>
      <div class="content"><div class="inner">
      
        <!--嵌套 /Erb/module/sample -->
        <%= render :partial => "/Erb/module/sample", :locals => { :index => 4 } %>
    		
      </div></div>
    </div></div>

在鑲嵌的語法後，我們使用一個 :locals => {} 的形式傳遞一個區域變數 index 進去，index 的參數為 4。
我們來看看 /Erb/module/_sample.html.erb 如何接受這個參數。

    <div class="sample" data-index="<%= index %>">
    </div>

我們可以在 _sample.html.erb 檔案中，在 <% %> 中間放入區域變數名，此例即是 index 關鍵字，若需要印出在網頁上，則必須加上等號 <%= index %> ，更多教學可前往 [局部樣板 Partials](https://ihower.tw/rails4/actionview.html#partials)。

以下列出9個平台 Erb 樣板常用的區域變數與其意義：

<table>
  <tr>
    <th>變數</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>index</td>
    <td>對應模塊的 data-index 屬性。</td>
  </tr>
  <tr>
    <td>child</td>
    <td>對應模塊的 data-child 屬性。</td>
  </tr>
  <tr>
    <td>func_set</td>
    <td>對應模塊的 data-function 屬性。</td>
  </tr>
  <tr>
    <td>header_text</td>
    <td>設定模塊的 header 文字。</td>
  </tr>
  <tr>
    <td>show_footer</td>
    <td>設定是否顯示 footer 區塊。</td>
  </tr>
  <tr>
    <td>show_mark</td>
    <td>設定是否顯示標籤。</td>
  </tr>
  <tr>
    <td>access_key</td>
    <td>設定導盲磚按鍵。</td>
  </tr>
  <tr>
    <td>access_title</td>
    <td>設定導盲磚標頭。</td>
  </tr>
  <tr>
    <td>inner</td>
    <td>若模塊內鑲嵌其他模塊，可指定鑲入檔案。</td>
  </tr>
</table>


<h3 id="erb-layout">關於 layout樣板</h3>
專案目錄中的 layout.html.erb 樣板文件，是所有網頁的預設框架，會把專案中所有的 html.erb 與 .html 檔案嵌入指定的框架中。


<h3 id="erb-index-layout">關於 index樣板</h3>
因為首頁的樣板有別於一般內頁，因此另編輯樣板 _index_layout.html.erb 供 index.html.erb 使用。
我們以 index.html.layout 指定 _index_layout.html.erb 為 index.html.erb 的樣板。


<h3 id="erb-variable">關於 sys/variable</h3>
在 [Erb 運作方式](#erb-run) 一章曾提及區域變數的使用方式，另有一個全域變數設定檔在 /Erb/sys/_variable.html.erb。
全域變數以 $ 前輟命名，使用方式如同區域變數一般。

    <div class="sample" data-type="<%= $module %>">
    </div>


<h3 id="lorem-ipsum-and-picture">假字與圖片</h3>
Erb 提供了假字及假圖的功能，請參照 [更新更強大的網頁設計師好幫手 Fire.app 進階篇](http://demo.tc/post/758) 一文。



<h2 id="scss">CSS/SCSS 實作</h2>
<h3 id="scss-directory">SCSS 目錄結構</h3>
以下是 Scss 目錄結構圖及說明。

    - 專案目錄
      |- SCSS
      |   |- base
      |   |   |- _function.scss
      |   |   |- _icon-font.scss
      |   |   |- _layout.scss
      |   |   |- _variable.scss
      |   |- group
      |   |   |- _group.scss
      |   |   |- _group_list.scss
      |   |   |- _group_tab.scss
      |   |- module
      |   |   |- _area-audio.scss
      |   |   |- _area-customize.scss
      |   |   |- _area-editor.scss
      |   |   |- _area-essay.scss
      |   |   |- _area-figure.scss
      |   |   |- _area-form.scss
      |   |   |- _area-iframe.scss
      |   |   |- _area-table.scss
      |   |   |- _area-video.scss
      |   |   |- _list-multiple.scss
      |   |   |- _list-pic.scss
      |   |   |- _list-text.scss
      |   |   |- _simple-pic.scss
      |   |   |- _simple-text.scss
      |   |- sys
      |   |   |- _function.scss
      |   |   |- _global.scss
      |   |   |- _grid.scss
      |   |   |- _icon-font.scss
      |   |   |- _icon-pic.scss
      |   |   |- _normalize.scss
      |   |   |- _variable.scss
      |   |- global.scss
      |   |- page.scss
      |   |- print.scss

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>base</td>
    <td>存放 Scss 基本設定的目錄。</td>
  </tr>
  <tr>
    <td>base/_function.scss</td>
    <td>基礎級方法，可依切板需求修改文件。</td>
  </tr>
  <tr>
    <td>base/_icon-font.scss</td>
    <td>文字 icon 基礎級設定。</td>
  </tr>
  <tr>
    <td>base/_layout.scss</td>
    <td>版面 Scss 設定。</td>
  </tr>
  <tr>
    <td>base/_variable.scss</td>
    <td>基礎級變數，可依切板需求修改文件。</td>
  </tr>
  <tr>
    <td>group</td>
    <td>存放群組樣式目錄。</td>
  </tr>
  <tr>
    <td>group/_group.scss</td>
    <td>分割、單欄群組樣式設定。</td>
  </tr>
  <tr>
    <td>group/_group_list.scss</td>
    <td>清單群組樣式設定。</td>
  </tr>
  <tr>
    <td>group/_group_tab.scss</td>
    <td>頁籤群組樣式設定。</td>
  </tr>
  <tr>
    <td>module</td>
    <td>存放模組樣式目錄。</td>
  </tr>
  <tr>
    <td>module/_area-audio.scss</td>
    <td>對應模組 area-audio 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-customize.scss</td>
    <td>對應模組 area-customize 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-editor.scss</td>
    <td>對應模組 area-editor 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-essay.scss</td>
    <td>對應模組 area-essay 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-figure.scss</td>
    <td>對應模組 area-figure 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-form.scss</td>
    <td>對應模組 area-form 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-iframe.scss</td>
    <td>對應模組 area-iframe 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-table.scss</td>
    <td>對應模組 area-table 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_area-video.scss</td>
    <td>對應模組 area-video 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_list-multiple.scss</td>
    <td>對應模組 list-multiple 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_list-pic.scss</td>
    <td>對應模組 list-pic 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_list-text.scss</td>
    <td>對應模組 list-text 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_simple-pic.scss</td>
    <td>對應模組 simple-pic 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>module/_simple-text.scss</td>
    <td>對應模組 simple-text 類別的樣式設定。</td>
  </tr>
  <tr>
    <td>sys</td>
    <td>存放系統級設定的目錄。</td>
  </tr>
  <tr>
    <td>sys/_function.scss</td>
    <td>系統級方法，非必要請勿修改文件。</td>
  </tr>
  <tr>
    <td>sys/_global.scss</td>
    <td>整合 sys/variable、base/variable、sys/function、base/function、sys/icon-font、base/icon-font、sys/icon-pic 的基本 Scss 檔。</td>
  </tr>
  <tr>
    <td>sys/_grid.scss</td>
    <td>格線系統，更多資訊請參閱 [格線系統](#grid) 章節。 </td>
  </tr>
  <tr>
    <td>sys/_icon-font.scss</td>
    <td>文字 icon 系統級設定，更多資訊請參閱 [文字圖示](#scss-font-icon) 章節。</td>
  </tr>
  <tr>
    <td>sys/_icon-pic.scss</td>
    <td>sprite 圖的系統級設定，更多資訊請參閱 [sprite 圖示](#scss-sprite-picture) 章節。</td>
  </tr>
  <tr>
    <td>sys/_normalize.scss</td>
    <td>normalize.css，相關資訊請參閱 (normalize.css)[https://necolas.github.io/normalize.css/]。</td>
  </tr>
  <tr>
    <td>sys/_variable.scss</td>
    <td>系統級變數，非必要請勿修改文件。</td>
  </tr>
  <tr>
    <td>global.scss</td>
    <td>整合 sys/normalize、sys/grid、base/layout 與所有群組與模組的檔案，將會匯出 global.css。</td>
  </tr>
  <tr>
    <td>page.scss</td>
    <td>內頁將會額外引入的樣式設定檔案，將會匯出 page.css。</td>
  </tr>
  <tr>
    <td>print.scss</td>
    <td>列印將會被應用的樣式設定檔案，將會匯出 print.css。</td>
  </tr>
</table>


<h3 id="scss-script">SCSS</h3>
Sass 是為了增強 CSS 的特性而設計的擴充語言，分為 Sass 與 Scss 兩種寫法。
它讓 CSS 可以使用變數、函式這些特性，提升撰寫 CSS 的效率，更多教學可以參閱 [Sass 用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html) 或上網搜尋30天掌握Sass語法系列。

<h3 id="grid">格線系統</h3>
平台格線系統包含自然分割與設定分割。
分割群組恨均分子模塊的寬度，主要是依據 [data-child] 的值作為 CSS 判斷。
例如分割模組([data-type="1"])具有兩個子模塊([data-child="2"])，那麼就會均分子模塊([data-index][data-type])：

    [data-type="1"][data-child="2] > .inner > .content > .inner > [data-index][data-type] {
      width: 50%; //100% / 2
    }

設定分割是依據 [data-setLen] 的值作為 CSS 判斷。
例如分割模組([data-type="1"])設定2排均分([data-setLen="2"])，那麼就會均分子模塊([data-index][data-type])：

    [data-type="1"][data-setLen="2] > .inner > .content > .inner > [data-index][data-type] {
      width: 50%; //100% / 2
    }

更多關於 [data-setLen] 的說明，請連結說明至 [關於設定數量的方法](#scss-len-function) 章節。


<h3 id="scss-type">類別</h3>
相同類別的模塊樣式，都撰寫在同一支 SCSS 檔案中。如：

    <div class="list-text nav" data-type="0"></div>
    <div class="list-text font-size" data-type="0"></div>

以上兩個模塊的樣式，都設定在 /Scss/module/list-text 類別樣式中。
這樣的做法，可以快速的參考、交換、複製其他相同類別的模塊樣式。

    .list-text {
      &.nav {
        ...
      }
      
      &.font-size {
        ...
      }
    }


<h3 id="selector-logic">選擇器邏輯</h3>
模組與群組的結構十分相似，.group-list 與 .list-text、.list-pic 的結構也十分相似，甚至所有模塊的 footer 與 header 長得幾乎相同，因此樣式的交換上十分便利，但還是要注意權重指定的問題。

一般來說，在設定樣式的時候，應盡可能減少指定的層數：

    .list-text {
      &.nav {
        
        .content {
          ...
        }
      }
    }

因為一個模組只會有一個 content，因此可以用這種選取方法指定到唯一的 content。但群組下可能會有許多模塊，而每個模塊都有 content，因此若要指名該群組的 content，則必須明確的指定：

    [data-index][data-type="1"] {
      &.group {
        
        > .inner {
          
          > .content {
            ...
          }
        }
      }
    }

此外，行為必須寫在發生行為的模塊上，例如主選單群組的子模塊觸發 :hover 時，必須秀出該模塊的 content，這個行為應該寫在 主選單群組 而非主選單群組的子模塊。反之，主選單群組隱藏子模塊的 content，這樣行為也必須寫在主選單群組上。


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
以下是 Script 目錄結構圖及說明。

    - 專案目錄
      |- Script
      |   |- app.js
      |   |- js 模塊...
      |   |- lib
      |   |   |- cookie.js
      |   |   |- domReady.js
      |   |   |- getNode.js
      |   |   |- jqueryPrivate.js
      |   |   |- main.js
      |   |   |- plugin.js
      |   |   |- fix.js

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>app.js</td>
    <td>設定套件縮寫，執行 main.js 的檔案。</td>
  </tr>
  <tr>
    <td>lib</td>
    <td>存放套件目錄。</td>
  </tr>
  <tr>
    <td>lib/cookie.js</td>
    <td>操作 cookie 的方法套件。</td>
  </tr>
  <tr>
    <td>lib/domReady.js</td>
    <td>延遲執行 require.js 的方法套件</td>
  </tr>
  <tr>
    <td>lib/getNode.js</td>
    <td>操作模塊的套件。</td>
  </tr>
  <tr>
    <td>lib/jqueryPrivate.js</td>
    <td>引用私有 jquery 的套件。</td>
  </tr>
  <tr>
    <td>lib/main.js</td>
    <td>執行 data-function 方法的套件。</td>
  </tr>
  <tr>
    <td>lib/plugin.js</td>
    <td>擴充方法。</td>
  </tr>
  <tr>
    <td>lib/fix.js</td>
    <td>修正瀏覽器錯誤。</td>
  </tr>
</table>


<h3 id="js-require">requireJS 運作方式</h3>
為了解決 script 大量載入多餘套件的問題，新平台使用 requireJS 做為文件載入器。它能動態插入頁面需要的 script，並解決相依性、套件衝突等問題，並提供模組化管理。

更多有關 requireJS 的介紹，請至 [官網](http://requirejs.org) 查詢。   


<h3 id="node-and-files">以 node 呼叫 javascript 檔案</h3>
先前曾在 [參數與意義](#html-parameter) 章節討論過 data-function 屬性的用途。
data-function 可藉由傳入一個字串化物件，來啟動指定的 js 模塊。
js 模塊應存在 /Script 目錄中(可在 app.js 改變基礎路徑)，以下示範一個模組 nav ，啟動一個名為 hud 的 js 模塊：

    <div class="nav" data-type="0" data-function="{'hud':{}}">

data-function 的值為一個物件，{'hud':{}} 中的 hud 為 js 模塊，啟動一個 /Script/hud.js 的檔案。
hud 後面對應的物件為參數物件，你將可以在 hud.js 檔案中接收到這組參數：

    define(function(){
    	
    	function main(env, opt, file){
    	  do something...
    	}
    	
    	return main;
    });

在 hud.js 中的涵式 main 中會有三個參數，env 表示當前執行節點、opt 就是傳遞進去的參數、file 則是執行的檔案名稱，以此例來說 file 即是 hud。
hud.js 最終回傳一個涵式給 main.js 並執行。
同一個模塊中也可以一次執行多個 js 模塊：

    <div class="nav" data-type="0" data-function="{'hud':{},'slider':{'auto':true}}">

以此例來說，nav 同時啟用了 hud.js、slider.js 兩個 js 模塊，且 slider 傳送了一組參數 'auto':true，我們可以從 opt 取出參數。

    define(function(){
    	
    	function main(env, opt, file){
    	  console.log(opt.auto) //true
    	}
    	
    	return main;
    });


<h3 id="app-and-main">關於 app.js 與 lib/main</h3>
先前曾在 [Script 目錄結構](#js-directory) 章節討論過 app.js 與 main.js。
app.js 的 requirejs.config 設定了套件的短名與命名配置，以下是 app.js 的程式內容：

    requirejs.config({
      baseUrl: '/Scripts',
      paths: {
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min'],
        'googleMaps': '//maps.googleapis.com/maps/api/js?v=3.exp',
        'cookie': 'lib/cookie',
        'domReady': 'lib/domReady',
        'main': 'lib/main',
        'getNode': 'lib/getNode',
        'plugin': 'lib/plugin',
        'fix': 'lib/fix'
      },
      map: {
        '*': {
          'jquery': 'lib/jqueryPrivate'
        },
        'lib/jqueryPrivate': {
          'jquery': 'jquery'
        }
      }
    });

以下以列表說明參數意義：

<table>
  <tr>
    <th>baseUrl</th>
    <td>設定 js 模塊的路徑</td>
  </tr>
  <tr>
    <th>paths</th>
    <td>配置套件與相應的關鍵字</td>
  </tr>
  <tr>
    <th>map</th>
    <td>配置關鍵字在各個檔案的意義</td>
  </tr>
</table>

設定完畢後，app.js 會執行 main.js：

    requirejs(['main']);

關鍵字的作用在引用套件時，可用關鍵字取出套件內容。引用的方式是利用陣列包含關鍵字，例如某個 js 模塊需要取用 jquery 與 google map：

    define(['jquery','googleMaps'],function(){
    	
    	function main(env, opt, file){
    	  youu can use jquery and google map api here.
    	}
    	
    	return main;
    });

main.js 會先執行 fix.js，接著一一解析擁有 data-function 的模塊參數，讓模塊回傳各自的程式內容，再執行它們，以下是簡化過的 main.js 結構：

    requirejs(['domReady!'], function(dom){
      var $nodes = document.querySelectorAll('[data-function]');
      
      for( var i = 0; i < $nodes.length; i++ ) {
        var $env = $nodes[i], //存節點
        $func = JSON.parse(($env.getAttribute('data-function')).replace(/\'/g,'"')); //轉成物件
        
        for( var _file in $func ) { //取 function name 與設定參數
          var $opt = $func[_file];
          
          requirejs([_file], function(func){
            func($env, $opt, _file);
          });
        }
      }
    });

<h3 id="js-jquery">關於 jquery.js</h3>
我們在 app.js 中設定了一個 jquery 關鍵字，該值是一個陣列：

    'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min']

第一個字串是 google CDN 來源的 jquery，第二個是來自本地的 jquery 作為備援。當第一項資源失效時會立即啟用備援。
作為 js 模塊，jquery 的問題在於它會污染全域變數 $，因此我們需要回傳一個私有 jquery 對象的方法，我們建置了 jqueryPrivate 來實作這個方法，先來看看 app.js 中 maps 的設定：

    map: {
      '*': {
        'jquery': 'lib/jqueryPrivate'
      },
      'lib/jqueryPrivate': {
        'jquery': 'jquery'
      }
    }

*代表所有的 js 模塊，在所有 js 模塊中，jquery 關鍵字代表 Script/lib/jqueryPrivate 這個模塊，而在 Script/lib/jqueryPrivate.js 中的 jquery 關鍵字則指向 Script/lib/jquery.js 模塊。以下示範如何在模塊中使用 jquery：

    define(['jquery'], function($){
    	
    	function main(env, opt, file){
    	  you can use $('body') jquery here...
    	}
    	
    	return main;
    });


<h3 id="js-cookie">關於 cookie.js</h3>
cookie.js 定義了幾種方法來操控網頁 cookie，以下將列舉它的 api：

<table>
  <tr>
    <td>set(_key, _value, _life)</td>
    <td>設定 cookie。_key 為 cookie 名稱， _value 為 cookie 內容， _life 為生命週期(天)。</td>
  </tr>
  <tr>
    <td>get(_key)</td>
    <td>取 cookie 值。_key 為 cookie 名稱。</td>
  </tr>
  <tr>
    <td>remove(_key)</td>
    <td>刪除 cookie。_key 為 cookie 名稱。</td>
  </tr>
</table>

以下示範如何在模塊中使用 cookie：

    define(['cookie'], function(cookie){
    	
    	function main(env, opt, file){
    	  cookie.set('sample', 'true', 1);
    	}
    	
    	return main;
    });


<h3 id="js-getNode">關於 getNode.js</h3>
因為我們統一了 html 結構，因此我們可更便捷、快速的取出想要的節點內容，getNode.js 就是為此而生。
getNode.js 定義了許多取得節點的方法。

getNode.js 的核心程式叫做 getChild，會抓取子節點並比對關鍵字，並把所有子節點展開、並回傳一個真正的陣列。


<h3 id="js-fix">關於 fix.js</h3>
fix.js 主要是修補瀏覽器的錯誤，例如 IE8 在接受到 console.log 即會拋出錯誤，我們使用這支 js 修改類似的錯誤。
