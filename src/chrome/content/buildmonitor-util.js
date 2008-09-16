/*****************************************************************
 * TextMgr retrieves text from string bundle.
 */
function TextMgr() {
}
TextMgr.prototype.get = function(key, args) {
	var texts = document.getElementById("hudson-stringbundle");
	var text;
	if (args) {
		text = texts.getFormattedString(key, args);
	} else {
		text = texts.getString(key);
	}
	return text;
}

/*****************************************************************
 * PrefMgr handles preferences saving and loading to and from Firefox configuration
 * (type about:config in Firefox url bar to view all Firefox configuration values).
 */
function PrefMgr(preferences, feeds) {
    this.preferences = preferences;
    this.feeds = feeds;
}
PrefMgr.prototype.setFeeds = function() {
	var treeView = {
	    rowCount : 10000,
	    getCellText : function(row, column) {
	    	var text;
	    	if (column.id == "hudson-prefs-feeds-code") {
	    		text = feeds[0].getCode();
	    	} else if (column.id == "hudson-prefs-feeds-url") {
	    		text = feeds[0].getUrl();
	    	} else if (column.id == "hudson-prefs-feeds-isenabled") {
	    		text = feeds[0].isEnabled();
	    	}
	    	return text;
	    },
	    setTree: function(treebox){ this.treebox = treebox; },
	    isContainer: function(row){ return false; },
	    isSeparator: function(row){ return false; },
	    isSorted: function(){ return false; },
	    isEditable: function(){ return true; },
	    getLevel: function(row){ return 0; },
	    getImageSrc: function(row,col){ return null; },
	    getRowProperties: function(row,props){},
	    getCellProperties: function(row,col,props){},
	    getColumnProperties: function(colid,col,props){}
	};
    document.getElementById('hudson-prefs-feeds').view = treeView;
}
PrefMgr.prototype.set = function(debug, interval, size, url) {
    this.preferences.setBoolPref("hudson.debug", debug);
    this.preferences.setIntPref("hudson.interval", interval);
    this.preferences.setIntPref("hudson.size", size);
    this.preferences.setCharPref("hudson.url", url);
}
PrefMgr.prototype.getDebug = function() {
    return this.preferences.getBoolPref("hudson.debug");
}
PrefMgr.prototype.getInterval = function() {
    return this.preferences.getIntPref("hudson.interval");
}
PrefMgr.prototype.getSize = function() {
    return this.preferences.getIntPref("hudson.size");
}
PrefMgr.prototype.getUrl = function() {
    return this.preferences.getCharPref("hudson.url");
}

/*****************************************************************
 * DateMgr provides date manipulation convenience methods.
 */
function DateMgr() {
}
DateMgr.prototype.getDebugDate = function() {
	return (new Date()).toLocaleString();
}

/*****************************************************************
 * LogMgr writes log messages to Firefox console (on Firefox menu: Tools -> Error Console)
 * when Debug Enabled checkbox is ticked on Build Monitor's preferences menu.
 */
function LogMgr(console, prefMgr, dateMgr) {
    this.console = console;
    this.prefMgr = prefMgr;
    this.dateMgr = dateMgr;
}
LogMgr.prototype.debug = function(message, feed) {
    if (this.prefMgr.getDebug() == true) {
    	var id = "main";
    	if (feed) {
    		id = feed.getId() + "-" + feed.getCode();
    	}
        this.console.logStringMessage("BuildMonitor [" + this.dateMgr.getDebugDate() + "][" + id + "]: " + message);
    }
}