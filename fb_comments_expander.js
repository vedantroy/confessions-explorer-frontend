javascript: (function() {
    let todo = 14;
    const EXPAND_POST = 1;
    const EXPAND_COMMENTS = 2;
    const EXPAND_REPLIES = 4;
    const EXPAND_XLAT = 8;
    const EXPAND_FILTER = 16;
    const WAIT_TIME = 100;
    const MAX_WAIT = 20;
    const END_DELAY = 2.5;
    const CSS_COMMENT = ".UFIComment";
    const COMMENT_SELECTOR = "[data-testid=\"UFI2Comment/root_depth_0\"]";
    const REPLY_SELECTOR = "[data-testid=\"UFI2Comment/root_depth_1\"]";
    const LEGACY_COMMENTS = ":not(.UFIReplyList) > " + CSS_COMMENT;
    const LEGACY_REPLIES = ".UFIReplyList " + CSS_COMMENT;
    const ALL_COMMENTS = COMMENT_SELECTOR + "," + LEGACY_COMMENTS;
    const ALL_REPLIES = REPLY_SELECTOR + "," + LEGACY_REPLIES;
    const NODE_SELECTOR = COMMENT_SELECTOR + "," + REPLY_SELECTOR + "," + CSS_COMMENT;
    const GET_COMMENTS = "[data-testid=\"UFI2CommentsPagerRenderer/pager_depth_0\"]";
    const GET_REPLIES = "[data-testid=\"UFI2CommentsPagerRenderer/pager_depth_1\"]";
    const COMMENT_PAGER = ":not(.UFIReplyList) > .UFIPagerLink";
    const REPLY_PAGER = ".UFIReplyList .UFIPagerLink";
    const CSS_REPLY_TEXT = ".UFIReplySocialSentenceLinkText";
    const GET_ALL_COMMENTS = GET_COMMENTS + "," + COMMENT_PAGER;
    const GET_ALL_REPLIES = GET_REPLIES + "," + REPLY_PAGER + "," + CSS_REPLY_TEXT;
    const SHOW_COMMENTS = "[data-testid=\"UFI2CommentsCount/root\"]";
    const SINGLE_COMMENT_AREA = "[data-testid=\"UFI2CommentsList/root_depth_0\"]";
    const FILTER_SELECTOR = "[data-testid=\"UFI2ViewOptionsSelector/link\"]";
    const SHOW_COMMENT_AREA = SHOW_COMMENTS + ",[data-comment-prelude-ref=\"action_link_bling\"]";
    const POST_ROOT = ".userContentWrapper";
    const CSS_LOGIN_STUFF = "._5hn6, ._67m7, .generic_dialog_modal";
    const BASE_SEE_MORE = ".text_exposed_link .see_more_link_inner";
    const EXPOSE_CONTENT = ".text_exposed_link";
    const CSS_XLAT_POST = "._43f9";
    const CSS_XLAT_COMMENT = "._6qw5";
    const CSS_XLAT_COMMENT2 = ".UFITranslateLink";
    const XLAT_ALL_COMMENTS = "._6srr, ._4upo";
    const CSS_SEE_MORE = ".fss";
    const ATTR_DATA_TESTID = "data-testid";
    const REACTIONLINK = "UFI2ReactionLink";
    const _NONE = "no-value";
    const _COMMENTS = "-comments";
    const _REPLIES = "-replies";
    const SETTINGS_KEY = "expand-all-todo";
   
    function bind(obj, fn) {
     return function() {
      fn.apply(obj, arguments);
     };
    }
    let Global = null;
    if (!document.querySelectorAll("xx").forEach) {
     Object.prototype.forEach = function(callback) {
      let T;
      if (arguments.length > 1) {
       T = arguments[1];
      }
      let O = Object(this);
      let len = O.length >>> 0;
      let k = 0;
      while (k < len) {
       if (k in O) {
        callback.call(T, O[k], k, O);
       }
       k++;
      }
     };
    }
   
    function EscHandler() {
     this.abortNow = false;
     this.handler = bind(this, this.docKeyDown);
    }
    EscHandler.prototype.shouldAbort = function() {
     return this.abortNow;
    };
    EscHandler.prototype.abort = function(value) {
     if (value && !this.shouldAbort() && !Global.cfg) {
      Global.log("Aborting...");
     }
     this.abortNow = value;
    };
    EscHandler.prototype.on = function() {
     this.abortNow = false;
     document.addEventListener("keydown", this.handler);
    };
    EscHandler.prototype.off = function() {
     this.abortNow = true;
     document.removeEventListener("keydown", this.handler);
    };
    EscHandler.prototype.docKeyDown = function(e) {
     if (e.keyCode == 27) {
      e.preventDefault();
      this.abort(true);
      if (Global.cfg) {
       Session.trulyEnd();
      }
     }
    };
   
    function CfgHandler() {
     this.doConfig = false;
     this.handler = bind(this, this.docKeyDown);
    }
    CfgHandler.prototype.shouldConfig = function() {
     return this.doConfig;
    };
    CfgHandler.prototype.on = function() {
     this.doConfig = false;
     document.addEventListener("keydown", this.handler);
    };
    CfgHandler.prototype.off = function() {
     this.doConfig = true;
     document.removeEventListener("keydown", this.handler);
    };
    CfgHandler.prototype.docKeyDown = function(e) {
     if (e.keyCode === "S".charCodeAt(0)) {
      e.preventDefault();
      if (e.ctrlKey) {
       Settings.removeKey(SETTINGS_KEY);
       Global.log("Will use default settings");
       return;
      }
      this.doConfig = true;
      if (Global.ending) {
       CfgWindow.showIt();
      }
     }
    };
   
    function Settings() {}
    new Settings();
    Settings.hasValue = function(value) {
     return window.localStorage.getItem(value) !== null;
    };
    Settings.getValue = function(value, deflt) {
     if (arguments.length < 2) {
      deflt = null;
     }
     if (!Settings.hasValue(value)) {
      return deflt;
     }
     return window.localStorage.getItem(value);
    };
    Settings.getInt = function(value, deflt) {
     if (arguments.length < 2) {
      deflt = -1;
     }
     return Number.parseInt(Settings.getValue(value, deflt), 10);
    };
    Settings.getBoolean = function(value, deflt) {
     if (arguments.length < 2) {
      deflt = "false";
     }
     return Settings.getValue(value, "" + deflt) == "true";
    };
    Settings.setValue = function(key, value) {
     return window.localStorage.setItem(key, "" + value);
    };
    Settings.removeKey = function(key) {
     return window.localStorage.removeItem(key);
    };
   
    function BaseWindow() {
     this.id = "base-window";
    }
    BaseWindow.prototype.show = function() {
     const WANT_W = 300;
     const WANT_H = 200;
     const sizer = document.querySelector("html");
     const w = sizer.clientWidth;
     const h = sizer.clientHeight;
     let x = 0;
     if (w > WANT_W) {
      x = (w - WANT_W) / 2;
     }
     let y = 0;
     if (h > WANT_H) {
      y = (h - WANT_H) / 3;
     }
     let div = document.createElement("div");
     div.id = this.id;
     div.style.direction = "ltr";
     div.style.position = "fixed";
     div.style.zIndex = "999999";
     div.style.left = x + "px";
     div.style.width = WANT_W + "px";
     div.style.top = y + "px";
     div.style.height = WANT_H + "px";
     div.style.color = "#fff";
     div.style.backgroundColor = "#425f9c";
     document.body.insertAdjacentElement("afterbegin", div);
     this.create(div);
     this.init(div);
    };
    BaseWindow.prototype.create = function(div) {};
    BaseWindow.prototype.init = function(div) {};
    BaseWindow.prototype.hide = function() {
     document.querySelectorAll("#" + this.id).forEach(item => document.body.removeChild(item));
    };
   
    function % 20 CfgWindow() {
     this.id = "cfg-window";
    }
    CfgWindow.prototype = Object.create(BaseWindow.prototype);
    CfgWindow.prototype.create = function(div) {
     let % 20n ode = document.createElement("p");
     div.appendChild(node);
     node.innerHTML = "<i>Expand%20All</i>%20Settings";
     node.style.marginLeft = "4px";
     node.style.fontWeight = "bold";
     const % 20 boxes = [
      ["Click%20<i>Continue%20Reading</i>%20links.", EXPAND_POST],
      ["Expand%20comments.", EXPAND_COMMENTS],
      ["Expand%20replies.", EXPAND_REPLIES],
      ["Click%20<i>Translate</i>%20links.", EXPAND_XLAT],
      ["Don't%20force%20<i>All%20Comments</i>%20filter.", EXPAND_FILTER]
     ];
     boxes.forEach(item => {
      node = document.createElement("p");
      div.appendChild(node);
      node.style.marginTop = "2px";
      node.style.marginBottom = "2px";
      let % 20node2 = document.createElement("input");
      node.appendChild(node2);
      node2.type = "checkbox";
      node2.value = item[1];
      node2.style.marginLeft = "15px";
      node2.style.cursor = "pointer";
      node2 = document.createElement("label");
      node.appendChild(node2);
      node2.innerHTML = item[0];
      node2.style.cursor = "pointer";
      node2.style.paddingBottom = "5px";
      node2.style.fontWeight = "normal";
      node2.style.color = "#fff";
     });
     node = document.createElement("div");
     div.appendChild(node);
     node.style.textAlign = "center";
     let % 20n ode2 = document.createElement("button");
     node.appendChild(node2);
     node2.innerHTML = "Done";
     node2.style.cursor = "pointer";
     node2.addEventListener("click", Session.trulyEnd);
     div.addEventListener("CheckboxStateChange", CfgWindow.check);
     div.addEventListener("click", CfgWindow.check);
    };
    CfgWindow.check = function(e) {
     let % 20n ode = Dom.upThenDown(e.target, "p", "input");
     if (node != e.target) {
      node.checked = !node.checked;
     }
     if (node.checked) {
      todo |= Number.parseInt(node.value);
     } else {
      todo &= ~Number.parseInt(node.value);
     }
     Settings.setValue(SETTINGS_KEY, todo);
    };
    CfgWindow.prototype.init = function(div) {
     let % 20 boxes = div.querySelectorAll("input");
     if (boxes.length === 5) {
      boxes[0].checked = (todo & EXPAND_POST) != 0;
      boxes[1].checked = (todo & EXPAND_COMMENTS) != 0;
      boxes[2].checked = (todo & EXPAND_REPLIES) != 0;
      boxes[3].checked = (todo & EXPAND_XLAT) != 0;
      boxes[4].checked = (todo & EXPAND_FILTER) != 0;
     }
    };
    CfgWindow.showIt = function() {
     Global.logger.hide();
     Global.cfg = new % 20 CfgWindow();
     Global.cfg.show();
    };
   
    function % 20 LogWindow() {
     this.id = "log-window";
     this.timeouts = 0;
     this.phantoms = 0;
     this.edit = null;
    }
    LogWindow.prototype = Object.create(BaseWindow.prototype);
    LogWindow.prototype.create = function(div) {
     this.edit = document.createElement("textarea");
     this.edit.style.width = "100%";
     this.edit.style.height = "100%";
     this.edit.style.color = "#fff";
     this.edit.style.backgroundColor = "#425f9c";
     div.appendChild(this.edit);
    };
    LogWindow.prototype.hide = function() {
     BaseWindow.prototype.hide.call(this);
     this.edit = null;
    };
    LogWindow.prototype.log = function(s) {
     console.log(s);
     if (this.edit) {
      this.edit.value = s + "\n" + this.edit.value;
     }
    };
    LogWindow.prototype.timeout = function() {
     this.timeouts++;
    };
    LogWindow.prototype.phantom = function() {
     this.phantoms++;
    };
    LogWindow.prototype.counts = function() {
     if (this.timeouts > 0) {
      this.log(this.timeouts + "%20timeout(s)");
     }
     if (this.phantoms > 0) {
      this.log(this.phantoms + "%20phantom(s)");
     }
     const % 20 comments = Global.root.queryAll(ALL_COMMENTS).length;
     const % 20 replies = Global.root.queryAll(ALL_REPLIES).length;
     this.log("Comments%20+%20replies%20=%20" + comments + "%20+%20" + replies + "%20=%20" + (comments + replies));
    };
   
    function % 20 Root() {
     this.rootNode = document.body;
     this.usingBody = true;
    }
    Root.removeOverlay = function() {
     document.querySelectorAll(CSS_LOGIN_STUFF).forEach(item => {
      Global.log("Removing%20overlay%20stuff");
      item.parentNode.removeChild(item);
     });
    };
    Root.prototype.query = function(s) {
     return %20 this.rootNode.querySelector(s);
    };
    Root.prototype.queryAll = function(s) {
     return %20 this.rootNode.querySelectorAll(s);
    };
    Root.prototype.determine = function() {
     let % 20 check = [];
     check.push([".uiStreamStory", "Video%20comments%20on%20right"]);
     check.push(["div.rhcScroller%20.uiScrollableAreaContent", "Theater%20mode"]);
     check.push([".uiLayer:not(.hidden_elem)", "Overlaid%20post"]);
     check.push([".permalinkPost", "Permalinked%20post"]);
     check.push(["[role=\"main\"]", "Main%20content%20area"]);
     check.find(item => {
      const % 20 div = document.querySelector(item[0]);
      if (div && !Dom.isHidden(div)) {
       Global.log(item[1]);
       this.rootNode = div;
       this.usingBody = false;
       return %20 true;
      }
     });
    };
    Root.prototype.getRoot = function() {
     return %20 this.rootNode;
    };
    Root.prototype.getResponseCount = function() {
     return %20 getResponseCount(this.rootNode);
    };
    Root.prototype.getContentSize = function() {
     return %20 this.rootNode.scrollHeight + this.getResponseCount();
    };
    Root.isVideo = function() {
     return !!document.querySelector("._2xui");
    };
    Root.prepIfVideo = function(onDone) {
     const % 20 link = document.querySelector("._2xui");
     if (link) {
      Global.log("Making%20sure%20video%20comments%20are%20showing");
      link.click();
     }
     if (onDone) {
      window.setTimeout(onDone, 0);
     }
    };
    Root.prototype.isSearchResults = function() {
     return !!Global.root.query("#pagelet_group_search");
    };
    Root.prototype.countPosts = function() {
     if (Root.isVideo()) {
      return %201;
     }
     const % 20 all = this.rootNode.querySelectorAll(POST_ROOT);
     let % 20 count = all.length;
     all.forEach(item => {
      if (!!item.querySelector(POST_ROOT) || !!item.parentNode.closest(CSS_COMMENT)) {
       count--;
      }
     });
     return %20 count;
    };
   
    function % 20 Dom() {}
    new % 20 Dom();
    Dom.getStyle = function(node) {
     return %20n ode.ownerDocument.defaultView.getComputedStyle(node, null);
    };
    Dom.isHidden = function(node) {
     while (node && node.ownerDocument) {
      if (Dom.getStyle(node)["display"] == "none") {
       return %20 true;
      }
      node = node.parentNode;
     }
     return %20 false;
    };
    Dom.dumpAncestors = function(node) {
     while (node) {
      let % 20 s = node.nodeName;
      if (node.id) {
       s += "%20id=\"" + node.id + "\"";
      }
      if (node.className) {
       s += "%20class=\"" + node.className + "\"";
      }
      if (Dom.isHidden(node)) {
       s += "%20hidden";
      }
      Global.log(s);
      node = node.parentNode;
     }
    };
    Dom.upThenDown = function(node, ancestor, descendent) {
     const % 20 item = node.parentNode.closest(ancestor);
     if (item) {
      return %20 item.querySelector(descendent);
     }
     return %20n ull;
    };
   
    function % 20 prepSearchResults(onDone) {
     if (!Global.root.isSearchResults()) {
      if (onDone) onDone();
      return;
     }
     let % 20 filter = Array.from(Global.root.queryAll("._ipm")).filter(item => !item.parentNode.closest(POST_ROOT));
     if (filter.length > 0) {
      Global.log("Prepping%20search%20results:%20" + filter.length + "%20post(s)");
      clickAndWait(_NONE, onDone, filter, 0);
     } else {
      if (onDone) onDone();
     }
    }
   
    function % 20 getResponseCount(item) {
     return %20 item.querySelectorAll(NODE_SELECTOR).length;
    }
   
    function % 20 areCommentsShowing(item) {
     if (getResponseCount(item) > 0) {
      return %20 true;
     }
     return %20 item.querySelector(FILTER_SELECTOR) != null;
    }
   
    function % 20 ensureCommentsShowing(multi, onDone) {
     if (Global.root.isSearchResults()) {
      if (multi) {
       Global.log("You%20must%20manually%20drill%20down%20into%20a%20search%20result.");
      }
      if (onDone) onDone();
      return;
     }
     let % 20 filter = [];
     if (multi) {
      const % 20n = Global.root.countPosts();
      if (n > 1) {
       Global.log("Examining%20" + n + "%20posts");
       Global.root.queryAll(POST_ROOT).forEach(item => {
        if (!item.querySelector(POST_ROOT) && !areCommentsShowing(item)) {
         const % 20 link = item.querySelector(SHOW_COMMENT_AREA);
         if (link) {
          filter.push(link);
         }
        }
       });
      }
     } else {
      const % 20 link = Global.root.query(SHOW_COMMENTS);
      if (link && !Global.root.query(SINGLE_COMMENT_AREA)) {
       filter.push(link);
      }
     }
     if (filter.length > 0) {
      Global.log("Showing%20comment%20area%20for%20" + filter.length + "%20post(s)");
      clickAndWait(_NONE, onDone, filter, 0);
     } else {
      if (onDone) onDone();
     }
    }
   
    function % 20 isNewWindow(link) {
     return !!link.querySelector("a[target][href]");
    }
   
    function % 20n ewWindowNow(link) {
     const % 20 anchor = link.querySelector("a[target][href]");
     Global.log("New%20window:%20" + anchor.textContent);
     if (!window.open(anchor.getAttribute("href"), anchor.getAttribute("target"))) {
      Global.log("New%20window%20was%20blocked!");
     }
    }
   
    function % 20 clickClass(value, onDone) {
     if (Global.escHandler.shouldAbort()) {
      if (onDone) onDone();
      return;
     }
     let % 20 filter = Array.from(Global.root.queryAll(value)).filter(item => {
      if (value === BASE_SEE_MORE) {
       if (item.parentNode.closest(".groupsSideMargin")) {
        return %20 false;
       }
       if (Dom.isHidden(item)) {
        return %20 false;
       }
       return %20 true;
      }
      if (value === EXPOSE_CONTENT) {
       if (isNewWindow(item)) {
        newWindowNow(item);
       }
       return %20 false;
      }
      if (value === CSS_XLAT_COMMENT) {
       if (Dom.upThenDown(item, "._42ef", "._4eeo")) {
        return %20 false;
       }
       if (item.matches("[" + ATTR_DATA_TESTID + "]")) {
        return %20 false;
       }
       if (item.textContent.indexOf("%20(") > 0) {
        return %20 false;
       }
       return %20 true;
      }
      if (value === CSS_XLAT_COMMENT2) {
       if (!!item.querySelector("span")) {
        return %20 false;
       }
       return %20 true;
      }
      return %20 true;
     });
     if (value === CSS_XLAT_COMMENT || value === CSS_XLAT_COMMENT2) {
      let % 20 current = null;
      filter = filter.filter(item => {
       if (current === null) {
        current = item.closest(POST_ROOT);
        return %20 true;
       }
       if (item.closest(POST_ROOT) != current) {
        current = null;
       }
       return %20 false;
      });
     }
     if (filter.length > 0) {
      clickAndWait(value, onDone, filter, 0);
     } else {
      if (onDone) onDone();
     }
     return %20 filter.length;
    }
   
    function % 20 doNotWait(value) {
     return [CSS_SEE_MORE, CSS_XLAT_POST, CSS_XLAT_COMMENT, CSS_XLAT_COMMENT2, BASE_SEE_MORE, EXPOSE_CONTENT].indexOf(value) >= 0;
    }
   
    function % 20 avoidEndTimes(item) {
     if (item.matches("[" + ATTR_DATA_TESTID + "=\"" + REACTIONLINK + "\"]")) {
      Global.log("End%20times%20are%20near!%20Try%20hitting%20ESC%20if%20necessary.");
      return %20 true;
     }
     return %20 false;
    }
   
    function % 20 isHideReplies(link) {
     if (link.matches(CSS_REPLY_TEXT)) {
      if (Dom.upThenDown(link, ".UFICommentLink", ".UFICollapseIcon")) {
       return %20 true;
      }
     }
     return %20 false;
    }
   
    function % 20 commentsOrReplies(comments, onDone) {
     if (Global.escHandler.shouldAbort()) {
      if (onDone) onDone();
      return;
     }
     let % 20 filter = Array.from(Global.root.queryAll(comments ? GET_ALL_COMMENTS : GET_ALL_REPLIES)).filter(item => {
      if (comments && !!item.parentNode.closest(".UFIReplyList")) {
       return %20 false;
      }
      if (!comments && isHideReplies(item)) {
       return %20 false;
      }
      return %20 true;
     });
     if (filter.length > 0) {
      clickAndWait(comments ? _COMMENTS : _REPLIES, onDone, filter, 0);
     } else {
      if (onDone) onDone();
     }
    }
   
    function % 20 getBestLabel(link) {
     let % 20 label = link.getAttribute("aria-label");
     if (!label) {
      label = link.textContent;
     }
     label = label.split("\u00a0\u0020\u00b7")[0];
     const % 20 time = link.querySelector("._3eom");
     if (time && label.endsWith(time.textContent)) {
      label = label.substring(0, label.length - time.textContent.length);
     }
     return %20 label;
    }
   
    function % 20 clickAndWait(value, onDone, links, i) {
     if (Global.escHandler.shouldAbort()) {
      if (onDone) onDone();
      return;
     }
     let % 20n = Global.root.getContentSize();
     if (!avoidEndTimes(links[i])) {
      Global.log("click%20(" + (links.length - i - 1) + "%20left):%20" + getBestLabel(links[i]));
      links[i].click();
     }
     if (value == _NONE) {
      n = Global.root.getContentSize();
     }
     let % 20 wait = MAX_WAIT;
     let % 20 time = WAIT_TIME;
     if (doNotWait(value)) {
      wait = -1;
      time = 0;
     }
     window.setTimeout(() => waitHelper(value, onDone, links, i, n, wait), time);
    }
   
    function % 20 waitHelper(value, onDone, links, i, n, wait) {
     if (wait === -1) {
      if (++i < links.length) {
       clickAndWait(value, onDone, links, i);
      } else {
       if (onDone) onDone();
      }
      return;
     }
     if (Global.root.getContentSize() - n != 0) {
      if (++i < links.length) {
       clickAndWait(value, onDone, links, i);
      } else {
       if (value == _COMMENTS || value == _REPLIES) {
        commentsOrReplies(value == _COMMENTS, onDone);
       } else {
        if (onDone) onDone();
       }
      }
      return;
     }
     if (window.doPhantomCheck && !Global.root.getRoot().contains(links[i])) {
      Global.logger.phantom();
      wait = -1;
     }
     if (wait > 0) {
      window.setTimeout(() => waitHelper(value, onDone, links, i, n, --wait), WAIT_TIME);
      return;
     }
     if (wait == 0) {
      Global.logger.timeout();
     }
     if (++i < links.length) {
      clickAndWait(value, onDone, links, i);
     } else {
      if (onDone) onDone();
     }
    }
   
    function % 20 pumpOnce(onDone) {
     window.responseCount = Global.root.getResponseCount();
     window.doPhantomCheck = true;
     if ((todo & EXPAND_COMMENTS) != 0) {
      commentsOrReplies(true, () => pumpOnce2(onDone));
     } else {
      pumpOnce2(onDone);
     }
    }
   
    function % 20 pumpOnce2(onDone) {
     if ((todo & EXPAND_REPLIES) != 0) {
      commentsOrReplies(false, () => pumpOnce3(onDone));
     } else {
      pumpOnce3(onDone);
     }
    }
   
    function % 20 pumpOnce3(onDone) {
     if (Global.root.getResponseCount() > window.responseCount) {
      window.setTimeout(() => pumpOnce(onDone), 500);
     } else {
      delete % 20 window.doPhantomCheck;
      if (onDone) onDone();
     }
    }
   
    function % 20 setFilter(onDone) {
     window.filters = Global.root.queryAll(FILTER_SELECTOR);
     window.i_filters = 0;
     window.onDone_filters = onDone;
     if (window.filters.length > 0) {
      Global.log("Checking%20" + window.filters.length + "%20filter(s)");
     }
     filterOne();
    }
   
    function % 20 filterOne() {
     if (window.i_filters < window.filters.length) {
      const % 20 link = window.filters[window.i_filters++];
      link.click();
      window.setTimeout(() => setFilter2(link), 100);
     } else {
      if (window.onDone_filters) window.onDone_filters();
     }
    }
   
    function % 20 setFilter2(link) {
     const % 20 menu = document.querySelector("[data-ownerid=\"" + link.id + "\"]");
     if (menu) {
      const % 20 item = menu.querySelector("li:nth-child(3)");
      if (item && !item.querySelector("[aria-checked=\"true\"]")) {
       item.click();
       window.setTimeout(setFilter3, 0);
       return;
      }
     }
     link.click();
     filterOne();
    }
   
    function % 20 setFilter3() {
     const % 20 area = Global.root.query(COMMENT_SELECTOR);
     if (!area || Dom.isHidden(area)) {
      window.setTimeout(setFilter3, 200);
     } else {
      filterOne();
     }
    }
   
    function % 20 Actions() {
     this.i = 0;
     this.setUpActions();
    }
    Actions.prototype.setUpActions = function() {
     this.actions = [];
     this.actions.push(onDone => Root.prepIfVideo(onDone));
     this.actions.push(onDone => ensureCommentsShowing(true, onDone));
     this.actions.push(onDone => ensureCommentsShowing(false, onDone));
     if ((todo & EXPAND_FILTER) == 0) {
      this.actions.push(onDone => setFilter(onDone));
     }
     this.actions.push(onDone => clickClass(BASE_SEE_MORE, onDone));
     if ((todo & EXPAND_POST) != 0) {
      this.actions.push(onDone => clickClass(EXPOSE_CONTENT, onDone));
     }
     this.actions.push(onDone => pumpOnce(onDone));
     if ((todo & EXPAND_XLAT) != 0) {
      this.actions.push(onDone => clickClass(CSS_XLAT_POST, onDone));
      this.actions.push(onDone => {
       window.xlated = clickClass(CSS_XLAT_COMMENT, onDone);
      });
      this.actions.push(onDone => {
       window.xlated += clickClass(CSS_XLAT_COMMENT2, onDone);
      });
      this.actions.push(onDone => window.setTimeout(() => onDone(), window.xlated > 0 ? 250 : 0));
      this.actions.push(onDone => clickClass(XLAT_ALL_COMMENTS, onDone));
     }
     this.actions.push(onDone => clickClass(CSS_SEE_MORE, onDone));
     this.actions.push(Session.endSession);
     this.actions.push(null);
    };
    Actions.prototype.doAction = function() {
     if (this.actions[this.i] !== null) {
      this.actions[this.i](() => window.setTimeout(bind(this, this.doAction), 50));
      this.i++;
     }
    };
    Actions.prototype.kickOff = function() {
     this.i = 0;
     this.doAction();
    };
   
    function % 20 Session() {}
    Session.init = function() {
     if (window.Global) {
      Global = window.Global;
      Global.escHandler.abort(true);
     } else {
      Session.kickOff();
     }
    };
    Session.kickOff = function() {
     Global = {
      escHandler: new % 20 EscHandler(),
      cfgHandler: new % 20 CfgHandler(),
      logger: new % 20 LogWindow(),
      root: new % 20 Root()
     };
     Global.log = function(s) {
      Global.logger.log(s);
     };
     window.Global = Global;
     Session.main();
    };
    Session.main = function() {
     todo = Settings.getInt(SETTINGS_KEY, todo);
     Global.logger.show();
     Global.escHandler.on();
     Global.cfgHandler.on();
     Root.removeOverlay();
     Global.root.determine();
     Global.actions = new % 20 Actions();
     Global.actions.kickOff();
    };
    Session.endSession = function() {
     Global.logger.counts();
     if (Global.cfgHandler.shouldConfig()) {
      CfgWindow.showIt();
      return;
     }
     Global.ending = true;
     Global.log("[Press%20\u0027s\u0027%20now%20for%20Settings]");
     window.setTimeout(Session.maybeEnd, END_DELAY * 1000);
    };
    Session.maybeEnd = function() {
     delete % 20 Global.ending;
     if (!Global.cfgHandler.shouldConfig()) {
      Session.trulyEnd();
     }
    };
    Session.trulyEnd = function() {
     if (Global.cfg) {
      Global.cfg.hide();
      delete % 20 Global.cfg;
     }
     Global.escHandler.off();
     Global.cfgHandler.off();
     Global.logger.hide();
     delete % 20 window.Global;
     Global = null;
    };
    Session.init();
   })()