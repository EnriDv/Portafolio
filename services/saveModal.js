
const saveModal = {
    showMessage(text, type) {
        const grayScale = {
            success: "#999",
            error: "#666",
            info: "#bbb",
            warning: "#777"
        };

        const backgroundColor = grayScale[type] || grayScale.info;

        const existingBox = document.getElementById("customMessageBox");
        if (existingBox) {
            document.body.removeChild(existingBox);
        }

        const box = document.createElement("div");
        box.id = "customMessageBox";
        box.style.position = "fixed";
        box.style.bottom = "20px";
        box.style.left = "50%";
        box.style.transform = "translateX(-50%)";
        box.style.padding = "10px 20px";
        box.style.backgroundColor = backgroundColor;
        box.style.color = "#fff";
        box.style.borderRadius = "8px";
        box.style.fontSize = "0.9rem";
        box.style.opacity = "0";
        box.style.transition = "opacity 0.3s ease";
        box.textContent = text;

        document.body.appendChild(box);

        setTimeout(() => {
            box.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            box.style.opacity = "0";
            setTimeout(() => {
                if (document.body.contains(box)) {
                    document.body.removeChild(box);
                }
            }, 300);
        }, 2500);
    }
};

export default saveModal;
