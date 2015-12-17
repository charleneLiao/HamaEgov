哈瑪星共通平台 前端規範
=======================
**前端介面版本 2.0**


<h2>目錄</h2>
* [前言](#overview)
  1. [簡介](#introduce)
  2. [定義](#definition)
  3. [工具](#tools)
* [哲學](#philosophy)
  1. [模組與群組](#module-and-group)
  2. [底層、框架與內容](#base-layout)
  3. [CSS 選擇器與範圍](#css-selector)
  4. [Javascript 優化](#javascript-optimize)
* [HTML 實作](#html)
  1. [專案目錄結構](#project-directory)
  2. [參數與意義](#html-parameter)
  3. [格線系統](#grid)
  4. [模組/群組基本結構](#module-and-group-structure)
  5. [群組類別與結構](#group-structure)
  6. [模組類別與結構](#module-structure)
  7. [組件](#component)
  8. [模組建立原則](#module-establish-principles)
* [Erb 實作](#erb)
  1. [Erb 目錄結構](#erb-directory)
  2. [Erb 樣板語言](#erb-script)
  3. [Erb 運作方式](#erb-run)
  4. [關於 index樣板](#erb-index-layout)
  5. [關於 layout樣板](#erb-layout)
  6. [關於 sys/variable](#erb-variable)
  7. [基本 ruby 語法](#basic-ruby-script)
  8. [假字與圖片](#lorem-ipsum-and-picture)
* [CSS/SCSS 實作](#scss)
  1. [SCSS 目錄結構](#scss-directory)
  2. [類別](#scss-type)
  3. [選擇器邏輯](#selector-logic)
  4. [檔案引入方式](#scss-file-import)
  5. [關於 sys/variable](#scss-variable)
  6. [function 與 variable](#function-and-variable)
  7. [noscript 方法](#scss-noscript)
  8. [hack 方法](#scss-hack)
  9. [rwd 方法](#scss-rwd)
  10. [admin 方法](#scss-admin)
  11. [文字圖示](#scss-font-icon)
  12. [sprite 圖示](#scss-sprite-picture)
  13. [debug](#scss-debug)
* [javascript/requireJS 實作](#js)
  1. [Script 目錄結構](#js-directory)
  2. [requireJS 運作方式](#js-require)
  3. [以 node 呼叫 javascript 檔案](#node-and-files)
  4. [關於 lib/app 與 lib/main](#app-and-main)
  5. [javascript 執行](#run-script)
  6. [參數與回傳函式](#parameter-and-function-retune)
  7. [關於 cookie.js](#js-cookie)
  8. [關於 jquery.js](#js-jquery)
  9. [關於 group.js](#js-group)
  10. [關於 plugin.js](#js-plugin)


<h2 id="overview">前言</2>

<h3 id="introduce">簡介</h3>
第二版共通平台的目標，是希望能將所有**內容模組化**，去除固定框架限制，讓我們能實踐更靈活的版面設計。  
舉個例子，當"選單"變成一個模組，那麼不論選單在上、下、左、右的版面設計，都能被做出來。

為了實踐這個理想，我將所有的內容都封裝成**模組**，包括 "Logo"、"搜尋"及"字級大小"等無一例外。
除了模組之外，群組也做了一些調整，增加了一些功能，以減少客製化的需求。

我制定了一些 HTML 規範，統一了許多模組內容。
舉例來說，"RSS模組"、"檔案下載模組"、"選單模組"與"連結模組"的 HTML 完全相同。它們可以套用彼此的樣式，共享 javascript 程式。

CSS 提高了可自訂性，允許用戶在 HTML 下參數以改變項目框度，並提供更多方便的功能，如：更方便的 rwd 設定方式與設定寬度的方法等等。

javascript 方面，解決了相依性與全域變數的問題，簡化了引入與執行方式。
模組化後可維護性與性能也獲得相應的提升。

新版本引用了一種新的樣板語言，提高設計師在建立靜態網頁的效率，且能匯出隨機的項目及文字數量，幫助我們測試網u,4的可靠性。

<h3 id="definition">定義</h3>
本規範的範圍包括前台的 HTML 制定、CSS 文件編輯與 javascript 的引用和執行，其中不應包括後端資料的傳輸。但某些涉及後端資料的 Dom 操作則是例外。

<h3 id="tools">工具</h3>
為了繼續維護 IE8，平台使用 HTML4.2 規範與 HTML5 文件宣告。HTML5 的語意標籤被轉為 Class Name。以便日後平台過渡至 HTML5。
CSS3 則是部分應用，並且使用 normalize.css 3.x。
javascript 維持在第 3 版，jQuery 引用的版本維持在 1.x 版。

樣板語言 Erb 主要基於 Ruby，CSS 則使用 SCSS 搭配 Compass 撰寫，javascript 依賴 requireJS 做引入/相依性管理，
版本管理器則是 git。

Fire.app 幫助我們整合 Erb 與 SCSS、Compass 的環境，而它依賴 JAVA。
雖然您也可以自己建構這些環境，但我還是推薦使用 Fire.app。


<h2 id="philosophy">哲學</h2>

<h3 id="module-and-group">模組與群組</h3>
為了統一 HTML 規格，我區分了兩種類型的模塊 - **群組(group)** 與**模組(module)**。
不論是哪一種，他們全都會具有**標頭(header)** 與**內容(content)**，部分模塊則具有**附加資訊(footer)**。

**群組**： 排版容器，可裝載其他模塊以達到排版所需。  
**模組**： 一塊具有意義的內容，如RSS模組或天氣模組等等。  

**標頭**: 一組文字，用來敘述這個模塊的意義。  
**內容**: 依照模塊的意義有所不同，**群組**中會是其他的模塊，而**模組**中可能會是一組清單或是天氣資訊等等。  
**附加資訊**: 一組連結清單。常見的有"更多"、"上一則"、"下一則" 或 "RSS" 等等，連至此模塊敘述內容可參照的其他資訊。  

<h3 id="base-layout">底層、框架與內容</h3>
在共通平台第二版重構了許多框架，以下將一層一層的介紹它們的意義。
讓我們先看 HTML 示意：

    <html>
      <body>

        <div class="sys-root">
          //網頁內容由此開始
        </div>

      </body>
    </html>

**sys-root** 是一組**群組**，可以算是平台的根節點，所有網頁的內容皆由它開始延伸，
前輟 **sys-** 即表示它是"系統級"節點，所以 CSS 樣式應該由它開始撰寫，而不應在 **html**、**body** 或 **form** 寫入任何樣式。  

在 sys-root 之下有 **base-mobile**、**base-extend** 與 **base-wrapper**三個主要區塊，前輟 **base-** 即表示它是"基礎級"節點：

**base-mobile**: 手機版側欄。通常會放置"主選單"、"分享"等等。  
**base-extend**: 漂浮在瀏覽器上的物件層。通常會放置"回到最頂"按鈕等等。  
**base-wrapper**: 網頁頁面框架。

    <html>
      <body>
        <div class="sys-root">

          <div class="base-mobile">
            //手機版側欄
          </div>
          <div class="base-extend">
            //漂浮物件層
          </div>
          <div class="base-wrapper">
            //網頁頁面框架
          </div>

        </div>
      </body>
    </html>

在 **base-wrapper** 中又分為 **base-header**、**base-content** 與 **base-footer** 三個次要區塊：

**base-header**: 網頁頁首。通常放置"主選單"、"LOGO"模組等。  
**base-content**: 網頁主要內容。  
**base-footer**: 網頁頁尾。通常放置一些網站資訊。

    <html>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="extend">
          </div>
          <div class="base-wrapper">

            <div class="base-header">
              //網頁頁首
            </div>
            <div class="base-content">
              //網頁主要內容
            </div>
            <div class="base-footer">
              //網頁頁尾
            </div>

          </div>
        </div>
      </body>
    </html>

依據首頁/內頁框架區塊的不同，可區分 **base-module-area** 與 **base-page-area** 兩個區塊出來：

**base-module-area**: 模組區塊。可放置各種模組。進入到內頁時，該區塊會顯示在 **base-page-area** 之上。  
**base-page-area**: 內頁框架。

    <html>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="extend">
          </div>
          <div class="base-wrapper">
            <div class="base-header">
            </div>
            <div class="base-content">

              <div class="base-module-area">
                //模組區塊
              </div>
              <div class="base-page-area">
                //內頁內容
              </div>

            </div>
            <div class="base-footer">
            </div>
          </div>
        </div>
      </body>
    </html>

進入到內頁之後，**base-page-area** 有兩個區塊分別是 **base-aside** 與 **base-section**：

**base-aside**: 內頁側欄。通常放置"主選單"或"次選單"。  
**base-page-area**: 內頁內容。

    <html>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="extend">
          </div>
          <div class="base-wrapper">
            <div class="base-header">
            </div>
            <div class="base-content">
              <div class="base-module-area">
              </div>
              <div class="base-page-area">

                <div class="base-aside">
                  //內頁側欄
                </div>
                <div class="base-section">
                  //內頁內容
                </div>

              </div>
            </div>
            <div class="base-footer">
            </div>
          </div>
        </div>
      </body>
    </html>

最後，如果在內頁內容中有包含文章區塊，**base-section** 區塊會包含最後一個固定框架 **base-article**：

**base-article**: 內頁文章區塊。

    <html>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="extend">
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
                    //內頁文章
                  </div>

                </div>
              </div>
            </div>
            <div class="base-footer">
            </div>
          </div>
        </div>
      </body>
    </html>

要記得每一層框架都是一個**群組**，而**群組**有其特定的結構，以上僅是結構示意。

<h3 id="css-selector">CSS 選擇器與範圍</h3>
我們將 HTML 分類，歸納了 14 種**模組**類別、4種**群組類別**，相同類別的模塊，樣式均寫在同一個檔案裡。
舉例來說，".nav" 與 ".font-level" 均屬於 **.list-text** 這個類別，因此它們

<h3 id="javascript-optimize">Javascript 優化</h3>


<h2 id="html">HTML 實作</h2>

<h3 id="project-directory">專案目錄結構</h3>

<h3 id="html-parameter">參數與意義</h3>

<h3 id="grid">格線系統</h3>

<h3 id="module-and-group-structure">模組/群組基本結構</h3>

以下是一組**群組**模塊的範本：

    <div><div class="inner">
      <div class="content"><div class="inner">
        <h3><span><a>範例群組</a></span></h3>
      </div></div>
      <div class="content"><div class="inner">
        //這裡是其他子模塊
      </div></div>
      <div class="footer"><div class="inner">
        <ul>
          <li class="prev"><span><a>上一則</a></span></li>
          <li class="next"><span><a>下一則</a></span></li>
          <li class="more"><span><a>更多</a></span></li>
        </ul>
      </div></div>
    </div></div>

以下是一組**模組**模塊的範本：

    <div><div class="inner">
      <div class="content"><div class="inner">
        <h4><span><a>範例模組</a></span></h4>
      </div></div>
      <div class="content"><div class="inner">
        //這裡是模組內容
      </div></div>
      <div class="footer"><div class="inner">
        <ul>
          <li class="prev"><span><a>上一則</a></span></li>
          <li class="next"><span><a>下一則</a></span></li>
          <li class="more"><span><a>更多</a></span></li>
        </ul>
      </div></div>
    </div></div>

可以看到**群組**與**模組**的結構幾乎相同，唯一的差別是 header 裡的 heading 級數：
**群組**是 h3 而**模組**是 h4。

<h3 id="group-structure">群組類別與結構</h3>

<h3 id="module-structure">模組類別與結構</h3>

<h3 id="component">組件</h3>

<h3 id="module-establish-principles">模組建立原則</h3>


<h2 id="erb">Erb 實作</h2>

<h3 id="erb-directory">Erb 目錄結構</h3>

<h3 id="erb-script">Erb 樣板語言</h3>

<h3 id="erb-run">Erb 運作方式</h3>

<h3 id="erb-index-layout">關於 index樣板</h3>

<h3 id="erb-layout">關於 layout樣板</h3>

<h3 id="erb-variable">關於 sys/variable</h3>

<h3 id="basic-ruby-script">基本 ruby 語法</h3>

<h3 id="lorem-ipsum-and-picture">假字與圖片</h3>


<h2 id="scss">CSS/SCSS 實作</h2>

<h3 id="scss-directory">SCSS 目錄結構</h3>

<h3 id="scss-type">類別</h3>

<h3 id="selector-logic">選擇器邏輯</h3>

<h3 id="scss-file-import">檔案引入方式</h3>

<h3 id="scss-variable">關於 sys/variable</h3>

<h3 id="function-and-variable">function 與 variable</h3>

<h3 id="scss-noscript">noscript 方法</h3>

<h3 id="scss-hack">hack 方法</h3>

<h3 id="scss-rwd">rwd 方法</h3>

<h3 id="scss-admin">admin 方法</h3>

<h3 id="scss-font-icon">文字圖示</h3>

<h3 id="scss-sprite-picture">sprite 圖示</h3>

<h3 id="scss-debug">debug</h3>


<h2 id="js">javascript/requireJS 實作</h2>

<h3 id="js-directory">Script 目錄結構</h3>

<h3 id="js-require">requireJS 運作方式</h3>

<h3 id="node-and-files">以 node 呼叫 javascript 檔案</h3>

<h3 id="app-and-main">關於 lib/app 與 lib/main</h3>

<h3 id="run-script">javascript 執行</h3>

<h3 id="parameter-and-function-retune">參數與回傳函式</h3>

<h3 id="js-cookie">關於 cookie.js</h3>

<h3 id="js-jquery">關於 jquery.js</h3>

<h3 id="js-group">關於 group.js</h3>

<h3 id="js-plugin">關於 plugin.js</h3>