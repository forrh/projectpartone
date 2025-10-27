

// يجب أن يكون هذا السطر في أعلى ملف JavaScript
// Function to open the first modal (ngtesting category) automatically on page load
function openNgtestingCategoryModal() {
    document.getElementById('ngtesting-category-modal').style.display = 'flex';
}

// Function to close any modal by its ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}



        // دالة لاختيار رقم طلب وإخفاء القائمة المنسدلة
        function selectOrderNo(orderNumber) {
            document.getElementById('order-number-footer').value = orderNumber;
            document.getElementById('order-no-dropdown').style.display = 'none';
        }

        // دالة لتصفية عناصر القائمة المنسدلة بناءً على نص البحث
        function filterOrderNumbers(event) {
            const input = event.target;
            const filter = input.value.toUpperCase();
            const dropdown = document.getElementById('order-no-dropdown');
            const items = dropdown.getElementsByClassName('dropdown-item');

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const textValue = item.textContent || item.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            }
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
     const ngTestingTitle = document.getElementById('ngtesting-tab-title');
   

    if (ngTestingTitle) {
    
        ngTestingTitle.textContent = `Order ${newOrderCode}`;
    }

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
    
    // Populate date and received fields with current date/time
    const today = new Date();
    const formattedDateForInputs = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    document.getElementById('date-reported').value = formattedDateForInputs;
    document.getElementById('date-tested').value = formattedDateForInputs;
    document.getElementById('date-received').value = formattedDateForInputs;


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
  
    document.querySelector('.project-code-icons .fa-check').style.display = 'none';
    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'block';
}

// A dummy function for the Select button
    function applySelectedConfirmation() {
        // Here you would handle the selected confirmation items
        const selectedRows = document.querySelectorAll('.confirmation-table tbody tr.selected-row');
        
        // This part is crucial: if a row is selected, get the values from the first one
        if (selectedRows.length > 0) {
            const firstSelectedRow = selectedRows[0];
            const description = firstSelectedRow.cells[1].innerText;
            const confDate = firstSelectedRow.cells[3].innerText;
            const confirmationText = `${description} - ${confDate}`;
            const confirmationField = document.getElementById('confirmation');

            // Assuming 'confirmation' field exists in the main form
            if (confirmationField) {
                confirmationField.value = confirmationText;
                confirmationField.setAttribute('readonly', 'readonly');
                confirmationField.classList.add('readonly-input');
            }
            console.log("Confirmation applied successfully!");
            closeModal('confirmation-selection-modal');
        } else {
            console.log("Please select at least one item first.");
        }
    }

let selectedConfirmationRow = null;

function openConfirmationSelectionModal() {
    const confirmationField = document.getElementById('confirmation');
    if (!confirmationField.disabled) {
        document.getElementById('confirmation-selection-modal').style.display = 'flex';
    }
}

