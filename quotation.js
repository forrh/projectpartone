// quotation.js

// =====================================================================
// Global Variable for DataTables Instance
// This will hold the reference to your main DataTable
// =====================================================================
let quotationDataTable;
let quotationLinesDataTable; // DataTable instance for Quote Lines
let priceListDataTable;      // NEW: DataTable instance for Price List Modal
let lastQuotationNumbers = {
    'proposal_geotechnical': 1000,
    'proposal_material_testing': 2000
};

// =====================================================================
// DOM Element Cache
// This object holds references to all necessary DOM elements.
// Make sure the IDs in your HTML match these.
// =====================================================================
const DOM = {
    quotationModal: document.getElementById("quotationModal"),

    // --- Header Info Section ---
    quoteCategory: document.getElementById('quoteCategory'),
    showCategoryListBtn: document.getElementById('showCategoryListBtn'),
    categoryDropdown: document.getElementById('categoryDropdown'),
    quoteNo: document.getElementById('quoteNo'),
    quoteRev: document.getElementById('quoteRev'),
    quoteDate: document.getElementById('quoteDate'),
    quoteLegacyNo: document.getElementById('quoteLegacyNo'),
    quoteLegacyDate: document.getElementById('quoteLegacyDate'),
    quoteProjectDetails: document.getElementById('quoteProjectDetails'),
    quoteSubject: document.getElementById('quoteSubject'),

    // --- Project/Customer Info Section ---
    quoteProjectCodeInput: document.getElementById('quoteProjectCodeInput'), // هذا هو حقل إدخال كود المشروع
    projectCodeDropdown: document.getElementById('projectCodeDropdown'), // القائمة المنسدلة لأكواد المشاريع
    showProjectCodeListBtn: document.getElementById('showProjectCodeListBtn'), // زر إظهار قائمة أكواد المشاريع
    quoteCustomer: document.getElementById('quoteCustomer'), // حقل العميل (customer)
    quoteProject: document.getElementById('quoteProject'), // **تعديل**: هذا هو حقل "Project Name" في HTML

    // --- Contact Info Section (تعريفات موحدة ومُعدّلة بناءً على HTML) ---
    quoteContactFrom: document.getElementById('quoteContactFrom'), // حقل "From"
    showEmployeesListBtnEmployee: document.getElementById('showEmployeesListBtnEmployee'), // زر إظهار قائمة الموظفين (متعلق بـ From)
    employeeDropdown: document.getElementById('employeeDropdown'), // القائمة المنسدلة للموظفين (متعلق بـ From)

    quoteInquiry: document.getElementById('quoteInquiry'), // حقل "Inquiry"
    quoteContactPerson: document.getElementById('quoteContactPerson'), // حقل اسم جهة الاتصال (contact)
    contactPersonDropdown: document.getElementById('contactPersonDropdown'), // القائمة المنسدلة لجهة الاتصال
    showContactPersonListBtn: document.getElementById('showContactPersonListBtn'), // زر إظهار قائمة جهات الاتصال

    quoteContactTo: document.getElementById('quoteContactTo'), // حقل "To" (Textarea)
    quoteAttnTo: document.getElementById('quoteAttnTo'), // حقل "Attn. To"
    quoteAttnPos: document.getElementById('quoteAttnPos'), // حقل "Attn. Pos"
    quoteContactEmail: document.getElementById('quoteContactEmail'), // حقل بريد جهة الاتصال
    quoteContactMobile: document.getElementById('quoteContactMobile'), // حقل جوال جهة الاتصال

    // --- Terms and Other Controls Section ---
    quoteDiscount: document.getElementById('quoteDiscount'),
    quoteVAT: document.getElementById('quoteVAT'),
    quoteValidity: document.getElementById('quoteValidity'),
    quoteCurrency: document.getElementById('quoteCurrency'),
    quotePaymentTermsInput: document.getElementById('quotePaymentTermsInput'),
    showPaymentTermsListBtn: document.getElementById('showPaymentTermsListBtn'),
    paymentTermsDropdown: document.getElementById('paymentTermsDropdown'),
    quoteMethod: document.getElementById('quoteMethod'),
    quoteUseAltForm: document.getElementById('quoteUseAltForm'),

    // --- Additional Info Section ---
    quoteRemarks: document.getElementById('quoteRemarks'),
    quoteQuoteFile: document.getElementById('quoteQuoteFile'), // **تعديل**: استخدام ID الموجود في HTML
    quoteFileStatus: document.getElementById('quoteFileStatus'),
    quoteDeclined: document.getElementById('quoteDeclined'),
    quoteDeclinedMessage: document.getElementById('quoteDeclinedMessage'),

    // --- Buttons & Main Table Elements (لا تغيير هنا) ---
    newQuotationBtn: document.getElementById('newQuotationBtn'),
    // Financials for Header Tab
    financialTotalLines: document.getElementById('financialTotalLines'),
    financialDiscountAmount: document.getElementById('financialDiscountAmount'),
    financialTaxAmount: document.getElementById('financialTaxAmount'),
    financialGrandTotal: document.getElementById('financialGrandTotal'),
    quoteOverallStatus: document.getElementById('quoteOverallStatus'),
    quoteLastConfirmation: document.getElementById('quoteLastConfirmation'),
    quoteLastConfirmed: document.getElementById('quoteLastConfirmed'),

    // Financials for Quote Lines Tab
    linesFinancialTotalLines: document.getElementById('linesFinancialTotalLines'),
    linesFinancialDiscountAmount: document.getElementById('linesFinancialDiscountAmount'),
    linesFinancialTaxAmount: document.getElementById('linesFinancialTaxAmount'),
    linesFinancialGrandTotal: document.getElementById('linesFinancialGrandTotal'),
    linesQuoteOverallStatus: document.getElementById('linesQuoteOverallStatus'),
    linesQuoteLastConfirmation: document.getElementById('linesQuoteLastConfirmation'),
    linesQuoteLastConfirmed: document.getElementById('linesQuoteLastConfirmed'),

    // Header Tab Specific Buttons
    saveHeaderTabBtn: document.getElementById('saveHeaderTabBtn'),
    closeHeaderTabBtn: document.getElementById('closeHeaderTabBtn'),
    saveAndCloseHeaderTabBtn: document.getElementById('saveAndCloseHeaderTabBtn'),

    // Quote Lines Tab Specific Buttons
    saveLinesTabBtn: document.getElementById('saveLinesTabBtn'),
    closeLinesTabBtn: document.getElementById('closeLinesTabBtn'),
    saveAndCloseLinesTabBtn: document.getElementById('saveAndCloseLinesTabBtn'),

    // Main Quotation Table Elements
    masterCheckbox: document.getElementById('selectAllQuotations'),
    quotationTable: document.getElementById('quotationTable'),
    fixedPaginationContainer: document.getElementById('quotation-pagination-fixed-bottom'),

    // Quote Lines Table Elements
    quotationLinesTable: document.getElementById('quotationLinesTable'),
    selectAllLinesCheckbox: null, // Initialized dynamically by DataTables

    // Price List Modal Elements
    priceListModal: document.getElementById("priceListModal"),
    priceListTable: document.getElementById('priceListTable'),
    priceListTableBody: document.getElementById('priceListTableBody'),
    addSelectedItemsBtn: document.getElementById('addSelectedItemsBtn'),
    selectAllPriceListItems: null, // Initialized dynamically
    priceListSearchInput: document.getElementById('priceListSearchInput'),
    priceListFilterType: document.getElementById('priceListFilterType'),
    priceListFilterMethod: document.getElementById('priceListFilterMethod'),
    clearPriceListFiltersBtn: document.getElementById('clearPriceListFiltersBtn'),
    refreshPriceListBtn: document.getElementById('refreshPriceListBtn'),
    priceListResetButtonContainer: document.getElementById('priceListResetButtonContainer'),

    // Dynamically added elements (like PDF button from initializeDynamicDOMElements)
    generatePdfButton: null,
};

// =====================================================================
// Helper Functions
// =====================================================================

/**
 * Marks or unmarks a form field's label as required/missing.
 * @param {HTMLElement} inputElement - The input element to check.
 * @param {boolean} isRequired - True to mark as required missing, false to remove.
 */
function markRequiredField(inputElement, isRequired) {
    const formGroup = inputElement.closest('.form-grid-2-col, .form-grid-3-col, .form-grid-2-col-sidebar');
    let label;
    if (formGroup) {
        label = formGroup.querySelector(`label[for="${inputElement.id}"]`);
    } else {
        label = document.querySelector(`label[for="${inputElement.id}"]`);
    }

    if (label) {
        if (isRequired) {
            label.classList.add('required-field-missing');
        } else {
            label.classList.remove('required-field-missing');
        }
    }
}

/**
 * Displays a toast notification message.
 * @param {string} message - The message to display.
 * @param {'success'|'error'|'info'} type - Type of toast (influences color).
 */
function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer') || (() => {
        const div = document.createElement('div');
        div.id = 'toastContainer';
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.right = '20px';
        div.style.zIndex = '10000';
        document.body.appendChild(div);
        return div;
    })();

    const toast = document.createElement('div');
    toast.classList.add('toast-message', type);
    toast.textContent = message;
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.marginBottom = '10px';
    toast.style.color = 'white';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease-in-out';
    toast.style.cursor = 'pointer'; // Make it clickable to close

    if (type === 'success') {
        toast.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#f44336';
    } else if (type === 'info') {
        toast.style.backgroundColor = '#2196F3';
    }

    toastContainer.prepend(toast); // Add to top

    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Auto-hide after 3 seconds, or close on click
    const hideTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);

    toast.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    });
}


// =====================================================================
// Initialize Dynamic DOM Elements
// =====================================================================
function initializeDynamicDOMElements() {
    // Setup file input for quote file
    if (DOM.quoteQuoteFileInput) {
        DOM.quoteQuoteFileInput.setAttribute('type', 'file');
        DOM.quoteQuoteFileInput.setAttribute('id', 'hiddenQuoteFileInput'); // Ensure it has an ID
        DOM.quoteQuoteFileInput.style.display = 'none';

        const fileInputGroup = DOM.quoteQuoteFileText ? DOM.quoteQuoteFileText.closest('.file-input-group') : null;
        if (fileInputGroup) {
            fileInputGroup.appendChild(DOM.quoteQuoteFileInput);
        } else {
            console.error("File input group for quoteQuoteFile not found. Cannot append hidden file input.");
        }
    }

    // Create and append Generate PDF button
    const generatePdfButton = document.createElement('button');
    generatePdfButton.setAttribute('type', 'button');
    generatePdfButton.classList.add('btn', 'btn-secondary', 'ms-2');
    generatePdfButton.innerHTML = '<i class="fas fa-file-pdf"></i> Create PDF';

    if (DOM.quoteFileStatus) {
        const parentDivForButton = DOM.quoteFileStatus.parentElement;
        if (parentDivForButton) {
            parentDivForButton.appendChild(generatePdfButton);
            console.log("Create PDF button added next to File Status.");
        } else {
            console.error("Parent element for quoteFileStatus not found to append Create PDF button.");
        }
    } else {
        console.error("quoteFileStatus element not found, cannot place Create PDF button.");
    }
    DOM.generatePdfButton = generatePdfButton; // Store reference

    // Disable autocomplete for all modal inputs
    if (DOM.quotationModal) {
        const modalInputs = DOM.quotationModal.querySelectorAll('input, textarea, select');
        modalInputs.forEach(input => {
            input.setAttribute('autocomplete', 'off');
        });
        console.log("Autocomplete disabled for all modal input fields.");
    }

    // Select all lines checkbox reference (DataTables might create it later)
    // DOM.selectAllLinesCheckbox is handled when DataTable is initialized for lines
}


// =====================================================================
// Modal Functions
// =====================================================================

/**
 * Opens the quotation modal and sets the active tab to 'Quote Header'.
 * Resets the form for a new entry.
 */
function openQuotationModal() {
    if (DOM.quotationModal) {
        DOM.quotationModal.style.display = "block";
        openTab(null, 'headerTab'); // Open Header tab by default
        resetQuotationForm(); // Clear form fields when opening for a new entry
        // Clear any previous validation marks
        document.querySelectorAll('.required-field-missing').forEach(label => {
            label.classList.remove('required-field-missing');
        });
        console.log("Quotation modal opened.");
    } else {
        console.error("Quotation modal element not found.");
    }
}

/**
 * Closes the quotation modal.
 */
function closeQuotationModal() {
    if (DOM.quotationModal) {
        DOM.quotationModal.style.display = "none";
        // Clear any validation marks when closing
        document.querySelectorAll('.required-field-missing').forEach(label => {
            label.classList.remove('required-field-missing');
        });
        resetQuotationForm(); // Optionally reset form fields on close
        console.log("Quotation modal closed.");
    }
}

/**
 * Resets all input fields within the quotation modal to their default values.
 */
