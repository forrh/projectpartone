// main.js

// ===================== تبديل الوضع الليلي =====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// ===================== إعدادات اللغة =====================
const translations = {
    'en': {
        'LIMS Control Panel': 'LIMS Control Panel',
        'General': 'General',
        'Geotechnical': 'Geotechnical',
        'Calibration': 'Calibration',
        'Fleet': 'Fleet',
        'Dashboards': 'Dashboards',
        'Security': 'Security',
        'Options': 'Options',
        'Transactions': 'Transactions',
        'Customers': 'Customers',
        'Projects': 'Projects',
        'Quotations': 'Quotations',
        'Sales Order': 'Sales Order',
        'Invoices': 'Invoices',
        'Receipts': 'Receipts',
        'Samples': 'Samples',
        'Test Requests': 'Test Requests',
        'Test Reports': 'Test Reports',
        'Setup': 'Setup',
        'Company Details': 'Company Details',
        'Users': 'Users',
        'Customers Setup': 'Customers Setup',
        'Projects Setup': 'Projects Setup',
        'Quotations Setup': 'Quotations Setup',
        'Sales Setup': 'Sales Setup',
        'Invoicing Setup': 'Invoicing Setup',
        'Receipts Setup': 'Receipts Setup',
        'Sample Setup': 'Sample Setup',
        'Test Setup': 'Test Setup',
        'Test Reports Setup': 'Test Reports Setup',
        'Business Units': 'Business Units',
        // Common elements across pages
        'Add': 'Add',
        'Edit': 'Edit',
        'Delete': 'Delete',
        'File Manager': 'File Manager',
        'Export to Excel': 'Export to Excel',
        'Print': 'Print',
        // Modal & Form elements
        'Customer Details': 'Customer Details',
        'Customer': 'Customer',
        'Contacts': 'Contacts',
        'Customer ID': 'Customer ID',
        'Name': 'Name',
        'Arabic Name': 'Arabic Name',
        'Legal Name': 'Legal Name',
        'Customer Type': 'Customer Type',
        'Registration Date': 'Registration Date',
        'Country': 'Country',
        'City': 'City',
        'Email': 'Email',
        'Mobile': 'Mobile',
        'Select Type': 'Select Type',
        'Contractor': 'Contractor',
        'Consultant': 'Consultant',
        'Contact Person Name': 'Contact Person Name',
        'Contact Person Email': 'Contact Person Email',
        'Contact Person Phone': 'Contact Person Phone',
        'Save': 'Save',
        'Reset': 'Reset',
        'Cancel': 'Cancel',
        // Placeholder and title texts
        'e.g., mail@example.com': 'e.g., mail@example.com',
        'e.g., +9665XXXXXXXX': 'e.g., +9665XXXXXXXX',
        'Phone number must be in international format (starts with +) and 10 to 15 digits long': 'Phone number must be in international format (starts with +) and 10 to 15 digits long',
        'Search...': 'Search...',
        'All': 'All',
        // New translations for alerts and confirmations
        'Success!': 'Success!',
        'Error!': 'Error!',
        'Warning!': 'Warning!',
        'Information': 'Information',
        'Question': 'Question',
        'Notification': 'Notification',
        'Ok': 'Ok',
        'Are you sure?': 'Are you sure?',
        'Yes, proceed!': 'Yes, proceed!',
        'Confirmation': 'Confirmation'
    },
    'ar': {
        'LIMS Control Panel': 'لوحة تحكم نظام إدارة المختبرات',
        'General': 'عام',
        'Geotechnical': 'جيوتكنيكال',
        'Calibration': 'معايرة',
        'Fleet': 'أسطول',
        'Dashboards': 'لوحات المعلومات',
        'Security': 'أمان',
        'Options': 'خيارات',
        'Transactions': 'المعاملات',
        'Customers': 'العملاء',
        'Projects': 'المشاريع',
        'Quotations': 'عروض الأسعار',
        'Sales Order': 'أمر المبيعات',
        'Invoices': 'الفواتير',
        'Receipts': 'الإيصالات',
        'Samples': 'العينات',
        'Test Requests': 'طلبات الاختبار',
        'Test Reports': 'تقارير الاختبار',
        'Setup': 'الإعدادات',
        'Company Details': 'تفاصيل الشركة',
        'Users': 'المستخدمون',
        'Customers Setup': 'إعدادات العملاء',
        'Projects Setup': 'إعدادات المشاريع',
        'Quotations Setup': 'إعدادات عروض الأسعار',
        'Sales Setup': 'إعدادات المبيعات',
        'Invoicing Setup': 'إعدادات الفواتير',
        'Receipts Setup': 'إعدادات الإيصالات',
        'Sample Setup': 'إعدادات العينات',
        'Test Setup': 'إعدادات الاختبارات',
        'Test Reports Setup': 'إعدادات تقارير الاختبار',
        'Business Units': 'وحدات الأعمال',
        // Common elements across pages
        'Add': 'إضافة',
        'Edit': 'تعديل',
        'Delete': 'حذف',
        'File Manager': 'إدارة الملفات',
        'Export to Excel': 'تصدير إلى Excel',
        'Print': 'طباعة',
        // Modal & Form elements
        'Customer Details': 'تفاصيل العميل',
        'Customer': 'العميل',
        'Contacts': 'جهات الاتصال',
        'Customer ID': 'معرف العميل',
        'Name': 'الاسم',
        'Arabic Name': 'الاسم بالعربية',
        'Legal Name': 'الاسم القانوني',
        'Customer Type': 'نوع العميل',
        'Registration Date': 'تاريخ التسجيل',
        'Country': 'الدولة',
        'City': 'المدينة',
        'Email': 'البريد الإلكتروني',
        'Mobile': 'الجوال',
        'Select Type': 'اختر النوع',
        'Contractor': 'مقاول',
        'Consultant': 'استشاري',
        'Contact Person Name': 'اسم جهة الاتصال',
        'Contact Person Email': 'بريد جهة الاتصال الإلكتروني',
        'Contact Person Phone': 'هاتف جهة الاتصال',
        'Save': 'حفظ',
        'Reset': 'إعادة تعيين',
        'Cancel': 'إلغاء',
        // Placeholder and title texts
        'e.g., mail@example.com': 'مثال: mail@example.com',
        'e.g., +9665XXXXXXXX': 'مثال: +9665XXXXXXXX',
        'Phone number must be in international format (starts with +) and 10 to 15 digits long': 'يجب أن يكون الرقم بصيغة دولية (يبدأ بـ +) وبطول 10 إلى 15 رقماً',
        'Search...': 'بحث...',
        'All': 'الكل',
        // New translations for alerts and confirmations
        'Success!': 'نجاح!',
        'Error!': 'خطأ!',
        'Warning!': 'تحذير!',
        'Information': 'معلومات',
        'Question': 'سؤال',
        'Notification': 'إشعار',
        'Ok': 'موافق',
        'Are you sure?': 'هل أنت متأكد؟',
        'Yes, proceed!': 'نعم، تابع!',
        'Confirmation': 'تأكيد'
    }
};