// Handles row selection and checkbox toggling
    function selectRow(clickedRow) {
        const clickedCheckbox = clickedRow.querySelector('.confirmation-checkbox');

        // Check if the clicked checkbox is now selected after the user's action
        const isSelected = clickedCheckbox.checked;

        // If a row is being selected, deselect all others first
        if (isSelected) {
            const allRows = document.querySelectorAll('#confirmation-table-body tr');
            allRows.forEach(row => {
                if (row !== clickedRow) {
                    const checkbox = row.querySelector('.confirmation-checkbox');
                    checkbox.checked = false;
                    row.classList.remove('selected-row');
                }
            });
        }
        
        // Now, update the clicked row's visual state
        if (isSelected) {
            clickedRow.classList.add('selected-row');
        } else {
            clickedRow.classList.remove('selected-row');
        }
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
        console.log("Confirmation applied successfully!");
    } else {
        console.log("Selection was not confirmed or no item was selected.");
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

 // ** كل الكود الخاص بمستمعات الأحداث مدمج هنا **
        document.addEventListener('DOMContentLoaded', () => {
   
 
            const searchInput = document.getElementById('order-search-input');
            const mainInput = document.getElementById('order-number-footer');
            const dropdown = document.getElementById('order-no-dropdown');
            const actionsBtn = document.getElementById('actions-btn');
            const actionsList = document.getElementById('actionDropdown');

            // ربط دالة التصفية بحدث الكتابة في حقل البحث داخل القائمة المنسدلة
            if (searchInput) {
                searchInput.addEventListener('keyup', filterOrderNumbers);
                // منع إعادة تحميل الصفحة عند الضغط على 'Enter'
                searchInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                });
            }

            // ربط دالة التصفية بحدث الكتابة في حقل إدخال رقم الطلب الرئيسي
            if (mainInput) {
                mainInput.addEventListener('keyup', (event) => {
                    // إظهار القائمة المنسدلة إذا لم تكن ظاهرة
                    if (dropdown.style.display === 'none') {
                        toggleOrderNoDropdown(event);
                    }
                    // تحديث محتوى حقل البحث بنفس النص المكتوب في الحقل الرئيسي
                    searchInput.value = mainInput.value;
                    // تنفيذ الفلترة
                    filterOrderNumbers(event);
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

  window.addEventListener('click', (e) => {
            const actionDropdown = document.getElementById('actionDropdown');
            const actionBtn = document.getElementById('actions-btn');
            if (actionDropdown && actionBtn && !actionBtn.contains(e.target) && !actionDropdown.contains(e.target)) {
                actionDropdown.classList.add('hidden');
            }
        });

        // إغلاق قائمة رقم الأمر عند الضغط خارجها
        window.addEventListener('click', (e) => {
            const dropdown = document.getElementById('order-no-dropdown');
            const iconBtn = document.querySelector('.icon-btn');
            if (dropdown && iconBtn && !dropdown.contains(e.target) && !iconBtn.contains(e.target) && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
      
// Function to toggle the "Actions" dropdown menu
function toggleActionDropdown(event) {
    if (event) {
        event.preventDefault(); // The crucial fix to prevent form submission
    }
    const dropdownMenu = document.getElementById('actionDropdown');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to handle the action when an item is clicked
function handleAction(action) {
    // Hide the dropdown menu
    document.getElementById('actionDropdown').style.display = 'none';
    
    // Show a message or perform an action based on the selection
    console.log(`Action selected: ${action}`);
    // You can add more complex logic here for each action.
}
// Updated filtering function
    function filterConfirmationTable() {
        const input = document.getElementById('confirmation-search-input');
        const filterText = input.value.toLowerCase();
        const tableBody = document.getElementById('confirmation-table-body');
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const descriptionCell = row.cells[1]; // C. Description is the 2nd cell (index 1)
            const stIdCell = row.cells[4];       // C. S/T ID is the 5th cell (index 4)

            if (descriptionCell || stIdCell) {
                const descriptionText = descriptionCell.textContent.toLowerCase();
                const stIdText = stIdCell.textContent.toLowerCase();

                // Show the row if the filter text is empty or if it matches either cell
                if (filterText === '' || descriptionText.includes(filterText) || stIdText.includes(filterText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    }
    
    
function preventReload(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
} 
// --- New Functionality: Enable/Disable Fields based on Send Sample Checkbox ---
const sendSampleCheckbox = document.getElementById('send-sample');
if (sendSampleCheckbox) {
    sendSampleCheckbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const minDensityInput = document.getElementById('min-density-g-cm3');
        const maxDensityInput = document.getElementById('max-density-g-cm3');
        const omcInput = document.getElementById('omc');
        const modInput = document.getElementById('mod-g-cm3');

        // Logic to enable/disable fields based on the checkbox state
        if (isChecked) {
            // If the checkbox is checked, enable Min/Max and disable MOD/OMC
            if (minDensityInput) minDensityInput.disabled = false;
            if (maxDensityInput) maxDensityInput.disabled = false;
            if (modInput) modInput.disabled = true;
            if (omcInput) omcInput.disabled = true;
        } else {
            // If the checkbox is not checked, disable Min/Max and enable MOD/OMC
            if (minDensityInput) minDensityInput.disabled = true;
            if (maxDensityInput) maxDensityInput.disabled = true;
            if (modInput) modInput.disabled = false;
            if (omcInput) omcInput.disabled = false;
        }
    });
}

// فتح النافذة
function openReportModal() {
    const modal = document.getElementById('report-modal');
    modal.style.display = 'block';
}

// إغلاق النافذة
function closeReportModal() {
    const modal = document.getElementById('report-modal');
    modal.style.display = 'none';
}

// تكبير النافذة (ملء الشاشة)
function maximizeModal() {
    const modal = document.getElementById('report-modal');
    modal.classList.add('maximized');
}

// تصغير النافذة (إعادة الحجم الأصلي)
function minimizeModal() {
    const modal = document.getElementById('report-modal');
    modal.classList.remove('maximized');
}

// Function to show the modal when the "Save" button is clicked
function saveFieldDensityData() {
    // 1. أظهر المودال
    const modal = document.getElementById('test-data-modal');
    if (modal) {
        modal.style.display = 'flex'; // أو 'block' حسب تصميم المودال
    }

    
}


