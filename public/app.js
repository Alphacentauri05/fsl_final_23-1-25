const strRegex =  /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const previewLeft = document.getElementById('previewLeft');
const previewRight = document.getElementById('previewRight');

const resumeTemplates = {
    standard: {
        left: {
            bgClass: 'bg-green text-white',
            sections: ['fullname', 'designation', 'about', 'skills']
        },
        right: {
            bgClass: 'bg-white',
            sections: ['achievements', 'educations', 'experiences', 'projects']
        }
    },
    modern: {
        left: {
            bgClass: 'bg-blue text-white',
            sections: ['fullname', 'summary', 'skills']
        },
        right: {
            bgClass: 'bg-light-blue',
            sections: ['projects', 'achievements', 'educations', 'experiences']
        }
    },
    minimalist: {
        left: {
            bgClass: 'bg-grey text-dark',
            sections: ['fullname', 'contact', 'skills']
        },
        right: {
            bgClass: 'bg-white',
            sections: ['summary', 'educations', 'experiences']
        }
    }
};

const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary;

let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; 
        for(let j = 0; j < elemsAttrsCount; j++){
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}
 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

/*const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}*/

const displayCV = (userData) => {
    const format = document.getElementById('resumeFormat').value;
    const template = resumeTemplates[format];

    if (template) {
        updateSectionContent(template.left.sections, userData);
        updateSectionContent(template.right.sections, userData);
    }
};


function updateSectionContent(sections, userData) {
    sections.forEach(section => {
        const sectionContainer = document.getElementById(`${section}_dsp`);
        if (!sectionContainer) return;

        switch (section) {
            case 'fullname':
                sectionContainer.innerText = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
                break;
            case 'designation':
                sectionContainer.innerText = userData.designation;
                break;
            case 'about':
                sectionContainer.innerText = `${userData.phoneno}\\n${userData.email}\\n${userData.address}`;
                break;
            case 'skills':
                showListData(userData.skills, sectionContainer);
                break;
            case 'achievements':
                showListData(userData.achievements, sectionContainer);
                break;
            case 'educations':
                showListData(userData.educations, sectionContainer);
                break;
            case 'experiences':
                showListData(userData.experiences, sectionContainer);
                break;
            case 'projects':
                showListData(userData.projects, sectionContainer);
                break;
            case 'summary':
                sectionContainer.innerText = userData.summary;
                break;
            case 'contact':
                sectionContainer.innerText = `${userData.email}\\n${userData.phoneno}`;
                break;
            default:
                break;
        }
    });
}

const generateCV = () => {
    const userData = getUserInputs();
    const format = document.getElementById('resumeFormat').value; // Get selected format
    //console.log(`Generating CV for format: ${format}`); // Debug log

    displayCV(userData);
    customizeResumePreview(format);
};


async function fetchSuggestions(field, query) {
    console.log(`Fetching suggestions for field: ${field}, query: ${query}`); // Debug input

    if (!query) {
        document.getElementById(`${field}Suggestions`).innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/suggestions?field=${field}&query=${query}`);
        //console.log('Fetch response:', response); // Debug response
        const suggestions = await response.json();
        //console.log('Suggestions:', suggestions); // Debug suggestions

        const suggestionsList = document.getElementById(`${field}Suggestions`);
        suggestionsList.innerHTML = ''; // Clear previous suggestions

        suggestions.forEach(suggestion => {
            const listItem = document.createElement('li');
            listItem.innerText = suggestion;
            listItem.onclick = () => {
                document.getElementById(`${field}Input`).value = suggestion;
                suggestionsList.innerHTML = ''; // Clear suggestions after selection
                generateCV(); // Update the resume preview
            };
            suggestionsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error); // Debug errors
    }
}

function handleFormatChange() {
    const format = document.getElementById('resumeFormat').value;
    console.log(`Selected format: ${format}`); // Debug log
    customizeResumePreview(format);
}

function customizeResumePreview(format) {
    const previewLeft = document.getElementById('previewLeft');
    const previewRight = document.getElementById('previewRight');

    if (format === 'standard') {
        // Add any specific elements or tweaks for the standard format
        previewLeft.style.borderRight = '2px solid #fff';
        previewRight.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    } else if (format === 'modern') {
        // Add specific elements or styling for the modern format
        previewLeft.style.borderRight = '4px solid #007BFF';
        previewRight.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    } else if (format === 'minimalist') {
        // Add specific elements or styling for the minimalist format
        previewLeft.style.borderRight = '1px dashed #333';
        previewRight.style.boxShadow = 'none'; // No shadow for a clean look
    }
}

function renderSections(sections, container) {
    container.innerHTML = '';
    sections.forEach(section => {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'preview-blk';

        const sectionTitle = document.createElement('h3');
        sectionTitle.innerText = capitalizeFirstLetter(section);
        sectionTitle.className = 'preview-blk-title';

        const sectionContent = document.createElement('div');
        sectionContent.className = `${section}-items preview-blk-list`;
        sectionContent.id = `${section}_dsp`;

        sectionElement.appendChild(sectionTitle);
        sectionElement.appendChild(sectionContent);
        container.appendChild(sectionElement);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}

function printCV(){
    window.print();
}