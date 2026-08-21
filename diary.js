var selectedIcon = undefined

function selectIcon(element) {
    element.classList.add("selected");
    selectIcon = element
}

function deselect(element) {
    element.classList.remove("selected");
    selectedIcon = undefined
}
 
function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(window)
    } else {
        selectIcon(element)
    }
}

dragElement(document.querySelector("#Diary"))
