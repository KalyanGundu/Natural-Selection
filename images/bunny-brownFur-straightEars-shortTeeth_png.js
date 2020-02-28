/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;