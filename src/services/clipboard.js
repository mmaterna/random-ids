
export default {
    copyToClipboard,
}

function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
  
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy')
    selection.removeAllRanges();
  
    document.body.removeChild(textarea);    
  }