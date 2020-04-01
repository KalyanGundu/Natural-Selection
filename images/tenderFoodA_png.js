/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
