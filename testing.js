// Function to open the first modal (ngtesting category) automatically on page load

function openNgtestingCategoryModal() {

    document.getElementById('ngtesting-category-modal').style.display = 'flex';

}



// Function to close any modal by its ID

function closeModal(modalId) {

    document.getElementById(modalId).style.display = 'none';

}



// Function to handle the category selection and show the main form and tab

function checkCategorySelection(category) {

    if (category === 'NG Testing') {

        closeModal('ngtesting-category-modal');

        document.getElementById('ngtesting-tab-header').style.display = 'flex';

        document.getElementById('ngtesting-content').style.display = 'block';

        document.getElementById('form-footer-buttons').style.display = 'flex';

        resetAndDisableForm();

    } else {

        console.log("Category selected is not NG Testing.");

    }

}



// Function to close only the main content and the tab header

function closeNgtestingTab() {

    if (event) {

        event.preventDefault();

    }

    document.getElementById('ngtesting-content').style.display = 'none';

    document.getElementById('ngtesting-tab-header').style.display = 'none';

    document.getElementById('form-footer-buttons').style.display = 'none';

    resetAndDisableForm();

}



function showSubTab(tabId) {

    const tabContents = document.querySelectorAll('.sub-tab-content');

    tabContents.forEach(content => {

        content.classList.remove('active-sub-tab-content');

    });



    const subTabs = document.querySelectorAll('.sub-tab');

    subTabs.forEach(tab => {

        tab.classList.remove('active-sub-tab');

    });



    const selectedTabContent = document.getElementById(tabId);

    if (selectedTabContent) {

        selectedTabContent.classList.add('active-sub-tab-content');

    }



    const selectedSubTab = document.querySelector(`[onclick="showSubTab('${tabId}')"]`);

    if (selectedSubTab) {

        selectedSubTab.classList.add('active-sub-tab');

    }

}



let currentOrderNumber = 1;

let isNewMode = false;



function generateSequentialCode(prefix) {

    const year = '25';

    const paddedNumber = String(currentOrderNumber).padStart(5, '0');

    currentOrderNumber++;

    return `${prefix}-${year}-${paddedNumber}`;

}