function resetQuotationForm() {
    // Quote Info Section
    if (DOM.quoteCategory) DOM.quoteCategory.value = '';
    if (DOM.quoteNo) DOM.quoteNo.value = '';
    if (DOM.quoteRev) DOM.quoteRev.value = '';
    
    // --- بداية التعديل: تعيين تاريخ اليوم الحالي لحقلي التاريخ ---
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    const formattedDate = `${year}-${month}-${day}`;

    // تعيين قيمة تاريخ الاقتباس
    if (DOM.quoteDate) {
        DOM.quoteDate.value = formattedDate;
    }
    // تعيين قيمة تاريخ الاستحقاق (إذا كان لديك حقل له)
    if (DOM.quoteDueDate) { 
        DOM.quoteDueDate.value = formattedDate;
    }
    // --- نهاية التعديل ---

    // --- بداية التعديل الجديد: مسح حقول المشروع والعميل ---
    if (DOM.quoteProjectCodeInput) DOM.quoteProjectCodeInput.value = ''; // مسح حقل Project Code Input
    // تأكد من مسح حقول اسم المشروع والعميل إذا كانت موجودة وتتأثر باختيار Project Code
    if (DOM.quoteProject) DOM.quoteProject.value = ''; // مسح حقل اسم المشروع (إن وجد)
    if (DOM.quoteCustomer) DOM.quoteCustomer.value = ''; // مسح حقل العميل (إن وجد)
    // --- نهاية التعديل الجديد ---

    if (DOM.quoteLegacyNo) DOM.quoteLegacyNo.value = '';
    if (DOM.quoteLegacyDate) DOM.quoteLegacyDate.value = '';
    // تم التعامل مع DOM.quoteCustomer أعلاه
    // تم التعامل مع DOM.quoteProject أعلاه
    if (DOM.quoteProjectDetails) DOM.quoteProjectDetails.value = '';
    if (DOM.quoteSubject) DOM.quoteSubject.value = '';

    // Contact Info Section
    if (DOM.quoteContactFrom) DOM.quoteContactFrom.value = '';
    if (DOM.quoteInquiry) DOM.quoteInquiry.value = '';
    if (DOM.quoteContactPerson) DOM.quoteContactPerson.value = '';
    if (DOM.quoteContactTo) DOM.quoteContactTo.value = '';
    if (DOM.quoteAttnTo) DOM.quoteAttnTo.value = '';
    if (DOM.quoteAttnPos) DOM.quoteAttnPos.value = '';

    // Terms and other Controls Section
    if (DOM.quoteDiscount) DOM.quoteDiscount.value = '';
    if (DOM.quoteVAT) DOM.quoteVAT.value = '15';
    if (DOM.quoteValidity) DOM.quoteValidity.value = '60';
    if (DOM.quoteCurrency) DOM.quoteCurrency.value = 'SAR';

    if (DOM.quotePaymentTermsInput) {
        DOM.quotePaymentTermsInput.value = '';
    }

    if (DOM.quoteMethod) DOM.quoteMethod.value = '';
    if (DOM.quoteUseAltForm) DOM.quoteUseAltForm.checked = false;

    // Additional Info Section
    if (DOM.quoteRemarks) DOM.quoteRemarks.value = '';
    if (DOM.quoteQuoteFileText) DOM.quoteQuoteFileText.value = '';
    if (DOM.quoteQuoteFileInput) {
        DOM.quoteQuoteFileInput.value = '';
    }
    if (DOM.quoteFileStatus) DOM.quoteFileStatus.value = 'PDF Not Created';
    if (DOM.quoteDeclined) DOM.quoteDeclined.checked = false;
    if (DOM.quoteDeclinedMessage) DOM.quoteDeclinedMessage.value = '';

    // Financials and Quote Status for Header Tab
    if (DOM.financialTotalLines) DOM.financialTotalLines.value = '0.000';
    if (DOM.financialDiscountAmount) DOM.financialDiscountAmount.value = '0.000';
    if (DOM.financialTaxAmount) DOM.financialTaxAmount.value = '0.000';
    if (DOM.financialGrandTotal) DOM.financialGrandTotal.value = '0.000';
    if (DOM.quoteOverallStatus) DOM.quoteOverallStatus.value = '';
    if (DOM.quoteLastConfirmation) DOM.quoteLastConfirmation.value = '';
    if (DOM.quoteLastConfirmed) DOM.quoteLastConfirmed.value = '';

    // Financials and Quote Status for Quote Lines Tab
    if (DOM.linesFinancialTotalLines) DOM.linesFinancialTotalLines.value = '0.000';
    if (DOM.linesFinancialDiscountAmount) DOM.linesFinancialDiscountAmount.value = '0.000';
    if (DOM.linesFinancialTaxAmount) DOM.linesFinancialTaxAmount.value = '0.000';
    if (DOM.linesFinancialGrandTotal) DOM.linesFinancialGrandTotal.value = '0.000';
    if (DOM.linesQuoteOverallStatus) DOM.linesQuoteOverallStatus.value = '';
    if (DOM.linesQuoteLastConfirmation) DOM.linesQuoteLastConfirmation.value = '';
    if (DOM.linesQuoteLastConfirmed) DOM.linesQuoteLastConfirmed.value = '';

    // Clear any validation marks
    document.querySelectorAll('.required-field-missing').forEach(label => {
        label.classList.remove('required-field-missing');
    });
}
/**
 * Handles tab switching within the quotation modal.
 * @param {Event | null} evt - The click event object, or null if called programmatically.
 * @param {string} tabId - The ID of the tab content to display (e.g., 'headerTab', 'linesTab').
 */
function openTab(evt, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    const targetTabContent = document.getElementById(tabId);
    if (targetTabContent) {
        targetTabContent.classList.add('active');
    } else {
        console.warn(`Tab content with ID '${tabId}' not found.`);
        return;
    }

    let targetTabButton;
    if (evt && evt.currentTarget) {
        targetTabButton = evt.currentTarget;
    } else {
        targetTabButton = document.querySelector(`.tab[data-tab-target="${tabId}"]`);
    }

    if (targetTabButton) {
        targetTabButton.classList.add('active');
    } else {
        console.warn(`Tab button for tab ID '${tabId}' not found.`);
    }

    // Initialize DataTables for the lines tab when it becomes active
    if (tabId === 'linesTab') {
        setTimeout(() => {
            initializeQuotationLinesDataTable(); // Ensure this function is defined elsewhere
            if (quotationLinesDataTable) {
                quotationLinesDataTable.columns.adjust().draw();
                console.log("Quotation Lines table columns adjusted after tab opened.");
            }
        }, 300); // Increased delay to 300ms
    }
}

// =====================================================================
// Tab-Specific Save & Close Functions
// =====================================================================

/**
 * Saves the quotation header data to the main table.
 * Keeps the modal open.
 * This is for the Header Tab's "Save Header" action.
 */
function saveQuotationHeader() {
    // Collect data from header fields (for demonstration)
    const quoteCategory = DOM.quoteCategory ? DOM.quoteCategory.value.trim() : '';
    const quoteNo = DOM.quoteNo ? DOM.quoteNo.value.trim() : '';
    const quoteCustomer = DOM.quoteCustomer ? DOM.quoteCustomer.value.trim() : '';
    const quoteProject = DOM.quoteProject ? DOM.quoteProject.value.trim() : '';
    const quoteContactFrom = DOM.quoteContactFrom ? DOM.quoteContactFrom.value.trim() : ''; // Get value for validation

    let isValid = true;

    // Validation for required fields
    if (!quoteCategory) {
        markRequiredField(DOM.quoteCategory, true);
        isValid = false;
    } else {
        markRequiredField(DOM.quoteCategory, false);
    }

    if (!quoteNo) {
        markRequiredField(DOM.quoteNo, true);
        isValid = false;
    } else {
        markRequiredField(DOM.quoteNo, false);
    }

    if (!quoteCustomer) {
        markRequiredField(DOM.quoteCustomer, true);
        isValid = false;
    } else {
        markRequiredField(DOM.quoteCustomer, false);
    }

    if (!quoteProject) {
        markRequiredField(DOM.quoteProject, true);
        isValid = false;
    } else {
        markRequiredField(DOM.quoteProject, false);
    }

    // NEW VALIDATION: Ensure quoteContactFrom is filled
    if (!quoteContactFrom) {
        markRequiredField(DOM.quoteContactFrom, true);
        isValid = false;
    } else {
        markRequiredField(DOM.quoteContactFrom, false);
    }
    // End NEW VALIDATION

    if (isValid) {
        // This function typically validates header fields and adds/updates a row in the main quotation DataTable.
        // Example: const savedSuccessfully = addQuotationToTable();
        // Assuming addQuotationToTable() is correctly implemented elsewhere.
        const savedSuccessfully = addQuotationToTable(); // Place holder: You need to implement this for your main table

        if (savedSuccessfully) {
            showToast("Quotation Header saved successfully!", "success");
            console.log("Quotation Header saved successfully. Modal remains open.");
        } else {
            // This 'else' would ideally be hit if addQuotationToTable() itself fails for other reasons
            showToast("Failed to save quotation header. Please check data.", "error");
            console.log("Quotation Header not saved due to an internal error or database issue.");
        }
    } else {
        showToast("Please fill in all required fields (marked with *)!", "error");
        console.log("Quotation Header not saved due to validation errors.");
    }
}

/**
 * Saves the quotation header data and closes the modal.
 * This is for the Header Tab's "Save Header & Close" action.
 */
function saveAndCloseQuotationHeader() {
    // This function will also perform validation via saveQuotationHeader() or similar logic
    // For simplicity, we can reuse the same validation logic.
    const quoteCategory = DOM.quoteCategory ? DOM.quoteCategory.value.trim() : '';
    const quoteNo = DOM.quoteNo ? DOM.quoteNo.value.trim() : '';
    const quoteCustomer = DOM.quoteCustomer ? DOM.quoteCustomer.value.trim() : '';
    const quoteProject = DOM.quoteProject ? DOM.quoteProject.value.trim() : '';
    const quoteContactFrom = DOM.quoteContactFrom ? DOM.quoteContactFrom.value.trim() : '';

    let isValid = true;

    if (!quoteCategory) { markRequiredField(DOM.quoteCategory, true); isValid = false; } else { markRequiredField(DOM.quoteCategory, false); }
    if (!quoteNo) { markRequiredField(DOM.quoteNo, true); isValid = false; } else { markRequiredField(DOM.quoteNo, false); }
    if (!quoteCustomer) { markRequiredField(DOM.quoteCustomer, true); isValid = false; } else { markRequiredField(DOM.quoteCustomer, false); }
    if (!quoteProject) { markRequiredField(DOM.quoteProject, true); isValid = false; } else { markRequiredField(DOM.quoteProject, false); }
    // NEW VALIDATION: Ensure quoteContactFrom is filled
    if (!quoteContactFrom) { markRequiredField(DOM.quoteContactFrom, true); isValid = false; } else { markRequiredField(DOM.quoteContactFrom, false); }
    // End NEW VALIDATION

    if (isValid) {
        // Assuming addQuotationToTable() is correctly implemented elsewhere.
        const savedSuccessfully = addQuotationToTable(); // Place holder: You need to implement this for your main table

        if (savedSuccessfully) {
            closeQuotationModal();
            showToast("Quotation Header saved and modal closed!", "success");
            console.log("Quotation Header saved successfully and modal closed.");
        } else {
            showToast("Failed to save quotation header. Please check data.", "error");
            console.log("Quotation Header not saved, modal remains open for corrections.");
        }
    } else {
        showToast("Please fill in all required fields (marked with *)!", "error");
        console.log("Quotation Header not saved due to validation errors.");
    }
}

/**
 * Saves/updates a quote line in the quotationLinesDataTable.
 * This function needs to be implemented to handle saving/updating lines.
 * For demonstration, it will just show a toast.
 */
function saveQuoteLines() {
    // In a real application, you would iterate through the changes in quotationLinesDataTable
    // or validate and save the current state of editable fields within the lines table.
    // Example: Loop through quotationLinesDataTable.rows().data() and send to backend.
    console.log("Attempting to save changes in Quote Lines table (simulated).");
    showToast("Quote Lines changes saved (simulated)!", "info");
}

/**
 * Saves/updates quote lines and closes the modal.
 */
function saveAndCloseQuoteLines() {
    saveQuoteLines(); // Call the save logic for lines
    closeQuotationModal();
    showToast("Quote Lines changes saved and modal closed (simulated)!", "success");
    console.log("Quote Lines changes saved and modal closed (simulated).");
}

/**
 * Toggles the selection of all checkboxes in the main quotation table.
 * @param {HTMLInputElement} masterCheckbox - The "select all" checkbox.
 */
