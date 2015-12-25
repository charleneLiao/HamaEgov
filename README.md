
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
  8. [模組建立原則](#module-establish-principles)
  9. [以 class name 表示狀態](#use-class-name-to-show-status)
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
  3. [格線系統](#grid)
  4. [類別](#scss-type)
  5. [選擇器邏輯](#selector-logic)
  6. [檔案引入方式](#scss-file-import)
  7. [function 與 variable](#function-and-variable)
  8. [關於 sys/variable](#scss-sys-variable)
  9. [noscript 方法](#scss-noscript)
  10. [hack 方法](#scss-hack)
  11. [rwd 方法](#scss-rwd)
  12. [admin 方法](#scss-admin)
  13. [背景方法](#bg-to-pic)
  14. [文字圖示](#scss-font-icon)
  15. [sprite 圖示](#scss-sprite-picture)
  16. [關於設定數量的方法](#scss-len-function)
  17. [debug](#scss-debug)
* [javascript/requireJS 實作](#js)
  1. [Script 目錄結構](#js-directory)
  2. [requireJS 運作方式](#js-require)
  3. [以 node 呼叫 javascript 檔案](#node-and-files)
  4. [關於 lib/app 與 lib/main](#app-and-main)
  5. [javascript 執行](#run-script)
  6. [關於 cookie.js](#js-cookie)
  7. [關於 jquery.js](#js-jquery)
  8. [關於 getNode.js](#js-getNode)
  9. [關於 plugin.js](#js-plugin)




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
    <th>屬性名稱</th>
    <th>意義</th>
    <th>說明</th>
    <th>歸屬</th>
  </tr>
  <tr>
    <td>data-type</td>
    <td>模塊類型</td>
    <td>標示該模塊的類型，0 代表該模塊為模組，1、2、3、4 分別為不同類別的群組，更多說明請至 <a href="#group-structure">群組類別與結構</a> 章節。</td>
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
說明如何判定模塊並區分群組/模組。
說明 .header、.content 與 .footer 的內容應如何區別。
列舉群組與模組的基本結構，並且比較 .group-list 與 .list-text、.list-pic 的結構並說明相似性。
列舉例外：導盲磚。


<h3 id="group-structure">群組類別與結構</h3>
列舉並說明群組的 3 種類別。


<h3 id="module-structure">模組類別與結構</h3>
列舉並說明模組的 14 種類別。


<h3 id="component">組件</h3>
列舉說明檔案內的所有組件。


<h3 id="module-establish-principles">模組建立原則</h3>
說明建立模組時應當把外框固定，內容組件由小至大。


<h3 id="use-class-name-to-show-status">以 class name 表示狀態</h3>
說明為何要命名為 is-active、is-open、is-close，並說明優點與理念。
該 class name 必定在模組第一層或li。




<h2 id="erb">Erb 實作</h2>


<h3 id="erb-directory">Erb 目錄結構</h3>
解說 Erb 目錄結構，並說明 _layout.html.erb、index.layout.html.erb、index.html.erb、index.html.layout 也是 Erb ，並提供用途說明。
說明 sys、base、group 與 module 目錄的意義與用途，並列舉檔案，說明檔案命名方式。


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
說明 sys、base、group 與 module 目錄的意義與用途，並列舉檔案，說明檔案命名方式。


<h3 id="scss-script">SCSS</h3>
簡述 SCSS 語言解決的問題與優勢，並提供說明網站連結。


<h3 id="grid">格線系統</h3>
說明 data-child 與 data-setLen 的作用，並且實踐的邏輯為何。
連結說明至 [關於設定數量的方法](#scss-len-function)


<h3 id="scss-type">類別</h3>
說明 3 個群組類別 14 個模組類別，與相同類別為何要撰寫在同一支 SCSS 檔案、是如何被寫在一起的。


<h3 id="selector-logic">選擇器邏輯</h3>
說明 .group-list 與 .list-text、.list-pic 的結構相似性，以及 CSS 選擇器選法的不同。並且提示在複製樣式時須注意的事項與權重。
說明什麼該交由 .group 決定，什麼該由群組自己決定。

.is-active 的撰寫


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
說明 lib 目錄的意義與用途，並列舉檔案。


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


<h3 id="js-getNode">關於 getNode.js</h3>
介紹 getNode.js 的理念、用法。


<h3 id="js-plugin">關於 plugin.js</h3>
介紹 plugin.js 的用途與目前有的功能。
