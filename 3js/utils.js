
var utils = {};

utils.insertHtml = function (css_selector, html, bAppend=false) {
    var targetElem = document.querySelector(css_selector);
    if (bAppend == true) {
        targetElem.innerHTML += html;
    } else {
        targetElem.innerHTML = html;
    }
};

// function return the variable name in source code
// to use: utils.varToString( {item_var} )
utils.varToString = varObj => Object.keys(varObj)[0]

// usage: "{0}".format( var )
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