function getTranslatedText(key) {
    const lang = localStorage.getItem('language') || 'en';
    return translations[lang][key] || key;
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations();
    updatePlaceholderAndTitleAttributes();
    document.documentElement.lang = lang; // تحديث سمة lang في وسم <html>

    // تحديث الحالة النشطة لأزرار اللغة في الهيدر
    document.querySelectorAll('.main-header button').forEach(button => {
        if (button.onclick && button.onclick.toString().includes(`setLanguage('${lang}')`)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // تحديث اتجاه النص للصفحة بأكملها
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = getTranslatedText(key);
    });

    // ترجمة حقول الإدخال التي تحتوي على placeholder
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        const placeholderKey = input.getAttribute('placeholder');
        if (placeholderKey && translations['en'][placeholderKey]) { // تحقق إذا كان المفتاح موجوداً للترجمة
            input.setAttribute('placeholder', getTranslatedText(placeholderKey));
        }
    });

    // ترجمة حقول الإدخال التي تحتوي على title (للتحقق من صحة الإدخال مثلاً)
    document.querySelectorAll('input[title], textarea[title]').forEach(input => {
        const titleKey = input.getAttribute('title');
        if (titleKey && translations['en'][titleKey]) { // تحقق إذا كان المفتاح موجوداً للترجمة
            input.setAttribute('title', getTranslatedText(titleKey));
        }
    });

    // ترجمة الـ options في الـ select elements
    document.querySelectorAll('select.column-filter option').forEach(option => {
        const optionText = option.textContent;
        // فقط ترجم الخيارات التي لدينا ترجمة لها
        if (translations['en'][optionText]) {
            option.textContent = getTranslatedText(optionText);
        }
    });
}

