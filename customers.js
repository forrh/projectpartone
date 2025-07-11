let currentCustomerId = null; // متغير لتعقب ID العميل الذي يتم عرضه أو تعديله

// =================== دوال المودال (النافذة المنبثقة) ===================

/**
 * إعادة تعيين (مسح) جميع حقول نموذج العميل باستثناء Customer ID.
 * هذه الدالة لا تقوم بتوليد معرف عميل جديد أو تغيير التبويبة.
 * يتم استدعاؤها عند النقر على زر "Reset" أو عند إغلاق المودال.
 */
function resetCustomerForm() {
    const customerForm = document.getElementById("customerForm");
    if (customerForm) {
        // بدلاً من customerForm.reset() التي تمسح كل شيء، سنمسح الحقول يدوياً.
        // Customer ID (customerId) سيتم استثناؤه من المسح.

        // حقول تبويبة Customer
        document.getElementById("customerName").value = "";
        document.getElementById("customerArabicName").value = "";
        document.getElementById("customerLegalName").value = "";
        document.getElementById("customerType").value = ""; // أو تعيين قيمة افتراضية إذا كانت قائمة منسدلة
        document.getElementById("customerCity").value = "";
        document.getElementById("customerEmail").value = "";
        document.getElementById("customerPhone").value = "";

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${yyyy}-${mm}-${dd}`;

        const registrationDateInput = document.getElementById("registrationDate");
        if (registrationDateInput) {
            registrationDateInput.value = todayFormatted; // تعيين تاريخ اليوم كقيمة افتراضية
            registrationDateInput.max = todayFormatted;    // تعيين تاريخ اليوم كحد أقصى (لتعطيل المستقبل)
        }

        // حقول تبويبة Contacts (إذا كانت جزءاً من نفس النموذج وكنت تريد مسحها)
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactPhone").value = "";

        // إعادة ضبط الدولة الافتراضية "Saudi Arabia" بعد المسح
        const customerCountryInput = document.getElementById("customerCountry");
        if (customerCountryInput) {
            customerCountryInput.value = "Saudi Arabia";
        }
    }
}

/**
 * فتح النافذة المنبثقة لإضافة أو تعديل عميل.
 * هذه الدالة لا تقوم بالتحقق من التحديد، بل تفترض أن ID العميل صحيح إذا تم تمريره.
 * @param {string} [customerIdToEdit=null] - معرف العميل إذا كنا بصدد تعديل عميل موجود.
 * إذا كانت قيمتها null أو undefined، فسيتم فتح المودال لوضع الإضافة.
 */
function openCustomerModal(customerIdToEdit = null) {
    const modal = document.getElementById("customerModal");
    const customerIdInput = document.getElementById("customerId");
    const registrationDateInput = document.getElementById("registrationDate");

    if (!modal) {
        console.error("Customer modal not found!");
        return;
    }

    // قم دائماً بمسح النموذج أولاً لضمان حالة نظيفة عند فتح المودال
    resetCustomerForm();

    // يجب أن يتم تعيين `max` في كل مرة يفتح فيها المودال لضمان أنه تاريخ اليوم الحالي
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    if (registrationDateInput) {
        registrationDateInput.max = todayFormatted;
    }

    if (customerIdToEdit) {
        // وضع التعديل: قم بتحميل بيانات العميل الموجود
        currentCustomerId = customerIdToEdit;
        if (customerIdInput) {
            customerIdInput.value = customerIdToEdit;
        }
        // هنا يتم جلب بيانات العميل من DataTables وملء الحقول الأخرى
        // تم التعديل هنا: استخدام window.customersTableDataTable
        const rowData = window.customersTableDataTable.rows().data().toArray().find(row => row[1] === customerIdToEdit);
        if (rowData) {
            document.getElementById("customerName").value = rowData[2];
            document.getElementById("customerArabicName").value = rowData[3];
            document.getElementById("customerLegalName").value = rowData[4];
            document.getElementById("customerType").value = rowData[5];
            if (registrationDateInput) {
                registrationDateInput.value = rowData[6];
            }
            document.getElementById("customerCountry").value = rowData[7];
            document.getElementById("customerCity").value = rowData[8];
            document.getElementById("customerEmail").value = rowData[9];
            document.getElementById("customerPhone").value = rowData[10];
        } else {
            showAlert("لم يتم العثور على بيانات العميل المراد تعديلها.", "error");
            return; // توقف ومنع فتح المودال إذا لم يتم العثور على البيانات
        }
    } else {
        // وضع الإضافة: توليد ID جديد
        currentCustomerId = null;
        let lastId = localStorage.getItem("lastCustomerId");
        lastId = lastId ? parseInt(lastId) : 1000;
        const newId = "AAMC-" + (lastId + 1);
        if (customerIdInput) {
            customerIdInput.value = newId;
        }
    }

    // إظهار النافذة المنبثقة بعد كل عمليات التحقق والملء
    modal.style.display = "flex";

    // دائماً قم بالتبديل إلى تبويبة "Customer" عند فتح المودال (سواء للإضافة أو التعديل)
    switchTab("customer");
}

/**
 * إغلاق النافذة المنبثقة للعميل.
 */
function closeCustomerModal() {
    const modal = document.getElementById("customerModal");
    if (modal) {
        modal.style.display = "none"; // إخفاء النافذة المنبثقة
    }
    // مسح النموذج بالكامل بعد الإغلاق لضمان جاهزيته للمرة القادمة، مع الإبقاء على Customer ID.
    resetCustomerForm();
}

/**
 * التبديل بين تبويبات "Customer" و "Contacts" داخل النافذة المنبثقة.
 * @param {string} tabId - اسم التبويبة المراد عرضها ('customer' أو 'contact').
 */
function switchTab(tabId) {
    // إخفاء جميع محتويات التبويبات وإزالة الفئة 'active' من الأزرار
    // استخدم querySelectorAll للبحث عن العناصر التي تحمل الفئة 'form-tab-content'
    const tabContents = document.querySelectorAll('.form-tab-content');
    tabContents.forEach(tabContent => {
        if (tabContent) { // تحقق إضافي لضمان وجود العنصر
            tabContent.style.display = 'none';
        }
    });

    // إزالة الفئة 'active' من جميع أزرار التبويبات
    const tabButtons = document.querySelectorAll('.tab-buttons button');
    tabButtons.forEach(button => {
        if (button) { // تحقق إضافي لضمان وجود العنصر
            button.classList.remove('active');
        }
    });

    // إظهار محتوى التبويبة المختارة وإضافة الفئة 'active' لزرها
    const selectedTabContent = document.getElementById(tabId + 'Tab'); // يتم البحث عن العنصر هنا
    const clickedButton = document.getElementById(tabId + '-btn'); // ويتم البحث عن العنصر هنا

    if (selectedTabContent) { // <--- التحقق هنا مهم جداً
        selectedTabContent.style.display = 'block'; // أو 'flex' حسب تصميمك
    } else {
        console.error(`Error: Tab content with ID '${tabId}Tab' not found.`);
    }

    if (clickedButton) { // <--- التحقق هنا مهم جداً
        clickedButton.classList.add('active');
    } else {
        console.error(`Error: Tab button with ID '${tabId}-btn' not found.`);
    }
}

/**
 * حفظ بيانات العميل (إضافة جديد أو تعديل موجود).
 * @param {Event} event - كائن الحدث لمنع الإرسال الافتراضي للنموذج.
 */
function saveCustomer(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // --- جلب قيم الحقول أولاً لضمان توفرها للتحقق ---
    const customerId = document.getElementById("customerId")?.value || "";
    const customerName = document.getElementById("customerName")?.value || "";
    const customerArabicName = document.getElementById("customerArabicName")?.value || "";
    const customerLegalName = document.getElementById("customerLegalName")?.value || "";
    const customerType = document.getElementById("customerType")?.value || "";
    const customerCountry = document.getElementById("customerCountry")?.value || "";
    const customerCity = document.getElementById("customerCity")?.value || "";
    const customerEmail = document.getElementById("customerEmail")?.value || "";
    const customerPhone = document.getElementById("customerPhone")?.value || "";
    const registrationDate = document.getElementById("registrationDate")?.value || "";

    // --- جلب قيم حقول Contacts الجديدة ---
    const contactName = document.getElementById("contactName")?.value || "";
    const contactEmail = document.getElementById("contactEmail")?.value || "";
    const contactPhone = document.getElementById("contactPhone")?.value || "";
    // ---------------------------------------------------

    // تجهيز بيانات العميل
    const customerData = {
        id: customerId,
        name: customerName,
        arabicName: customerArabicName,
        legalName: customerLegalName,
        type: customerType,
        registrationDate: registrationDate,
        country: customerCountry,
        city: customerCity,
        email: customerEmail,
        mobile: customerPhone,
        // يمكنك إضافة بيانات Contacts هنا إذا كنت ستحفظها في نفس صف DataTable
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
    };

    // التحقق مما إذا كان جدول العملاء (DataTable) مُهيأ
    // تم التعديل هنا: استخدام window.customersTableDataTable
    if (!window.customersTableDataTable) {
        showAlert("جدول العملاء غير مُهيأ. الرجاء تحديث الصفحة.", "error");
        console.error("DataTable is not initialized.");
        return;
    }

    // البحث عن الصف الموجود لتحديثه (إذا كان وضع التعديل)
    let existingRow = null;
    // تم التعديل هنا: استخدام window.customersTableDataTable
    window.customersTableDataTable.rows().every(function () {
        const rowData = this.data();
        // نفترض أن Customer ID هو العمود الثاني (الفهرس 1)
        if (rowData[1] === customerId) {
            existingRow = this;
            return false; // الخروج من الحلقة بمجرد العثور على الصف
        }
    });

    if (existingRow) {
        // تحديث الصف الموجود في DataTable
        // تأكد من أن ترتيب الأعمدة يطابق ما هو معرف في DataTables initialization
        existingRow.data([
            `<input type="checkbox" class="selectCustomer" value="${customerData.id}">`,
            customerData.id,
            customerData.name,
            customerData.arabicName,
            customerData.legalName,
            customerData.type,
            customerData.registrationDate,
            customerData.country,
            customerData.city,
            customerData.email,
            customerData.mobile,
            // customerData.contactName,
            // customerData.contactEmail,
            // customerData.contactPhone,
        ]).draw();
        console.log(`Customer ${customerId} updated.`);
        showAlert("تم تحديث بيانات العميل بنجاح!", "success");
    } else {
        // إضافة صف جديد إلى DataTable
        // تأكد من أن ترتيب الأعمدة يطابق ما هو معرف في DataTables initialization
        // تم التعديل هنا: استخدام window.customersTableDataTable
        window.customersTableDataTable.row.add([
            `<input type="checkbox" class="selectCustomer" value="${customerData.id}">`,
            customerData.id,
            customerData.name,
            customerData.arabicName,
            customerData.legalName,
            customerData.type,
            customerData.registrationDate,
            customerData.country,
            customerData.city,
            customerData.email,
            customerData.mobile,
            // customerData.contactName,
            // customerData.contactEmail,
            // customerData.contactPhone,
        ]).draw();
        console.log(`New customer ${customerId} added.`);

        // تحديث آخر ID تم استخدامه في localStorage فقط عند إضافة عميل جديد
        localStorage.setItem("lastCustomerId", parseInt(customerId.replace("AAMC-", "")));
        showAlert("تمت إضافة عميل جديد بنجاح!", "success");
    }

    closeCustomerModal(); // إغلاق النافذة المنبثقة بعد الحفظ (وهي بدورها تستدعي resetCustomerForm())
}

// =================== دوال إدارة الجدول ===================

/**
 * تحصل على معرف العميل (Customer ID) للعميل المحدد في الجدول.
 * هذه الدالة لا تعرض أي رسائل تنبيه، فقط تعيد القيمة.
 * @returns {string|null} معرف العميل المحدد أو null إذا لم يتم تحديد أي عميل أو تم تحديد أكثر من واحد.
 */
function getSelectedCustomerId() {
    const selectedCheckboxes = document.querySelectorAll(".selectCustomer:checked");
    if (selectedCheckboxes.length === 1) {
        return selectedCheckboxes[0].value;
    }
    return null; // لا يوجد تحديد أو تحديد متعدد
}

/**
 * دالة مساعدة لزر "Edit". تتحقق من التحديد ثم تفتح المودال.
 */
function handleEditCustomer() {
    const selectedCheckboxes = document.querySelectorAll(".selectCustomer:checked");

    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء تحديد عميل واحد للتعديل.", "warning");
        return; // توقف هنا ولا تفتح المودال
    } else if (selectedCheckboxes.length > 1) {
        showAlert("الرجاء تحديد عميل واحد فقط للتعديل.", "warning");
        return; // توقف هنا ولا تفتح المودال
    }

    const customerIdToEdit = selectedCheckboxes[0].value;
    openCustomerModal(customerIdToEdit); // الآن فقط افتح المودال إذا كان التحديد صحيحاً
}

/**
 * دالة جديدة للانتقال إلى صفحة "Files Manager" لعميل محدد.
 */
function goToCustomerFiles() {
    const selectedCheckboxes = document.querySelectorAll(".selectCustomer:checked");

    if (selectedCheckboxes.length === 0) {
        showAlert("تنبيه", "الرجاء تحديد عميل واحد لإدارة الملفات.");
        return;
    } else if (selectedCheckboxes.length > 1) {
        showAlert("تنبيه", "الرجاء تحديد عميل واحد فقط لإدارة الملفات.");
        return;
    }

    const customerCheckbox = selectedCheckboxes[0];
    const customerId = customerCheckbox.value; // هذا يجلب Customer ID
    const customerName = customerCheckbox.dataset.customerName; // هذا يجلب Customer Name من الخاصية data-customer-name

    if (customerId && customerName) {
        // حفظ ID واسم العميل في localStorage
        localStorage.setItem('selectedCustomerId', customerId);
        localStorage.setItem('selectedCustomerName', customerName);

        // الآن قم بإعادة التوجيه إلى صفحة customer-files.html بدون معاملات في الـ URL
        // (المسار النسبي)
        window.location.href = 'customer-files.html';
        // إذا كان المسار لا يعمل، جرب المسار المطلق من جذر الموقع إذا كان هيكل مجلداتك يتطلب ذلك:
        // window.location.href = '/html/Transactions/Customers/customer-files.html';
    } else {
        // هذا يجب ألا يحدث إذا تم تهيئة خانات الاختيار بشكل صحيح
        showAlert("خطأ", "لم يتم العثور على بيانات العميل المحددة للتحويل.");
        console.error("Missing customer ID or name from selected checkbox in goToCustomerFiles().");
    }
}
/**
 * حذف العملاء المحددين من جدول DataTables.
 */
function deleteSelectedCustomers() {
    // جمع جميع مربعات الاختيار المحددة
    const selectedCheckboxes = document.querySelectorAll(".selectCustomer:checked");

    // إذا لم يتم تحديد أي عميل، يمكن إظهار رسالة
    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء اختيار عميل واحد على الأقل للحذف.", "warning");
        return;
    }

    // استخدام showConfirm بدلاً من confirm الافتراضية
    showConfirm(
        `هل أنت متأكد أنك تريد حذف ${selectedCheckboxes.length} عميل(عملاء) محدد(ين)؟ لا يمكن التراجع عن هذا الإجراء.`,
        // دالة الـ callback للتأكيد (عند النقر على Yes)
        () => {
            selectedCheckboxes.forEach((box) => {
                const row = box.closest("tr"); // الحصول على الصف الأب لمربع الاختيار
                if (row) {
                    // تم التعديل هنا: استخدام window.customersTableDataTable
                    window.customersTableDataTable.row(row).remove().draw(); // إزالة الصف وإعادة رسم الجدول
                }
            });
            showAlert("تم حذف العملاء بنجاح.", "success");
            console.log(`${selectedCheckboxes.length} customer(s) deleted.`);
        },
        "تأكيد الحذف", // العنوان
        "نعم، احذف!", // نص زر التأكيد (يمكن ترجمته عبر getTranslatedText)
        "إلغاء" // نص زر الإلغاء (يمكن ترجمته عبر getTranslatedText)
    );
}

/**
 * تبديل حالة تحديد/إلغاء تحديد جميع مربعات الاختيار في الجدول.
 * @param {HTMLInputElement} master - مربع الاختيار الرئيسي (Select All).
 */
function toggleSelectAll(master) {
    const allCheckboxes = document.querySelectorAll(".selectCustomer");
    allCheckboxes.forEach((cb) => (cb.checked = master.checked));
}

// =================== تهيئة DataTables وفلاتر الأعمدة ===================

/**
 * دالة لتهيئة DataTables لجدول العملاء وربط فلاتر البحث.
 * يجب استدعاء هذه الدالة بعد تحميل jQuery بالكامل وبعد جاهزية DOM.
 */
function initializeCustomersTable() {
    // تهيئة DataTables لجدول العملاء
    window['customersTableDataTable'] = $('#customersTable').DataTable({ // تم التأكد من استخدام 'customersTableDataTable'
        responsive: true, // تفعيل الاستجابة لتناسب أحجام الشاشات المختلفة
        orderCellsTop: true, // السماح بالفرز من رؤوس الأعمدة في الصف العلوي
        fixedHeader: true, // تثبيت رأس الجدول عند التمرير
        language: {
            // تحديد ملف لغة DataTables
            url: "/js/en-GB.json",
        },
        // تعريف الأعمدة - تأكد من إضافة عمود لتاريخ التسجيل هنا
        columns: [
            {
                // العمود 0: Checkbox
                "orderable": false,
                "render": function (data, type, row) {
                    // 'row' تحتوي على بيانات الصف الحالي
                    // بناءً على تعريف الأعمدة الخاصة بك:
                    // العمود 1 (فهرس 1) هو Customer ID
                    // العمود 2 (فهرس 2) هو Name
                    const customerId = row[1]; // جلب Customer ID من بيانات الصف
                    const customerName = row[2]; // جلب Name من بيانات الصف

                    // إنشاء خانة الاختيار مع class، وقيمة (value)، وخاصية data-customer-name
                    return `<input type="checkbox" class="selectCustomer" value="${customerId}" data-customer-name="${customerName}">`;
                }
            },
            null, // العمود 1: Customer ID
            null, // العمود 2: Name
            null, // العمود 3: Arabic Name
            null, // العمود 4: Legal Name
            null, // العمود 5: Customer Type
            null, // العمود 6: Registration Date
            null, // العمود 7: Country
            null, // العمود 8: City
            null, // العمود 9: Email
            null  // العمود 10: Mobile
        ]
    });

    // ربط فلاتر البحث في رؤوس الأعمدة مع DataTables
    $('#customersTable thead input.column-filter, #customersTable thead select.column-filter').on('keyup change clear', function () {
        // تم التأكد من استخدام 'customersTableDataTable' هنا أيضاً
        const columnIdx = window['customersTableDataTable'].column($(this).closest('th')).index();
        const searchValue = this.value;

        if (window['customersTableDataTable'].column(columnIdx).search() !== searchValue) {
            window['customersTableDataTable'].column(columnIdx).search(searchValue).draw();
        }
    });
}