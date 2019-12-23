
export default {
  copyToClipboard
}

function copyToClipboard (text) {
  var textarea = document.createElement('textarea')
  textarea.textContent = text
  document.body.appendChild(textarea)

  var selection = document.getSelection()
  selection.removeAllRanges()

  textarea.select()
  document.execCommand('copy')
  selection.removeAllRanges()

  document.body.removeChild(textarea)
}