// دالة لتحديث قيم placeholder و title بعد تغيير اللغة
function updatePlaceholderAndTitleAttributes() {
    const lang = localStorage.getItem('language') || 'en';

    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        const originalPlaceholder = input.getAttribute('data-original-placeholder') || input.placeholder;
        if (!input.hasAttribute('data-original-placeholder')) {
            input.setAttribute('data-original-placeholder', originalPlaceholder);
        }
        input.placeholder = translations[lang][originalPlaceholder] || originalPlaceholder;
    });

    document.querySelectorAll('input[title], textarea[title]').forEach(input => {
        const originalTitle = input.getAttribute('data-original-title') || input.title;
        if (!input.hasAttribute('data-original-title')) {
            input.setAttribute('data-original-title', originalTitle);
        }
        input.title = translations[lang][originalTitle] || originalTitle;
    });
}


// ==================== دوال التنبيهات والتأكيدات (Alerts & Confirmations) ====================

/**
 * تعرض رسالة تنبيه مخصصة باستخدام SweetAlert2.
 * @param {string} message - الرسالة المراد عرضها.
 * @param {string} type - نوع الرسالة ('success', 'error', 'warning', 'info', 'question').
 * @param {string} title - عنوان التنبيه (اختياري، سيتم تحديده تلقائياً إذا لم يتم توفيره).
 */
function showAlert(message, type = 'info', title = '') {
    // تحقق مما إذا كانت مكتبة SweetAlert2 محملة
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 library is not loaded. Cannot display alert. Falling back to native alert.');
        alert(message); // العودة إلى alert الأصلية إذا لم تكن SweetAlert2 موجودة
        return;
    }

    // تعيين العنوان الافتراضي بناءً على النوع (باستخدام الترجمة)
    if (!title) {
        switch (type) {
            case 'success':
                title = getTranslatedText('Success!');
                break;
            case 'error':
                title = getTranslatedText('Error!');
                break;
            case 'warning':
                title = getTranslatedText('Warning!');
                break;
            case 'info':
                title = getTranslatedText('Information');
                break;
            case 'question':
                title = getTranslatedText('Question');
                break;
            default:
                title = getTranslatedText('Notification');
        }
    }

    Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: getTranslatedText('Ok')
    });
}

/**
 * تعرض رسالة تأكيد مخصصة باستخدام SweetAlert2 وتنفذ دالة رد الاتصال بناءً على اختيار المستخدم.
 * @param {string} message - رسالة التأكيد.
 * @param {function} callback - الدالة التي ستُنفذ إذا وافق المستخدم.
 * @param {string} title - عنوان التأكيد (اختياري).
 * @param {string} confirmButtonText - نص زر التأكيد (اختياري).
 * @param {string} cancelButtonText - نص زر الإلغاء (اختياري).
 */
