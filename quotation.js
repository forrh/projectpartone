
let quotationDataTable;
let currentEditingQuotationRow; 

let quotationLinesDataTable;
let priceListDataTable;
let lastQuotationNumbers = {
    'proposal_geotechnical': 0,
    'proposal_material_testing': 0
};


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

   
    // تشيك بوكس الرئيسي للكوتيشن تابل 
    masterCheckbox: document.getElementById('quote-masterCheckbox'),
    
    
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
    saveEditsBtn : document.getElementById('saveEditedQuotationBtn'),

    // Quote Lines Tab Specific Buttons
    saveLinesTabBtn: document.getElementById('saveLinesTabBtn'),
    closeLinesTabBtn: document.getElementById('closeLinesTabBtn'),
    saveAndCloseLinesTabBtn: document.getElementById('saveAndCloseLinesTabBtn'),



    // Main Quotation Table Elements
   
    quotationTable: document.getElementById('quotationTable'),
    fixedPaginationContainer: document.getElementById('quotation-pagination-fixed-bottom'),

    // Quote Lines Table Elements
    quotationLinesTable: document.getElementById('quotationLinesTable'),
   selectAllLinesCheckbox: document.getElementById('selectAllLinesCheckbox'), 
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
    
    originalQuoteId: document.getElementById('originalQuoteId'),
    quotationListView: document.getElementById('quotationListView'), 
    headerQuotationView: document.getElementById('headerQuotationView'),

    // Dynamically added elements (like PDF button from initializeDynamicDOMElements)
    generatePdfButton: null,
};




// Helper Functions


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

 */
function showToast(message, type = 'info', duration = 3000) {
    // إنشاء أو الحصول على حاوية التوست
    const toastContainer = document.getElementById('toastContainer') || (() => {
        const div = document.createElement('div');
        div.id = 'toastContainer';
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.right = '20px';
        div.style.zIndex = '10000';
        div.style.display = 'flex';
        div.style.flexDirection = 'column'; // لترتيب التوستات بشكل عمودي
        div.style.gap = '10px'; // مسافة بين التوستات
        document.body.appendChild(div);
        return div;
    })();

    // إنشاء عنصر التوست نفسه
    const toast = document.createElement('div');
    toast.classList.add('toast-message', type); // لإضافة فئة type للتنسيق
    toast.style.opacity = '0'; // يبدأ مخفياً
    toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    toast.style.transform = 'translateY(-20px)'; // يبدأ من أعلى قليلاً لحركة دخول
    toast.style.minWidth = '250px';
    toast.style.maxWidth = '350px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.borderRadius = '8px';
    toast.style.overflow = 'hidden'; // لضمان عدم تجاوز المحتوى للحدود

    // تحديد عنوان التوست ولون الخلفية بناءً على النوع
    let title = '';
    let backgroundColor = '';
    let textColor = '#fff'; // لون النص الافتراضي

    switch (type) {
        case 'success':
            title = '!نجاح';
            backgroundColor = '#28a745'; // أخضر
            break;
        case 'error':
            title = '!خطأ';
            backgroundColor = '#dc3545'; // أحمر
            break;
        case 'warning':
            title = '!تحذير';
            backgroundColor = '#ffc107'; // أصفر (قد تحتاج لتغيير لون النص لأسود)
            textColor = '#343a40'; // نص داكن للأصفر
            break;
        case 'info':
        default:
            title = 'معلومة';
            backgroundColor = '#17a2b8'; // أزرق سماوي
            break;
    }

    toast.style.backgroundColor = backgroundColor;
    toast.style.color = textColor;

    // بناء محتوى التوست: رأس (عنوان + زر إغلاق) وجسم (الرسالة)
    toast.innerHTML = `
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            font-weight: bold;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            ${type === 'warning' ? 'color: #343a40;' : 'color: white;'} /* لون رأس التحذير */
        ">
            <span>${title}</span>
            <button class="toast-close-button" style="
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
                color: inherit; /* يرث اللون من الأب */
                padding: 0 5px;
            ">&times;</button>
        </div>
        <div style="padding: 15px; font-size: 0.95em;">
            ${message}
        </div>
    `;

    // إضافة التوست إلى الحاوية
    toastContainer.prepend(toast); // نضيفه في الأعلى ليظهر الجديد فوق القديم

    // ظهور التوست مع انتقال
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 50); // تأخير بسيط لتمكين الانتقال

    // إعداد مؤقت الاختفاء التلقائي
    const hideTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);

    // إضافة مستمع حدث لزر الإغلاق
    toast.querySelector('.toast-close-button').addEventListener('click', () => {
        clearTimeout(hideTimeout); // مسح مؤقت الإخفاء التلقائي
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    });
}

// كوتيشن هيدر 
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



