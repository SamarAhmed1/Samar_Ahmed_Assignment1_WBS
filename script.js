document.addEventListener("DOMContentLoaded", function () {

    //1. WELCOME MESSAGE
    // Show an alert when the page first loads
    alert("Welcome to my portfolio page!");


    //2. DARK MODE / LIGHT MODE TOGGLE
    // Inject a dark mode toggle button into the header
    const darkModeBtn = document.createElement("button");
    darkModeBtn.id = "darkModeBtn";
    darkModeBtn.textContent = "Dark Mode";
    darkModeBtn.style.cssText = `
        position: fixed;
        top: 14px;
        right: 18px;
        z-index: 999;
        padding: 8px 14px;
        background: #1a4e8c;
        color: #fff;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.85em;
        font-family: Georgia, serif;
    `;
    document.body.appendChild(darkModeBtn);

    // Add the dark mode styles once to the document
    const darkModeStyle = document.createElement("style");
    darkModeStyle.textContent = `
        body.dark-mode { background-color: #0d1b2a; color: #d0dde8; }
        body.dark-mode header { background-color: #0a1520; }
        body.dark-mode section { background-color: #122030; border-color: #1e3a55; }
        body.dark-mode section h2 { color: #88b8df; }
        body.dark-mode h3 { color: #a8cceb; }
        body.dark-mode footer { background-color: #0a1520; }
        body.dark-mode #darkModeBtn { background: #a8c8e8; color: #0d1b2a; }
    `;
    document.head.appendChild(darkModeStyle);

    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        // Swap the button label depending on current mode
        if (document.body.classList.contains("dark-mode")) {
            darkModeBtn.textContent = "Light Mode";
        } else {
            darkModeBtn.textContent = "Dark Mode";
        }
    });


    //3. SHOW / HIDE SECTIONS
    // Sections we want to make collapsible
    const togglableSections = ["skills", "projects", "achievements"];

    togglableSections.forEach(function (sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const heading = section.querySelector("h2");
        const sectionName = heading.textContent;

        // Wrap all content after the h2 in a collapsible div
        const content = document.createElement("div");
        content.classList.add("section-content");
        while (section.children.length > 1) {
            content.appendChild(section.children[1]);
        }
        section.appendChild(content);

        // Create and insert the toggle button right after the h2
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Hide " + sectionName;
        toggleBtn.style.cssText = `
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 5px 12px;
            background: #1a4e8c;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8em;
            font-family: Georgia, serif;
        `;
        heading.after(toggleBtn);

        toggleBtn.addEventListener("click", function () {
            const isVisible = content.style.display !== "none";
            content.style.display = isVisible ? "none" : "block";
            toggleBtn.textContent = isVisible ? "Show " + sectionName : "Hide " + sectionName;
        });
    });


    //4. DYNAMIC SKILLS LIST
    // Add an input + button at the bottom of the Skills section so the user can add new skills
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        const skillsList = skillsSection.querySelector("ul");

        const addSkillWrapper = document.createElement("div");
        addSkillWrapper.style.cssText = "margin-top: 14px; display: flex; gap: 8px; align-items: center;";

        const skillInput = document.createElement("input");
        skillInput.type = "text";
        skillInput.placeholder = "Enter a new skill...";
        skillInput.style.cssText = `
            flex: 1;
            padding: 6px 10px;
            border: 1px solid #c8d9ed;
            border-radius: 4px;
            font-family: Georgia, serif;
            font-size: 0.9em;
        `;

        const addSkillBtn = document.createElement("button");
        addSkillBtn.textContent = "Add Skill";
        addSkillBtn.style.cssText = `
            padding: 6px 12px;
            background: #1a4e8c;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85em;
            font-family: Georgia, serif;
        `;

        addSkillWrapper.appendChild(skillInput);
        addSkillWrapper.appendChild(addSkillBtn);
        skillsSection.appendChild(addSkillWrapper);

        function addSkill() {
            const newSkill = skillInput.value.trim();
            if (newSkill === "") return;

            const newItem = document.createElement("li");
            newItem.textContent = newSkill;
            skillsList.appendChild(newItem);

            skillInput.value = "";
            skillInput.focus();
        }

        addSkillBtn.addEventListener("click", addSkill);

        // Also allow pressing Enter to add a skill
        skillInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") addSkill();
        });
    }


    //5. INTERACTIVE PROJECT DETAILS
    // For each project article, add a "Show Details" button that reveals the bullet points
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
        const projectArticles = projectsSection.querySelectorAll("article");

        projectArticles.forEach(function (article) {
            const detailsList = article.querySelector("ul");
            if (!detailsList) return;

            // Hide the details by default
            detailsList.style.display = "none";

            const detailBtn = document.createElement("button");
            detailBtn.textContent = "Show Details";
            detailBtn.style.cssText = `
                margin-top: 6px;
                padding: 4px 10px;
                background: transparent;
                color: #1a4e8c;
                border: 1px solid #1a4e8c;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8em;
                font-family: Georgia, serif;
            `;

            article.insertBefore(detailBtn, detailsList);

            detailBtn.addEventListener("click", function () {
                const isHidden = detailsList.style.display === "none";
                detailsList.style.display = isHidden ? "block" : "none";
                detailBtn.textContent = isHidden ? "Hide Details" : "Show Details";
            });
        });
    }


    //6. CONTACT FORM WITH VALIDATION
    // Build a contact form and inject it into the contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        const formHTML = `
            <form id="contactForm" novalidate style="margin-top: 16px;">
                <div style="margin-bottom: 12px;">
                    <label for="contactName" style="display:block; margin-bottom:4px; font-size:0.9em; font-weight:bold;">Name</label>
                    <input type="text" id="contactName" placeholder="Your full name"
                        style="width:100%; padding:8px 10px; border:1px solid #c8d9ed; border-radius:4px; font-family:Georgia,serif; font-size:0.9em;" />
                    <span id="nameError" style="color:#c0392b; font-size:0.8em; display:none;">Name is required.</span>
                </div>

                <div style="margin-bottom: 12px;">
                    <label for="contactEmail" style="display:block; margin-bottom:4px; font-size:0.9em; font-weight:bold;">Email</label>
                    <input type="email" id="contactEmail" placeholder="your@email.com"
                        style="width:100%; padding:8px 10px; border:1px solid #c8d9ed; border-radius:4px; font-family:Georgia,serif; font-size:0.9em;" />
                    <span id="emailError" style="color:#c0392b; font-size:0.8em; display:none;">Please enter a valid email address.</span>
                </div>

                <div style="margin-bottom: 12px;">
                    <label for="contactMessage" style="display:block; margin-bottom:4px; font-size:0.9em; font-weight:bold;">Message</label>
                    <textarea id="contactMessage" rows="4" placeholder="Write your message here..."
                        style="width:100%; padding:8px 10px; border:1px solid #c8d9ed; border-radius:4px; font-family:Georgia,serif; font-size:0.9em; resize:vertical;"></textarea>
                    <span id="messageError" style="color:#c0392b; font-size:0.8em; display:none;">Message cannot be empty.</span>
                </div>

                <button type="submit"
                    style="padding:8px 18px; background:#1a4e8c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:0.9em; font-family:Georgia,serif;">
                    Send Message
                </button>

                <p id="formSuccess" style="color:#27ae60; margin-top:10px; font-size:0.9em; display:none;">
                    ✓ Message sent successfully! I'll get back to you soon.
                </p>
            </form>
        `;

        contactSection.insertAdjacentHTML("beforeend", formHTML);

        const form = document.getElementById("contactForm");
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name    = document.getElementById("contactName").value.trim();
            const email   = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            // Hide all errors and the success message before re-validating
            document.getElementById("nameError").style.display    = "none";
            document.getElementById("emailError").style.display   = "none";
            document.getElementById("messageError").style.display = "none";
            document.getElementById("formSuccess").style.display  = "none";

            let valid = true;

            if (name === "") {
                document.getElementById("nameError").style.display = "inline";
                valid = false;
            }

            // Simple email format check using a regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById("emailError").style.display = "inline";
                valid = false;
            }

            if (message === "") {
                document.getElementById("messageError").style.display = "inline";
                valid = false;
            }

            if (valid) {
                document.getElementById("formSuccess").style.display = "block";
                form.reset();
            }
        });
    }

});