function toggleSelectAllQuotations(masterCheckbox) {
    if (quotationDataTable) {
        quotationDataTable.$('tbody input[type="checkbox"]').each(function() {
            this.checked = masterCheckbox.checked;
        });
    } else {
        const checkboxes = document.querySelectorAll('#quotationTable tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = masterCheckbox.checked);
    }
}

/**
 * Global click handler for closing modals if clicked outside.
 */
window.onclick = function(event) {
    if (DOM.quotationModal && event.target === DOM.quotationModal) {
        closeQuotationModal();
    }
    if (DOM.priceListModal && event.target === DOM.priceListModal) {
        closePriceListModal(); // Assuming closePriceListModal is defined elsewhere
    }
}


// =====================================================================
// Dummy Data Retrieval Functions (for testing and demonstration)
// =====================================================================

function getEmployeesData() {
    return [
        { fullName: "Eng. Osama Mohammed ", title: "Project Manager" },
        { fullName: "Eng. Bassim Mohmed Elmaghribi", title: "Site Engineer" },
        { fullName: "Eng. Mahmoud Kazem Mohamed", title: "Site Engineer" },
        { fullName: "Eng. Zeyad Fouad al-OhuMuhammad", title: "Geology" },
    ];
}

// NEW: Dummy data for Price List with 'method'
function getPriceListData() {
    return [
        { id: '102218', name: 'Monitoring of fresh concrete', method: 'ASTM C39', unit: 'NO.', price: 22.00, priceOnly: false, quantity: 1, active: true },
        { id: '102220', name: 'Sampling of fresh concrete', method: 'ASTM C172', unit: 'NO.', price: 22.00, priceOnly: false, quantity: 1, active: true },
        { id: '102455', name: 'اختبار الخبوط', method: 'ASTM C143', unit: 'NO.', price: 100.00, priceOnly: false, quantity: 1, active: true },
        { id: '102459', name: 'اختبار مقاومة البري', method: 'ASTM C944', unit: 'NO.', price: 185.00, priceOnly: false, quantity: 1, active: true },
        { id: '102460', name: 'اختبار مقاومة الصدم', method: 'ASTM C1138', unit: 'Each', price: 200.00, priceOnly: false, quantity: 1, active: true },
        { id: '102462', name: 'الإحالة باستخدام كبريتات الصوديوم والمغنيسيوم', method: 'ASTM C88', unit: 'Each', price: 200.00, priceOnly: false, quantity: 1, active: true },
        { id: '102467', name: 'الاختصاص', method: 'N/A', unit: 'NO.', price: 80.00, priceOnly: false, quantity: 1, active: true },
        { id: '102461', name: 'النموذج العيني', method: 'N/A', unit: 'NO.', price: 130.00, priceOnly: false, quantity: 1, active: true },
        { id: '102469', name: 'التسربات العضوية', method: 'N/A', unit: 'NO.', price: 180.00, priceOnly: false, quantity: 1, active: true },
        { id: '102468', name: 'المعادن الرماد', method: 'N/A', unit: 'Each', price: 200.00, priceOnly: false, quantity: 1, active: true },
        { id: '102466', name: 'الوزن النوعي', method: 'N/A', unit: 'NO.', price: 75.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-001', name: 'Concrete Compressive Strength', method: 'ASTM C39', unit: 'NO.', price: 150.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-002', name: 'Cement Fineness Test', method: 'ASTM C204', unit: 'NO.', price: 10.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-003', name: 'Soil Proctor Test', method: 'ASTM D698', unit: 'Each', price: 25.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-004', name: 'Asphalt Content Test', method: 'ASTM D2172', unit: 'NO.', price: 28.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-005', name: 'Aggregate Sieve Analysis', method: 'ASTM C136', unit: 'NO.', price: 10.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-006', name: 'Water Absorption Test', method: 'ASTM C127', unit: 'NO.', price: 200.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-007', name: 'Density of Soil', method: 'ASTM D2937', unit: 'NO.', price: 10.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-008', name: 'Concrete Mix Design', method: 'ACI 211.1', unit: 'Each', price: 120.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-009', name: 'Rebar Tensile Test', method: 'ASTM A370', unit: 'NO.', price: 10.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-010', name: 'Block Compressive Strength', method: 'ASTM C140', unit: 'NO.', price: 100.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-011', name: 'Chemical Analysis of Water', method: 'APHA 4500', unit: 'NO.', price: 300.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-012', name: 'Bitumen ***** Test', method: 'ASTM D5', unit: 'Each', price: 35.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-013', name: 'Field Density Test (Sand Cone)', method: 'ASTM D1556', unit: 'NO.', price: 40.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-014', name: 'Pile Load Test', method: 'ASTM D1143', unit: 'NO.', price: 1500.00, priceOnly: false, quantity: 1, active: true },
        { id: 'LIMS-015', name: 'Soil Classification', method: 'ASTM D2487', unit: 'Each', price: 75.00, priceOnly: false, quantity: 1, active: true }
    ];
}

function initializeProjectCodeDropdown() {
    // 1. جلب عناصر DOM المطلوبة
    const projectCodeInputField = DOM.quoteProjectCodeInput;     // حقل إدخال رمز المشروع
    const projectCodeDropdown = DOM.projectCodeDropdown;           // حاوية القائمة المنسدلة (مثال: div)
    const showProjectCodeListBtn = DOM.showProjectCodeListBtn;    // زر فتح/إغلاق القائمة

    // التحقق الأساسي: التأكد من وجود جميع العناصر الضرورية
    if (!projectCodeInputField || !projectCodeDropdown || !showProjectCodeListBtn) {
        console.error("خطأ: لم يتم العثور على جميع عناصر DOM المطلوبة لقائمة رمز المشروع المنسدلة. الرجاء التحقق من الـ IDs التالية: quoteProjectCodeInput, projectCodeDropdown, showProjectCodeListBtn.");
        return; // إيقاف تنفيذ الدالة إذا كانت العناصر غير موجودة
    }

    // 2. بيانات المشاريع: هنا قائمة بمشاريع مختبرات هندسية (بيانات وهمية حالياً)
    // في تطبيق حقيقي، سيتم جلب هذه البيانات من خادم أو قاعدة بيانات
    const projectOptions = [
        { code: "GEO-001", name: "فحص تربة لمشروع مبنى سكني", customer: "شركة البناء الحديثة" },
        { code: "MAT-002", name: "اختبار جودة الخرسانة لمشروع جسر", customer: "المؤسسة الوطنية للمقاولات" },
        { code: "HYD-003", name: "تحليل عينات مياه لمشروع صرف صحي", customer: "أمانة مدينة الرياض" },
        { code: "STR-004", name: "اختبارات غير إتلافية لهيكل خرساني", customer: "الشركة العربية للمباني" },
        { code: "ASPH-005", name: "تحليل مكونات الأسفلت لمشروع طريق", customer: "إدارة الطرق والنقل" },
        { code: "LAB-006", name: "معايرة أجهزة مختبرية دورية", customer: "مختبر الجودة والتحليل" },
        { code: "GEO-007", name: "دراسات جيوتقنية لموقع صناعي", customer: "مجموعة الصناعات المتقدمة" },
        { code: "MAT-008", name: "اختبارات مقاومة شد للحديد", customer: "مصنع هياكل الحديد" },
        { code: "ENV-009", name: "فحص تلوث الهواء في منطقة صناعية", customer: "المركز البيئي الوطني" },
        { code: "CONS-010", name: "استشارات فنية لمشاكل التربة", customer: "مكتب المهندس الاستشاري" },
    ];

    /**
     * 3. دالة مساعدة: تقوم بعرض قائمة المشاريع داخل القائمة المنسدلة.
     * @param {Array} dataToRender - مصفوفة كائنات المشاريع المراد عرضها.
     */
    function renderProjectCodeDropdown(dataToRender) {
        projectCodeDropdown.innerHTML = ''; // مسح أي محتوى قديم داخل القائمة

        // *** بداية التعديل: إضافة صف الرأس ***
        const headerRow = document.createElement('div');
        headerRow.classList.add('custom-dropdown-header-row'); // استخدم نفس الفئة المخصصة في الـ CSS

        headerRow.innerHTML = `
            <span class="dropdown-column-code dropdown-column-name-header">Project Code</span>
            <span class="dropdown-column-name dropdown-column-name-header">Project Name </span>
            <span class="dropdown-column-customer dropdown-column-name-header">Customer</span>
        `;
        projectCodeDropdown.appendChild(headerRow);
        // *** نهاية التعديل: إضافة صف الرأس ***

        // إذا لم تكن هناك نتائج، اعرض رسالة مناسبة
        if (dataToRender.length === 0) {
            const noResultsItem = document.createElement('div');
            noResultsItem.classList.add('custom-dropdown-item', 'no-results'); // أضف فئة no-results للتنسيق
            noResultsItem.textContent = "لا توجد مشاريع متاحة.";
            projectCodeDropdown.appendChild(noResultsItem);
            projectCodeDropdown.style.display = 'block';
            return;
        }

        // إنشاء عنصر لكل مشروع وإضافته إلى القائمة المنسدلة
        dataToRender.forEach(project => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');

            // تصميم عرض العنصر داخل القائمة المنسدلة (الكود، الاسم، العميل)
            item.innerHTML = `
                <span class="dropdown-column-code">${project.code}</span>
                <span class="dropdown-column-name">${project.name}</span>
                <span class="dropdown-column-customer">${project.customer}</span>
            `;

            // حفظ بيانات المشروع كـ data attributes
            item.setAttribute('data-code', project.code);
            item.setAttribute('data-name', project.name);
            item.setAttribute('data-customer', project.customer);

            // إضافة مستمع حدث للنقر على كل عنصر مشروع
            item.addEventListener('click', function() {
                // تعبئة حقل إدخال رمز المشروع بالرمز المختار
                projectCodeInputField.value = project.code;
                projectCodeDropdown.style.display = 'none'; // إخفاء القائمة المنسدلة بعد الاختيار

                // إزالة أي علامات "حقل مطلوب" إذا كانت لديك دالة markRequiredField
                if (typeof markRequiredField === 'function') {
                    markRequiredField(projectCodeInputField, false);
                }

                // *** تعبئة الحقول المرتبطة: DOM.quoteProject و DOM.quoteCustomer ***
                // هذا الجزء يعبئ الحقلين تلقائيًا كما طلبت
                if (DOM.quoteProject) {
                    DOM.quoteProject.value = project.name;
                }
                if (DOM.quoteCustomer) {
                    DOM.quoteCustomer.value = project.customer;
                }
                console.log(`تم اختيار المشروع: ${project.code} - ${project.name} للعميل: ${project.customer}`);
            });
            projectCodeDropdown.appendChild(item); // إضافة العنصر إلى القائمة
        });

        projectCodeDropdown.style.display = 'block'; // إظهار القائمة بعد ملئها
    }

    // 4. إعداد مستمعات الأحداث الرئيسية للقائمة المنسدلة:

    // أ. مستمع لحدث النقر على حقل رمز المشروع لفتح/إغلاق القائمة
    projectCodeInputField.addEventListener('click', function() {
        if (projectCodeDropdown.style.display !== 'block') {
            renderProjectCodeDropdown(projectOptions); // عرض جميع المشاريع
        } else {
            projectCodeDropdown.style.display = 'none'; // إغلاق القائمة إذا كانت مفتوحة
        }
    });

    // ب. مستمع لحدث النقر على زر السهم لفتح/إغلاق القائمة
    showProjectCodeListBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // منع الحدث من الانتشار وإغلاق القائمة
        if (projectCodeDropdown.style.display === 'block') {
            projectCodeDropdown.style.display = 'none'; // إغلاق القائمة
        } else {
            renderProjectCodeDropdown(projectOptions); // فتح وعرض جميع المشاريع
            projectCodeInputField.focus(); // إعادة التركيز على حقل الإدخال
        }
    });

    // ج. مستمع لحدث النقر على المستند بأكمله لإغلاق القائمة إذا تم النقر خارجها
    document.addEventListener('click', function(event) {
        if (event.target !== projectCodeInputField &&
            event.target !== showProjectCodeListBtn &&
            !projectCodeDropdown.contains(event.target)) {
            projectCodeDropdown.style.display = 'none';
        }
    });

    // 5. الحالة الأولية: إخفاء القائمة المنسدلة عند التهيئة
    projectCodeDropdown.style.display = 'none';

    console.log("تم تهيئة قائمة رمز المشروع المنسدلة (وضع العرض فقط) بنجاح.");
}

// =====================================================================
// Custom Dropdown for 'From' field (Vanilla JavaScript)
// =====================================================================

function initializeEmployeeDropdown() {
    const employeeInputField = DOM.quoteContactFrom;
    const showEmployeesListButton = DOM.showEmployeesListBtnEmployee;
    const employeeDropdown = DOM.employeeDropdown;

    if (!employeeInputField || !showEmployeesListButton || !employeeDropdown) {
        // Corrected console.error message
        console.error("Required DOM elements for employee dropdown not found. Check IDs for quoteContactFrom, showEmployeesListBtnEmployee, employeeDropdown.");
        return;
    }

    const allEmployees = getEmployeesData();

    function renderEmployeeDropdown(dataToRender) {
        employeeDropdown.innerHTML = '';

        if (dataToRender.length === 0) {
            employeeDropdown.style.display = 'none';
            return;
        }

        const header = document.createElement('div');
        header.classList.add('custom-dropdown-header');
        header.innerHTML = `
            <span class="header-fullname">Employee Full Name</span>
            <span class="header-title">Employee Title</span>
        `;
        employeeDropdown.appendChild(header);

        dataToRender.forEach(employee => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');
            item.innerHTML = `
                <span class="employee-fullname">${employee.fullName}</span>
                <span class="employee-title">${employee.title}</span>
            `;
            item.addEventListener('click', function() {
                employeeInputField.value = employee.fullName;
                employeeDropdown.style.display = 'none';
                markRequiredField(employeeInputField, false);
            });
            employeeDropdown.appendChild(item);
        });

        employeeDropdown.style.display = 'block';
    }

    employeeInputField.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredData = allEmployees.filter(employee =>
            employee.fullName.toLowerCase().includes(searchTerm) ||
            employee.title.toLowerCase().includes(searchTerm)
        );
        renderEmployeeDropdown(filteredData);
        if (this.value.trim()) {
            markRequiredField(this, false);
        }
    });

    employeeInputField.addEventListener('focus', function() {
        renderEmployeeDropdown(allEmployees);
    });

    showEmployeesListButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (employeeDropdown.style.display === 'block') {
            employeeDropdown.style.display = 'none';
        } else {
            renderEmployeeDropdown(allEmployees);
            employeeInputField.focus();
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target !== employeeInputField &&
            event.target !== showEmployeesListButton &&
            !employeeDropdown.contains(event.target)) {
            employeeDropdown.style.display = 'none';
        }
    });

    employeeDropdown.style.display = 'none';
}



