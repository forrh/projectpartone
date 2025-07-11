let currentProjectId = null; // متغير لتعقب ID المشروع الذي يتم عرضه أو تعديله

// =================== دوال المودال (النافذة المنبثقة) ===================

/**
 * إعادة تعيين (مسح) جميع حقول نموذج المشروع باستثناء Project ID.
 * هذه الدالة لا تقوم بتوليد معرف مشروع جديد أو تغيير التبويبة.
 * يتم استدعاؤها عند النقر على زر "Reset" أو عند إغلاق المودال.
 */
function resetProjectForm() {
    const projectForm = document.getElementById("projectForm");
    if (projectForm) {
        // بدلاً من projectForm.reset() التي تمسح كل شيء، سنمسح الحقول يدوياً.
        // Project ID (projectId) سيتم استثناؤه من المسح.

        // حقول تبويبة Project
        document.getElementById("projectName").value = "";
        document.getElementById("projectArabicName").value = "";
        document.getElementById("projectLegalName").value = "";
        document.getElementById("projectType").value = ""; // أو تعيين قيمة افتراضية إذا كانت قائمة منسدلة
        document.getElementById("projectCity").value = "";
        document.getElementById("projectEmail").value = "";
        document.getElementById("projectPhone").value = "";

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${yyyy}-${mm}-${dd}`;

        const registrationDateInput = document.getElementById("registrationDate");
        if (registrationDateInput) {
            registrationDateInput.value = todayFormatted; // تعيين تاريخ اليوم كقيمة افتراضية
            registrationDateInput.max = todayFormatted;     // تعيين تاريخ اليوم كحد أقصى (لتعطيل المستقبل)
        }

        // حقول تبويبة Contacts (إذا كانت جزءاً من نفس النموذج وكنت تريد مسحها)
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactPhone").value = "";

        // إعادة ضبط الدولة الافتراضية "Saudi Arabia" بعد المسح
        const projectCountryInput = document.getElementById("projectCountry");
        if (projectCountryInput) {
            projectCountryInput.value = "Saudi Arabia";
        }
    }
}

/**
 * فتح النافذة المنبثقة لإضافة أو تعديل مشروع.
 * هذه الدالة لا تقوم بالتحقق من التحديد، بل تفترض أن ID المشروع صحيح إذا تم تمريره.
 * @param {string} [projectIdToEdit=null] - معرف المشروع إذا كنا بصدد تعديل مشروع موجود.
 * إذا كانت قيمتها null أو undefined، فسيتم فتح المودال لوضع الإضافة.
 */
function openProjectModal(projectIdToEdit = null) {
    const modal = document.getElementById("projectModal");
    const projectIdInput = document.getElementById("projectId");
    const registrationDateInput = document.getElementById("registrationDate");

    if (!modal) {
        console.error("Project modal not found!");
        return;
    }

    // قم دائماً بمسح النموذج أولاً لضمان حالة نظيفة عند فتح المودال
    resetProjectForm();

    // يجب أن يتم تعيين `max` في كل مرة يفتح فيها المودال لضمان أنه تاريخ اليوم الحالي
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    if (registrationDateInput) {
        registrationDateInput.max = todayFormatted;
    }

    if (projectIdToEdit) {
        // وضع التعديل: قم بتحميل بيانات المشروع الموجود
        currentProjectId = projectIdToEdit;
        if (projectIdInput) {
            projectIdInput.value = projectIdToEdit;
        }
        // هنا يتم جلب بيانات المشروع من DataTables وملء الحقول الأخرى
        // تم التعديل هنا: استخدام window.projectsTableDataTable
        const rowData = window.projectsTableDataTable.rows().data().toArray().find(row => row[1] === projectIdToEdit);
        if (rowData) {
            document.getElementById("projectName").value = rowData[2];
            document.getElementById("projectArabicName").value = rowData[3];
            document.getElementById("projectLegalName").value = rowData[4];
            document.getElementById("projectType").value = rowData[5];
            if (registrationDateInput) {
                registrationDateInput.value = rowData[6];
            }
            document.getElementById("projectCountry").value = rowData[7];
            document.getElementById("projectCity").value = rowData[8];
            document.getElementById("projectEmail").value = rowData[9];
            document.getElementById("projectPhone").value = rowData[10];
        } else {
            showAlert("لم يتم العثور على بيانات المشروع المراد تعديله.", "error");
            return; // توقف ومنع فتح المودال إذا لم يتم العثور على البيانات
        }
    } else {
        // وضع الإضافة: توليد ID جديد
        currentProjectId = null;
        let lastId = localStorage.getItem("lastProjectId");
        lastId = lastId ? parseInt(lastId) : 1000;
        const newId = "AAMP-" + (lastId + 1); // Changed prefix from AAMC to AAMP for projects
        if (projectIdInput) {
            projectIdInput.value = newId;
        }
    }

    // إظهار النافذة المنبثقة بعد كل عمليات التحقق والملء
    modal.style.display = "flex";

    // دائماً قم بالتبديل إلى تبويبة "Project" عند فتح المودال (سواء للإضافة أو التعديل)
    switchTab("project");
}

/**
 * إغلاق النافذة المنبثقة للمشروع.
 */
function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.style.display = "none"; // إخفاء النافذة المنبثقة
    }
    // مسح النموذج بالكامل بعد الإغلاق لضمان جاهزيته للمرة القادمة، مع الإبقاء على Project ID.
    resetProjectForm();
}

/**
 * التبديل بين تبويبات "Project" و "Contacts" داخل النافذة المنبثقة.
 * @param {string} tabId - اسم التبويبة المراد عرضها ('project' أو 'contact').
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
 * حفظ بيانات المشروع (إضافة جديد أو تعديل موجود).
 * @param {Event} event - كائن الحدث لمنع الإرسال الافتراضي للنموذج.
 */
function saveProject(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // --- جلب قيم الحقول أولاً لضمان توفرها للتحقق ---
    const projectId = document.getElementById("projectId")?.value || "";
    const projectName = document.getElementById("projectName")?.value || "";
    const projectArabicName = document.getElementById("projectArabicName")?.value || "";
    const projectLegalName = document.getElementById("projectLegalName")?.value || "";
    const projectType = document.getElementById("projectType")?.value || "";
    const projectCountry = document.getElementById("projectCountry")?.value || "";
    const projectCity = document.getElementById("projectCity")?.value || "";
    const projectEmail = document.getElementById("projectEmail")?.value || "";
    const projectPhone = document.getElementById("projectPhone")?.value || "";
    const registrationDate = document.getElementById("registrationDate")?.value || "";

    // --- جلب قيم حقول Contacts الجديدة ---
    const contactName = document.getElementById("contactName")?.value || "";
    const contactEmail = document.getElementById("contactEmail")?.value || "";
    const contactPhone = document.getElementById("contactPhone")?.value || "";
    // ---------------------------------------------------

    // تجهيز بيانات المشروع
    const projectData = {
        id: projectId,
        name: projectName,
        arabicName: projectArabicName,
        legalName: projectLegalName,
        type: projectType,
        registrationDate: registrationDate,
        country: projectCountry,
        city: projectCity,
        email: projectEmail,
        mobile: projectPhone,
        // يمكنك إضافة بيانات Contacts هنا إذا كنت ستحفظها في نفس صف DataTable
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
    };

    // التحقق مما إذا كان جدول المشاريع (DataTable) مُهيأ
    // تم التعديل هنا: استخدام window.projectsTableDataTable
    if (!window.projectsTableDataTable) {
        showAlert("جدول المشاريع غير مُهيأ. الرجاء تحديث الصفحة.", "error");
        console.error("DataTable is not initialized.");
        return;
    }

    // البحث عن الصف الموجود لتحديثه (إذا كان وضع التعديل)
    let existingRow = null;
    // تم التعديل هنا: استخدام window.projectsTableDataTable
    window.projectsTableDataTable.rows().every(function () {
        const rowData = this.data();
        // نفترض أن Project ID هو العمود الثاني (الفهرس 1)
        if (rowData[1] === projectId) {
            existingRow = this;
            return false; // الخروج من الحلقة بمجرد العثور على الصف
        }
    });

    if (existingRow) {
        // تحديث الصف الموجود في DataTable
        // تأكد من أن ترتيب الأعمدة يطابق ما هو معرف في DataTables initialization
        existingRow.data([
            `<input type="checkbox" class="selectProject" value="${projectData.id}">`,
            projectData.id,
            projectData.name,
            projectData.arabicName,
            projectData.legalName,
            projectData.type,
            projectData.registrationDate,
            projectData.country,
            projectData.city,
            projectData.email,
            projectData.mobile,
            // projectData.contactName,
            // projectData.contactEmail,
            // projectData.contactPhone,
        ]).draw();
        console.log(`Project ${projectId} updated.`);
        showAlert("تم تحديث بيانات المشروع بنجاح!", "success");
    } else {
        // إضافة صف جديد إلى DataTable
        // تأكد من أن ترتيب الأعمدة يطابق ما هو معرف في DataTables initialization
        // تم التعديل هنا: استخدام window.projectsTableDataTable
        window.projectsTableDataTable.row.add([
            `<input type="checkbox" class="selectProject" value="${projectData.id}">`,
            projectData.id,
            projectData.name,
            projectData.arabicName,
            projectData.legalName,
            projectData.type,
            projectData.registrationDate,
            projectData.country,
            projectData.city,
            projectData.email,
            projectData.mobile,
            // projectData.contactName,
            // projectData.contactEmail,
            // projectData.contactPhone,
        ]).draw();
        console.log(`New project ${projectId} added.`);

        // تحديث آخر ID تم استخدامه في localStorage فقط عند إضافة مشروع جديد
        localStorage.setItem("lastProjectId", parseInt(projectId.replace("AAMP-", ""))); // Changed prefix
        showAlert("تمت إضافة مشروع جديد بنجاح!", "success");
    }

    closeProjectModal(); // إغلاق النافذة المنبثقة بعد الحفظ (وهي بدورها تستدعي resetProjectForm())
}

// =================== دوال إدارة الجدول ===================

/**
 * تحصل على معرف المشروع (Project ID) للمشروع المحدد في الجدول.
 * هذه الدالة لا تعرض أي رسائل تنبيه، فقط تعيد القيمة.
 * @returns {string|null} معرف المشروع المحدد أو null إذا لم يتم تحديد أي مشروع أو تم تحديد أكثر من واحد.
 */
function getSelectedProjectId() {
    const selectedCheckboxes = document.querySelectorAll(".selectProject:checked");
    if (selectedCheckboxes.length === 1) {
        return selectedCheckboxes[0].value;
    }
    return null; // لا يوجد تحديد أو تحديد متعدد
}

/**
 * دالة مساعدة لزر "Edit". تتحقق من التحديد ثم تفتح المودال.
 */
function handleEditProject() {
    const selectedCheckboxes = document.querySelectorAll(".selectProject:checked");

    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء تحديد مشروع واحد للتعديل.", "warning");
        return; // توقف هنا ولا تفتح المودال
    } else if (selectedCheckboxes.length > 1) {
        showAlert("الرجاء تحديد مشروع واحد فقط للتعديل.", "warning");
        return; // توقف هنا ولا تفتح المودال
    }

    const projectIdToEdit = selectedCheckboxes[0].value;
    openProjectModal(projectIdToEdit); // الآن فقط افتح المودال إذا كان التحديد صحيحاً
}

/**
 * دالة جديدة للانتقال إلى صفحة "Files Manager" لمشروع محدد.
 */
function goToProjectFiles() {
    const selectedCheckboxes = document.querySelectorAll(".selectProject:checked");

    if (selectedCheckboxes.length === 0) {
        showAlert("تنبيه", "الرجاء تحديد مشروع واحد لإدارة الملفات.");
        return;
    } else if (selectedCheckboxes.length > 1) {
        showAlert("تنبيه", "الرجاء تحديد مشروع واحد فقط لإدارة الملفات.");
        return;
    }

    const projectCheckbox = selectedCheckboxes[0];
    const projectId = projectCheckbox.value; // هذا يجلب Project ID
    const projectName = projectCheckbox.dataset.projectName; // هذا يجلب Project Name من الخاصية data-project-name

    if (projectId && projectName) {
        // حفظ ID واسم المشروع في localStorage
        localStorage.setItem('selectedProjectId', projectId);
        localStorage.setItem('selectedProjectName', projectName);

        // الآن قم بإعادة التوجيه إلى صفحة project-files.html بدون معاملات في الـ URL
        // (المسار النسبي)
        window.location.href = 'project-files.html';
        // إذا كان المسار لا يعمل، جرب المسار المطلق من جذر الموقع إذا كان هيكل مجلداتك يتطلب ذلك:
        // window.location.href = '/html/Transactions/Projects/project-files.html';
    } else {
        // هذا يجب ألا يحدث إذا تم تهيئة خانات الاختيار بشكل صحيح
        showAlert("خطأ", "لم يتم العثور على بيانات المشروع المحددة للتحويل.");
        console.error("Missing project ID or name from selected checkbox in goToProjectFiles().");
    }
}
/**
 * حذف المشاريع المحددة من جدول DataTables.
 */
function deleteSelectedProjects() {
    // جمع جميع مربعات الاختيار المحددة
    const selectedCheckboxes = document.querySelectorAll(".selectProject:checked");

    // إذا لم يتم تحديد أي مشروع، يمكن إظهار رسالة
    if (selectedCheckboxes.length === 0) {
        showAlert("الرجاء اختيار مشروع واحد على الأقل للحذف.", "warning");
        return;
    }

    // استخدام showConfirm بدلاً من confirm الافتراضية
    showConfirm(
        `هل أنت متأكد أنك تريد حذف ${selectedCheckboxes.length} مشروع(مشاريع) محدد(ين)؟ لا يمكن التراجع عن هذا الإجراء.`,
        // دالة الـ callback للتأكيد (عند النقر على Yes)
        () => {
            selectedCheckboxes.forEach((box) => {
                const row = box.closest("tr"); // الحصول على الصف الأب لمربع الاختيار
                if (row) {
                    // تم التعديل هنا: استخدام window.projectsTableDataTable
                    window.projectsTableDataTable.row(row).remove().draw(); // إزالة الصف وإعادة رسم الجدول
                }
            });
            showAlert("تم حذف المشاريع بنجاح.", "success");
            console.log(`${selectedCheckboxes.length} project(s) deleted.`);
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
    const allCheckboxes = document.querySelectorAll(".selectProject");
    allCheckboxes.forEach((cb) => (cb.checked = master.checked));
}

// =================== تهيئة DataTables وفلاتر الأعمدة ===================

/**
 * دالة لتهيئة DataTables لجدول المشاريع وربط فلاتر البحث.
 * يجب استدعاء هذه الدالة بعد تحميل jQuery بالكامل وبعد جاهزية DOM.
 */
function initializeProjectsTable() {
    // تهيئة DataTables لجدول المشاريع
    window['projectsTableDataTable'] = $('#projectsTable').DataTable({ // تم التأكد من استخدام 'projectsTableDataTable'
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
                    // العمود 1 (فهرس 1) هو Project ID
                    // العمود 2 (فهرس 2) هو Name
                    const projectId = row[1]; // جلب Project ID من بيانات الصف
                    const projectName = row[2]; // جلب Name من بيانات الصف

                    // إنشاء خانة الاختيار مع class، وقيمة (value)، وخاصية data-project-name
                    return `<input type="checkbox" class="selectProject" value="${projectId}" data-project-name="${projectName}">`;
                }
            },
            null, // العمود 1: Project ID
            null, // العمود 2: Name
            null, // العمود 3: Arabic Name
            null, // العمود 4: Legal Name
            null, // العمود 5: Project Type
            null, // العمود 6: Registration Date
            null, // العمود 7: Country
            null, // العمود 8: City
            null, // العمود 9: Email
            null  // العمود 10: Mobile
        ]
    });

    // ربط فلاتر البحث في رؤوس الأعمدة مع DataTables
    $('#projectsTable thead input.column-filter, #projectsTable thead select.column-filter').on('keyup change clear', function () {
        // تم التأكد من استخدام 'projectsTableDataTable' هنا أيضاً
        const columnIdx = window['projectsTableDataTable'].column($(this).closest('th')).index();
        const searchValue = this.value;

        if (window['projectsTableDataTable'].column(columnIdx).search() !== searchValue) {
            window['projectsTableDataTable'].column(columnIdx).search(searchValue).draw();
        }
    });
}