function enableForm() {

    if (event) {

        event.preventDefault();

    }

    isNewMode = true;

    var formElements = document.querySelectorAll('#ngtesting-content input, #ngtesting-content select, #ngtesting-content textarea');

    formElements.forEach(function(element) {

        element.removeAttribute('disabled');

        element.classList.remove('readonly-input');

    });



    const sampleTypeField = document.getElementById('sample-type');

    if (sampleTypeField) {

        sampleTypeField.removeAttribute('disabled');

    }



    const dropdownIcons = document.querySelectorAll('.input-with-icon .fa-caret-down');

    dropdownIcons.forEach(icon => {

        icon.style.pointerEvents = 'auto';

        icon.style.color = '#fff';

        icon.style.backgroundColor = '#007bff';

    });



    document.getElementById('save-btn').removeAttribute('disabled');

    document.getElementById('save-close-btn').removeAttribute('disabled');

    document.getElementById('actions-btn').removeAttribute('disabled');

    document.getElementById('create-report-btn').removeAttribute('disabled');

    document.getElementById('open-report-btn').removeAttribute('disabled');

    document.getElementById('open-pdf-btn').removeAttribute('disabled');

    document.getElementById('preview-btn').removeAttribute('disabled');



   // ** إنشاء الأرقام التسلسلية بالتنسيقات الجديدة **

    const newOrderCode = generateSequentialCode('AAM-NG-O');

    document.getElementById('order-no').value = newOrderCode;

    document.getElementById('order-no').setAttribute('readonly', 'true');

    document.getElementById('order-no').classList.add('readonly-input');



    const newSampleCode = newOrderCode.replace('AAM-NG-O', 'AAM-NG-S');

    document.getElementById('sample-no').value = newSampleCode;

    document.getElementById('sample-no').setAttribute('readonly', 'true');

    document.getElementById('sample-no').classList.add('readonly-input');

    

    const newReportCode = newOrderCode.replace('AAM-NG-O', 'AAM-NG-R');

    document.getElementById('report-no').value = newReportCode;

    document.getElementById('report-no').setAttribute('readonly', 'true');

    document.getElementById('report-no').classList.add('readonly-input');

    

    const now = new Date();

    const formattedDate = `${now.getFullYear().toString()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    document.getElementById('order-date').value = formattedDate;

    document.getElementById('order-date').setAttribute('readonly', 'true');

    document.getElementById('order-date').classList.add('readonly-input');



    const projectCodeField = document.getElementById('project-code');

    projectCodeField.removeAttribute('disabled');

    projectCodeField.value = '';



    const confirmationField = document.getElementById('confirmation');

    confirmationField.removeAttribute('disabled');

    confirmationField.value = '';



    openProjectCodeDropdown();

    projectCodeField.focus();



    document.querySelector('.project-code-icons .fa-search').style.display = 'block';

    document.querySelector('.project-code-icons .fa-check').style.display = 'block';

    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'none';

    

    // Add this code block to your enableForm() function



// Populate date and received fields with current date/time

const today = new Date();

const formattedDateForInputs = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

document.getElementById('date-reported').value = formattedDateForInputs;

document.getElementById('date-tested').value = formattedDateForInputs;

document.getElementById('date-received').value =  formattedDateForInputs;







    const labIcon = document.querySelector('#lab').closest('.input-with-icon').querySelector('.icon-btn');

    if (labIcon) {

        labIcon.setAttribute('onclick', 'openLabDropdown()');

        labIcon.style.pointerEvents = 'auto';

        labIcon.style.cursor = 'pointer';

    }



    const testTableElements = document.querySelectorAll('#test-table-body input, #test-table-body .icon-btn');

    testTableElements.forEach(element => {

        element.removeAttribute('disabled');

        element.style.pointerEvents = 'auto';

        element.style.cursor = 'pointer';

    });

}



function resetAndDisableForm() {

    isNewMode = false;

    var formElements = document.querySelectorAll('#ngtesting-content input, #ngtesting-content select, #ngtesting-content textarea');

    formElements.forEach(function(element) {

        element.setAttribute('disabled', 'true');

        element.value = '';

        element.classList.remove('readonly-input');

    });



    const sampleTypeField = document.getElementById('sample-type');

    if (sampleTypeField) {

        sampleTypeField.setAttribute('disabled', 'true');

        sampleTypeField.value = '';

    }

    

    const dropdownIcons = document.querySelectorAll('.input-with-icon .fa-caret-down');

    dropdownIcons.forEach(icon => {

        icon.style.pointerEvents = 'none';

    });



    const footerInput = document.getElementById('order-number-footer');

    if (footerInput) {

        footerInput.removeAttribute('disabled');

        footerInput.setAttribute('placeholder', '[EditValue is null]');

    }



    const footerIcon = document.querySelector('#order-number-footer').nextElementSibling;

    if (footerIcon && footerIcon.classList.contains('icon-btn')) {

        footerIcon.style.pointerEvents = 'auto';

        footerIcon.style.cursor = 'pointer';

    }



    document.getElementById('quantity').value = '0';

    document.getElementById('price').value = '0';

    document.getElementById('bulk-density').value = '0.000';

    document.getElementById('mean-weight').value = '0';

    document.getElementById('weight-before').value = '0';

    document.getElementById('discount').value = '0';

    document.getElementById('mod-g-cm3').value = '0.000';

    document.getElementById('omc').value = '0.00';

    document.getElementById('min-density-g-cm3').value = '0.000';

    document.getElementById('max-density-g-cm3').value = '0.000';



    document.getElementById('order-no').setAttribute('placeholder', '[EditValue is null]');

    document.getElementById('sample-no').setAttribute('placeholder', '[EditValue is null]');



    document.getElementById('save-btn').setAttribute('disabled', 'true');

    document.getElementById('save-close-btn').setAttribute('disabled', 'true');

    document.getElementById('actions-btn').setAttribute('disabled', 'true');

    document.getElementById('new-btn').removeAttribute('disabled');



    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'none';

    document.querySelector('.project-code-icons .fa-search').style.display = 'block';

    document.querySelector('.project-code-icons .fa-check').style.display = 'block';



    const labIcon = document.querySelector('#lab').closest('.input-with-icon').querySelector('.icon-btn');

    if (labIcon) {

        labIcon.removeAttribute('onclick');

        labIcon.style.pointerEvents = 'none';

        labIcon.style.cursor = 'default';

    }

}



function openLabDropdown() {

    const dropdown = document.getElementById('lab-dropdown');

    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';

}



function selectLab(locationName, department) {

    const labField = document.getElementById('lab');

    labField.value = `${locationName} (${department})`;

    document.getElementById('lab-dropdown').style.display = 'none';

}



function openProjectCodeDropdown() {

    const dropdown = document.getElementById('project-code-dropdown');

    dropdown.style.setProperty('display', 'block', 'important');

}



function selectProjectCode(code, projectNo, projectName, customerName) {

    document.getElementById('project-code').value = code;

    document.getElementById('project-no').value = projectNo;

    document.getElementById('project').value = projectName;

    document.getElementById('customer').value = customerName;

    document.getElementById('project-code-dropdown').style.display = 'none';

    document.querySelector('.project-code-icons .fa-search').style.display = 'none';

    document.querySelector('.project-code-icons .fa-check').style.display = 'none';

    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'block';

}



function applySelectedConfirmation() {

    if (event) {

        event.preventDefault();

    }

    if (selectedConfirmationRow) {

        const description = selectedConfirmationRow.cells[1].innerText;

        const confDate = selectedConfirmationRow.cells[3].innerText;

        const confirmationText = `${description} - ${confDate}`;

        const confirmationField = document.getElementById('confirmation');

        confirmationField.value = confirmationText;

        confirmationField.setAttribute('readonly', 'readonly');

        confirmationField.classList.add('readonly-input');

        console.log("Confirmation applied successfully!");

        closeModal('confirmation-selection-modal');

    } else {

        console.log("Please select an item first.");

    }

}



let selectedConfirmationRow = null;



function openConfirmationSelectionModal() {

    const confirmationField = document.getElementById('confirmation');

    if (!confirmationField.disabled) {

        document.getElementById('confirmation-selection-modal').style.display = 'flex';

    }

}



function selectRow(row) {

    const checkboxes = document.querySelectorAll('#confirmation-table-body .confirmation-checkbox');

    checkboxes.forEach(checkbox => {

        checkbox.checked = false;

        checkbox.closest('tr').classList.remove('selected-row');

    });

    const checkbox = row.querySelector('.confirmation-checkbox');

    checkbox.checked = true;

    row.classList.add('selected-row');

    selectedConfirmationRow = row;

}



function searchConfirmationTable() {

    const searchText = document.getElementById('confirmation-search-input').value.toLowerCase();

    const tableBody = document.getElementById('confirmation-table-body');

    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];

        const cells = row.getElementsByTagName('td');

        let found = false;

        const cDescription = cells[1].innerText.toLowerCase();

        const cStId = cells[4].innerText.toLowerCase();

        if (cDescription.includes(searchText) || cStId.includes(searchText)) {

            found = true;

        }

        if (found) {

            row.style.display = '';

        } else {

            row.style.display = 'none';

        }

    }

}



function showConfirmationPrompt() {

    const modalHtml = `

        <div id="confirmation-prompt-modal" class="modal-overlay">

            <div class="modal-content small-modal">

                <div class="modal-header">

                    <h3>Confirm Selection</h3>

                    <span class="close-btn" onclick="closeConfirmationPrompt()">&times;</span>

                </div>

                <div class="modal-body">

                    <p>Are you sure you want to apply this confirmation?</p>

                    <div class="modal-controls">

                        <button class="btn btn-success" onclick="confirmSelection(true)">Yes</button>

                        <button class="btn btn-danger" onclick="confirmSelection(false)">No</button>

                    </div>

                </div>

            </div>

        </div>

    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

}



