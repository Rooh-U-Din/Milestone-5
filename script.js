"use strict";
// Get references to the form
const form = document.getElementById('form');
const profilePictureInput = document.getElementById('profilePicture');
const resumeDisplayElement = document.getElementById('resume-display');
const generateLinkButton = document.getElementById("generateLinkButton");
const shareLinkInput = document.getElementById("ShareableLink");
const usernameInput = document.getElementById("username");
const downloadButton = document.getElementById('download-button');
//
form.addEventListener('submit', (event) => {
    event.preventDefault(); //
    //collect value
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('number').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    //  
    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
    //
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    //
    const resumeHTML = `
    <h2><b>Resume</b></h2>
    <div style="border: 1px solid;"></div>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 150px; height: 150px;">` : ''}
    <h3>Personal Information</h3>
    <p contenteditable="true"><b>Name:</b>${name}</p>
    <p><b>Email:</b>${email}</p>
    <p><b>Phone:</b>${phone}}</p>

    <h3>Education</h3>
    <p contenteditable="true">${education}>
    

    <h3>Experience</h3>
    <p contenteditable="true">${experience}>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}>
    `;
    //
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
    downloadButton.addEventListener('click', () => {
        window.print();
    });
    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        if (username) {
            const resumeData = JSON.parse(username);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    });
});
//
//Generate Resume Button
const updateButton = document.getElementById('create-button');
const forms = document.getElementById('form');
let isUpdated = false;
if (updateButton && forms) {
    updateButton.addEventListener('click', () => {
        const formIsValid = forms.checkValidity();
        if (formIsValid && !isUpdated) {
            updateButton.innerHTML = '<i class="bx bx-refresh"></i> Update Resume';
            isUpdated = true;
        }
    });
}
//Download Button
document.getElementById("download-button")?.addEventListener("click", () => {
    window.print();
});
//Unique Link
function generateShareableLink() {
    const username = usernameInput.value.trim();
    if (username) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("username", username);
        shareLinkInput.value = currentUrl.toString();
    }
    else {
        alert("Please enter a username for generate link.");
    }
}
generateLinkButton.addEventListener("click", generateShareableLink);
