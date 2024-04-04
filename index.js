const textInput = document.getElementById("textInput");
const applyButton = document.getElementById("applyButton");
const outputDiv = document.getElementById("output");
let isDragging = false;
let selectedText = null;

applyButton.addEventListener("click", function () {
  const inputValue = textInput.value;
  outputDiv.textContent = inputValue;
});

function createSpanWithDraggableText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("draggable");
  span.setAttribute("draggable", true);

  span.addEventListener("mousedown", function (event) {
    isDragging = true;
    selectedText = event.target.textContent;
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    selection.addRange(range);
    if (!event.ctrlKey) {
      event.target.classList.toggle("selected");
    }
  });

  span.addEventListener("mouseup", function (event) {
    isDragging = false;
    selectedText = null;
    const selection = window.getSelection();
    selection.removeAllRanges();
  });

  span.addEventListener("mousemove", function (event) {
    if (isDragging) {
      event.target.style.position = "absolute";
      event.target.style.left = event.pageX + "px";
      event.target.style.top = event.pageY + "px";
    }
  });

  return span;
}

outputDiv.addEventListener("click", function (event) {
  if (event.ctrlKey) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    selection.removeAllRanges();
    selection.addRange(range);
    event.target.classList.toggle("selected");
  } else {
    const selection = window.getSelection();
    if (selection.toString() === event.target.textContent) {
      selection.removeAllRanges();
    }
  }
});

outputDiv.addEventListener("mouseup", function (event) {
  if (!event.ctrlKey) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      // Перевірка, чи є дійсний діапазон виділення
      const range = selection.getRangeAt(0);
      const text = range.extractContents();
      const span = createSpanWithDraggableText(text.textContent);
      outputDiv.appendChild(span);
      range.selectNode(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
});
