var quill = new Quill('#editor', {
    theme: 'snow',
    history: {
        delay: 1000, // Changes within 1000ms are merged
        maxStack: 100, // Maximum size of the undo/redo stack
        userOnly: false // Tracks programmatic changes as well as user input
    },
    modules: {
        resize: {
            // set embed tags to capture resize
            embedTags: ["VIDEO", "IFRAME"],
            // custom toolbar
            tools: [
                "left",
                "center",
                "right",
                "full",
                "edit",
                {
                    text: "Alt",
                    verify(activeEle) {
                        return activeEle && activeEle.tagName === "IMG";
                    },
                    handler(evt, button, activeEle) {
                        let alt = activeEle.alt || "";
                        alt = window.prompt("Alt for image", alt);
                        if (alt == null) return;
                        activeEle.setAttribute("alt", alt);
                    },
                },
            ],
        },
        toolbar: '#toolbar-container',
    }
});