// =====================================================================
// Custom Dropdown for Payment Terms (Vanilla JavaScript)
// =====================================================================

function initializePaymentTermsDropdown() {
    const paymentTermsInputField = DOM.quotePaymentTermsInput;
    const paymentTermsDropdown = DOM.paymentTermsDropdown;
    const showPaymentTermsListBtn = DOM.showPaymentTermsListBtn;

    if (!paymentTermsInputField || !paymentTermsDropdown || !showPaymentTermsListBtn) {
        console.error("Required DOM elements for payment terms dropdown not found. Check IDs: quotePaymentTermsInput, paymentTermsDropdown, showPaymentTermsListBtn.");
        return;
    }

    const paymentTermsOptions = [
        { value: "D1 - Advance Payment", text: "D1 - Advance Payment: دفع مقدّم" },
        { value: "D2 - On Delivery", text: "D2 - On Delivery: الدفع عند التسليم" },
        { value: "D3 - Net 7 Days", text: "D3 - Net 7 Days: الدفع خلال 7 أيام من تاريخ الفاتورة" },
        { value: "D4 - Immediate", text: "D4 - Immediate: الدفع الفوري" },
        { value: "D5 - Net 30 Days", text: "D5 - Net 30 Days: الدفع خلال 30 يومًا من تاريخ الفاتورة" },
        { value: "D6 - Net 60 Days", text: "D6 - Net 60 Days: الدفع خلال 60 يومًا من تاريخ الفاتورة" },
        { value: "D7 - Against Progress Billing", text: "D7 - Against Progress Billing: الدفع مقابل فواتير مرحلية/تقدم العمل" },
        { value: "D8 - LC at Sight", text: "D8 - LC at Sight: اعتماد مستندي عند الإطلاع" },
        { value: "D9 - PDC (Post-Dated Cheque)", text: "D9 - PDC (Post-Dated Cheque): شيك مؤجل الدفع" },
        { value: "D10 - Bank Transfer", text: "D10 - Bank Transfer: تحويل بنكي" },
    ];

    function renderPaymentTermsDropdown(dataToRender) {
        paymentTermsDropdown.innerHTML = '';
        if (dataToRender.length === 0) {
            paymentTermsDropdown.style.display = 'none';
            return;
        }

        dataToRender.forEach(option => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');
            item.textContent = option.text;
            item.setAttribute('data-value', option.value);

            item.addEventListener('click', function() {
                paymentTermsInputField.value = option.text;
                paymentTermsDropdown.style.display = 'none';
                markRequiredField(paymentTermsInputField, false);
            });
            paymentTermsDropdown.appendChild(item);
        });

        paymentTermsDropdown.style.display = 'block';
    }

    paymentTermsInputField.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredTerms = paymentTermsOptions.filter(option =>
            option.text.toLowerCase().includes(searchTerm)
        );
        renderPaymentTermsDropdown(filteredTerms);
        if (this.value.trim()) {
            markRequiredField(this, false);
        }
    });

    paymentTermsInputField.addEventListener('focus', function() {
        renderPaymentTermsDropdown(paymentTermsOptions);
    });

    showPaymentTermsListBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        if (paymentTermsDropdown.style.display === 'block') {
            paymentTermsDropdown.style.display = 'none';
        } else {
            renderPaymentTermsDropdown(paymentTermsOptions);
            paymentTermsInputField.focus();
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target !== paymentTermsInputField &&
            event.target !== showPaymentTermsListBtn &&
            !paymentTermsDropdown.contains(event.target)) {
            paymentTermsDropdown.style.display = 'none';
        }
    });

    paymentTermsDropdown.style.display = 'none'; // Initially hidden
}

/**
 * Initializes the custom dropdown for the Category field.
 * Manages rendering options and handling selection for automatic quote number generation.
 */
/**
 * تقوم بتهيئة القائمة المنسدلة المخصصة لحقل "الفئة" (Category).
 * تدير عملية عرض الخيارات، ومعالجة أحداث النقر، والتحكم في الإغلاق عند النقر خارجها.
 */
 
 function initializeContactPersonDropdown() {
    // 1. جلب عناصر DOM المطلوبة
    const contactInputField = DOM.quoteContactPerson;
    const contactDropdown = DOM.contactPersonDropdown;
    const showContactListBtn = DOM.showContactPersonListBtn;

    // الحقول الإضافية التي ستُملأ (تأكد من مطابقة الـ IDs هنا مع HTML)
    const quoteContactToField = DOM.quoteContactTo;      // حقل "To:"
    const quoteAttnToField = DOM.quoteAttnTo;          // حقل "Attn. To:"
    const quoteAttnPosField = DOM.quoteAttnPos;        // حقل "Attn. Pos:"
    const quoteContactEmailField = DOM.quoteContactEmail; // حقل "Contact Email:"
    const quoteContactMobileField = DOM.quoteContactMobile; // حقل "Contact Mobile:"

    // التحقق الأساسي: التأكد من وجود جميع العناصر الضرورية
    if (!contactInputField || !contactDropdown || !showContactListBtn ||
        !quoteContactToField || !quoteAttnToField || !quoteAttnPosField ||
        !quoteContactEmailField || !quoteContactMobileField) {
        console.error("خطأ: لم يتم العثور على جميع عناصر DOM المطلوبة لقائمة جهة الاتصال المنسدلة. الرجاء التحقق من الـ IDs التالية: quoteContactPerson, contactPersonDropdown, showContactPersonListBtn, quoteContactTo, quoteAttnTo, quoteAttnPos, quoteContactEmail, quoteContactMobile.");
        return;
    }

    // 2. بيانات جهات الاتصال (مع أمثلةك: ابراهيم، رائد، خالد)
   const contactOptions = [
    { name: "ابراهيم", title: "Engineer", email: "ibrahim.eng@example.com", mobile: "051111111", location: "الرياض" },
    { name: "رائد", title: "Project Manager", email: "raed.pm@example.com", mobile: "055111111", location: "جدة" },
    { name: "خالد", title: "Technician", email: "kha.idch@example.com", mobile: "052222222", location: "الدمام" },
   
];

    /**
     * 3. دالة مساعدة: تقوم بعرض قائمة جهات الاتصال داخل القائمة المنسدلة.
     * @param {Array} dataToRender - مصفوفة كائنات جهات الاتصال المراد عرضها.
     */
    function renderContactDropdown(dataToRender) {
        contactDropdown.innerHTML = ''; // مسح أي محتوى قديم

        // إضافة صف الرأس (Headers)
        const headerRow = document.createElement('div');
        headerRow.classList.add('custom-dropdown-header-row');
        headerRow.innerHTML = `
            <span class="dropdown-column-contact-name dropdown-column-contact-name-header">Name</span>
            <span class="dropdown-column-contact-title dropdown-column-contact-title-header">Title</span>
            <span class="dropdown-column-contact-email dropdown-column-contact-email-header">Email</span>
            <span class="dropdown-column-contact-mobile dropdown-column-contact-mobile-header">Mobile</span>
            <span class="dropdown-column-contact-location dropdown-column-contact-location-header">Location</span>
        `;
        contactDropdown.appendChild(headerRow);

        // إذا لم تكن هناك نتائج، اعرض رسالة مناسبة
        if (dataToRender.length === 0) {
            const noResultsItem = document.createElement('div');
            noResultsItem.classList.add('custom-dropdown-item', 'no-results');
            noResultsItem.textContent = "لا توجد جهات اتصال متاحة.";
            contactDropdown.appendChild(noResultsItem);
            contactDropdown.style.display = 'block';
            return;
        }

        // إنشاء عنصر لكل جهة اتصال وإضافته إلى القائمة المنسدلة
        dataToRender.forEach(contact => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item');

            // تصميم عرض العنصر داخل القائمة المنسدلة
            item.innerHTML = `
                <span class="dropdown-column-contact-name">${contact.name}</span>
                <span class="dropdown-column-contact-title">${contact.title}</span>
                <span class="dropdown-column-contact-email">${contact.email}</span>
                <span class="dropdown-column-contact-mobile">${contact.mobile}</span>
                <span class="dropdown-column-contact-location">${contact.location}</span>
            `;

            // حفظ بيانات جهة الاتصال كـ data attributes
            item.setAttribute('data-name', contact.name);
            item.setAttribute('data-title', contact.title);
            item.setAttribute('data-email', contact.email);
            item.setAttribute('data-mobile', contact.mobile);
            item.setAttribute('data-location', contact.location);

            // إضافة مستمع حدث للنقر على كل عنصر جهة اتصال
            item.addEventListener('click', function() {
                // تعبئة حقل إدخال جهة الاتصال بالاسم المختار
                contactInputField.value = contact.name;
                contactDropdown.style.display = 'none'; // إخفاء القائمة المنسدلة بعد الاختيار

                // تعبئة الحقول الإضافية تلقائيًا
                if (quoteAttnToField) quoteAttnToField.value = contact.name;      // Attn. To: الاسم
                if (quoteAttnPosField) quoteAttnPosField.value = contact.title;  // Attn. Pos: الوظيفة
                if (quoteContactToField) quoteContactToField.value = `${contact.location} ${contact.email} `; 
                // *** نهاية التعديل ***
                if (quoteContactEmailField) quoteContactEmailField.value = contact.email; // Contact Email
                if (quoteContactMobileField) quoteContactMobileField.value = contact.mobile; // Contact Mobile

                // إزالة أي علامات "حقل مطلوب" إذا كانت لديك دالة markRequiredField
                if (typeof markRequiredField === 'function') {
                    markRequiredField(contactInputField, false);
                }

                console.log(`تم اختيار جهة الاتصال: ${contact.name} - ${contact.title}`);
            });
            contactDropdown.appendChild(item); // إضافة العنصر إلى القائمة
        });

        contactDropdown.style.display = 'block'; // إظهار القائمة بعد ملئها
    }

    // 4. إعداد مستمعات الأحداث الرئيسية للقائمة المنسدلة:

    // أ. مستمع لحدث الكتابة (input) على حقل جهة الاتصال للبحث/التصفية
    contactInputField.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredContacts = contactOptions.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.title.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.mobile.toLowerCase().includes(searchTerm) ||
            contact.location.toLowerCase().includes(searchTerm)
        );
        renderContactDropdown(filteredContacts);
        contactDropdown.style.display = 'block'; // للتأكد أن القائمة تظل مفتوحة أثناء الكتابة

        // إزالة علامة الحقل المطلوب عند الكتابة
        if (typeof markRequiredField === 'function') {
            markRequiredField(this, false);
        }
    });

    // ب. مستمع لحدث النقر على حقل جهة الاتصال لفتح/إغلاق القائمة (إذا لم تكن في وضع الكتابة)
    contactInputField.addEventListener('click', function() {
        if (contactDropdown.style.display !== 'block') {
            renderContactDropdown(contactOptions); // عرض جميع جهات الاتصال
        } else if (this.value.trim() === '') { // فقط إذا كان الحقل فارغًا، أعد إغلاقها بالنقر مرة أخرى
            contactDropdown.style.display = 'none';
        }
    });

    // ج. مستمع لحدث النقر على زر السهم لفتح/إغلاق القائمة
    showContactListBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // منع الحدث من الانتشار وإغلاق القائمة
        if (contactDropdown.style.display === 'block') {
            contactDropdown.style.display = 'none';
        } else {
            renderContactDropdown(contactOptions); // فتح وعرض جميع جهات الاتصال
            contactInputField.focus(); // إعادة التركيز على حقل الإدخال
        }
    });

    // د. مستمع لحدث النقر على المستند بأكمله لإغلاق القائمة إذا تم النقر خارجها
    document.addEventListener('click', function(event) {
        if (event.target !== contactInputField &&
            event.target !== showContactListBtn &&
            !contactDropdown.contains(event.target)) {
            contactDropdown.style.display = 'none';
        }
    });

    // 5. الحالة الأولية: إخفاء القائمة المنسدلة عند التهيئة
    contactDropdown.style.display = 'none';

    console.log("تم تهيئة قائمة جهة الاتصال المنسدلة بنجاح.");
}
function initializeCategoryDropdown() {
    // الحصول على عناصر DOM. تأكد من تهيئة كائن DOM بشكل صحيح في مكان آخر.
    const categoryInputField = DOM.quoteCategory; // حقل إدخال الفئة
    const showCategoryListButton = DOM.showCategoryListBtn; // زر إظهار القائمة المنسدلة
    const categoryDropdownList = DOM.categoryDropdown; // حاوية القائمة المنسدلة نفسها

    // تحقق أساسي: تأكد من العثور على جميع عناصر DOM المطلوبة قبل المتابعة.
    if (!categoryInputField || !showCategoryListButton || !categoryDropdownList) {
        console.error("لم يتم العثور على عناصر DOM المطلوبة للقائمة المنسدلة للفئة. يرجى التحقق من معرفات (IDs) 'quoteCategory', 'showCategoryListBtn', 'categoryDropdown'.");
        return; // الخروج من الدالة إذا كانت العناصر مفقودة.
    }

    // --- بداية التعديل الجديد: تعريف categoryOptions ---
    // مصفوفة خيارات الفئات. (يمكن تعريفها كـ const عامة في أعلى ملف JavaScript لسهولة الوصول إليها عالمياً)
    const categoryOptions = [
        { type: "AAM-GT", value: "proposal_geotechnical", text: "Proposal for Geotechnical" },
        { type: "AAM-MT", value: "proposal_material_testing", text: "Proposal for Material Testing" }
    ];
    // --- نهاية التعديل الجديد ---

    /**
     * تقوم بعرض خيارات الفئات داخل القائمة المنسدلة،
     * وتُظهرها في عمودين: 'النوع' (Type) و 'اسم الفئة' (Category Name).
     * @param {Array} optionsToRender - مصفوفة من كائنات الفئة {type, value, text}.
     */
    function renderCategoryDropdown(optionsToRender) {
        // 1. مسح أي محتوى موجود حالياً في القائمة المنسدلة لتجنب التكرار عند إعادة العرض.
        categoryDropdownList.innerHTML = '';

        // 2. إذا لم تكن هناك خيارات لعرضها، قم بإخفاء القائمة والخروج.
        if (optionsToRender.length === 0) {
            categoryDropdownList.style.display = 'none';
            return;
        }

        // --- بداية التعديل الجديد: إضافة صف الرأس للعمودين ---
        // 3. إنشاء وإلحاق صف الرأس لجدول القائمة المنسدلة (اختياري لكن موصى به للوضوح).
        const headerRow = document.createElement('div');
        headerRow.classList.add('custom-dropdown-header-row'); // إضافة فئة CSS لتنسيق الرأس.
        headerRow.innerHTML = `<div class="dropdown-column-type-header">theType </div><div class="dropdown-column-name-header">Category</div>`;
        categoryDropdownList.appendChild(headerRow);
        // --- نهاية التعديل الجديد ---

        // 4. المرور على كل خيار لإنشاء صفه الخاص في القائمة المنسدلة.
        optionsToRender.forEach(option => {
            const item = document.createElement('div');
            item.classList.add('custom-dropdown-item'); // إضافة فئة CSS لتنسيق صف العنصر.
            item.setAttribute('data-value', option.value); // تخزين قيمة البيانات الفعلية (مثلاً "proposal_geotechnical").

            // --- بداية التعديل الجديد: إنشاء وتعبئة عمودين لكل عنصر ---
            // إنشاء العمود الأول لـ 'النوع' (Type).
            const typeCol = document.createElement('div');
            typeCol.classList.add('dropdown-column-type'); // إضافة فئة CSS لتنسيق عمود 'النوع'.
            typeCol.textContent = option.type; // تعيين المحتوى إلى "AAM-GT" أو "AAM-MT".

            // إنشاء العمود الثاني لـ 'اسم الفئة' (Category Name).
            const nameCol = document.createElement('div');
            nameCol.classList.add('dropdown-column-name'); // إضافة فئة CSS لتنسيق عمود 'اسم الفئة'.
            nameCol.textContent = option.text; // تعيين المحتوى إلى "Proposal for Geotechnical" وما إلى ذلك.

            // إلحاق العمودين بصف العنصر.
            item.appendChild(typeCol);
            item.appendChild(nameCol);
            // --- نهاية التعديل الجديد ---

            // 5. إضافة مستمع حدث النقر لكل عنصر في القائمة المنسدلة.
            item.addEventListener('click', function() {
                // تحديث حقل الإدخال بالنص المقروء.
                categoryInputField.value = option.text;
                // تخزين قيمة الفئة الفعلية في خاصية بيانات مخصصة للمنطق الداخلي.
                categoryInputField.setAttribute('data-selected-value', option.value);
                // إخفاء القائمة المنسدلة بعد الاختيار.
                categoryDropdownList.style.display = 'none';
                // استدعاء الدالة لتوليد رقم الاقتباس بناءً على القيمة المختارة.
                generateQuotationNumber(option.value);

                // إذا كان لديك دالة لتحديد الحقول المطلوبة، قم بإلغاء التعليق عليها واستخدامها:
                // markRequiredField(categoryInputField, false);
            });

            // 6. إلحاق صف العنصر (الصف الذي يحتوي على الأعمدة) بحاوية القائمة المنسدلة.
            categoryDropdownList.appendChild(item);
        });

        // 7. أخيراً، جعل القائمة المنسدلة مرئية.
        categoryDropdownList.style.display = 'block';
    }

    // --- مستمعات الأحداث والحالة الأولية لهذه القائمة المنسدلة ---

    // 1. مستمع حدث النقر لزر تبديل القائمة المنسدلة (زر إظهار القائمة).
    showCategoryListButton.addEventListener('click', function(event) {
        event.stopPropagation(); // منع الحدث من الانتشار إلى مستمع النقر على المستند أدناه.

        if (categoryDropdownList.style.display === 'block') {
            categoryDropdownList.style.display = 'none'; // إذا كانت مرئية حالياً، قم بإخفائها.
        } else {
            renderCategoryDropdown(categoryOptions); // إذا كانت مخفية، قم بعرضها وإظهارها.
            // اختياري: تركيز على حقل الإدخال عند فتح القائمة المنسدلة:
            // categoryInputField.focus();
        }
    });

    // --- بداية التعديل الجديد: مستمع النقر على المستند والإخفاء الأولي الموحد ---
    // 2. مستمع حدث لإغلاق القائمة المنسدلة عند النقر في أي مكان خارجها.
    // يجب إضافة هذا المستمع مرة واحدة فقط أثناء التهيئة.
    document.addEventListener('click', function(event) {
        // التحقق مما إذا كان هدف النقر ليس حقل الإدخال، وليس زر التبديل،
        // وليس داخل القائمة المنسدلة نفسها.
        if (event.target !== categoryInputField &&
            event.target !== showCategoryListButton &&
            !categoryDropdownList.contains(event.target)) {
            categoryDropdownList.style.display = 'none'; // إخفاء القائمة المنسدلة.
        }
    });

    // 3. الحالة الأولية: التأكد من أن القائمة المنسدلة مخفية عند تحميل الصفحة لأول مرة.
    // يجب تنفيذ هذا السطر مرة واحدة أيضاً أثناء التهيئة.
    categoryDropdownList.style.display = 'none';
    // --- نهاية التعديل الجديد ---
}

