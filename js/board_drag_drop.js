// Elemente auswählen
let draggableElement;
let containers;

// Dragstart Event-Handler
function dragStart(event) {
  // Speichern des referenzierten Elements
  draggableElement = event.target;
  // Speichern der ID des ursprünglichen Containers
  event.dataTransfer.setData("text/plain", event.target.parentNode.id);

  // Add the highlight class to the valid drop target containers
  containers.forEach((container) => {
    if (
      container !== event.target.parentNode &&
      container.classList.contains("valid-container")
    ) {
      container.classList.add("highlight");
    }
  });
}

// Dragend Event-Handler
function dragEnd(event) {
  // Remove the highlight class from all containers
  containers.forEach((container) => {
    container.classList.remove("highlight");
  });
}

// Dragover Event-Handler
function dragOver(event) {
  event.preventDefault();
}

// Drop Event-Handler
function drop(event) {
  event.preventDefault();
  const originalContainerId = event.dataTransfer.getData("text/plain");
  const currentContainer = event.target;

  if (currentContainer.classList.contains("valid-container")) {
    currentContainer.appendChild(draggableElement);
  } else {
    const originalContainer = document.getElementById(originalContainerId);
    originalContainer.appendChild(draggableElement);
  }

  // Remove the highlight class from all containers after dropping
  containers.forEach((container) => {
    container.classList.remove("highlight");
  });
}

setTimeout(() => {
  draggableElement = document.querySelector(".draggable");
  containers = document.querySelectorAll(".container");

  // Eventlistener für Dragstart hinzufügen
  containers.forEach((container) => {
    container.addEventListener("dragstart", dragStart);
  });

  // Eventlistener für Dragend hinzufügen
  draggableElement.addEventListener("dragend", dragEnd);

  // Eventlistener für Dragover und Drop hinzufügen
  containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("drop", drop);
  });
}, 1000);
