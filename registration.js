// Function to open the first modal (registration category) automatically on page load
function openRegistrationCategoryModal() {
    document.getElementById('registration-category-modal').style.display = 'flex';
}

// Function to close any modal by its ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to handle the category selection and show the main form and tab
function checkCategorySelection(category) {
    if (category === 'crushing-testing') {
        closeModal('registration-category-modal');
        document.getElementById('registration-tab-header').style.display = 'flex';
        document.getElementById('registration-content').style.display = 'block';
        // 💡 أضف هذا السطر لإظهار الفوتر هنا
        document.getElementById('form-footer-buttons').style.display = 'flex'; 

        resetAndDisableForm();
    } else {
        // ... Other category logic ...
    }
}

// Function to close only the main content and the tab header
function closeRegistrationTab() {
    document.getElementById('registration-content').style.display = 'none';
    document.getElementById('registration-tab-header').style.display = 'none';
    resetAndDisableForm();
}

// Function to handle sub-tab switching
function showSubTab(tabId) {
    document.querySelectorAll('.sub-tab-content').forEach(content => {
        content.classList.remove('active-sub-tab-content');
    });
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.classList.remove('active-sub-tab');
    });
    document.getElementById(tabId).classList.add('active-sub-tab-content');
    event.target.classList.add('active-sub-tab');
}
// Variable to hold the current sequential number. 
// It's initialized to 1 to start the sequence from 00001.
let currentOrderNumber = 1;