function openQuotationModal() {
    if (DOM.quotationModal) {
        DOM.quotationModal.style.display = "block";
        openTab(null, 'headerTab'); // Open Header tab by default
        resetQuotationForm(); // Clear form fields when opening for a new entry

 const saveEditsBtn = document.getElementById('saveEditedQuotationBtn');
        const saveHeaderBtn = document.getElementById('saveHeaderTabBtn');
        const saveAndCloseBtn = document.getElementById('saveAndCloseHeaderTabBtn');
        
 if (DOM.saveEditedQuotationBtn) {
    // 👈🏼 إخفاء زر التعديل بشكل قسري
    DOM.saveEditedQuotationBtn.style.setProperty('display', 'none', 'important'); 
}

if (DOM.saveHeaderTabBtn) {
    // إظهار زر الحفظ بقوة
    DOM.saveHeaderTabBtn.style.setProperty('display', 'inline-block', 'important');
}
if (DOM.saveAndCloseHeaderTabBtn) {
    // إظهار زر الحفظ والإغلاق بقوة
    DOM.saveAndCloseHeaderTabBtn.style.setProperty('display', 'inline-block', 'important');
}
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
 * 3. دالة التبديل بين الأقسام (Show Section)
 * onclick="showSection('file-manager-section')"
 */
function showSection(sectionId) {
    console.log("عرض القسم:", sectionId);
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        showToast(`تم التبديل إلى قسم ${sectionId}.`, "info");
    } else {
        console.error("القسم المطلوب لم يتم العثور عليه:", sectionId);
        showToast(`خطأ: القسم "${sectionId}" غير موجود في الصفحة.`, "error");
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


function saveQuotationHeader() {
    // Collect data from header fields
    const quoteCategory = DOM.quoteCategory ? DOM.quoteCategory.value.trim() : '';
    const quoteNo = DOM.quoteNo ? DOM.quoteNo.value.trim() : '';
    const quoteCustomer = DOM.quoteCustomer ? DOM.quoteCustomer.value.trim() : '';
    const quoteProject = DOM.quoteProject ? DOM.quoteProject.value.trim() : '';
    const quoteContactFrom = DOM.quoteContactFrom ? DOM.quoteContactFrom.value.trim() : '';

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

    // **التعديل يبدأ من هنا: نقوم بإرجاع Promise**
    return new Promise((resolve, reject) => {
        if (isValid) {
            console.log("Validation passed. Attempting to add quotation to table.");
            // Assuming addQuotationToTable() is synchronous and returns a boolean
            const savedSuccessfully = addQuotationToTable();

            if (savedSuccessfully) {
                showToast("Quotation Header saved successfully!", "success");
                console.log("Quotation Header saved successfully. Modal remains open.");
                resolve(true); // حل الـ Promise (تم الحفظ بنجاح)
            } else {
                showToast("Failed to save quotation header. Please check data.", "error");
                console.log("Quotation Header not saved due to an internal error or database issue.");
                reject(new Error("Failed to add quotation to table.")); // رفض الـ Promise (فشل الحفظ)
            }
        } else {
            showToast("Please fill in all required fields (marked with *)!", "error");
            console.log("Quotation Header not saved due to validation errors.");
            reject(new Error("Validation failed.")); // رفض الـ Promise (فشل التحقق من الصحة)
        }
    });
}


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


function saveQuoteLines() {
   
    console.log("Attempting to save changes in Quote Lines table (simulated).");
    showToast("Quote Lines changes saved (simulated)!", "info");
}


function saveAndCloseQuoteLines() {
    saveQuoteLines(); // Call the save logic for lines
    closeQuotationModal();
    showToast("Quote Lines changes saved and modal closed (simulated)!", "success");
    console.log("Quote Lines changes saved and modal closed (simulated).");
}







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


function generateQuotationNumber(categoryValue) {
    if (!categoryValue) {
        DOM.quoteNo.value = '';
        return;
    }

    const currentYear = new Date().getFullYear().toString().slice(-2);
    let prefix = 'AAM';
    let categoryPrefix = '';

    // تحديد البادئة بناءً على الفئة المختارة.
    switch (categoryValue) {
        case 'proposal_geotechnical':
            categoryPrefix = 'GT';
            break;
        case 'proposal_material_testing':
            categoryPrefix = 'MT';
            break;
        default:
            DOM.quoteNo.value = '';
            console.warn(`Unknown category selected: ${categoryValue}`);
            return;
    }

    // زيادة الرقم التسلسلي للفئة المختارة مباشرة.
    lastQuotationNumbers[categoryValue]++;
    const nextNum = lastQuotationNumbers[categoryValue];

    // تنسيق الرقم ليكون بخمس خانات مع إضافة أصفار في البداية.
    const formattedNum = String(nextNum).padStart(5, '0');

    // حفظ آخر رقم محدّث في الذاكرة المحلية (localStorage).
    // هذا يضمن أن العداد لن يعود إلى الصفر في المرة القادمة.
    localStorage.setItem('lastQuotationNumbers', JSON.stringify(lastQuotationNumbers));

    // تجميع كل الأجزاء في رقم عرض السعر النهائي.
    DOM.quoteNo.value = `${prefix}-${categoryPrefix}-Q-${currentYear}-${formattedNum}`;
    
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


/**
 * تبديل حالة تحديد جميع صفوف Quotation Table
 * @param {HTMLInputElement} masterCheckbox - عنصر التشيك بوكس الرئيسي
 */
function toggleSelectAllQuotationTable(masterCheckbox) {
    // 1. تحقق من أن مرجع الجدول الرئيسي موجود
    if (!quotationDataTable) return;

    const isChecked = masterCheckbox.checked;

    // 2. تحديد/إلغاء تحديد جميع التشيك بوكسات الفرعية للصفوف
    // نستخدم .rows().nodes() للوصول إلى عناصر DOM لجميع الصفوف
    $(quotationDataTable.rows().nodes())
        .find('input.slaveCheckbox') // ابحث عن التشيك بوكس الفرعي
        .prop('checked', isChecked) // طبق حالة التحديد
        .closest('tr').toggleClass('selected-row', isChecked); // طبق تظليل الصف

    // 3. النقطة الحاسمة: تحديث شريط الأدوات لتفعيل/تعطيل الأيقونات
    updateToolbarState();
}

// =====================================================================
// Placeholder/Assumed External Functions (Implement these as needed)
// =====================================================================

function initializeQuotationDataTable() {
    if (DOM.quotationTable && !$.fn.DataTable.isDataTable(DOM.quotationTable)) {
        quotationDataTable = $(DOM.quotationTable).DataTable({
            "scrollX": true,
            "autoWidth": true,
            "scrollY": "400px",
            "paging": true,
            "searching": true,
            "ordering": false,
            "info": true,
            "scrollCollapse": true,
            "dom": '<"top"lf>rt<"bottom"ip>',
            "columns": [
               {
                "data": null,
                "defaultContent": "",
                "orderable": false,
                "searchable": false,
                "width": "20px",
                "className": "dt-body-center",
                "render": function(data, type, row) {
                  
                    return `<input type="checkbox" class="slaveCheckbox" data-id="${row.quoteNo}">`;
                }
                },
               
                { "data": "isNew", "orderable": true, "searchable": false, "width": "10px", "defaultContent": "", "render": function(data, type, row) { return row.isNew ? '<i class="fas fa-circle" style="color: grey;" title="جديد / قيد الإنشاء"></i>' : ''; } },
                { "data": "isSent", "orderable": true, "searchable": false, "width": "10px", "defaultContent": "", "render": function(data, type, row) { return row.isSent ? '<i class="fas fa-list-alt" style="color: blue;" title="مكتمل / مرسل"></i>' : ''; } },
                { "data": "isActive", "orderable": true, "searchable": false, "width": "10px", "defaultContent": "", "render": function(data, type, row) { return row.isActive ? '<i class="fas fa-play-circle" style="color: green;" title="فعال / قيد التقدم"></i>' : ''; } },
                { "data": "isApproved", "orderable": true, "searchable": false, "width": "10px", "defaultContent": "", "render": function(data, type, row) { return row.isApproved ? '<i class="fas fa-check-circle" style="color: #28a745;" title="معتمد / مقبول"></i>' : ''; } },
                { "data": "isRejected", "orderable": true, "searchable": false, "width": "10px", "defaultContent": "", "render": function(data, type, row) { return row.isRejected ? '<i class="fas fa-exclamation-triangle" style="color: red;" title="مرفوض / مشكلة"></i>' : ''; } },
                { "data": "category", "defaultContent": "" },
                { "data": "quoteNo", "defaultContent": "" },
                { "data": "rev", "defaultContent": "" },
                { "data": "quoteDate", "defaultContent": "" },
                { "data": "projectCode", "defaultContent": "" },
                { "data": "legacyNo", "defaultContent": "" },
                { "data": "legacyDate", "defaultContent": "" },
                { "data": "customer", "defaultContent": "" },
                { "data": "projectName", "defaultContent": "" },
                { "data": "projectDetails", "defaultContent": "" },
                { "data": "subject", "defaultContent": "" },
                { "data": "from", "defaultContent": "" },
                { "data": "inquiry", "defaultContent": "" },
                { "data": "contact", "defaultContent": "" },
                { "data": "to", "defaultContent": "" },
                { "data": "attnTo", "defaultContent": "" },
                { "data": "attnPos", "defaultContent": "" },
                { "data": "discount", "className": "dt-body-right", "defaultContent": "" },
                { "data": "vat", "className": "dt-body-right", "defaultContent": "" },
                { "data": "validity", "className": "dt-body-right", "defaultContent": "" },
                { "data": "currency", "defaultContent": "" },
                { "data": "paymentTerms", "defaultContent": "" },
                { "data": "method", "defaultContent": "" },
                { "data": "remarks", "defaultContent": "" },
                { "data": "quoteFile", "defaultContent": "" },
                { "data": "fileStatus", "defaultContent": "" },
                { "data": "declined", "defaultContent": "", "render": function(data, type, row) { return data ? 'Yes' : 'No'; } },
                { "data": "declinedMessage", "defaultContent": "" },
                {
                    "data": null,
                    "orderable": false,
                    "searchable": false,
                    "defaultContent": "",
                    "render": function(data, type, row) {
                        
                    }
                }
            ],
            "responsive": false,
            "pagingType": "full_numbers",
            "language": {
                // ... (بقية خيارات اللغة) ...
            },
            
            "drawCallback": function(settings) {
                
            },
            
          "initComplete": function(settings, json) {

            const api = this.api();
            



          

            $('#quote-masterCheckbox').off('change').on('change', function() {

                const isChecked = this.checked;



              
                $(api.rows().nodes()).find('.slaveCheckbox')

                    .prop('checked', isChecked) // تحديد/إلغاء تحديد كل الفرعيات

                    .closest('tr').toggleClass('selected-row', isChecked); // تظليل الصف



                updateMasterCheckboxState(api); // تحديث حالة الـ Master (فقط في حال لم تحدد الكل)

               

            });



           

            $('#quotationTable tbody').off('change', '.slaveCheckbox').on('change', '.slaveCheckbox', function() {

                const isChecked = this.checked;

                const trElement = $(this).closest('tr');



           

                trElement.toggleClass('selected-row', isChecked);



                updateMasterCheckboxState(api); // تحديث حالة الرئيسي (لإظهار التحديد الجزئي)

                updateToolbarState(); // تحديث حالة الأزرار

            });

        },

    });





        const nonFilterableColumnsCount = 6;

        $('#quotationTable thead tr.filter-row input').each(function(i) {

            var targetColumnIndex = i + nonFilterableColumnsCount;

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





/**
 * تحديث حالة الماستر تشيك بوكس (جزئياً أو كلياً).
 * يستخدم الصفوف المرئية حالياً (الصفحة الحالية) للتحقق من الحالة.
 */
function updateMasterCheckboxState(api) {
   
    const visibleRows = api.rows({ page: 'current', search: 'applied' });
    const totalVisibleRows = visibleRows.nodes().length;
    const checkedVisibleRows = visibleRows.nodes().find('.slaveCheckbox:checked').length;
    const masterCheckbox = $('#quote-masterCheckbox');

    if (totalVisibleRows === 0) {
        masterCheckbox.prop('checked', false).prop('indeterminate', false);
    } else if (checkedVisibleRows === 0) {
        masterCheckbox.prop('checked', false).prop('indeterminate', false);
    } else if (checkedVisibleRows === totalVisibleRows) {
        masterCheckbox.prop('checked', true).prop('indeterminate', false);
    } else {
       
        masterCheckbox.prop('checked', false).prop('indeterminate', true);
    }
}
function getMultipleSelectedQuotationIds() {
    const selectedIds = [];
    if (!quotationDataTable) return selectedIds; 

    quotationDataTable.rows(function(idx, data, node) { 
        return $(node).find('input.slaveCheckbox').prop('checked');
    }).data().each(function(rowData) {
        if (rowData.quoteNo) {
            selectedIds.push(rowData.quoteNo);
        }
    });
    return selectedIds;
}

/**
 * Prints only the selected rows from the DataTable (quotationDataTable) 
 * using a temporary, invisible <iframe> inserted into the current page 
 * to ensure the print dialog opens within the same browser context.
 * It also includes the updated deleteSelectedQuotation function.
 * * * Note: 'quotationDataTable' and '$' (jQuery) are assumed to be defined in the global scope.
 * * This file now contains both printSelectedRows and deleteSelectedQuotation.
 */

// Custom Alert Function (Replaces standard alert/confirm due to iframe limitations)
function showCustomAlert(message, isError = true) {
    // Find existing alert box or create a new one
    let alertBox = $('#customPrintAlert');
    const backgroundColor = isError ? '#d9534f' : '#5cb85c'; // Red for error, Green for success
    
    if (alertBox.length === 0) {
        alertBox = $('<div>', {
            id: 'customPrintAlert',
            text: message,
            css: {
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: backgroundColor, 
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                zIndex: '10000',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                fontSize: '16px',
                opacity: '0',
                transition: 'opacity 0.5s',
                direction: 'rtl' // Arabic direction
            }
        }).appendTo('body');
    } else {
        alertBox.text(message).css('backgroundColor', backgroundColor);
    }

    // Show and hide logic
    alertBox.css('opacity', '1');
    setTimeout(() => {
        alertBox.css('opacity', '0');
    }, 3000);
}


function printSelectedRows() {
    // 1. Define clean, professional English column headers for the printout.
    // Total 33 headers: 5 Status columns + 28 remaining data columns.
    const englishHeaders = [
        // 5 Status Columns as requested
        'Status 1', 'Status 2', 'Status 3', 'Status 4', 'Status 5', 
        
        // 28 Data Columns
        'Category', 'Quote No.', 'Rev.', 'Quote Date', 'Project Code', 
        'Legacy No', 'Legacy Date', 'Customer', 'Project Name', 
        'Project Details', 'Subject', 'From', 'Inquiry', 'Contact', 
        'To', 'Attn. To', 'Attn. Pos', 'Discount', 'VAT', 'Validity', 
        'Currency', 'Payment Terms', 'Method', 'Remarks', 'Quote File', 
        'File Status', 'Declined', 
        'Declined Msg' // Last title in the header
    ];

    // Initial check for DataTable object
    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        console.error("Error: The quotation data table is not initialized.");
        return;
    }

    // 2. Get the nodes (HTML elements) of the selected rows only
    const selectedNodes = quotationDataTable.rows(function(idx, data, node) {
        const $node = $(node);
        if ($node.hasClass('dataTables_empty') || $node.hasClass('group')) {
             return false;
        }
        return $node.find('input.slaveCheckbox').prop('checked');
    }).nodes().toArray();

    if (selectedNodes.length === 0) {
        // Show Arabic warning if no rows are selected
        showCustomAlert("الرجاء اختيار صف واحد على الأقل.");
        return;
    }

    // 3. Collect HTML of the selected rows with cleanup
    const selectedRowsHtml = selectedNodes.map(node => {
        const $row = $(node).clone();
        
        // --- Cleanup Step: Remove unnecessary elements/classes from the row ---
        
        // 1. Remove ONLY the Checkbox cell (td:eq(0)). 
        $row.find('td:eq(0)').remove();
        
        // 2. Remove the very LAST cell (td:last) which appears without a header.
        $row.find('td:last').remove(); 
        
        // 3. Remove DataTables internal classes and attributes from the row
        $row.removeClass('odd even selected');
        $row.removeAttr('role');
        
        // 4. Remove unnecessary classes/styles from cells (td) within the row
        $row.find('td').each(function() {
            $(this).removeClass('sorting_1 text-right dataTables_empty');
            $(this).removeAttr('tabindex');
        });
        
        // 5. Skip non-data rows (for redundancy)
        if ($row.hasClass('group') || $row.hasClass('dt-row-grouping') || $row.hasClass('dt-has-details')) {
            return ''; 
        }
        
        return $row[0].outerHTML; // Return the cleaned HTML string
    }).filter(html => html.length > 0)
      .join('');


    // 4. Build the new clean HTML header row based on the defined English titles
    const cleanHeaderHtml = `
        <thead>
            <tr>
                ${englishHeaders.map(title => `<th class="px-3 py-2 text-left">${title}</th>`).join('')}
            </tr>
        </thead>
    `;

    // 5. Build the temporary printable HTML table
    const printableTableHtml = `
        <div style="direction: ltr;">
            <h1>Selected Quotations Printout</h1>
            <table id="printableQuotationTable">
                ${cleanHeaderHtml}
                <tbody>
                    ${selectedRowsHtml}
                </tbody>
            </table>
        </div>
    `;

    // 6. Use an invisible <iframe> for in-page printing (Implementation details omitted for brevity)
    // [Implementation for iframe creation, CSS application, and cleanup]
    const iframe = $('<iframe>', {
        id: 'print-iframe',
        css: { 'display': 'none', 'position': 'absolute', 'top': '-9999px' }
    }).appendTo('body')[0]; 

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.write('<html><head><title>Selected Quotations Report</title>');
    
    // CSS for A4 compatibility and table layout
    iframeDoc.write(`
        <style>
            @media print {
                body { 
                    font-family: 'Arial', sans-serif; 
                    direction: ltr;
                    margin: 0; 
                    padding: 20px;
                }
                h1 { 
                    text-align: center; 
                    margin-bottom: 20px; 
                    font-size: 16pt; 
                    color: #1a4279; 
                    text-transform: uppercase;
                }
                #printableQuotationTable { 
                    width: 100%; 
                    border-collapse: collapse; 
                    table-layout: fixed; 
                    page-break-inside: auto; 
                }
                #printableQuotationTable tr { 
                    page-break-inside: avoid; 
                    page-break-after: auto; 
                }
                #printableQuotationTable th, 
                #printableQuotationTable td { 
                    border: 1px solid #c0c0c0; 
                    padding: 5px; 
                    text-align: left; 
                    word-wrap: break-word;
                    font-size: 7pt; 
                }
                #printableQuotationTable th { 
                    background-color: #f0f0f0 !important; 
                    -webkit-print-color-adjust: exact; 
                    color-adjust: exact; 
                    font-weight: bold;
                    color: #333;
                    text-transform: capitalize;
                }
                tfoot, .dataTables_info, .dataTables_paginate, .dataTables_wrapper > div:last-child {
                    display: none !important;
                }
            }
        </style>
    `);
    
    iframeDoc.write('</head><body>');
    iframeDoc.write(printableTableHtml); 
    iframeDoc.write('</body></html>');
    
    iframeDoc.close();
    
    // M-5: Add final JavaScript cleanup inside the iframe before printing
    iframe.contentWindow.eval(`
        (function() {
            try {
                var tableContainer = document.getElementById('printableQuotationTable').parentNode;
                if (tableContainer) {
                    var lastChildren = tableContainer.querySelectorAll('.dataTables_info, .dataTables_paginate, .dataTables_length, .dataTables_filter, .dataTables_processing');
                    lastChildren.forEach(function(el) { el.remove(); });
                }
            } catch (e) {
                console.error("Print cleanup failed in iframe:", e);
            }
        })();
    `);

    iframe.contentWindow.focus(); 
    iframe.contentWindow.print(); 

    // Clean up: Remove the temporary iframe after a short delay
    setTimeout(() => {
        $(iframe).remove();
    }, 1000); 
}




function submitForApproval() {
    const ids = getMultipleSelectedQuotationIds();
    if (ids.length > 0) {
        if (confirm(`هل أنت متأكد من إرسال ${ids.length} صف (اقتباس) للموافقة؟`)) {
            alert(`✉️ جاري إرسال الاقتباسات التالية للموافقة: ${ids.join(', ')}`);
        }
    } else {
        // رسالة موحدة
        alert("الرجاء اختيار صف واحد على الأقل.");
    }
}

function confirmQuotation() {
    const ids = getMultipleSelectedQuotationIds();
    if (ids.length > 0) {
        if (confirm(`هل أنت متأكد من تأكيد ${ids.length} صف (اقتباس)؟`)) {
            alert(`✔️ جاري تأكيد الاقتباسات ذات الأرقام: ${ids.join(', ')}`);
        }
    } else {
        // رسالة موحدة
        alert("الرجاء اختيار صف واحد على الأقل.");
    }
}

function sendQuotationToCustomer() {
    const ids = getMultipleSelectedQuotationIds();
    if (ids.length > 0) {
        if (confirm(`هل أنت متأكد من إرسال ${ids.length} صف (اقتباس) للعميل؟`)) {
            alert(`📧 جاري إرسال الاقتباسات ذات الأرقام: ${ids.join(', ')} إلى العميل.`);
        }
    } else {
        // رسالة موحدة
        alert("الرجاء اختيار صف واحد على الأقل.");
    }
}

// Custom Alert Function (Replaces standard alert/confirm due to iframe limitations)
function showCustomAlert(message, isError = true) {
    // Find existing alert box or create a new one
    let alertBox = $('#customPrintAlert');
    const backgroundColor = isError ? '#d9534f' : '#5cb85c'; // Red for error, Green for success
    
    if (alertBox.length === 0) {
        alertBox = $('<div>', {
            id: 'customPrintAlert',
            text: message,
            css: {
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: backgroundColor, 
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                zIndex: '10000',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                fontSize: '16px',
                opacity: '0',
                transition: 'opacity 0.5s',
                direction: 'rtl' // Arabic direction
            }
        }).appendTo('body');
    } else {
        alertBox.text(message).css('backgroundColor', backgroundColor);
    }

    // Show and hide logic
    alertBox.css('opacity', '1');
    setTimeout(() => {
        alertBox.css('opacity', '0');
    }, 3000);
}

/**
 * Helper function to validate and retrieve FULL data (Header + Lines) 
 * for exactly one selected row.
 * @returns {Promise<object | null>} Returns the unified {header: ..., lines: ...} object, or null.
 */
async function getSingleSelectedQuotationData() {
    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        console.error("Error: DataTable is not initialized.");
        showCustomAlert("خطأ: لم يتم تهيئة جدول عروض الأسعار.");
        return null;
    }

    const selectedRows = quotationDataTable.rows(function(idx, data, node) {
        return $(node).find('input.slaveCheckbox').prop('checked');
    });

    const selectedCount = selectedRows.count();

    if (selectedCount === 0) {
        showCustomAlert("الرجاء اختيار صف واحد فقط.", true);
        return null;
    }

    if (selectedCount > 1) {
        showCustomAlert("الرجاء اختيار صف واحد فقط لإجراء هذه العملية.", true);
        return null;
    }
    
    // 1. الحصول على بيانات الرأس (Header) من الصف المحدد
    const rowData = selectedRows.data()[0];
    const quoteId = rowData.id || rowData.quoteNo || 'Unknown ID';
    
    if (quoteId === 'Unknown ID') {
         showCustomAlert("خطأ: تعذّر العثور على معرّف عرض السعر.", true);
         return null;
    }

  
    const quotationLines = await fetchQuotationLinesById(quoteId);

   
    return {
        // نستخدم rowData كبيانات للـ Header
        header: rowData,
        // نربط Lines التي تم جلبها
        lines: quotationLines
    };
}
/**

 * تجلب بيانات البنود (Lines) من الخادم أو مصدر بيانات محلي باستخدام ID عرض السعر.
 * @param {string} quoteId - معرّف عرض السعر.
 * @returns {Promise<Array>} مصفوفة ببنود عرض السعر.
 */
async function fetchQuotationLinesById(quoteId) {
   
    
    // لغرض التجربة، نُعيد بيانات وهمية
    if (quoteId === '123') {
        return [
            { description: "خدمة رئيسية", qty: 1, price: 5000, total: 5000 },
            { description: "رسوم إضافية", qty: 1, price: 500, total: 500 }
        ];
    }
    return []; // إرجاع مصفوفة فارغة في حال عدم وجود بيانات
}
// --- 1. Printing Function ---
function printSelectedRows() {
    // 1. Define clean, professional English column headers for the printout.
    // Total 33 headers: 5 Status columns + 28 remaining data columns.
    const englishHeaders = [
        'Status 1', 'Status 2', 'Status 3', 'Status 4', 'Status 5', 
        'Category', 'Quote No.', 'Rev.', 'Quote Date', 'Project Code', 
        'Legacy No', 'Legacy Date', 'Customer', 'Project Name', 
        'Project Details', 'Subject', 'From', 'Inquiry', 'Contact', 
        'To', 'Attn. To', 'Attn. Pos', 'Discount', 'VAT', 'Validity', 
        'Currency', 'Payment Terms', 'Method', 'Remarks', 'Quote File', 
        'File Status', 'Declined', 'Declined Msg'
    ];

    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        console.error("Error: The quotation data table is not initialized.");
        return;
    }

    // 2. Get the nodes (HTML elements) of the selected rows only
    const selectedNodes = quotationDataTable.rows(function(idx, data, node) {
        const $node = $(node);
        if ($node.hasClass('dataTables_empty') || $node.hasClass('group')) {
             return false;
        }
        return $node.find('input.slaveCheckbox').prop('checked');
    }).nodes().toArray();

    if (selectedNodes.length === 0) {
        showCustomAlert("الرجاء اختيار صف واحد على الأقل.");
        return;
    }

    // 3. Collect HTML of the selected rows with cleanup
    const selectedRowsHtml = selectedNodes.map(node => {
        const $row = $(node).clone();
        
        // --- Cleanup Step: Remove unnecessary elements/classes from the row ---
        
        // 1. Remove ONLY the Checkbox cell (td:eq(0)). 
        $row.find('td:eq(0)').remove();
        
        // 2. Remove the very LAST cell (td:last) which appears without a header.
        $row.find('td:last').remove(); 
        
        // 3. Remove DataTables internal classes and attributes from the row
        $row.removeClass('odd even selected');
        $row.removeAttr('role');
        
        // 4. Remove unnecessary classes/styles from cells (td) within the row
        $row.find('td').each(function() {
            $(this).removeClass('sorting_1 text-right dataTables_empty');
            $(this).removeAttr('tabindex');
        });
        
        return $row[0].outerHTML; // Return the cleaned HTML string
    }).filter(html => html.length > 0)
      .join('');

    // 4. Build the new clean HTML header row
    const cleanHeaderHtml = `
        <thead>
            <tr>
                ${englishHeaders.map(title => `<th class="px-3 py-2 text-left">${title}</th>`).join('')}
            </tr>
        </thead>
    `;

    // 5. Build the temporary printable HTML table
    const printableTableHtml = `
        <div style="direction: ltr;">
            <h1>Selected Quotations Printout</h1>
            <table id="printableQuotationTable">
                ${cleanHeaderHtml}
                <tbody>
                    ${selectedRowsHtml}
                </tbody>
            </table>
        </div>
    `;

    // 6. Use an invisible <iframe> for in-page printing
    const iframe = $('<iframe>', {
        id: 'print-iframe',
        css: { 'display': 'none', 'position': 'absolute', 'top': '-9999px' }
    }).appendTo('body')[0]; 

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.write('<html><head><title>Selected Quotations Report</title>');
    
    // CSS for A4 compatibility and table layout
    iframeDoc.write(`
        <style>
            @media print {
                body { font-family: 'Arial', sans-serif; direction: ltr; margin: 0; padding: 20px; }
                h1 { text-align: center; margin-bottom: 20px; font-size: 16pt; color: #1a4279; text-transform: uppercase; }
                #printableQuotationTable { width: 100%; border-collapse: collapse; table-layout: fixed; page-break-inside: auto; }
                #printableQuotationTable tr { page-break-inside: avoid; page-break-after: auto; }
                #printableQuotationTable th, 
                #printableQuotationTable td { border: 1px solid #c0c0c0; padding: 5px; text-align: left; word-wrap: break-word; font-size: 7pt; }
                #printableQuotationTable th { background-color: #f0f0f0 !important; -webkit-print-color-adjust: exact; color-adjust: exact; font-weight: bold; color: #333; text-transform: capitalize; }
                tfoot, .dataTables_info, .dataTables_paginate, .dataTables_wrapper > div:last-child { display: none !important; }
            }
        </style>
    `);
    
    iframeDoc.write('</head><body>');
    iframeDoc.write(printableTableHtml); 
    iframeDoc.write('</body></html>');
    
    iframeDoc.close();
    
    // M-5: Add final JavaScript cleanup inside the iframe before printing
    iframe.contentWindow.eval(`
        (function() {
            try {
                var tableContainer = document.getElementById('printableQuotationTable').parentNode;
                if (tableContainer) {
                    var lastChildren = tableContainer.querySelectorAll('.dataTables_info, .dataTables_paginate, .dataTables_length, .dataTables_filter, .dataTables_processing');
                    lastChildren.forEach(function(el) { el.remove(); });
                }
            } catch (e) {
                console.error("Print cleanup failed in iframe:", e);
            }
        })();
    `);

    iframe.contentWindow.focus(); 
    iframe.contentWindow.print(); 

    // Clean up: Remove the temporary iframe after a short delay
    setTimeout(() => {
        $(iframe).remove();
    }, 1000); 
}


// --- 2. Deleting Function ---
function deleteSelectedQuotation() {
    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        showCustomAlert("خطأ: لم يتم تهيئة جدول عروض الأسعار.");
        return;
    }

    // 1. Identify the selected rows based on the checkbox (slaveCheckbox)
    const selectedRows = quotationDataTable.rows(function(idx, data, node) {
        return $(node).find('input.slaveCheckbox').prop('checked');
    });

    const selectedCount = selectedRows.count();

    if (selectedCount === 0) {
        showCustomAlert("الرجاء اختيار صف واحد على الأقل.");
        return;
    }
    
    // 2. Perform the deletion action directly 
    selectedRows.remove().draw(false);

    // 3. Show success message
    showCustomAlert(`تم حذف ${selectedCount} اقتباس بنجاح.`, false); 
}

// تأكد أن هذا المتغير معرّف في النطاق العمومي لديك:
// let currentEditingQuotationRow; 

function editQuotationModal() {
    // 1. التحقق من تهيئة جدول DataTables
    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        showCustomAlert("خطأ: لم يتم تهيئة جدول عروض الأسعار.", true); 
        return;
    }

    // 2.  تحديد الصفوف المختارة بناءً على حالة مربع الاختيار الفرعي (slaveCheckbox)
    const selectedRows = quotationDataTable.rows(function(idx, data, node) {
        // $(node) هو كائن jQuery لصف الـ <tr> الحالي
        // نبحث داخل هذا الصف عن التشيك بوكس المحدد
        return $(node).find('input.slaveCheckbox').prop('checked');
    });

    const selectedCount = selectedRows.count();
    
    // 3. التحقق من وجود صف واحد فقط للتعديل (حالة 0 أو > 1 تعتبر خطأ)
    if (selectedCount !== 1) {
        showCustomAlert("الرجاء اختيار صف واحد فقط للتعديل.", true); 
        return; // إيقاف التنفيذ
    }

    // --- إذا كان هناك صف واحد فقط محدد، نبدأ عملية التعديل ---
    
    // 4. تخزين مرجع الصف وبياناته
    // selectedRows.row(0) يعطينا مرجع API لصف DataTables
    window.currentEditingQuotationRow = selectedRows.row(0); 
    const quotation = window.currentEditingQuotationRow.data(); // بيانات الصف

    console.log("editQuotationModal: تم تحديد الصف للتعديل باستخدام دالة البحث DataTables.");

    // 5. تعبئة النموذج بالبيانات القديمة
    $('#quotationForm')[0].reset(); 
    $('#modalTitle').text(`تعديل عرض السعر #${quotation.quoteNo || 'N/A'}`);

    // تعيين المعرّف الفريد للتعديل (الأهم)
  
    $('#originalQuoteId').val(quotation.quoteNo || quotation.id); 

    // 6. تعبئة جميع حقول الـ Header
    $('#quoteCategory').val(quotation.category || ''); 
    $('#quoteNo').val(quotation.quoteNo || '');
    $('#quoteRev').val(quotation.rev || '');
    $('#quoteDate').val(quotation.quoteDate || '');
    $('#quoteLegacyNo').val(quotation.legacyNo || '');
    $('#quoteLegacyDate').val(quotation.legacyDate || '');
    $('#quoteSubject').val(quotation.subject || '');
    $('#quoteCustomer').val(quotation.customer || '');
    $('#quoteProjectCodeInput').val(quotation.projectCode || '');
    $('#quoteProject').val(quotation.projectName || '');
    $('#quoteProjectDetails').val(quotation.projectDetails || '');
    $('#quoteContactFrom').val(quotation.from || '');
    $('#quoteInquiry').val(quotation.inquiry || '');
    $('#quoteContactPerson').val(quotation.contact || '');
    $('#quoteContactTo').val(quotation.to || ''); 
    $('#quoteAttnTo').val(quotation.attnTo || '');
    $('#quoteAttnPos').val(quotation.attnPos || '');
    $('#quoteContactEmail').val(quotation.contactEmail || ''); 
    $('#quoteContactMobile').val(quotation.contactMobile || ''); 
    $('#quoteDiscount').val(quotation.discount || 0); 
    $('#quoteVAT').val(quotation.vat || 0);
    $('#quoteValidity').val(quotation.validity || ''); 
    $('#quoteCurrency').val(quotation.currency || ''); 
    $('#quotePaymentTermsInput').val(quotation.paymentTerms || ''); 
    $('#quoteMethod').val(quotation.method || '');
    $('#quoteRemarks').val(quotation.remarks || '');
    
// الكود الصحيح لدالة التعديل (editQuotationModal)

// إظهار زر التعديل بقوة
if (DOM.saveEditedQuotationBtn) {
    DOM.saveEditedQuotationBtn.style.setProperty('display', 'inline-block', 'important'); 
}
//  إخفاء زر الحفظ (الإنشاء) بقوة
if (DOM.saveHeaderTabBtn) {
    DOM.saveHeaderTabBtn.style.setProperty('display', 'none', 'important'); 
}
//  إخفاء زر الحفظ والإغلاق (الإنشاء) بقوة
if (DOM.saveAndCloseHeaderTabBtn) {
    DOM.saveAndCloseHeaderTabBtn.style.setProperty('display', 'none', 'important'); 
}
    // 7. إظهار النافذة المنبثقة
    $('#quotationModal').css('display', 'flex'); 
    openTab(null, 'headerTab');
}

// --- 5. Open PDF Function (Now opens the Preview Modal) ---
/**
 * الدالة الخاصة بزر "Create PDF" (openQuotationPDF).
 * **الوظيفة:** جلب بيانات الصف المحدد بالكامل (الرأس والبنود) وتعبئتها في نافذة المعاينة.
 */
async function openQuotationPDF() { //  يجب أن تصبح async
    
    // 1. استدعاء الدالة بشكل await
    const quotationData = await getSingleSelectedQuotationData(); 

    // التحقق من وجود بيانات (التحقق الداخلي تم في الدالة المساعدة)
    if (!quotationData) {
        return;
    }
    
    // 2. التأكد من أن الهيكلية صحيحة (هذا التحقق مهم لـ formatQuotation)
    if (!quotationData.header || !quotationData.lines) {
        showCustomAlert(" فشل في تحميل البيانات المترابطة (الرأس/البنود).", true);
        return;
    }

    // 3. تنسيق محتوى الكوتيشن في هيئة HTML
    const reportHtml = formatQuotation(quotationData);
    
    // 4. تعبئة وإظهار الـ Modal
    const reportContentElement = document.getElementById('report-content');
    if (reportContentElement) {
        reportContentElement.innerHTML = reportHtml;
    }
    
    const modalContainer = document.getElementById('modalpre-container');
    if (modalContainer) {
        modalContainer.style.display = 'flex';
    }
    
    showCustomAlert(` تم فتح التقرير رقم: ${quotationData.header.proposal_number || 'غير محدد'} في وضع المعاينة.`, false);
}
/**
 * تتولى هذه الدالة جمع البيانات المعدلة من النموذج وتحديث صف DataTables
 * ثم إغلاق المودال.
 */
function saveEditedQuotation() {
    // 1.  التحقق من وجود مرجع للصف الذي يتم تعديله
    if (!window.currentEditingQuotationRow) {
        showCustomAlert("خطأ: لم يتم تحديد الصف المراد تعديله.", true);
        return;
    }

    // 2.  تجميع البيانات الجديدة من الحقول
    const updatedData = {
        // نستخدم البيانات القديمة أولاً لضمان عدم فقدان أي حقول غير معروضة في الـ Header
        // نفترض أن الصفوف في DataTables هي كائن JS عادي
        ...window.currentEditingQuotationRow.data(), 
        
        // الآن، نقوم بتحديث الحقول التي تم تعديلها في النموذج:
        category: $('#quoteCategory').val() || '',
        quoteNo: $('#quoteNo').val() || '',
        rev: $('#quoteRev').val() || '',
        quoteDate: $('#quoteDate').val() || '',
        legacyNo: $('#quoteLegacyNo').val() || '',
        legacyDate: $('#quoteLegacyDate').val() || '',
        subject: $('#quoteSubject').val() || '',
        customer: $('#quoteCustomer').val() || '',
        projectCode: $('#quoteProjectCodeInput').val() || '',
        projectName: $('#quoteProject').val() || '', // يجب التأكد من تطابق اسم المفتاح مع عمود الجدول
        projectDetails: $('#quoteProjectDetails').val() || '',
        from: $('#quoteContactFrom').val() || '',
        inquiry: $('#quoteInquiry').val() || '',
        contact: $('#quoteContactPerson').val() || '',
        to: $('#quoteContactTo').val() || '',
        attnTo: $('#quoteAttnTo').val() || '',
        attnPos: $('#quoteAttnPos').val() || '',
        contactEmail: $('#quoteContactEmail').val() || '',
        contactMobile: $('#quoteContactMobile').val() || '',
        discount: parseFloat($('#quoteDiscount').val()) || 0,
        vat: parseFloat($('#quoteVAT').val()) || 0,
        validity: $('#quoteValidity').val() || '',
        currency: $('#quoteCurrency').val() || '',
        paymentTerms: $('#quotePaymentTermsInput').val() || '',
        method: $('#quoteMethod').val() || '',
        remarks: $('#quoteRemarks').val() || ''
    };
    
    // 3. إرسال البيانات إلى الخادم (هذه خطوة حاسمة في بيئة العمل الحقيقية)
    // *** ملاحظة: يجب عليك هنا إضافة كود AJAX لإرسال updatedData إلى سيرفرك لحفظ التعديلات ***
    // نفترض أن عملية الحفظ على السيرفر نجحت، ونكمل التحديث المحلي للجدول:

    // 4.  تحديث الصف في جدول DataTables
    window.currentEditingQuotationRow.data(updatedData).draw();

    // 5.  إغلاق النافذة المنبثقة
    $('#quotationModal').css('display', 'none');
    
    // 6.  عرض رسالة نجاح
    showCustomAlert("تم حفظ وتحديث تعديلات عرض السعر بنجاح.", false);

    // 7.  مسح مرجع الصف بعد الانتهاء
    window.currentEditingQuotationRow = null; 
}
// --- 4. Revise Function (Increment Revision Number) ---
function reviseQuotation() {
    const selection = getSingleSelectedQuotationData();
    if (!selection) return;

    const row = selection.row;
    const rowData = row.data()[0];
    const quoteId = selection.id;
    
    // *************************************************************************
    // * ملاحظة: يُفترض أن عمود 'Rev.' هو في الفهرس [7] من مصفوفة البيانات،
    // * يجب التأكد من تطابق هذا الفهرس مع ترتيب عمود 'Rev.' في مصدر بيانات DataTable.
    // *************************************************************************
    const REV_COLUMN_INDEX_IN_DATA = 8; 
    
    // Attempt to get the current revision value
    let currentRevValue = rowData[REV_COLUMN_INDEX_IN_DATA] || 0; 
    
    // Parse and increment the revision value
    let newRevValue = 1;
    const revNumber = parseInt(currentRevValue, 10);
    if (!isNaN(revNumber)) {
        newRevValue = revNumber + 1;
    }

    // 1. Update the cell directly in the DataTable and redraw
    quotationDataTable.cell(row.nodes().toArray()[0], REV_COLUMN_INDEX_IN_DATA).data(newRevValue).draw(false);
    
    // 2. Show success message
    showCustomAlert(` جاري إنشاء مراجعة جديدة: تم تحديث الاقتباس رقم ${quoteId} إلى مراجعة ${newRevValue}.`, false);
}

/**
 * الدالة الخاصة بزر "Create PDF" (openQuotationPDF).
 * **الوظيفة الحالية:** جلب بيانات رأس الصف المحدد وتعبئتها في نافذة المعاينة (Preview Modal).
 * مربوطة بالزر: <button onclick="openQuotationPDF()">
 */
function openQuotationPDF() {
    // 1. الحصول على بيانات عرض السعر المحدد (الرأس والبنود)
    const quotationData = getSingleSelectedQuotationData();
    
    // التحقق من وجود بيانات الصف المحدد
    if (!quotationData) {
        showCustomAlert(" الرجاء اختيار صف عرض سعر من الجدول أولاً.", true);
        return;
    }
    
    // التحقق من وجود بيانات الرأس (Header) على الأقل
    if (!quotationData.header) {
        showCustomAlert(" فشل في تحميل بيانات رأس عرض السعر المختار.", true);
        return;
    }

    // 2.  خطوة التعديل: إنشاء كائن جديد يحتوي على الرأس فقط
    // نضمن أن تكون مصفوفة البنود فارغة لتجاهلها عند التنسيق
    const headerOnlyData = {
        header: quotationData.header,
        lines: [] // تعيين مصفوفة البنود كفارغة لتجنب عرضها
    };

    // 3. تنسيق محتوى الكوتيشن في هيئة HTML
    // نمرر الكائن الذي يحتوي على الرأس فقط
    const reportHtml = formatQuotation(headerOnlyData);
    
    // 4. تعبئة محتوى التقرير داخل حاوية الـ Modal (نفس الهيكلة)
    const reportContentElement = document.getElementById('report-content');
    if (reportContentElement) {
        reportContentElement.innerHTML = reportHtml;
    } else {
        console.error("لم يتم العثور على العنصر #report-content");
        showCustomAlert("خطأ في الواجهة: لم يتم العثور على حاوية التقرير.", true);
        return;
    }

    // 5. إظهار النافذة المودالية (modalpre-container)
    const modalContainer = document.getElementById('modalpre-container');
    if (modalContainer) {
        modalContainer.style.display = 'flex';
    }
    
    showCustomAlert(`تم فتح بيانات الرأس للتقرير رقم: ${headerOnlyData.header.proposal_number || 'غير محدد'} في وضع المعاينة.`, false);
}


function initializeQuotationLinesDataTable() {
    // تحقق مما إذا كان العنصر موجودًا ولم يتم تهيئته كـ DataTable بعد
    if (DOM.quotationLinesTable && !$.fn.DataTable.isDataTable(DOM.quotationLinesTable)) {
        console.log("Initializing DataTables for 'quotationLinesTable'...");

        quotationLinesDataTable = $(DOM.quotationLinesTable).DataTable({
            "scrollX": true, // تفعيل التمرير الأفقي للجدول
            "scrollY": "400px", // تحديد ارتفاع قابل للتمرير
            "autoWidth": false, // تعطيل autoWidth إذا كان scrollX true والأعمدة لها عروض ثابتة

            "paging": true,     // تفعيل التصفح
            "searching": true,  // تفعيل البحث العام
            "ordering": true,   // تفعيل الترتيب
            "info": true,       // تفعيل معلومات الصفوف (Showing X of Y entries)

            // تحديد DOM Layout لأزرار البحث والطول والتصفح
            "dom": '<"top"Bfl>rt<"bottom"ip>', // إضافة B للأزرار (Buttons) في الأعلى

            buttons: [
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> طباعة جدول سطور عروض الأسعار',
                    title: 'تقرير سطور عروض الأسعار',
                    orientation: 'landscape', // اتجاه الطباعة أفقي
                    pageSize: 'A4',             // حجم الصفحة A4
                    exportOptions: {
                        // استخدام دالة لاستبعاد الأعمدة بناءً على رؤوسها
                        columns: function ( idx, data, node ) {
                            // التحقق مما إذا كان رأس العمود موجودًا قبل الوصول إلى textContent
                            const headerNode = quotationLinesDataTable.column(idx).header();
                            if (!headerNode) {
                                return false; // إذا لم يكن هناك رأس، استبعد العمود
                            }
                            const headerText = headerNode.textContent.trim().toLowerCase();
                            // استبعاد الأعمدة التي لا نريد طباعتها
                            return headerText !== '' &&      // استبعاد الرؤوس الفارغة
                                       headerText !== 'actions' && // استبعاد عمود الإجراءات
                                       headerText !== 'select' &&  // استبعاد عمود التحديد (إذا كان نص رأسه 'select')
                                       headerText !== 'checkbox';  // استبعاد عمود مربع الاختيار (إذا كان نص رأسه 'checkbox')
                        },
                        stripHtml: true // لإزالة أي HTML من الخلايا وطباعة النص فقط
                    },
                    messageTop: function () {
                        return 'بيانات سطور عروض الأسعار - تاريخ الطباعة: ' + new Date().toLocaleDateString();
                    }
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> تصدير إلى Excel',
                    title: 'بيانات سطور عروض الأسعار',
                    exportOptions: {
                        // نفس منطق استبعاد الأعمدة لـ Excel
                        columns: function ( idx, data, node ) {
                            const headerNode = quotationLinesDataTable.column(idx).header();
                            if (!headerNode) {
                                return false;
                            }
                            const headerText = headerNode.textContent.trim().toLowerCase();
                            return headerText !== '' &&
                                       headerText !== 'actions' &&
                                       headerText !== 'select' &&
                                       headerText !== 'checkbox';
                        },
                        stripHtml: true
                    }
                }
            ],

            "responsive": false, // تعطيل الاستجابة لتجنب منطق إخفاء الأعمدة
            "pagingType": "full_numbers", // عرض أزرار الأول، السابق، التالي، الأخير
            "scrollCollapse": true, // يساعد DataTables في إدارة المناطق القابلة للتمرير

            // إعدادات اللغة (الإنجليزية في هذه الحالة، يمكنك تغييرها للعربية إذا لزم الأمر)
            "language": {
                "processing": "جاري المعالجة...",
                "search": "بحث:",
                "lengthMenu": "عرض _MENU_ سجلات",
                "info": "عرض _START_ إلى _END_ من _TOTAL_ سجل",
                "infoEmpty": "عرض 0 إلى 0 من 0 سجل",
                "infoFiltered": "(تمت التصفية من _MAX_ إجمالي السجلات)",
                "infoPostFix": "",
                "loadingRecords": "جاري تحميل السجلات...",
                "zeroRecords": "لا توجد سجلات مطابقة",
                "emptyTable": "لا توجد بيانات متاحة في الجدول",
                "paginate": {
                    "first": "الأول",
                    "previous": "السابق",
                    "next": "التالي",
                    "last": "الأخير"
                },
                "aria": {
                    "sortAscending": ": تفعيل لترتيب العمود تصاعدياً",
                    "sortDescending": ": تفعيل لترتيب العمود تنازلياً"
                }
            },

            // تعريف خصائص الأعمدة الفعلية
            "columns": [
                { "orderable": false, "width": "30px" },  // 0: Checkbox
                { "width": "120px" },                     // 1: Service/Test Id
                { "width": "200px" },                     // 2: Line Description
                { "width": "80px" },                      // 3: Accounted
                { "width": "100px" },                     // 4: Category
                { "width": "80px" },                      // 5: Type
                { "width": "80px" },                      // 6: Method
                { "orderable": false, "width": "100px" }  // 7: Actions
            ],

            // تفعيل FixedColumns لتثبيت العمود الأول
            fixedColumns: {
                leftColumns: 1
            },

            // دالة يتم تشغيلها عند اكتمال تهيئة الجدول
            "initComplete": function() {
                // معالج حدث لمربعات الاختيار الفردية لتغيير فئة selected-row
                $('#quotationLinesTable tbody').on('change', 'input[type="checkbox"]', function() {
                    $(this).closest('tr').toggleClass('selected-row', this.checked);
                });

                // تأكد من أن الأعمدة تتعدل عند اكتمال التهيئة
                if (quotationLinesDataTable) {
                    quotationLinesDataTable.columns.adjust();
                }
            },

            // دالة يتم تشغيلها بعد كل حدث رسم للجدول
            "drawCallback": function(settings) {
                // هذا يضمن محاذاة أعمدة الرأس مع أعمدة الجسم بعد أي حدث رسم
                if (quotationLinesDataTable) {
                    quotationLinesDataTable.columns.adjust();
                }
            }
        });

        // تطبيق فلاتر الأعمدة لجدول السطور الجديد - تم تغيير 'thead' إلى 'tfoot'
        $('#quotationLinesTable tfoot tr.filter-row input').each(function(i) {
            var that = quotationLinesDataTable.column(i);
            $(this).on('keyup change clear', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        // معالج حدث لمربع الاختيار الرئيسي في جدول السطور
        if (DOM.selectAllLinesCheckbox) {
            DOM.selectAllLinesCheckbox.addEventListener('change', function() {
                toggleSelectAllQuoteLines(this);
            });
        }

        console.log("DataTables initialized for 'quotationLinesTable' successfully.");
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


// وظائف الايقونات كوتيشن لاين 
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

// تأكد من تعريف هذا المتغير في النطاق العمومي لديك
// let currentEditingQuotationRow; 

function editQuotationModal() {
    // 1. التحقق من تهيئة الجدول
    if (typeof quotationDataTable === 'undefined' || quotationDataTable === null) {
        showCustomAlert("خطأ: لم يتم تهيئة جدول عروض الأسعار.", true); 
        return;
    }

 
    
    // 1. البحث عن مربع الاختيار الفرعي المحدد
    const checkedCheckbox = $('#quotationTable tbody .slaveCheckbox:checked');
    
    // 2. التحقق من وجود مربع اختيار واحد محدد فقط
    if (checkedCheckbox.length === 1) {
        // الحصول على عنصر الصف (<tr>) الذي يحتوي على مربع الاختيار
        const rowElement = checkedCheckbox.closest('tr');
        
        // ** تخزين مرجع صف DataTables API **
        window.currentEditingQuotationRow = quotationDataTable.row(rowElement); 
        
        // 3. الحصول على بيانات الصف المختار
        const quotation = window.currentEditingQuotationRow.data(); 

        console.log("editQuotationModal: تم تحديد الصف للتعديل بناءً على التشيك بوكس.");
        // console.log("editQuotationModal: بيانات الصف المراد تعديله:", quotation); // للمراجعة

        // 4. تعبئة النموذج بالبيانات القديمة
        $('#quotationForm')[0].reset(); 
        $('#modalTitle').text(`تعديل عرض السعر #${quotation.quoteNo || 'N/A'}`);

       
        $('#originalQuoteId').val(quotation.quoteNo || quotation.id); 

        // 5. تعبئة جميع حقول الـ Header
        // (نستخدم حقولك التي تم تحديدها مسبقاً)
        $('#quoteCategory').val(quotation.category || ''); 
        $('#quoteNo').val(quotation.quoteNo || '');
        $('#quoteRev').val(quotation.rev || '');
        $('#quoteDate').val(quotation.quoteDate || '');
        $('#quoteLegacyNo').val(quotation.legacyNo || '');
        $('#quoteLegacyDate').val(quotation.legacyDate || '');
        $('#quoteSubject').val(quotation.subject || '');
        $('#quoteCustomer').val(quotation.customer || '');
        $('#quoteProjectCodeInput').val(quotation.projectCode || '');
        $('#quoteProject').val(quotation.projectName || '');
        $('#quoteProjectDetails').val(quotation.projectDetails || '');
        $('#quoteContactFrom').val(quotation.from || '');
        $('#quoteInquiry').val(quotation.inquiry || '');
        $('#quoteContactPerson').val(quotation.contact || '');
        $('#quoteContactTo').val(quotation.to || ''); 
        $('#quoteAttnTo').val(quotation.attnTo || '');
        $('#quoteAttnPos').val(quotation.attnPos || '');
        $('#quoteContactEmail').val(quotation.contactEmail || ''); 
        $('#quoteContactMobile').val(quotation.contactMobile || ''); 
        $('#quoteDiscount').val(quotation.discount || 0); 
        $('#quoteVAT').val(quotation.vat || 0);
        $('#quoteValidity').val(quotation.validity || ''); 
        $('#quoteCurrency').val(quotation.currency || ''); 
        $('#quotePaymentTermsInput').val(quotation.paymentTerms || ''); 
        $('#quoteMethod').val(quotation.method || '');
        $('#quoteRemarks').val(quotation.remarks || '');
        
        // 6. إظهار النافذة المنبثقة
        $('#quotationModal').css('display', 'flex'); 
        openTab(null, 'headerTab');
        
    } else if (checkedCheckbox.length > 1) {
        // حالة اختيار أكثر من صف واحد
        showCustomAlert('الرجاء اختيار صف واحد فقط للتعديل', true); 
    } else {
        // حالة عدم اختيار أي صف
        showCustomAlert('الرجاء اختيار صف واحد فقط للتعديل', true); 
        console.log("editQuotationModal: لم يتم العثور على صف صالح للتعديل.");
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

// عند تهيئة جدول quotationLinesDataTable:
$(document).ready(function() { // تأكد من أن الكود يعمل بعد تحميل DOM
    if (DOM.quotationLinesTable && !$.fn.DataTable.isDataTable(DOM.quotationLinesTable)) {
        quotationLinesDataTable = $(DOM.quotationLinesTable).DataTable({
            // ... إعدادات DataTables الأخرى ...
        });

        // ربط حقول الإدخال المخصصة بالبحث في الأعمدة
        $('#quotationLinesTable thead tr.filter-row input').on('keyup change', function() {
            quotationLinesDataTable
                .column($(this).parent().index()) // الحصول على فهرس العمود
                .search(this.value)
                .draw();
        });
    }
});

// دالة مسح الفلاتر المعدلة
function clearLinesFilters() {
    if (quotationLinesDataTable) {
        // مسح قيمة حقول الإدخال بصرياً
        $('#quotationLinesTable thead tr.filter-row input').val('');

        // مسح فلاتر DataTables برمجياً وإعادة الرسم
        quotationLinesDataTable.columns().search('').draw();

        alert("Filters cleared for Quote Lines table.");
    } else {
        alert("Quotation Lines table not initialized.");
        console.error("quotationLinesDataTable is null or undefined.");
    }
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
        console.log("Starting export for quotationLinesTable...");

        // 1. استخراج البيانات المرئية/المفلترة فقط
        // استخدام rows({ search: 'applied' }) يضمن أنك تحصل على الصفوف التي تظهر حاليًا بعد أي تصفية أو بحث.
        const dataRows = quotationLinesDataTable.rows({ search: 'applied' }).data();
        const numRows = dataRows.length;

        if (numRows === 0) {
            alert("No data to export in Quote Lines table.");
            console.warn("No rows found in quotationLinesTable with applied filters for export.");
            return;
        }

        // 2. استخراج رؤوس الأعمدة المرئية وتصفيتها
        // DataTables.columns().header() يعطي عناصر الـ <th>
        const headers = quotationLinesDataTable.columns().header().toArray().map(th => th.textContent.trim());

        // قم بتصفية الرؤوس لاستبعاد العمود الفارغ، عمود الإجراءات، وأي رأس لـ checkbox
        // يمكنك إضافة المزيد من الشروط هنا إذا كانت هناك رؤوس أعمدة أخرى لا تريد تصديرها
        const filteredHeaders = headers.filter(header =>
            header !== '' &&          // استبعاد الرؤوس الفارغة (عادة لـ checkboxes أو أعمدة مخصصة)
            header.toLowerCase() !== 'actions' && // استبعاد عمود الإجراءات (غير حساس لحالة الأحرف)
            header.toLowerCase() !== 'select'     // استبعاد رأس عمود التحديد/checkbox إذا كان موجودًا
        );

        console.log("Original Headers:", headers);
        console.log("Filtered Headers for Excel:", filteredHeaders);

        // 3. معالجة وتنظيف بيانات الصفوف
        const cleanedData = [];
        dataRows.each(function(rowData, dataIndex) {
            const tempRow = [];
            // Iterating through all columns that are *visible* or *defined* in DataTables,
            // then filtering them based on the text content for the headers.
            // This approach is more robust for dynamic columns or hidden columns.

            // Get the indices of the columns we want to export
            // We use columns().indexes() to get the actual DataTables column index,
            // then check if its header text is in our filteredHeaders.
            quotationLinesDataTable.columns().every(function(colIdx) {
                const headerText = this.header().textContent.trim();

                if (filteredHeaders.includes(headerText)) {
                    let cellContent = rowData[colIdx];

                    // Check if cellContent is an HTML string and extract text
                    if (typeof cellContent === 'string' && $(cellContent).length > 0) {
                        // Create a temporary div to parse HTML and get text content
                        const tempDiv = $('<div>').html(cellContent);
                        cellContent = tempDiv.text().trim();
                    }
                    // Handle cases where DataTables might store objects or other types
                    else if (typeof cellContent === 'object' && cellContent !== null) {
                        cellContent = String(cellContent); // Convert object to string representation
                    }
                    // If the cell content is empty or only whitespace, convert it to an empty string
                    if (cellContent === undefined || cellContent === null || (typeof cellContent === 'string' && cellContent.trim() === '')) {
                         cellContent = '';
                    }

                    tempRow.push(cellContent);
                }
            });
            cleanedData.push(tempRow);
        });

        console.log("Cleaned Data for Excel:", cleanedData);

        // 4. بناء ورقة العمل والملف Excel
        if (typeof XLSX === 'undefined') {
            console.error("XLSX library (SheetJS) is not loaded. Make sure the script is included.");
            alert("Export failed: XLSX library not found. Please contact support.");
            return;
        }

        const worksheet = XLSX.utils.aoa_to_sheet([filteredHeaders, ...cleanedData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation Lines Data"); // اسم الورقة في Excel
        XLSX.writeFile(workbook, "QuotationLines_Export.xlsx"); // اسم ملف Excel

        alert("Quotation Lines exported to Excel successfully!");
    } else {
        alert("Quotation Lines table not initialized for export.");
        console.error("quotationLinesDataTable is null or undefined. Ensure it's initialized.");
    }
}

function printQuoteLinesTable() {
   if (quotationLinesDataTable) {
        console.log("Preparing quotationLinesTable for printing - ALL COLUMNS AND ROWS...");

        // فهارس الأعمدة التي نريد طباعتها (باستثناء Checkbox و Actions)
        // هذا يتطابق مع ترتيب الأعمدة في HTML
        const columnsToPrintIndexes = [1, 2, 3, 4, 5, 6]; // Service/Test Id to Method

        // 1. استخراج رؤوس الأعمدة المراد طباعتها فقط
        const filteredHeaders = columnsToPrintIndexes.map(idx => {
            const headerElement = quotationLinesDataTable.column(idx).header();
            // تحقق مما إذا كان العنصر موجودًا قبل الوصول إلى textContent
            return headerElement ? headerElement.textContent.trim() : '';
        }).filter(header => header !== ''); // فلتر لأي رؤوس فارغة قد تنتج عن خطأ

        console.log("Original Headers (all - for debugging):", quotationLinesDataTable.columns().header().toArray().map(th => th.textContent.trim()));
        console.log("Filtered Headers for print (by index):", filteredHeaders);

        if (filteredHeaders.length === 0) {
            alert("لا توجد أعمدة صالحة للطباعة (ربما خطأ في فهارس الأعمدة أو رؤوسها فارغة).");
            console.warn("Print aborted: No valid headers found after filtering by index.");
            return;
        }

        // 2. استخراج جميع الصفوف المرئية/المفلترة من DataTables
        const dataRows = quotationLinesDataTable.rows({ search: 'applied' }).data();
        const numRows = dataRows.length;

        console.log("Number of data rows (after filters):", numRows);
        // console.log("Raw data from DataTables (first 5 rows for inspection):", dataRows.toArray().slice(0, 5)); // إلغاء التعليق إذا احتجت لمزيد من التفاصيل

        if (numRows === 0) {
            alert("لا توجد بيانات للطباعة في جدول سطور عروض الأسعار (بعد الفلاتر).");
            console.warn("Print aborted: No rows found in quotationLinesTable with applied filters.");
            return;
        }

        // 3. معالجة وتنظيف بيانات الصفوف لضمان استخراج النص من HTML
        const cleanedData = [];
        dataRows.each(function(rowData, dataIndex) {
            const tempRow = [];
            // المرور فقط على الأعمدة المحددة للطباعة
            columnsToPrintIndexes.forEach(colIdx => {
                let cellContent = rowData[colIdx]; // هذا هو محتوى الخلية الخام من DataTables

                // إذا كان المحتوى سلسلة HTML، استخرج النص منها
                if (typeof cellContent === 'string' && $(cellContent).length > 0) {
                    const tempDiv = $('<div>').html(cellContent);
                    cellContent = tempDiv.text().trim();
                }
                // إذا كان المحتوى كائنًا (مثل كائن زر أو أي شيء آخر)، قم بتحويله إلى سلسلة
                else if (typeof cellContent === 'object' && cellContent !== null) {
                    cellContent = String(cellContent);
                }
                // إذا كان المحتوى فارغًا أو مسافات بيضاء فقط، اجعله سلسلة فارغة
                if (cellContent === undefined || cellContent === null || (typeof cellContent === 'string' && cellContent.trim() === '')) {
                     cellContent = '';
                }

                tempRow.push(cellContent);
            });
            cleanedData.push(tempRow);
        });

        console.log("Cleaned Data for print (first 5 processed rows):", cleanedData.slice(0, 5));

        // 4. بناء جدول HTML للطباعة
        let tableHtml = '<h2>تقرير عروض الأسعار</h2>'; // عنوان للتقرير
        tableHtml += '<table border="1" style="width:100%; border-collapse: collapse;">'; // جدول بحدود بسيطة

        // رؤوس الجدول
        tableHtml += '<thead><tr>';
        filteredHeaders.forEach(header => {
            tableHtml += `<th style="padding: 8px; text-align: left; background-color: #f2f2f2; border: 1px solid #ddd;">${header}</th>`;
        });
        tableHtml += '</tr></thead>';

        // جسم الجدول
        tableHtml += '<tbody>';
        cleanedData.forEach(row => {
            tableHtml += '<tr>';
            row.forEach(cell => {
                tableHtml += `<td style="padding: 8px; border: 1px solid #ddd;">${cell}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody>';
        tableHtml += '</table>';

        console.log("Generated table HTML (check this in console, copy-paste to .html file to verify):", tableHtml);

        // 5. فتح نافذة جديدة للطباعة وعرض الجدول
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>طباعة عروض الأسعار</title>');
        // تضمين CSS لتنسيق الطباعة
        printWindow.document.write('<style>');
        printWindow.document.write(`
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            /* قواعد CSS للطباعة فقط */
            @media print {
                /* إخفاء عناصر غير مرغوب فيها عند الطباعة */
                body * { visibility: hidden; }
                .printable-area, .printable-area * { visibility: visible; }
                .printable-area { position: absolute; left: 0; top: 0; }
                /* ضبط عرض الأعمدة إذا لزم الأمر */
                table { table-layout: fixed; } /* قد يساعد في التحكم في عرض الأعمدة */
            }
        `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div class="printable-area">'); // منطقة قابلة للطباعة
        printWindow.document.write(tableHtml);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close(); // مهم لإغلاق مستند النافذة الجديدة
        printWindow.focus(); // نقل التركيز إلى نافذة الطباعة

        // تأخير الطباعة قليلاً للسماح للمحتوى بالتحميل الكامل
        setTimeout(() => {
            printWindow.print(); // فتح مربع حوار الطباعة
            // printWindow.close(); // يمكنك إزالة التعليق على هذا السطر إذا أردت إغلاق النافذة تلقائيًا بعد الطباعة
        }, 500); // تأخير 500 مللي ثانية (نصف ثانية)

        console.log("Print process initiated for quotationLinesTable.");

    } else {
        alert("Quotation Lines table not initialized for printing.");
        console.error("quotationLinesDataTable is null or undefined for print. Ensure it's initialized.");
    }
}
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
                        // يجب أن تعكس حالة التشيك بوكس الرئيسية حالة priceOnly عند التحميل الأولي
                        // ولكن يمكن تغييرها يدوياً لاحقاً.
                        // هنا نضمن أن مربع الاختيار الرئيسي يظل كما هو
                        return `<input type="checkbox" ${row.priceOnly ? 'checked' : ''}>`; // <--- تعديل هنا: حالة checkbox الصف تعتمد على 'priceOnly' عند التحميل
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
                    const rowNode = $(this).closest('tr');
                    const row = priceListDataTable.row(rowNode);
                    const data = row.data();
                    data.priceOnly = this.checked;
                    row.data(data).draw(false);

                    // إذا تم تغيير checkbox "Price Only" يدوياً، قم بتحديث حالة الـ checkbox الرئيسية للصف
                    const mainCheckbox = rowNode.find('input[type="checkbox"]:first')[0];
                    if (mainCheckbox) {
                        mainCheckbox.checked = this.checked; // اجعل checkbox الرئيسي للصف مطابقاً لحالة Price Only
                        rowNode.toggleClass('selected-row-price-only', this.checked); // طبق أو أزل فئة اللون
                        rowNode.toggleClass('selected-row', this.checked); // وselected-row
                    }
                });
                // Add change listener for 'Active' checkbox
                $('#priceListTable tbody').on('change', '.active-checkbox', function() {
                    const row = priceListDataTable.row($(this).closest('tr'));
                    const data = row.data(); // Get current data
                    data.active = this.checked; // Update the 'active' property
                    row.data(data).draw(false); // Update row data in DataTables
                });

                // NEW: Event listener for individual row checkboxes to toggle selected-row class
                // تم تعديل هذا الجزء ليتعامل مع الفئة الجديدة .selected-row-price-only
                $('#priceListTable tbody').on('change', 'input[type="checkbox"]:first-child', function() {
                    const rowNode = $(this).closest('tr');
                    const rowData = priceListDataTable.row(rowNode).data();
                    const isChecked = this.checked;

                    rowNode.toggleClass('selected-row', isChecked);
                   
                    if (isChecked) {
                        rowNode.removeClass('selected-row-price-only');
                       
                        // const priceOnlyCheckbox = rowNode.find('.price-only-checkbox')[0];
                        // if (priceOnlyCheckbox && rowData.priceOnly) { // فقط إذا كان محدداً مسبقاً بـ Price Only
                        //     priceOnlyCheckbox.checked = false;
                        //     rowData.priceOnly = false;
                        //     priceListDataTable.row(rowNode).data(rowData).draw(false);
                        // }
                    }
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

                    // NEW: عند إعادة رسم الجدول، أعد تطبيق الفئات selected-row-price-only
                    // بناءً على بيانات priceOnly
                    priceListDataTable.rows().every(function() {
                        const rowData = this.data();
                        const rowNode = this.node();
                        const mainCheckbox = $(rowNode).find('input[type="checkbox"]:first')[0]; // Checkbox الرئيسي للصف

                        if (rowData.priceOnly) {
                            $(rowNode).addClass('selected-row-price-only'); // طبق اللون الرمادي
                            // إذا كانت priceOnly صحيحة، تأكد أن الـ checkbox الرئيسي للصف محدد
                            if (mainCheckbox) {
                                mainCheckbox.checked = true;
                            }
                            $(rowNode).addClass('selected-row'); // أضف فئة التحديد العامة أيضاً
                        } else {
                            // إذا لم تكن priceOnly صحيحة، أزل فئة اللون الرمادي
                            $(rowNode).removeClass('selected-row-price-only');
                            // وتأكد أن الـ checkbox الرئيسي للصف غير محدد إلا إذا تم تحديده يدوياً
                            if (mainCheckbox && !mainCheckbox.checked) {
                                $(rowNode).removeClass('selected-row');
                            }
                        }
                    });
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
        // Remove selected-row class and selected-row-price-only from all rows on refresh
        priceListDataTable.$('tbody tr').removeClass('selected-row selected-row-price-only'); // <--- تعديل هنا
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
 * Toggles the selection of all checkboxes in the Price List table based on 'priceOnly' property.
 * It also applies a visual highlight (grey) to these rows, overriding any blue selection.
 */
function toggleSelectPriceListOnly() {
    // تأكد من تهيئة priceListDataTable
    if (!priceListDataTable) {
        console.warn("Price List DataTable is not initialized.");
        return;
    }

    let allPriceOnlySelected = true; // نفترض أن الكل محدد في البداية
    let rowsToToggle = [];

    // نمر على جميع الصفوف (بما في ذلك الصفوف المخفية بالتصفية أو الترقيم)
    priceListDataTable.rows({ search: 'none', order: 'none', page: 'all' }).every(function() {
        const rowData = this.data();
        const rowNode = this.node();
        const rowCheckbox = $(rowNode).find('input[type="checkbox"]:first');

        if (rowData.priceOnly) {
            // قم بتخزين الصفوف التي تحتوي على priceOnly
            rowsToToggle.push({ rowNode: rowNode, rowCheckbox: rowCheckbox[0] });
            // تحقق مما إذا كانت جميع الصفوف priceOnly محددة حاليًا
            if (!rowCheckbox[0].checked) {
                allPriceOnlySelected = false;
            }
        }
    });

    // إذا كانت جميع الصفوف التي تحتوي على priceOnly محددة بالفعل، فقم بإلغاء تحديدها كلها.
    // وإلا، قم بتحديد كل الصفوف التي تحتوي على priceOnly.
    const newState = !allPriceOnlySelected;

    rowsToToggle.forEach(item => {
        item.rowCheckbox.checked = newState;

        // **** هنا هو الجزء الحاسم لضمان اختفاء الأزرق وظهور الرمادي ****
        if (newState) {
            // إذا كنا نقوم بتحديد "Price Only" (newState = true)
            $(item.rowNode).removeClass('selected-row');     
            $(item.rowNode).addClass('selected-row-price-only'); 
        } else {
            // إذا كنا نقوم بإلغاء تحديد "Price Only" (newState = false)
            $(item.rowNode).removeClass('selected-row-price-only'); 
           
        }
    });

   

    console.log(`Rows with Price Only toggled to: ${newState}`);
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
    // منطق التعديل (حذف القديم وإضافة الجديد)
    // =================================================================
    if (currentEditingRow && selectedItems.length === 1) {
        console.log("addSelectedItemsToQuoteLines: في وضع التعديل (استبدال الصف).");
        console.log("addSelectedItemsToQuoteLines: مرجع الصف الحالي للتعديل:", currentEditingRow);

        const selectedPriceListItem = selectedItems[0];

        // بناء بيانات السطر الجديد لـ quotationLinesDataTable
        // ترتيب الأعمدة (8 أعمدة): Checkbox, Service/Test Id, Line Description, Accounted, Category, Type, Method, Actions
        const newRowData = [
            '<input type="checkbox">', // مربع الاختيار (العمود 0)
            selectedPriceListItem.id, // Service/Test Id (العمود 1)
            // *** تم دمج الكمية والسعر في Line Description ***
            `${selectedPriceListItem.name} (الكمية: ${selectedPriceListItem.quantity}, السعر: ${selectedPriceListItem.price})`, // Line Description (العمود 2)
            selectedPriceListItem.active ? 'نعم' : 'لا', // Accounted (العمود 3)
            selectedPriceListItem.unit, // Category (العمود 4)
            selectedPriceListItem.priceOnly ? 'سعر فقط' : 'عادي', // Type (العمود 5)
            selectedPriceListItem.method, // Method (العمود 6)
            // أزرار الإجراءات - (العمود 7 - الأخير)
            `<button class="btn btn-sm btn-info edit-btn"><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash-alt"></i></button>`
        ];

        // 1. حذف الصف القديم
        if (currentEditingRow.length) {
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

        currentEditingRow = null;
        closePriceListModal();
        return;
    }

    // =================================================================
    // المنطق الأصلي للإضافة (إذا لم يكن هناك سطر يتم تعديله، أو تم تحديد أكثر من عنصر واحد)
    // =================================================================
    console.log("addSelectedItemsToQuoteLines: في وضع الإضافة (إضافة صفوف جديدة).");
    if (withGroups) {
        // إضافة صف رأس المجموعة إذا تم تحديد ذلك
        const groupHeaderData = [
            '', `<span style="font-weight: bold;">مجموعة من ${selectedItems.length} عناصر</span>`,
            '', '', '', '', '', '' // 8 أعمدة لـ groupHeaderData
        ];
        const groupRow = quotationLinesDataTable.row.add(groupHeaderData).draw(false).node();
        $(groupRow).addClass('group-header-row');
        console.log("addSelectedItemsToQuoteLines: تم إضافة رأس المجموعة.");
    }

    selectedItems.forEach(item => {
        const newRowData = [
            '<input type="checkbox">',
            item.id,
            // *** تم دمج الكمية والسعر في Line Description ***
            `${item.name} (الكمية: ${item.quantity}, السعر: ${item.price})`,
            item.active ? 'نعم' : 'لا',
            item.unit,
            item.priceOnly ? 'سعر فقط' : 'عادي',
            item.method,
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
    
  // ربط زر الإغلاق "Close"
    $('#closeLinesTabBtn').on('click', function() {
        closeQuotationModal();
        console.log("Close Lines tab button clicked.");
    });

    // ربط زر "Save Lines"
    $('#saveLinesTabBtn').on('click', function() {
        saveQuoteLines();
        console.log("Save Lines tab button clicked.");
    });

    // ربط زر "Save Lines & Close"
    $('#saveAndCloseLinesTabBtn').on('click', function() {
        saveAndCloseQuoteLines();
        console.log("Save Lines & Close tab button clicked.");
    });

  
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