function closeConfirmationPrompt() {

    const modal = document.getElementById('confirmation-prompt-modal');

    if (modal) {

        modal.remove();

    }

}



function confirmSelection(isConfirmed) {

    if (isConfirmed && selectedConfirmationRow) {

        const description = selectedConfirmationRow.children[1].innerText;

        const confDate = selectedConfirmationRow.children[3].innerText;

        const confirmationText = `${description} - ${confDate}`;

        const confirmationField = document.getElementById('confirmation');

        confirmationField.value = confirmationText;

        confirmationField.setAttribute('readonly', 'readonly');

        confirmationField.classList.add('readonly-input');

        alert("Confirmation applied successfully!");

    } else {

        alert("Selection was not confirmed or no item was selected.");

    }

    closeConfirmationPrompt();

}



function openDatePicker(event) {

    const input = event.target.closest('.input-with-icon').querySelector('.scheduled-input');

    if (input) {

        input.removeAttribute('disabled');

        if (typeof input.showPicker === 'function') {

            input.showPicker();

        } else {

            input.focus();

        }

    }

}



let currentTargetInput = null;



function closeAllDropdowns() {

    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {

        dropdown.style.display = 'none';

    });

}



// Generic function to open a specific dropdown

window.openDropdown = function(event, dropdownId) {

    event.stopPropagation(); // Prevents the document listener from immediately closing it

    closeAllDropdowns();

    const dropdown = document.getElementById(dropdownId);

    if (dropdown) {

        dropdown.style.display = 'block';

    }

};



