// Get references to the form
const form =document.getElementById('form') as HTMLFormElement;
const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
const resumeDisplayElement=document.getElementById('resume-display') as HTMLAreaElement;
const generateLinkButton = document.getElementById("generateLinkButton") as HTMLButtonElement;
const shareLinkInput = document.getElementById("ShareableLink") as HTMLInputElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const downloadButton=document.getElementById('download-button') as HTMLButtonElement;

//

form.addEventListener('submit',(event: Event)=>{
    event.preventDefault();//

    //collect value
    const name =(document.getElementById('name') as HTMLInputElement).value
    const email =(document.getElementById('email') as HTMLInputElement).value
    const phone =(document.getElementById('number') as HTMLInputElement).value
    const education =(document.getElementById('education') as HTMLInputElement).value
    const experience =(document.getElementById('experience') as HTMLInputElement).value
    const skills =(document.getElementById('skills') as HTMLInputElement).value
//  
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
//
const resumeData={
    name,
    email,
    phone,
    education,
    experience,
    skills
};


//

    const resumeHTML=`
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
    `

    //
    


    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }

downloadButton.addEventListener('click', ()=>{
    window.print()
});


window.addEventListener('DOMContentLoaded',()=>{
    const urlParams= new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if(username){
        const resumeData = JSON.parse(username);
        (document.getElementById('username') as HTMLInputElement).value = username;
        (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
        (document.getElementById('education') as HTMLTextAreaElement).value =resumeData.education;
        (document.getElementById('experience') as HTMLTextAreaElement).value =resumeData.experience;
        (document.getElementById('skills') as HTMLTextAreaElement).value =resumeData.skills;
    }
});

});

//

//Generate Resume Button
const updateButton = document.getElementById('create-button') as HTMLButtonElement | null;
const forms = document.getElementById('form') as HTMLFormElement | null;
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
document.getElementById("download-button")?.addEventListener("click", ()=>{
    window.print();
});


//Unique Link
function generateShareableLink(): void {
  const username = usernameInput.value.trim();

  if (username) {
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set("username", username);
    
    shareLinkInput.value = currentUrl.toString();
  } else {
    alert("Please enter a username for generate link.");
  }
}
generateLinkButton.addEventListener("click", generateShareableLink);