function showConfirm(message, callback, title = '', confirmButtonText = '', cancelButtonText = '') {
    // تحقق مما إذا كانت مكتبة SweetAlert2 محملة
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 library is not loaded. Cannot display confirmation. Falling back to native confirm.');
        if (confirm(message)) { // العودة إلى confirm الأصلية إذا لم تكن SweetAlert2 موجودة
            callback();
        }
        return;
    }

    // تعيين العناوين والنصوص الافتراضية بناءً على الترجمة
    if (!title) title = getTranslatedText('Are you sure?');
    if (!confirmButtonText) confirmButtonText = getTranslatedText('Yes, proceed!');
    if (!cancelButtonText) cancelButtonText = getTranslatedText('Cancel');

    Swal.fire({
        title: title,
        text: message,
        icon: 'warning', // عادة ما يكون تحذيرًا للتأكيد
        showCancelButton: true,
        confirmButtonColor: '#3085d6', // لون أزرق لزر التأكيد
        cancelButtonColor: '#d33',     // لون أحمر لزر الإلغاء
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

/**
 * تصدير جدول HTML إلى ملف Excel (xlsx) بناءً على العملاء المحددين فقط.
 * يتطلب مكتبة SheetJS (xlsx.full.min.js).
 * @param {string} tableId - معرف (ID) جدول HTML المراد تصديره.
 * @param {string} filename - اسم الملف الناتج (بدون امتداد).
 */
function exportTableToExcel(tableId, filename = 'data') {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        showAlert(`الجدول بالمعرف '${tableId}' غير موجود.`, 'error');
        return;
    }

    if (!window[tableId + 'DataTable']) {
        showAlert("DataTables غير مُهيأ لهذا الجدول. لا يمكن تصدير البيانات المحددة.", "error");
        return;
    }

    const dt = window[tableId + 'DataTable'];
    const selectedCheckboxes = document.querySelectorAll(`#${tableId} .selectCustomer:checked`);

    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء تحديد عميل واحد على الأقل للتصدير.", "warning");
        return;
    }

    let selectedData = [];
    selectedCheckboxes.forEach(checkbox => {
        const rowElement = checkbox.closest('tr');
        if (rowElement) {
            const rowData = dt.row(rowElement).data();
            // استبعاد العمود الأول (مربع الاختيار)
            selectedData.push(rowData.slice(1));
        }
    });

    // جلب رؤوس الأعمدة النظيفة (باستثناء عمود مربع الاختيار)
    const headerRow = table.querySelector('thead tr');
    let headers = [];
    if (headerRow) {
        Array.from(headerRow.children).forEach((th, index) => {
            // تخطي عمود checkbox الأول (index 0)
            if (index > 0) {
                const textContent = th.childNodes[0] ? th.childNodes[0].textContent.trim() : ''; // Get text before input
                if (textContent) {
                    headers.push(textContent);
                }
            }
        });
    }

    // دمج الرؤوس مع البيانات المحددة
    const wsData = [headers, ...selectedData];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    showAlert('تم تصدير العملاء المحددين إلى Excel بنجاح!', 'success');
}


/**
 * طباعة محتوى جدول HTML للعملاء المحددين فقط.
 * @param {string} tableId - معرف (ID) جدول HTML المراد طباعته.
 * @param {string} title - العنوان الذي سيظهر في رأس صفحة الطباعة.
 */
function printTable(tableId, title = 'تقرير') {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        showAlert(`الجدول بالمعرف '${tableId}' غير موجود.`, 'error');
        return;
    }

    const selectedCheckboxes = document.querySelectorAll(`#${tableId} .selectCustomer:checked`);

    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء تحديد عميل واحد على الأقل للطباعة.", "warning");
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>' + title + '</title>');
    // يمكنك تضمين ملفات CSS هنا للحفاظ على التنسيق
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">');
    printWindow.document.write('<link rel="stylesheet" href="main.css">'); // أضف ملفات الـ CSS الخاصة بك
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; }');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
    printWindow.document.write('th { background-color: #f2f2f2; }');
    printWindow.document.write('</style>'); // لا نحتاج لـ @media print { .column-filter { display: none; } } هنا لأننا سنبني جدول جديد
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>' + title + '</h1>');

    // إنشاء جدول جديد للطباعة يحتوي على العملاء المحددين فقط
    const printTableElement = document.createElement('table');
    printTableElement.className = 'display responsive nowrap'; // احتفظ بفئات DataTables إذا أردت تنسيقاتها

    // إضافة رأس الجدول المعدل
    const originalThead = table.querySelector('thead tr');
    if (originalThead) {
        const newThead = printTableElement.createTHead();
        const newHeaderRow = newThead.insertRow();
        Array.from(originalThead.children).forEach((th, index) => {
            if (index > 0) { // تخطي أول عمود (Checkbox)
                const newTh = th.cloneNode(true);
                // إزالة أي مدخلات بحث داخل رأس العمود (column-filter)
                const filters = newTh.querySelectorAll('.column-filter');
                filters.forEach(filter => filter.remove());
                newHeaderRow.appendChild(newTh);
            }
        });
    }

    // إضافة صفوف العملاء المحددين
    const newTbody = printTableElement.createTBody();
    selectedCheckboxes.forEach(checkbox => {
        const originalRow = checkbox.closest('tr');
        if (originalRow) {
            const newRow = newTbody.insertRow();
            Array.from(originalRow.children).forEach((td, index) => {
                if (index > 0) { // تخطي أول عمود (Checkbox)
                    const newTd = td.cloneNode(true);
                    newRow.appendChild(newTd);
                }
            });
        }
    });

    printWindow.document.write(printTableElement.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    showAlert('تم طباعة العملاء المحددين بنجاح!', 'success');
}