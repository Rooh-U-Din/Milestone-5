"use strict";
// Get references to the form
const form = document.getElementById('form');
const profilePictureInput = document.getElementById('profilePicture');
const resumeDisplayElement = document.getElementById('resume-display');
const generateLinkButton = document.getElementById("generateLinkButton");
const shareLinkInput = document.getElementById("ShareableLink");
const usernameInput = document.getElementById("username");
const downloadButton = document.getElementById('download-button');
// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Collect values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('number').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const about = document.getElementById('about').value;
    // Collect skills from the list (excluding the 'Remove' button text)
    const skillsList = document.getElementById('skills-list');
    const skills = Array.from(skillsList.children)
        .map(li => li.childNodes[0]?.textContent?.trim() || '');
    //
    // Handle profile picture
    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
    // Construct resume HTML
    const resumeHTML = `
    <link rel="stylesheet" href="styles.css">
    <div class="resume-container">
        
        <!-- Left Sidebar -->
        <div class="left-sidebar">
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture">` : ''}
            <h2>${name}</h2>
            <h3>Contact</h3>
            <p>📞 ${phone}</p>
            <p>📧 ${email}</p>
        </div>
        <!-- Right Main Content -->
        <div class="right-content">
            <h3>About</h3>
            <p contenteditable="true">${about}</p>

            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>

            <h3>Skills</h3>
            <ul>
                ${skills.map(skill => `<li>• ${skill}</li>`).join('')}
            </ul>
        </div>
    </div>
`;
    // Display resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
});
// Download Resume
downloadButton.addEventListener('click', () => {
    window.print();
});
// Generate Shareable Link
function generateShareableLink() {
    const username = usernameInput.value.trim();
    if (username) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("username", username);
        shareLinkInput.value = currentUrl.toString();
    }
    else {
        alert("Please enter a username to generate a link.");
    }
}
generateLinkButton.addEventListener("click", generateShareableLink);
// Add Skill Button
document.getElementById('add-skill-btn')?.addEventListener('click', function () {
    const skillInput = document.getElementById('skill-input');
    if (!skillInput)
        return;
    const skillValue = skillInput.value.trim();
    if (!skillValue)
        return;
    const skillsList = document.getElementById('skills-list');
    if (!skillsList)
        return;
    const li = document.createElement('li');
    li.textContent = skillValue;
    // Remove button for skill (only in input form, not in resume)
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.type = 'button';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
        skillsList.removeChild(li);
    });
    li.appendChild(removeBtn);
    skillsList.appendChild(li);
    // Clear the input field
    skillInput.value = '';
});
downloadButton.addEventListener('click', () => {
    const resumeElement = document.getElementById('resume-display');
    if (!resumeElement) {
        alert("Resume not found!");
        return;
    }
    // Open a new print window
    const printWindow = window.open('', '', 'width=800,height=900');
    if (!printWindow)
        return;
    // Get resume content (including styles)
    const resumeHTML = `
        <html>
        <head>
            <title>Download Resume</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                #resume-container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; background: white; }
                img { max-width: 120px; border-radius: 50%; display: block; margin: auto; }
                h3 { background: #555; color: white; padding: 8px; border-radius: 5px; }
                ul { padding-left: 20px; }
            </style>
        </head>
        <body>
            <div id="resume-container">
                ${resumeElement.innerHTML}
            </div>
            <script>
                window.onload = function() { window.print(); window.close(); }
            </script>
        </body>
        </html>
    `;
    // Write the resume content to the print window
    printWindow.document.open();
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
});
