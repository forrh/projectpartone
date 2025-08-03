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
        // إخفاء النافذة الأولى
        closeModal('registration-category-modal');
        // إظهار المسار (التبويب)
        document.getElementById('registration-tab-header').style.display = 'flex';
        // إظهار المحتوى الرئيسي للصفحة
        document.getElementById('registration-content').style.display = 'block';

        // **إضافة جديدة: عند فتح النموذج، يتم تعطيله تلقائياً**
        resetAndDisableForm();
    } else {
        // ... منطق الفئات الأخرى ...
    }
}

// Function to close only the main content and the tab header, without redirecting
function closeRegistrationTab() {
    // إخفاء المحتوى الرئيسي
    document.getElementById('registration-content').style.display = 'none';
    // إخفاء المسار
    document.getElementById('registration-tab-header').style.display = 'none';
    
    // **إضافة جديدة: عند إغلاق التبويب، نعيد تهيئة النموذج وتعطيله**
    resetAndDisableForm();
}

// Function to handle sub-tab switching
function showSubTab(tabId) {
    // Hide all sub-tab contents
    document.querySelectorAll('.sub-tab-content').forEach(content => {
        content.classList.remove('active-sub-tab-content');
    });

    // Deactivate all sub-tabs
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.classList.remove('active-sub-tab');
    });

    // Show the selected sub-tab content
    document.getElementById(tabId).classList.add('active-sub-tab-content');

    // Activate the clicked sub-tab
    event.target.classList.add('active-sub-tab');
}

// **إضافة جديدة: دالة لتفعيل النموذج عند الضغط على زر "New"**
// ... (بقية الدوال كما هي) ...

// دالة لتفعيل النموذج عند الضغط على زر "New"
function enableForm() {
    // الحصول على جميع حقول الإدخال والـ select في النموذج
    var formElements = document.querySelectorAll('#registration-content input, #registration-content select, #registration-content textarea');
    
    // تفعيل كل حقل بإزالة خاصية 'disabled'
    formElements.forEach(function(element) {
        element.removeAttribute('disabled');
    });

    // تفعيل أزرار الحفظ
    document.getElementById('save-btn').removeAttribute('disabled');
    document.getElementById('save-close-btn').removeAttribute('disabled');

    // تعطيل زر 'New' بعد الضغط عليه
    document.getElementById('new-btn').setAttribute('disabled', 'true');

    // الجزء الجديد: تعبئة حقل Project Code وفتح القائمة المنسدلة
    const projectCodeInput = document.getElementById('project-code');
    projectCodeInput.value = 'AAM-';

    // إظهار القائمة المنسدلة
    openProjectCodeDropdown();
}

// دالة لفتح القائمة المنسدلة
function openProjectCodeDropdown() {
    const dropdown = document.getElementById('project-code-dropdown');
    // لضمان أن القائمة تظهر فقط إذا كان زر "New" قد تم الضغط عليه
    if (document.getElementById('new-btn').disabled) {
        dropdown.style.display = 'block'; 
    }
}

// دالة لاختيار قيمة من القائمة المنسدلة
function selectProjectCode(code, projectNo, projectName, customerName) {
    // تعبئة الحقول بالقيم المختارة
    document.getElementById('project-code').value = code;
    document.getElementById('project-no').value = projectNo;
    document.getElementById('project').value = projectName;
    document.getElementById('customer').value = customerName;

    // إخفاء القائمة المنسدلة بعد الاختيار
    document.getElementById('project-code-dropdown').style.display = 'none';
}

// إضافة Listener لإغلاق القائمة عند النقر خارجها
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('project-code-dropdown');
    const container = document.querySelector('.custom-autocomplete-container');
    if (dropdown && container && !container.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// ... (بقية الدوال كما هي) ...

// **إضافة جديدة: دالة لتعطيل النموذج وإعادة تهيئته**
function resetAndDisableForm() {
    // تعطيل جميع حقول الإدخال والـ select
    var formElements = document.querySelectorAll('#registration-content input, #registration-content select, #registration-content textarea');
    formElements.forEach(function(element) {
        element.setAttribute('disabled', 'true');
        // يمكنك أيضاً مسح محتوى الحقول هنا إذا رغبت
        // element.value = '';
    });
    
    // تعطيل أزرار الحفظ
    document.getElementById('save-btn').setAttribute('disabled', 'true');
    document.getElementById('save-close-btn').setAttribute('disabled', 'true');

    // تفعيل زر 'New'
    document.getElementById('new-btn').removeAttribute('disabled');
}


// Call the function on page load to open the first modal automatically
document.addEventListener('DOMContentLoaded', (event) => {
    openRegistrationCategoryModal();
});
