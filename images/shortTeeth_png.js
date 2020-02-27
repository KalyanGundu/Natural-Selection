/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
