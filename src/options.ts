// Saves options to chrome.storage.sync.
function save_options() {
    var color = (document.getElementById("color") as HTMLInputElement).value;
    var likesColor = (document.getElementById("like") as HTMLInputElement).checked;
    chrome.storage.sync.set(
        {
            favoriteColor: color,
            likesColor: likesColor,
        },
        function () {
            // Update status to let user know options were saved.
            var status = document.getElementById("status");
            status.innerText = "Options saved.";
            setTimeout(function () {
                status.textContent = "";
            }, 750);
        }
    );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(
        {
            favoriteColor: "red",
            likesColor: true,
        },
        function (items: { favoriteColor; likesColor }) {
            (document.getElementById("color") as HTMLInputElement).value = items.favoriteColor;
            (document.getElementById("like") as HTMLInputElement).checked = items.likesColor;
        }
    );
}

document.getElementById("save").addEventListener("click", save_options);
document.addEventListener("DOMContentLoaded", restore_options);