/**
 * Generates a unique quotation number based on the selected category.
 * Updates the 'Quote No.' input field (DOM.quoteNo).
 * @param {string} categoryValue - The value of the selected category (e.g., 'proposal_geotechnical').
 */
function generateQuotationNumber(categoryValue) {
    if (!categoryValue) {
        DOM.quoteNo.value = '';
        return;
    }

    let prefix = '';
    let lastNum = 0;

    switch (categoryValue) {
        case 'proposal_geotechnical':
            prefix = 'GT';
            lastNum = lastQuotationNumbers.proposal_geotechnical;
            break;
        case 'proposal_material_testing':
            prefix = 'MT';
            lastNum = lastQuotationNumbers.proposal_material_testing;
            break;
        default:
            DOM.quoteNo.value = '';
            console.warn(`Unknown category selected: ${categoryValue}`);
            return;
    }

    const nextNum = lastNum + 1;
    const formattedNum = String(nextNum).padStart(4, '0');

    if (categoryValue === 'proposal_geotechnical') {
        lastQuotationNumbers.proposal_geotechnical = nextNum;
    } else if (categoryValue === 'proposal_material_testing') {
        lastQuotationNumbers.proposal_material_testing = nextNum;
    }

    DOM.quoteNo.value = `${prefix}-${formattedNum}`;
    console.log(`Generated Quotation Number: ${DOM.quoteNo.value} for category: ${categoryValue}`);
}


// =====================================================================
// Functions for File Handling and PDF Generation
// =====================================================================

function handleQuoteFileSelection() {
    if (DOM.quoteQuoteFileInput && DOM.quoteQuoteFileInput.files.length > 0) {
        const fileName = DOM.quoteQuoteFileInput.files[0].name;
        if (DOM.quoteQuoteFileText) DOM.quoteQuoteFileText.value = fileName;
        if (DOM.quoteFileStatus) DOM.quoteFileStatus.value = 'File Attached';
        console.log("File selected:", fileName);
    } else {
        if (DOM.quoteQuoteFileText) DOM.quoteQuoteFileText.value = '';
        if (DOM.quoteFileStatus) DOM.quoteFileStatus.value = 'No File Selected';
        console.log("No file selected.");
    }
}

function generateQuotationPdf() {
    if (DOM.quoteFileStatus) {
        DOM.quoteFileStatus.value = 'PDF Generated';
        console.log("Simulating PDF generation. Status updated to 'PDF Generated'.");
        showToast("PDF Generation Initiated (simulated).", "info");
    } else {
        console.error("File status element not found.");
    }
}

// =====================================================================
// Event Listeners Setup
// Combines dynamic DOM event listeners and new tab button listeners
// =====================================================================
function setupEventListeners() {
    // General Modal Open Button
    
    if (DOM.newQuotationBtn) {
        DOM.newQuotationBtn.addEventListener('click', openQuotationModal);
    }

    // File Input and PDF Button
    if (DOM.quoteQuoteFileBtn) {
        DOM.quoteQuoteFileBtn.addEventListener('click', function() {
            if (DOM.quoteQuoteFileInput) {
                DOM.quoteQuoteFileInput.click();
            }
        });
    }

    if (DOM.quoteQuoteFileInput) {
        DOM.quoteQuoteFileInput.addEventListener('change', handleQuoteFileSelection);
    }

    if (DOM.generatePdfButton) {
        DOM.generatePdfButton.addEventListener('click', generateQuotationPdf);
    }

    // Main Quotation Table Select All Checkbox
    if (DOM.masterCheckbox) {
        DOM.masterCheckbox.addEventListener('change', function() {
            toggleSelectAllQuotations(this);
        });
    }

    // Header Tab Specific Buttons
    if (DOM.saveHeaderTabBtn) {
        DOM.saveHeaderTabBtn.addEventListener('click', saveQuotationHeader);
    }
    if (DOM.closeHeaderTabBtn) {
        DOM.closeHeaderTabBtn.addEventListener('click', closeQuotationModal);
    }
    if (DOM.saveAndCloseHeaderTabBtn) {
        DOM.saveAndCloseHeaderTabBtn.addEventListener('click', saveAndCloseQuotationHeader);
    }

    // Quote Lines Tab Specific Buttons
    if (DOM.saveLinesTabBtn) {
        DOM.saveLinesTabBtn.addEventListener('click', saveQuoteLines);
    }
    if (DOM.closeLinesTabBtn) {
        DOM.closeLinesTabBtn.addEventListener('click', closeQuotationModal);
    }
    if (DOM.saveAndCloseLinesTabBtn) {
        DOM.saveAndCloseLinesTabBtn.addEventListener('click', saveAndCloseQuoteLines);
    }

    // Price List Modal Button (assuming openPriceListModal is defined elsewhere)
    // You might have a button to open the price list modal, e.g.:
    // if (DOM.openPriceListBtn) {
    //     DOM.openPriceListBtn.addEventListener('click', openPriceListModal);
    // }
    if (DOM.addSelectedItemsBtn) {
        DOM.addSelectedItemsBtn.addEventListener('click', function() {
            // This function would typically be in priceList.js or a related file
            // addSelectedPriceListItemsToQuoteLines(priceListDataTable);
            console.log("Add Selected Items button clicked.");
            showToast("Items added (simulated)!", "success");
            // Example:
            // addSelectedItemsToQuoteLines(quotationLinesDataTable, priceListDataTable);
        });
    }

    console.log("All event listeners setup.");
}

// =====================================================================
// Document Ready and Initialization
// =====================================================================

 