// Generic function to select an item from any dropdown

function selectItem(fieldId, value) {

    const input = document.getElementById(fieldId);

    if (input) {

        input.value = value;

    }

    closeAllDropdowns();

}



window.selectDropdownItem = function(event) {

    if (currentTargetInput) {

        currentTargetInput.value = event.target.innerText;

    }

    closeAllDropdowns();

    currentTargetInput = null;

};



function toggleOrderNoDropdown() {

    const dropdown = document.getElementById('order-no-dropdown');

    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';

}



function selectOrderNo(value) {

    document.getElementById('order-number-footer').value = value;

    toggleOrderNoDropdown();

}



function openPaymentTermsDropdown() {

    const dropdown = document.getElementById('payment-terms-dropdown');

    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

}



function selectPaymentTerms(value) {

    const input = document.getElementById('payment-terms');

    input.value = value;

    document.getElementById('payment-terms-dropdown').style.display = 'none';

}



// Global state variables for managing dropdown visibility.

let isSampleTypeDropdownOpen = false;



function openSampleTypeDropdown() {

    const dropdown = document.getElementById('sample-type-dropdown');

    if (dropdown.style.display === 'block') {

        dropdown.style.display = 'none';

        isSampleTypeDropdownOpen = false;

    } else {

        dropdown.style.display = 'block';

        isSampleTypeDropdownOpen = true;

    }

}



function selectSampleType(value) {

    const input = document.getElementById('sample-type');

    input.value = value;

    const dropdown = document.getElementById('sample-type-dropdown');

    dropdown.style.display = 'none';

    isSampleTypeDropdownOpen = false;

}



// Document-level event listeners for overall functionality

document.addEventListener('DOMContentLoaded', () => {



    // --- Dropdown/List Functionality ---

    

    // Actions button functionality

    const actionsBtn = document.getElementById('actions-btn');

    const actionsList = document.getElementById('actions-list');

    

    if (actionsBtn && actionsList) {

        actionsBtn.addEventListener('click', () => {

            const isDisplayed = actionsList.style.display === 'block';

            actionsList.style.display = isDisplayed ? 'none' : 'block';

        });

    }



    // Event listener to handle all custom dropdowns and lists closing on outside clicks

    document.addEventListener('click', (event) => {

        // Handle all custom dropdowns closing

        const dropdownContainers = document.querySelectorAll('.custom-autocomplete-container');

        dropdownContainers.forEach(container => {

            const dropdown = container.querySelector('.custom-dropdown');

            if (dropdown && dropdown.style.display === 'block' && !container.contains(event.target)) {

                dropdown.style.display = 'none';

            }

        });

        

        // Handle the specific 'actions-list' closing

        if (actionsBtn && actionsList && !actionsBtn.contains(event.target) && !actionsList.contains(event.target)) {

            actionsList.style.display = 'none';

        }



        // Specific handling for Sample Type dropdown (if applicable)

        const sampleTypeContainer = document.querySelector('.form-group-with-icons:has(#sample-type)');

        const sampleTypeDropdown = document.getElementById('sample-type-dropdown');

        if (sampleTypeContainer && sampleTypeDropdown && isSampleTypeDropdownOpen && !sampleTypeContainer.contains(event.target)) {

            sampleTypeDropdown.style.display = 'none';

            isSampleTypeDropdownOpen = false;

        }

    });



    // --- Other Functionality ---

    

    // Handle number input controls

    document.addEventListener('click', function(event) {

        if (event.target.classList.contains('btn-increment')) {

            const input = event.target.closest('.number-input-wrapper').querySelector('input[type="number"]');

            if (input) input.stepUp();

        } else if (event.target.classList.contains('btn-decrement')) {

            const input = event.target.closest('.number-input-wrapper').querySelector('input[type="number"]');

            if (input) input.stepDown();

        }

    });

    

    // Initial form state and modal functions

    resetAndDisableForm();

    openNgtestingCategoryModal();



});



// Global functions (if needed)

window.handleAction = function(actionName) {

 console.log(`Action selected: ${actionName}`);

 // Your specific logic for each action goes here

};



window.openItemsModal = function(icon) {

    console.log('Opening Items modal...');

};