// دالة لتوليد رقم تسلسلي مع بادئة (prefix) معينة
function generateSequentialCode(prefix) {
    const year = '25'; // السنة ثابتة حسب الطلب
    
    // تحويل الرقم الحالي إلى نص وإضافة أصفار في البداية حتى يصبح طوله 5
    const paddedNumber = String(currentOrderNumber).padStart(5, '0');
    
    // زيادة العداد ليكون جاهزاً للطلب التالي
    currentOrderNumber++;

    return `${prefix}-${year}-${paddedNumber}`;
} 
// Function to enable the form when "New" is clicked
function enableForm() {
   // 💡 أضف هذا السطر
    closeModal('registration-category-modal');
    var formElements = document.querySelectorAll('#registration-content input, #registration-content select, #registration-content textarea');
    formElements.forEach(function(element) {
        element.removeAttribute('disabled');
    });

    document.getElementById('save-btn').removeAttribute('disabled');
    document.getElementById('save-close-btn').removeAttribute('disabled');
    document.getElementById('actions-btn').removeAttribute('disabled');

    const orderNoField = document.getElementById('order-no');
    orderNoField.removeAttribute('disabled');
    const newCodeBase = generateSequentialCode('AAM-CO');
    orderNoField.value = newCodeBase;
    orderNoField.setAttribute('readonly', 'true');
    orderNoField.classList.add('readonly-input');

    const sampleNoField = document.getElementById('sample-no');
    sampleNoField.removeAttribute('disabled');
    const newSampleCode = newCodeBase.replace('AAM-CO', 'AAM-CS');
    sampleNoField.value = newSampleCode;
    sampleNoField.setAttribute('readonly', 'true');
    sampleNoField.classList.add('readonly-input');

    const orderDateField = document.getElementById('order-date');
    orderDateField.removeAttribute('disabled');
    const now = new Date();
    const formattedDate = `${now.getFullYear().toString()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    orderDateField.value = `${formattedDate}T${formattedTime}`; // تنسيق datetime-local
    orderDateField.setAttribute('readonly', 'true');
    orderDateField.classList.add('readonly-input');

    const projectCodeField = document.getElementById('project-code');
    projectCodeField.removeAttribute('disabled');
    projectCodeField.value = '';

    const confirmationField = document.getElementById('confirmation');
    confirmationField.removeAttribute('disabled');
    confirmationField.value = '';

    // ===================================================
    // 💡 التعديلات الجديدة هنا لتعبئة حقول التاريخ والوقت
    // ===================================================

    const receivedAtField = document.getElementById('received-at');
    receivedAtField.removeAttribute('disabled');
    receivedAtField.value = `${formattedDate}T${formattedTime}`;
    receivedAtField.setAttribute('readonly', 'true');

    const sampledAtField = document.getElementById('sampled-at');
    sampledAtField.removeAttribute('disabled');
    sampledAtField.value = `${formattedDate}T${formattedTime}`;
    sampledAtField.setAttribute('readonly', 'true');

    const castedAtField = document.getElementById('casted-at');
    castedAtField.removeAttribute('disabled');
    castedAtField.value = `${formattedDate}T${formattedTime}`;
    castedAtField.setAttribute('readonly', 'true');

    // ===================================================
    // نهاية التعديلات الجديدة
    // ===================================================

    // تفعيل جميع الأيقونات القابلة للنقر عن طريق تحويل 'data-onclick' إلى 'onclick'
    const dropdownIcons = document.querySelectorAll('[data-onclick]');
    dropdownIcons.forEach(icon => {
        const functionCall = icon.getAttribute('data-onclick');
        if (functionCall) {
            icon.setAttribute('onclick', functionCall);
            icon.removeAttribute('data-onclick');
            icon.style.pointerEvents = 'auto'; // تأكد من تفعيل مؤشر الماوس
            icon.style.cursor = 'pointer'; // تغيير شكل المؤشر
        }
    });

    // فتح القائمة المنسدلة لـ "Project Code" بشكل تلقائي
    openProjectCodeDropdown();
    projectCodeField.focus();
}
function openLabDropdown() {
    const dropdown = document.getElementById('lab-dropdown');
    dropdown.style.setProperty('display', 'block', 'important');
}
function selectLab(locationName, department) {
    const labField = document.getElementById('lab');
    // You can customize how the text is displayed. For example:
    labField.value = `${locationName} (${department})`;
    
    // Hide the dropdown after selection
    document.getElementById('lab-dropdown').style.display = 'none';
}

// دالة لفتح القائمة المنسدلة للمشاريع (لم تتغير)
function openProjectCodeDropdown() {
    const dropdown = document.getElementById('project-code-dropdown');
    dropdown.style.setProperty('display', 'block', 'important');
}

// دالة لاختيار قيمة من القائمة المنسدلة للمشاريع
function selectProjectCode(code, projectNo, projectName, customerName) {
    document.getElementById('project-code').value = code;
    document.getElementById('project-no').value = projectNo;
    document.getElementById('project').value = projectName;
    document.getElementById('customer').value = customerName;
    document.getElementById('project-code-dropdown').style.display = 'none';

    // **MODIFIED CODE:** Show the Confirmation icon and hide the Search icon
    document.querySelector('.project-code-icons .fa-search').style.display = 'none';
    document.querySelector('.project-code-icons .fa-check').style.display = 'none';
    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'block';
}

// دالة لتطبيق الاختيار على حقل Confirmation
function applySelectedConfirmation() {
    if (selectedConfirmationRow) {
        const description = selectedConfirmationRow.cells[1].innerText;
        const confDate = selectedConfirmationRow.cells[3].innerText;
        
        const confirmationText = `${description} - ${confDate}`;
        const confirmationField = document.getElementById('confirmation');
        confirmationField.value = confirmationText;
        confirmationField.setAttribute('readonly', 'readonly');
        confirmationField.classList.add('readonly-input');

        alert("Confirmation applied successfully!");
        closeModal('confirmation-selection-modal');
    } else {
        alert("Please select an item first.");
    }
}


// =========================================================
// ** الدوال الجديدة لإدارة نافذة الـ Confirmation المنبثقة **
// =========================================================

// متغير لتخزين السطر المختار
let selectedConfirmationRow = null;

// دالة لفتح النافذة المنبثقة "Select from Confirmation"
function openConfirmationSelectionModal() {
    const confirmationField = document.getElementById('confirmation');
    if (!confirmationField.disabled) {
        document.getElementById('confirmation-selection-modal').style.display = 'flex';
        // إضافة مستمع للأحداث لحقل البحث الجديد
        const searchInput = document.getElementById('confirmation-search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', searchConfirmationTable);
        }
        // ... (يمكنك هنا استدعاء دالة لجلب البيانات وتعبئة الجدول) ...
    }
}

// دالة لاختيار سطر واحد من الجدول
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

// ** دالة جديدة للبحث في جدول الـ Confirmation **
// =========================================================
function searchConfirmationTable() {
    // الحصول على قيمة البحث وتحويلها إلى أحرف صغيرة لتسهيل المقارنة
    const searchText = document.getElementById('confirmation-search-input').value.toLowerCase();
    const tableBody = document.getElementById('confirmation-table-body');
    const rows = tableBody.getElementsByTagName('tr');

    // المرور على كل صف في الجدول
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;

        // البحث في محتوى الخلايا المحددة (مثلاً: C. Description و C. S/T ID)
        const cDescription = cells[1].innerText.toLowerCase(); // Column C. Description
        const cStId = cells[4].innerText.toLowerCase(); // Column C. S/T ID

        if (cDescription.includes(searchText) || cStId.includes(searchText)) {
            found = true;
        }

        // إظهار أو إخفاء الصف بناءً على نتيجة البحث
        if (found) {
            row.style.display = ''; // إظهار الصف
        } else {
            row.style.display = 'none'; // إخفاء الصف
        }
    }
}
// =========================================================
// ** الدوال الجديدة لإدارة نافذة التأكيد المنبثقة **
// =========================================================

// دالة لإنشاء وعرض النافذة المنبثقة للتأكيد
function showConfirmationPrompt() {
    // إنشاء النافذة المنبثقة ديناميكيًا لتجنب تكرارها في HTML
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

    // إضافة النافذة المنبثقة إلى DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// دالة لإغلاق النافذة المنبثقة للتأكيد
function closeConfirmationPrompt() {
    const modal = document.getElementById('confirmation-prompt-modal');
    if (modal) {
        modal.remove();
    }
}

// دالة لتأكيد أو إلغاء الاختيار
function confirmSelection(isConfirmed) {
    if (isConfirmed && selectedConfirmationRow) {
        // الحصول على وصف البند وتاريخه من السطر المختار
        // Correctly get the data from the selected row's cells
        const description = selectedConfirmationRow.children[1].innerText; // 'C. Description' column
        const confDate = selectedConfirmationRow.children[3].innerText;     // 'Conf. Date' column
        
        // إنشاء السلسلة التي سيتم عرضها في حقل الإدخال
        const confirmationText = `${description} - ${confDate}`;
        
        // تعبئة حقل Confirmation بالنص وجعله للقراءة فقط (read-only)
        const confirmationField = document.getElementById('confirmation');
        confirmationField.value = confirmationText;
        confirmationField.setAttribute('readonly', 'readonly');
        
        // إضافة فئة (class) لجعل الحقل يظهر بلون رمادي
        confirmationField.classList.add('readonly-input');
        
        alert("Confirmation applied successfully!");
    } else {
        alert("Selection was not confirmed or no item was selected.");
    }
    
    // إغلاق نافذة التأكيد المنبثقة الجديدة
    closeConfirmationPrompt();
}

// دالة لتعطيل النموذج وإعادة تهيئته (تم التعديل لإزالة فئة اللون الرمادي)
function resetAndDisableForm() {
    var formElements = document.querySelectorAll('#registration-content input, #registration-content select, #registration-content textarea');
    formElements.forEach(function(element) {
        element.setAttribute('disabled', 'true');
        element.removeAttribute('readonly');
        element.classList.remove('readonly-input'); // إزالة الفئة عند إعادة التعيين
    });
    
    
    // الأزرار ستكون مرئية دائماً لكنها معطلة
    document.getElementById('save-btn').setAttribute('disabled', 'true');
    document.getElementById('save-close-btn').setAttribute('disabled', 'true');
    document.getElementById('actions-btn').setAttribute('disabled', 'true');

    document.getElementById('new-btn').removeAttribute('disabled');
    
    // إعادة تهيئة حقل Confirmation
    document.getElementById('confirmation').value = '';
    document.querySelector('.project-code-icons .icon-btn-confirmation').style.display = 'none';
    document.querySelector('.project-code-icons .fa-search').style.display = 'block';
    document.getElementById('lab').value = '';
}


// Listener لإغلاق القوائم عند النقر خارجها (تم تحديثه)
document.addEventListener('click', (event) => {
    const projectDropdown = document.getElementById('project-code-dropdown');
    const projectContainer = document.querySelector('.custom-autocomplete-container');
    if (projectDropdown && projectContainer && !projectContainer.contains(event.target)) {
        projectDropdown.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    resetAndDisableForm();
    openRegistrationCategoryModal();
}); function toggleOrderNoDropdown() {
        const dropdown = document.getElementById('order-no-dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }

    function selectOrderNo(value) {
        document.getElementById('order-number-footer').value = value;
        toggleOrderNoDropdown();
    }

    // Optional: Close dropdown when clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.order-no-footer') && !event.target.matches('.icon-btn')) {
            const dropdown = document.getElementById('order-no-dropdown');
            if (dropdown && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    }