// =====================================================================
// Placeholder/Assumed External Functions (Implement these as needed)
// =====================================================================
function initializeQuotationDataTable() {
    if (DOM.quotationTable && !$.fn.DataTable.isDataTable(DOM.quotationTable)) {
        quotationDataTable = $(DOM.quotationTable).DataTable({
            "scrollX": true, // تفعيل التمرير الأفقي للجدول الرئيسي
            "autoWidth": false, 
            "autoWidth": true, // العودة إلى العرض التلقائي للجدول الرئيسي
            "paging": true, // تفعيل التقسيم لصفحات
            "searching": true, // تفعيل البحث العام
            "ordering": true, // تفعيل الفرز حسب الأعمدة
            "info": true, // إظهار معلومات الجدول (عدد الصفوف، الصفحات)
            "scrollCollapse": true, // يساعد DataTables في إدارة مناطق التمرير للجدول الرئيسي
            // 'l': مربع تغيير عدد الإدخالات، 'f': مربع الفلترة/البحث، 't': الجدول، 'i': معلومات الجدول، 'p': الترقيم
            "dom": '<"top"lf>rt<"bottom"ip>', // وضع مربع البحث وتغيير الطول على سطر واحد في الأعلى
            "initComplete": function(settings, json) {
                // نقل عناصر معلومات DataTables والترقيم إلى الحاوية الثابتة
                if (DOM.fixedPaginationContainer) {
                    const api = this.api(); // الحصول على نسخة DataTables API
                    const wrapper = $(api.table().container()); // الحصول على عنصر div الغلاف للجدول

                    const infoElement = wrapper.find('.dataTables_info'); // عنصر المعلومات
                    const paginateElement = wrapper.find('.dataTables_paginate'); // عنصر الترقيم

                    // مسح أي محتوى موجود مسبقًا في الحاوية الثابتة أولاً
                    DOM.fixedPaginationContainer.innerHTML = '';

                    infoElement.appendTo(DOM.fixedPaginationContainer); // نقل معلومات الجدول
                    paginateElement.appendTo(DOM.fixedPaginationContainer); // نقل الترقيم
                    console.log("Main table pagination moved to fixed bottom bar.");
                } else {
                    console.error("Fixed pagination container 'quotation-pagination-fixed-bottom' not found.");
                }
            },
            "responsive": false, // تعطيل الاستجابة التلقائية لتجنب مشاكل العرض مع scrollX
            "pagingType": "full_numbers", // إظهار أزرار الأول، السابق، التالي، الأخير
            // تعيين لغة DataTables إلى الإنجليزية (كما في الكود الأصلي)
            "language": {
                "processing": "Processing...",
                "search": "Search:",
                "lengthMenu": "Show _MENU_ entries",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "Showing 0 to 0 of 0 entries",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "loadingRecords": "Loading records...",
                "zeroRecords": "No matching records found",
                "emptyTable": "No data available in table",
                "paginate": {
                    "first": "First",
                    "previous": "Previous",
                    "next": "Next",
                    "last": "Last"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            // =====================================================================
            // ** تعريف الأعمدة (Columns Definition) - تم إزالة 'title' لمعظم الأعمدة **
            // =====================================================================
            "columns": [
                {
                    "data": null, // هذا العمود لا يرتبط ببيانات مباشرة، بل بخانة اختيار
                    // نحتفظ بـ 'title' هنا لأنه يحتوي على HTML مخصص لعنوان العمود
                    "title": '<input type="checkbox" onclick="toggleSelectAllQuotations(this)" id="selectAllQuotations" />',
                    "orderable": false, // لا يمكن فرز هذا العمود
                    "searchable": false, // لا يمكن البحث في هذا العمود
                    "defaultContent": '<input type="checkbox" class="select-row-checkbox"/>' // خانة اختيار لكل صف
                },
                // لبقية الأعمدة، سنقوم فقط بتحديد خاصية 'data'
                // DataTables سيستخدم العناوين الموجودة في صف <th> الأول في HTML
                { "data": "category" },
                { "data": "quoteNo" },
                { "data": "rev" },
                { "data": "quoteDate" },
                { "data": "projectCode" },
                { "data": "legacyNo" },
                { "data": "legacyDate" },
                { "data": "customer" },
                { "data": "projectName" },
                { "data": "projectDetails" },
                { "data": "subject" },
                { "data": "from" },
                { "data": "inquiry" },
                { "data": "contact" },
                { "data": "to" },
                { "data": "attnTo" },
                { "data": "attnPos" },
                { "data": "discount", "className": "dt-body-right" }, // لمحاذاة الأرقام لليمين
                { "data": "vat", "className": "dt-body-right" },
                { "data": "validity", "className": "dt-body-right" },
                { "data": "currency" },
                { "data": "paymentTerms" },
                { "data": "method" },
                { "data": "remarks" },
                { "data": "quoteFile" },
                { "data": "fileStatus" },
                {
                    "data": "declined", // هذا العمود يعرض قيمة منطقية (true/false)
                    "render": function(data, type, row) {
                        // يعرض "Yes" أو "No" بناءً على قيمة declined
                        return data ? 'Yes' : 'No';
                    }
                },
                { "data": "declinedMessage" }
                // إذا كان لديك عمود لـ "Actions" (مثل أزرار التعديل/الحذف)، أضفه هنا:
                // {
                //     "data": null,
                //     "title": "Actions", // يمكن ترك 'title' هنا لأنه عمود غير موجود في HTML الأصلي
                //     "orderable": false,
                //     "searchable": false,
                //     "render": function(data, type, row) {
                //         return `<button class="btn btn-sm btn-info edit-quote-btn" data-id="${row.id}">Edit</button>
                //                 <button class="btn btn-sm btn-danger delete-quote-btn" data-id="${row.id}">Delete</button>`;
                //     }
                // }
            ]
            // =====================================================================
        });

        // هذا الجزء من الكود لربط فلاتر البحث لكل عمود:
        // انتبه: الفهرس 'i' هنا يمثل فهرس حقل الإدخال في صف الفلتر (filter-row).
        // بما أن العمود الأول في HTML (خانة الاختيار) لا يحتوي على input فلتر في صف الفلتر،
        // فإن أول input (فهرس i=0) يقابل العمود الثاني في DataTables (فهرس 1) وهكذا.
        $('#quotationTable thead tr.filter-row input').each(function(i) {
            // نستخدم i + 1 لأن أول input filter يقابل العمود الثاني في DataTables
            // (العمود الأول هو خانة الاختيار التي لا تحتوي على input filter)
            var targetColumnIndex = i + 1;
            var that = quotationDataTable.column(targetColumnIndex);

            $(this).on('keyup change clear', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });
        console.log("DataTables initialized for 'quotationTable' with horizontal scrolling.");
    } else if (DOM.quotationTable && $.fn.DataTable.isDataTable(DOM.quotationTable)) {
        console.log("DataTables is already initialized for 'quotationTable'.");
    } else {
        console.error("DOM.quotationTable element not found. DataTables cannot be initialized.");
    }
}
// Function to initialize the quotation lines DataTable
function initializeQuotationLinesDataTable() {
    if (DOM.quotationLinesTable && !$.fn.DataTable.isDataTable(DOM.quotationLinesTable)) {
        quotationLinesDataTable = $(DOM.quotationLinesTable).DataTable({
            "scrollX": true, // Enable horizontal scroll for lines table
            "autoWidth": false, // Disable autoWidth if scrollX is true and columns have fixed widths
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "dom": '<"top"lf>rt<"bottom"ip>', // Make length and filter on one line at top
            "responsive": false, // Keep responsive false to avoid column hiding logic
            "pagingType": "full_numbers", // Show First, Previous, Next, Last buttons
            "scrollCollapse": true, // Helps DataTables manage scrollable areas
            "language": { // English language settings
                "processing": "Processing...",
                "search": "Search:",
                "lengthMenu": "Show _MENU_ entries",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "Showing 0 to 0 of 0 entries",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "loadingRecords": "Loading records...",
                "zeroRecords": "No matching records found",
                "emptyTable": "No data available in table",
                "paginate": {
                    "first": "First",
                    "previous": "Previous",
                    "next": "Next",
                    "last": "Last"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            // Define actual column properties if you have specific types or rendering
            // Setting widths can help autoWidth achieve better results
            "columns": [
                { "orderable": false, "width": "30px" }, // Checkbox
                { "width": "120px" }, // Service/Test Id
                { "width": "200px" }, // Line Description - giving a larger default width
                { "width": "80px" }, // Accounted
                { "width": "100px" }, // Category
                { "width": "80px" }, // Type
                { "width": "80px" }, // Method
                { "orderable": false, "width": "100px" } // Actions (fixed width for buttons)
            ],
            // NEW: FixedColumns configuration for quotationLinesTable
            fixedColumns: {
                leftColumns: 1 // Fix the first column (checkbox)
            },
            "initComplete": function() {
                // Event listener for individual row checkboxes to toggle selected-row class
                $('#quotationLinesTable tbody').on('change', 'input[type="checkbox"]', function() {
                    $(this).closest('tr').toggleClass('selected-row', this.checked);
                });
            },
            "drawCallback": function(settings) {
                // This ensures the header columns align with the body columns after any draw event
                if (quotationLinesDataTable) {
                    quotationLinesDataTable.columns.adjust();
                }
            }
        });

        // Apply column filters for the new lines table
        $('#quotationLinesTable thead tr.filter-row input').each(function(i) {
            var that = quotationLinesDataTable.column(i);
            $(this).on('keyup change clear', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        // Event listener for the master checkbox in the lines table
        if (DOM.selectAllLinesCheckbox) {
            DOM.selectAllLinesCheckbox.addEventListener('change', function() {
                toggleSelectAllQuoteLines(this);
            });
        }
        
        console.log("DataTables initialized for 'quotationLinesTable'.");
    } else if (DOM.quotationLinesTable && $.fn.DataTable.isDataTable(DOM.quotationLinesTable)) {
        console.log("DataTables is already initialized for 'quotationLinesTable'.");
    } else {
        console.error("DOM.quotationLinesTable element not found. DataTables cannot be initialized.");
    }
}


// Function to add a quotation to the main table (from Header Tab data)
function addQuotationToTable() {
    // التحقق المبدئي للحقول المطلوبة
    if (!DOM.quoteCategory || !DOM.quoteCategory.value.trim()) {
        markRequiredField(DOM.quoteCategory, true);
        console.error("Category is required.");
        return false;
    } else {
        markRequiredField(DOM.quoteCategory, false);
    }
    if (!DOM.quoteSubject || !DOM.quoteSubject.value.trim()) {
        markRequiredField(DOM.quoteSubject, true);
        console.error("Subject is required.");
        return false;
    } else {
        markRequiredField(DOM.quoteSubject, false);
    }
    if (!DOM.quoteContactFrom || !DOM.quoteContactFrom.value.trim()) {
        markRequiredField(DOM.quoteContactFrom, true);
        console.error("From is required.");
        return false;
    } else {
        markRequiredField(DOM.quoteContactFrom, false);
    }
    if (!DOM.quoteContactPerson || !DOM.quoteContactPerson.value.trim()) {
        markRequiredField(DOM.quoteContactPerson, true);
        console.error("Contact Person is required.");
        return false;
    } else {
        markRequiredField(DOM.quoteContactPerson, false);
    }

    // يمكنك إضافة المزيد من التحقق للحقول الأخرى هنا (مثل quoteDate, projectCodeInput)

    // --- جمع جميع البيانات من حقول الإدخال ---
    // تأكد أن أسماء المفاتيح (keys) هنا تتطابق تمامًا مع خاصية "data" في تعريف أعمدة DataTables
    const newQuotationData = {
        category: DOM.quoteCategory ? DOM.quoteCategory.value : '',
        quoteNo: DOM.quoteNo ? DOM.quoteNo.value : '',
        rev: DOM.quoteRev ? DOM.quoteRev.value : '',
        quoteDate: DOM.quoteDate ? DOM.quoteDate.value : '',
        // `projectCode` يأتي من `quoteProjectCodeInput`
        projectCode: DOM.quoteProjectCodeInput ? DOM.quoteProjectCodeInput.value : '',
        legacyNo: DOM.quoteLegacyNo ? DOM.quoteLegacyNo.value : '',
        legacyDate: DOM.quoteLegacyDate ? DOM.quoteLegacyDate.value : '',
        customer: DOM.quoteCustomer ? DOM.quoteCustomer.value : '',
        // `projectName` يأتي من `quoteProject`
        projectName: DOM.quoteProject ? DOM.quoteProject.value : '',
        projectDetails: DOM.quoteProjectDetails ? DOM.quoteProjectDetails.value : '',
        subject: DOM.quoteSubject ? DOM.quoteSubject.value : '',
        from: DOM.quoteContactFrom ? DOM.quoteContactFrom.value : '',
        inquiry: DOM.quoteInquiry ? DOM.quoteInquiry.value : '',
        // `contact` يأتي من `quoteContactPerson`
        contact: DOM.quoteContactPerson ? DOM.quoteContactPerson.value : '',
        to: DOM.quoteContactTo ? DOM.quoteContactTo.value : '',
        attnTo: DOM.quoteAttnTo ? DOM.quoteAttnTo.value : '',
        attnPos: DOM.quoteAttnPos ? DOM.quoteAttnPos.value : '',
        discount: DOM.quoteDiscount ? parseFloat(DOM.quoteDiscount.value) || 0 : 0,
        vat: DOM.quoteVAT ? parseFloat(DOM.quoteVAT.value) || 0 : 0,
        validity: DOM.quoteValidity ? parseInt(DOM.quoteValidity.value) || 0 : 0,
        currency: DOM.quoteCurrency ? DOM.quoteCurrency.value : '',
        paymentTerms: DOM.quotePaymentTermsInput ? DOM.quotePaymentTermsInput.value : '',
        method: DOM.quoteMethod ? DOM.quoteMethod.value : '',
        remarks: DOM.quoteRemarks ? DOM.quoteRemarks.value : '',
        // `quoteFile` يأتي من `quoteQuoteFile`
        quoteFile: DOM.quoteQuoteFile ? DOM.quoteQuoteFile.value : '',
        fileStatus: DOM.quoteFileStatus ? DOM.quoteFileStatus.value : '',
        declined: DOM.quoteDeclined ? DOM.quoteDeclined.checked : false, // للـ checkbox
        declinedMessage: DOM.quoteDeclinedMessage ? DOM.quoteDeclinedMessage.value : '',
    };

    console.log("البيانات التي تم جمعها من المودل:", newQuotationData);

    if (quotationDataTable) {
        quotationDataTable.row.add(newQuotationData).draw(false);
        console.log("تم إضافة عرض السعر إلى الجدول الرئيسي بنجاح:", newQuotationData);
        // يمكنك هنا استدعاء دالة لإعادة تعيين النموذج بعد الإضافة الناجحة
        // resetQuotationForm();
        return true;
    } else {
        console.error("جدول عروض الأسعار الرئيسي (quotationDataTable) لم يتم تهيئته. لا يمكن إضافة الصف.");
        return false;
    }
}


// Functions for Quote Lines actions (from buttons in the lines tab actions div)
// These would interact with `quotationLinesDataTable`
function addQuoteLine() {
    console.log("Add Empty Line button clicked.");
    // Example: Add a new empty row to quotationLinesDataTable
    if (quotationLinesDataTable) {
        quotationLinesDataTable.row.add({
            id: '', description: '', accounted: '', category: '', type: '', method: ''
        }).draw(false);
        showToast("New empty line added!", "info");
    }
}

// Modified editQuoteLine to accept a row element or use selection
// دالة لتعديل سطر عرض الأسعار. تقبل عنصر الزر أو تستخدم التحديد الحالي.
let currentEditingRow = null; // اجعل هذا المتغير عاماً في أعلى ملفك

// دالة لتعديل سطر عرض الأسعار. تقبل عنصر الزر أو تستخدم التحديد الحالي.
function editQuoteLine(buttonElement) {
    let rowJqueryObject; // سيحتوي على كائن jQuery للصف <tr>

    if (buttonElement) {
        rowJqueryObject = $(buttonElement).closest('tr');
    } else {
        const selectedRows = quotationLinesDataTable.rows(':has(input[type="checkbox"]:checked)');
        if (selectedRows.count() > 0) {
            rowJqueryObject = selectedRows.rows(0).nodes().to$();
        }
    }

    if (rowJqueryObject && rowJqueryObject.length > 0) {
        // **هذا هو التغيير الحاسم الذي يجب أن يكون لديك:**
        currentEditingRow = quotationLinesDataTable.row(rowJqueryObject); // <--- هنا نحصل على مرجع صف DataTables API

        console.log("editQuoteLine: تم تحديد الصف للتعديل.");
        console.log("editQuoteLine: مرجع currentEditingRow:", currentEditingRow);
        console.log("editQuoteLine: بيانات الصف المراد تعديله:", currentEditingRow.data());

        alert("تم تحديد سطر للتعديل. سيتم فتح قائمة الأسعار لاختيار بديل.");
        
        openPriceListModal();

    } else {
        alert("الرجاء تحديد سطر للتعديل.");
        console.log("editQuoteLine: لم يتم العثور على صف صالح للتعديل.");
    }
}

// Modified deleteQuoteLine to accept a row element or use selection
function deleteQuoteLine(buttonElement) {
    let rowsToDelete;
    if (buttonElement) {
        // If a button element is passed, delete its parent row
        rowsToDelete = quotationLinesDataTable.row($(buttonElement).closest('tr'));
    } else {
        // Otherwise, use the currently selected row(s)
        rowsToDelete = quotationLinesDataTable.rows(':has(input[type="checkbox"]:checked)');
    }

    if (rowsToDelete.count() > 0) {
        // Replaced confirm with a custom message box if available, for now, keep alert
        if (confirm("Are you sure you want to delete the selected line(s)?")) {
            rowsToDelete.remove().draw();
            alert("Selected line(s) deleted.");
        }
    } else {
        alert("Please select a line to delete.");
    }
}

function copyQuoteLine() {
    const selectedRows = quotationLinesDataTable.rows(':has(input[type="checkbox"]:checked)').data();
    if (selectedRows.length > 0) {
        // Store a deep copy of the data, excluding the checkbox and action buttons
        window.copiedQuoteLineData = selectedRows[0].toArray().slice(1, -1); // Exclude first (checkbox) and last (actions)
        alert("Line copied! Now click Paste Line to add it.");
        console.log("Copied Line Data:", window.copiedQuoteLineData);
    } else {
        alert("Please select a line to copy.");
    }
}

function pasteQuoteLine() {
    if (window.copiedQuoteLineData) {
        const newRowData = ['<input type="checkbox">', ...window.copiedQuoteLineData, '<button class="btn btn-sm btn-info edit-btn" onclick="editQuoteLine(this)"><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger delete-btn" onclick="deleteQuoteLine(this)"><i class="fas fa-trash-alt"></i></button>'];
        quotationLinesDataTable.row.add(newRowData).draw(false);
        alert("Line pasted!");
        console.log("Pasted new line:", newRowData);
    } else {
        alert("No line copied yet. Please copy a line first.");
    }
}

function clearLinesFilters() {
    $('#quotationLinesTable thead tr.filter-row input').val('').trigger('change');
    alert("Filters cleared for Quote Lines table.");
}

function refreshQuoteLinesTable() {
    if (quotationLinesDataTable) {
        // In a real app, this would re-fetch data from a backend
        quotationLinesDataTable.clear().draw();
        // For now, just a dummy refresh
        alert("Quote Lines table refreshed (data cleared).");
    } else {
        alert("Quote Lines table not initialized.");
    }
}

function exportQuoteLinesToExcel() {
    if (quotationLinesDataTable) {
        const data = quotationLinesDataTable.data().toArray();
        const headers = quotationLinesDataTable.columns().header().toArray().map(th => th.textContent.trim());

        const filteredHeaders = headers.filter(header => header !== '' && header !== 'Actions');

        const cleanedData = data.map(row => {
            const tempRow = [];
            for (let i = 1; i < row.length - 1; i++) { // Start from index 1 to skip checkbox, end before last for actions
                tempRow.push($(row[i]).text().trim() || row[i]);
            }
            return tempRow;
        });

        const worksheet = XLSX.utils.aoa_to_sheet([filteredHeaders, ...cleanedData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Quote Lines");
        XLSX.writeFile(workbook, "QuoteLines.xlsx");
        alert("Quote Lines exported to Excel.");
    } else {
        alert("Quote Lines table not initialized for export.");
    }
}

function printQuoteLinesTable() {
    if (quotationLinesDataTable) {
        alert("Printing Quote Lines table (simulated).");
        
        var printWindow = window.open('', '', 'height=500,width=800');
        printWindow.document.write('<html><head><title>Print Quote Lines</title>');
        printWindow.document.write('<link rel="stylesheet" href="quotation.css" type="text/css" />');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h3>Quote Lines Report</h3>');
        printWindow.document.write('<table border="1" style="width:100%; border-collapse: collapse;">');
        
        printWindow.document.write('<thead><tr>');
        quotationLinesDataTable.columns().header().each(function(header) {
            const headerText = $(header).text().trim();
            if (headerText !== '' && headerText !== 'Actions') {
                 printWindow.document.write('<th>' + headerText + '</th>');
            }
        });
        printWindow.document.write('</tr></thead>');

        printWindow.document.write('<tbody>');
        quotationLinesDataTable.rows().every(function() {
            var rowData = this.data();
            // Filter out the checkbox and action columns for printing
            const printableRowData = rowData.filter((_, index) => index !== 0 && index !== rowData.length - 1);
            printWindow.document.write('<tr>');
            printableRowData.forEach(cellData => {
                printWindow.document.write('<td>' + ($(cellData).text().trim() || cellData) + '</td>');
            });
            printWindow.document.write('</tr>');
        });
        printWindow.document.write('</tbody></table></body></html>');
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    } else {
        alert("Quote Lines table not initialized for printing.");
    }
}

// =====================================================================
// NEW: Price List Modal Functions
// =====================================================================

/**
 * Opens the Price List modal.
 */
function openPriceListModal() {
    if (DOM.priceListModal) {
        DOM.priceListModal.style.display = "flex"; // Use flex for centering
        // Initialize DataTables for the price list table when modal opens
        setTimeout(() => {
            initializePriceListDataTable();
            // Force DataTables to adjust columns after modal is visible
            if (priceListDataTable) {
                priceListDataTable.columns.adjust().draw();
                console.log("DataTables columns adjusted after modal opened.");
            }
        }, 300); // Increased delay to 300ms
    }
}

/**
 * Closes the Price List modal.
 */
function closePriceListModal() {
    if (DOM.priceListModal) {
        DOM.priceListModal.style.display = "none";
        // Clear search input and reset filters when closing
        if (DOM.priceListSearchInput) {
            DOM.priceListSearchInput.value = '';
        }
        if (priceListDataTable) {
            priceListDataTable.search('').columns().search('').draw();
            // Uncheck master checkbox (it's now part of the DataTables header)
            // We need to find the checkbox within the DataTables header dynamically
            const masterCheckboxElement = $('#priceListTable thead .select-all-price-list-items')[0];
            if (masterCheckboxElement) {
                masterCheckboxElement.checked = false;
            }
            // Remove selected-row class from all rows when closing the modal
            priceListDataTable.$('tbody tr').removeClass('selected-row');
        }
        // Hide the reset button when closing the modal
        if (DOM.priceListResetButtonContainer) {
            DOM.priceListResetButtonContainer.style.display = 'none';
        }
    }
}

/**
 * Initializes the DataTables for the Price List.
 */
function initializePriceListDataTable() {
    if (DOM.priceListTable && !$.fn.DataTable.isDataTable(DOM.priceListTable)) {
        priceListDataTable = $(DOM.priceListTable).DataTable({
            data: getPriceListData(), // Load dummy data
            columns: [
                { // Checkbox column
                    data: null,
                    orderable: false,
                    title: '<input type="checkbox" class="select-all-price-list-items" onclick="toggleSelectAllPriceListItems(this)" />', // Set title for checkbox
                    render: function(data, type, row) {
                        return '<input type="checkbox">';
                    },
                    width: "30px"
                },
                { data: 'id', title: 'ID', width: "80px" }, // Explicit title
                { data: 'name', title: 'Name', width: "250px" }, // Explicit title
                { data: 'method', title: 'Method', width: "100px" }, // Explicit title
                { data: 'unit', title: 'Unit', width: "80px" }, // Explicit title
                { // Price column (editable)
                    data: 'price',
                    title: 'Price', // Explicit title
                    render: function(data, type, row) {
                        return `<input type="number" class="price-input" value="${data.toFixed(2)}" step="0.01" style="width: 80px;">`;
                    },
                    width: "100px"
                },
                { // Price Only checkbox
                    data: 'priceOnly',
                    title: 'Price Only', // Explicit title
                    render: function(data, type, row) {
                        return `<input type="checkbox" class="price-only-checkbox" ${data ? 'checked' : ''}>`;
                    },
                    width: "80px"
                },
                { // Quantity column (editable)
                    data: 'quantity',
                    title: 'Quantity', // Explicit title
                    render: function(data, type, row) {
                        return `<input type="number" class="quantity-input" value="${data}" min="0" step="1" style="width: 60px;">`;
                    },
                    width: "80px"
                },
                { // Active checkbox - NOW EDITABLE
                    data: 'active',
                    title: 'Active', // Explicit title
                    render: function(data, type, row) {
                        // Render as a checkbox, allowing user to toggle
                        return `<input type="checkbox" class="active-checkbox" ${data ? 'checked' : ''}>`;
                    },
                    width: "60px"
                }
            ],
            "scrollX": true, // Enable horizontal scroll
            "scrollY": "400px",
            "autoWidth": false, // Disable autoWidth if scrollX is true and columns have fixed widths
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "dom": '<"top"lf>rt<"bottom"ip>', // Use default DataTables DOM elements
            "responsive": false, // Keep responsive false to avoid column hiding logic
            "pagingType": "full_numbers",
            "scrollCollapse": true, // Helps DataTables manage scrollable areas
            "language": {
                "processing": "Processing...",
                "search": "Search:",
                "lengthMenu": "Show _MENU_ entries",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "Showing 0 to 0 of 0 entries",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "loadingRecords": "Loading records...",
                "zeroRecords": "No matching records found",
                "emptyTable": "No data available in table",
                "paginate": {
                    "first": "First",
                    "previous": "Previous",
                    "next": "Next",
                    "last": "Last"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            // NEW: FixedColumns configuration for priceListTable
            fixedColumns: {
                leftColumns: 1 // Fix the first column (checkbox)
            },
            "initComplete": function() {
                // Attach change listeners for editable inputs after table is drawn
                $('#priceListTable tbody').on('change', '.price-input', function() {
                    const row = priceListDataTable.row($(this).closest('tr'));
                    const data = row.data();
                    data.price = parseFloat($(this).val());
                    row.data(data).draw(false); // Update row data without redrawing the whole table
                });
                $('#priceListTable tbody').on('change', '.quantity-input', function() {
                    const row = priceListDataTable.row($(this).closest('tr'));
                    const data = row.data();
                    data.quantity = parseInt($(this).val());
                    row.data(data).draw(false);
                });
                $('#priceListTable tbody').on('change', '.price-only-checkbox', function() {
                    const row = priceListDataTable.row($(this).closest('tr'));
                    const data = row.data();
                    data.priceOnly = this.checked;
                    row.data(data).draw(false);
                });
                // Add change listener for 'Active' checkbox
                $('#priceListTable tbody').on('change', '.active-checkbox', function() {
                    const row = priceListDataTable.row($(this).closest('tr'));
                    const data = row.data(); // Get current data
                    data.active = this.checked; // Update the 'active' property
                    row.data(data).draw(false); // Update row data in DataTables
                });

                // NEW: Event listener for individual row checkboxes to toggle selected-row class
                $('#priceListTable tbody').on('change', 'input[type="checkbox"]:first-child', function() {
                    $(this).closest('tr').toggleClass('selected-row', this.checked);
                });

                // NEW: Attach keyup event to search input to manage reset button visibility
                DOM.priceListSearchInput.addEventListener('keyup', function() {
                    togglePriceListResetButton();
                });
            },
            // Draw callback to ensure headers are adjusted when table is drawn
            "drawCallback": function(settings) {
                // This ensures the header columns align with the body columns after any draw event
                if (priceListDataTable) {
                    priceListDataTable.columns.adjust();
                    // NEW: Check for search results and show/hide reset button
                    togglePriceListResetButton();
                }
            }
        });
        console.log("DataTables initialized for 'priceListTable'.");

        // Explanation for 'Active' field
        console.log("The 'Active' field in LIMS typically indicates whether a specific test, service, or item is currently available for use or selection within the system. If 'Active' is checked, it means the item is enabled and can be used in new quotations, orders, or lab processes. If unchecked (inactive), it's usually hidden or prevented from being selected for new work, but historical data related to it remains. This. This field is now editable by the user.");

    } else if (DOM.priceListTable && $.fn.DataTable.isDataTable(DOM.priceListTable)) {
        console.log("DataTables is already initialized for 'priceListTable'. Reloading data.");
        priceListDataTable.clear().rows.add(getPriceListData()).draw(); // Reload data
        // Uncheck master checkbox on refresh
        const masterCheckboxElement = $('#priceListTable thead .select-all-price-list-items')[0];
        if (masterCheckboxElement) {
            masterCheckboxElement.checked = false;
        }
        // Remove selected-row class from all rows on refresh
        priceListDataTable.$('tbody tr').removeClass('selected-row');
        // Hide the reset button when reloading data
        if (DOM.priceListResetButtonContainer) {
            DOM.priceListResetButtonContainer.style.display = 'none';
        }
    } else {
        console.error("DOM.priceListTable element not found. DataTables cannot be initialized.");
    }
}

/**
 * Resets filters and reloads data for the price list table.
 */
function resetPriceListFilters() {
    if (priceListDataTable) {
        DOM.priceListSearchInput.value = ''; // Clear search input
        priceListDataTable.search('').columns().search('').draw(); // Clear all filters and redraw
        priceListDataTable.clear().rows.add(getPriceListData()).draw(); // Reload original data
        // Uncheck master checkbox on reset
        const masterCheckboxElement = $('#priceListTable thead .select-all-price-list-items')[0];
        if (masterCheckboxElement) {
            masterCheckboxElement.checked = false;
        }
        // Remove selected-row class from all rows on reset
        priceListDataTable.$('tbody tr').removeClass('selected-row');
        // Hide the reset button when reloading data
        if (DOM.priceListResetButtonContainer) {
            DOM.priceListResetButtonContainer.style.display = 'none';
        }
        alert("Price List filters reset and data refreshed.");
    } else {
        alert("Price List table not initialized.");
    }
}

/**
 * Toggles the visibility of the "Reset Search" button in the Price List modal.
 * Shows the button if search input is not empty and no rows are found.
 */
function togglePriceListResetButton() {
    if (priceListDataTable && DOM.priceListSearchInput && DOM.priceListResetButtonContainer) {
        const searchTerm = DOM.priceListSearchInput.value.trim();
        const rowCount = priceListDataTable.rows({ search: 'applied' }).count();

        if (searchTerm !== '' && rowCount === 0) {
            DOM.priceListResetButtonContainer.style.display = 'block';
        } else {
            DOM.priceListResetButtonContainer.style.display = 'none';
        }
    }
}

/**
 * Toggles the selection of all checkboxes in the Price List table.
 * Also toggles the 'selected-row' class on all rows.
 * @param {HTMLInputElement} masterCheckbox - The master checkbox in the price list table header.
 */
function toggleSelectAllPriceListItems(masterCheckbox) {
    if (priceListDataTable) {
        priceListDataTable.$('tbody input[type="checkbox"]:first-child').each(function() {
            this.checked = masterCheckbox.checked;
            $(this).closest('tr').toggleClass('selected-row', this.checked); // Toggle class
        });
    }
}

/**
 * Sets the "Price Only" checkbox for all selected items in the Price List.
 */
function setPriceOnlyForSelected() {
    if (priceListDataTable) {
        priceListDataTable.rows().every(function() {
            const rowNode = this.node();
            const checkbox = $(rowNode).find('input[type="checkbox"]:first')[0]; // Main row checkbox
            if (checkbox && checkbox.checked) {
                const priceOnlyCheckbox = $(rowNode).find('.price-only-checkbox')[0];
                if (priceOnlyCheckbox) {
                    priceOnlyCheckbox.checked = true;
                    // Update the DataTables data model
                    const data = this.data();
                    data.priceOnly = true;
                    this.data(data).draw(false); // Update row data without redrawing the whole table
                }
            }
        });
        alert("Set 'Price Only' for selected items.");
    } else {
        alert("Price List table not initialized.");
    }
}

/**
 * Adds selected items from the Price List modal to the main Quotation Lines table.
 * @param {boolean} withGroups - True if items should be inserted with groups (dummy functionality for now).
 */
// دالة لإضافة العناصر المحددة من جدول قائمة الأسعار إلى جدول سطور عرض الأسعار
/**
 * Adds selected items from the Price List modal to the main Quotation Lines table.
 * @param {boolean} withGroups - True if items should be inserted with groups (dummy functionality for now).
 */
// دالة لإضافة العناصر المحددة من جدول قائمة الأسعار إلى جدول سطور عرض الأسعار
function addSelectedItemsToQuoteLines(withGroups = false) {
    if (!quotationLinesDataTable) {
        alert("Quotation Lines table is not initialized. Cannot add/update items.");
        console.error("Error: quotationLinesDataTable is null or undefined.");
        return;
    }
    if (!priceListDataTable) {
        alert("Price List table is not initialized. Cannot get selected items.");
        console.error("Error: priceListDataTable is null or undefined.");
        return;
    }

    const selectedItems = [];
    priceListDataTable.rows().every(function() {
        const rowNode = this.node();
        const checkbox = $(rowNode).find('input[type="checkbox"]:first')[0]; // Main row checkbox
        if (checkbox && checkbox.checked) {
            const data = this.data();
            // Ensure we get the current values from the editable inputs, not just the initial data
            // استخدم || للتعامل مع القيم الفارغة من input
            data.price = parseFloat($(rowNode).find('.price-input').val() || data.price || 0); 
            data.quantity = parseInt($(rowNode).find('.quantity-input').val() || data.quantity || 1); 
            data.priceOnly = $(rowNode).find('.price-only-checkbox').prop('checked');
            data.active = $(rowNode).find('.active-checkbox').prop('checked');
            selectedItems.push(data);
        }
    });

    if (selectedItems.length === 0) {
        alert("الرجاء تحديد عنصر واحد على الأقل من قائمة الأسعار.");
        console.log("addSelectedItemsToQuoteLines: لم يتم تحديد أي عناصر من قائمة الأسعار.");
        return;
    }

    // =================================================================
    // منطق التعديل (حذف القديم وإضافة الجديد) - هذا الجزء يجب أن يكون داخل هذا الشرط
    // =================================================================
    // إذا كان هناك صف يتم تعديله (تم تعيين currentEditingRow) وتم تحديد عنصر واحد فقط من قائمة الأسعار
    if (currentEditingRow && selectedItems.length === 1) { // <--- لاحظ هذا الشرط المهم
        console.log("addSelectedItemsToQuoteLines: في وضع التعديل (استبدال الصف).");
        console.log("addSelectedItemsToQuoteLines: مرجع الصف الحالي للتعديل:", currentEditingRow);

        const selectedPriceListItem = selectedItems[0];

        // بناء بيانات السطر الجديد لـ quotationLinesDataTable
        // ترتيب الأعمدة: Checkbox, Service/Test Id, Line Description, Accounted, Category, Type, Method, Quantity, Price, Actions
        const newRowData = [
            '<input type="checkbox">', // مربع الاختيار (العمود 0)
            selectedPriceListItem.id, // Service/Test Id (العمود 1)
            selectedPriceListItem.name, // Line Description (العمود 2)
            selectedPriceListItem.active ? 'Yes' : 'No', // Accounted (العمود 3)
            selectedPriceListItem.unit, // Category (العمود 4)
            selectedPriceListItem.priceOnly ? 'Price Only' : 'Standard', // Type (العمود 5)
            selectedPriceListItem.method, // Method (العمود 6)
            selectedPriceListItem.quantity, // Quantity (العمود 7 - استخدم القيمة الملتقطة)
            selectedPriceListItem.price, // Price (العمود 8 - استخدم القيمة الملتقطة)
            // أزرار الإجراءات - **هام جداً**: تم إزالة `onclick` هنا
            `<button class="btn btn-sm btn-info edit-btn"><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash-alt"></i></button>`
        ];

        // 1. حذف الصف القديم
        // تحقق مما إذا كان الصف موجوداً قبل محاولة حذفه
        if (currentEditingRow.length) { // DataTables row API object has a .length property
            currentEditingRow.remove().draw(false);
            console.log("addSelectedItemsToQuoteLines: تم حذف الصف القديم بنجاح.");
        } else {
            console.warn("addSelectedItemsToQuoteLines: الصف المراد حذفه غير صالح أو غير موجود في DataTables.");
        }

        // 2. إضافة الصف الجديد
        quotationLinesDataTable.row.add(newRowData).draw(false);
        console.log("addSelectedItemsToQuoteLines: تم إضافة الصف الجديد بنجاح.");

        alert("تم استبدال السطر بنجاح في جدول عروض الأسعار!");
        console.log("addSelectedItemsToQuoteLines: تم استبدال السطر بالبيانات الجديدة:", newRowData);

        currentEditingRow = null; // مسح مرجع الصف بعد التعديل
        closePriceListModal();
        return; // <--- هذا السطر مهم جداً للخروج من الدالة بعد التعديل
    }

    // =================================================================
    // المنطق الأصلي للإضافة (إذا لم يكن هناك سطر يتم تعديله، أو تم تحديد أكثر من عنصر واحد)
    // =================================================================
    console.log("addSelectedItemsToQuoteLines: في وضع الإضافة (إضافة صفوف جديدة).");
    if (withGroups) {
        // إضافة صف رأس المجموعة إذا تم تحديد ذلك
        const groupHeaderData = [
            '', `<span style="font-weight: bold;">Group of ${selectedItems.length} Items</span>`,
            '', '', '', '', '', '', '', '' // تأكد أن عدد الأعمدة يطابق جدولك
        ];
        const groupRow = quotationLinesDataTable.row.add(groupHeaderData).draw(false).node();
        $(groupRow).addClass('group-header-row');
        console.log("addSelectedItemsToQuoteLines: تم إضافة رأس المجموعة.");
    }

    selectedItems.forEach(item => {
        const newRowData = [
            '<input type="checkbox">',
            item.id,
            item.name,
            item.active ? 'Yes' : 'No',
            item.unit,
            item.priceOnly ? 'Price Only' : 'Standard',
            item.method,
            item.quantity, // الكمية
            item.price, // السعر
            // أزرار الإجراءات - **هام جداً**: تم إزالة `onclick` هنا
             `<button class="btn btn-sm btn-info edit-btn"><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash-alt"></i></button>`
        ];
        quotationLinesDataTable.row.add(newRowData).draw(false);
        console.log("addSelectedItemsToQuoteLines: تم إضافة عنصر جديد:", item.name);
    });

    alert(`تمت إضافة ${selectedItems.length} عنصر(عناصر) إلى سطور عروض الأسعار ${withGroups ? 'مع مجموعات.' : '.'}`);
    closePriceListModal();
}

// =====================================================================
// Document Ready and Initialization
// =====================================================================
$(document).ready(function() {
  
  // تهيئة مستمعات الأحداث لأزرار Header Tab
    if (DOM.closeHeaderTabBtn) {
        DOM.closeHeaderTabBtn.addEventListener('click', closeQuotationModal);
        console.log("Event listener added to closeHeaderTabBtn"); // لأغراض التشخيص
    } else {
        console.warn("DOM.closeHeaderTabBtn not found!");
    }

    if (DOM.saveHeaderTabBtn) {
        DOM.saveHeaderTabBtn.addEventListener('click', saveQuotationHeader);
        console.log("Event listener added to saveHeaderTabBtn"); // لأغراض التشخيص
    } else {
        console.warn("DOM.saveHeaderTabBtn not found!");
    }

    if (DOM.saveAndCloseHeaderTabBtn) {
        DOM.saveAndCloseHeaderTabBtn.addEventListener('click', saveAndCloseQuotationHeader);
        console.log("Event listener added to saveAndCloseHeaderTabBtn"); // لأغراض التشخيص
    } else {
        console.warn("DOM.saveAndCloseHeaderTabBtn not found!");
    }
    
  
  
    initializeQuotationDataTable();

    initializeEmployeeDropdown();
    initializePaymentTermsDropdown();
    initializeProjectCodeDropdown();
    initializeCategoryDropdown();
    initializeDynamicDOMElements();
    initializeContactPersonDropdown();
   
  
  
   
      
    
    // تعيين التاريخ الافتراضي
    if (DOM.quoteDate && !DOM.quoteDate.value) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        DOM.quoteDate.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Price List DataTable will be initialized when its modal is opened

    // NEW: Add a global resize listener to adjust DataTables columns
    window.addEventListener('resize', function() {
        // Only adjust if the priceListModal is currently displayed
        if (DOM.priceListModal && DOM.priceListModal.style.display === 'flex' && priceListDataTable) {
            priceListDataTable.columns.adjust().draw();
            console.log("Price List table columns adjusted on window resize.");
        }
        // Also adjust the quotationLinesTable if its tab is active
        const linesTab = document.getElementById('linesTab');
        if (linesTab && linesTab.classList.contains('active') && quotationLinesDataTable) {
            quotationLinesDataTable.columns.adjust().draw();
            console.log("Quotation Lines table columns adjusted on window resize.");
        }
    });
});
