var clone = require('./util/clone');
var path = require('path');

//======================================================================================================================
// Picture (p:pic)
//======================================================================================================================

var Picture = function (content, presentation, slideName) {
  var imageData;
  var fileName;
  var rId;
  var slideRels;
  var picProps = content['p:spPr'][0];

  this.content = content;
  this.presentation = presentation;

  this.x = picProps['a:xfrm'][0]['a:off'][0]['$']['x'];
  this.y = picProps['a:xfrm'][0]['a:off'][0]['$']['y'];
  this.width = picProps['a:xfrm'][0]['a:ext'][0]['$']['cx'];
  this.height = picProps['a:xfrm'][0]['a:ext'][0]['$']['cy'];

  // Fetch image data from relationships
  rId = this.content['p:blipFill'][0]['a:blip'][0]['$']['r:embed'];
  this.rId = rId;

  slideRels = this.presentation.content['ppt/slides/_rels/' + slideName + '.xml.rels']['Relationships']['Relationship'];
  this.slideRels = slideRels;

  fileName = slideRels.find(slideRel => slideRel['$']['Id'] === rId);

  if (fileName) {
    fileName = path.basename(fileName['$']['Target']);
    this.fileName = fileName;

    imageData = this.presentation.content['ppt/media/' + fileName];
    this.dataUrl = imageData;
  }


};

module.exports = Picture;