// Language translations
const translations = {
    ar: {
        title: "نموذج الانضمام إلى عائلة فزاع",
        subtitle: "استمتع بمميزات حصرية وعروض مدعومة",
        featuresTitle: "المميزات الحصرية",
        features: {
            housing: { title: "🏠 السكن", desc: "عروض مدعومة بأسعار أقل من التكلفة" },
            education: { title: "📚 التعليم", desc: "برامج تعليمية بأسعار مدعومة" },
            health: { title: "🏥 الصحة", desc: "خدمات صحية شاملة بأسعار مخفضة" },
            insurance: { title: "🛡️ التأمين", desc: "حزم تأمينية شاملة وموثوقة" },
            essentials: { title: "🛒 المستلزمات الأساسية", desc: "احصل على احتياجاتك بأسعار مدعومة" },
            transport: { title: "🚗 النقل", desc: "خدمات نقل بأسعار مخصصة" },
            entertainment: { title: "🎭 الترفيه", desc: "فعاليات وأنشطة ترفيهية حصرية" }
        },
        formTitle: "استمارة الانضمام",
        formLabels: {
            fullName: "الاسم الكامل",
            idNumber: "رقم الهوية",
            mobileNumber: "رقم الهاتف المحمول",
            email: "البريد الإلكتروني",
            emirate: "الإمارة",
            membershipCategory: "فئة العضوية"
        },
        formPlaceholders: {
            fullName: "أدخل اسمك الكامل",
            idNumber: "أدخل رقم هويتك",
            mobileNumber: "أدخل رقم هاتفك",
            email: "أدخل بريدك الإلكتروني"
        },
        emirates: {
            select: "اختر الإمارة",
            "abu-dhabi": "أبو ظبي",
            "dubai": "دبي",
            "sharjah": "الشارقة",
            "ajman": "عجمان",
            "umm-al-quwain": "أم القيوين",
            "ras-al-khaimah": "رأس الخيمة",
            "fujairah": "الفجيرة"
        },
        membershipCategories: {
            select: "اختر فئة العضوية",
            "silver": "فضي",
            "gold": "ذهبي",
            "platinum": "بلاتيني"
        },
        acknowledgment: "أقر بأن البيانات المقدمة صحيحة وأوافق على الشروط والأحكام",
        submitBtn: "تقديم الطلب",
        copyright: "© 2026 Fazaa. جميع الحقوق محفوظة."
    },
    en: {
        title: "Join Fazaa Family",
        subtitle: "Enjoy exclusive benefits and special offers",
        featuresTitle: "Exclusive Features",
        features: {
            housing: { title: "🏠 Housing", desc: "Subsidized offers at less than cost" },
            education: { title: "📚 Education", desc: "Educational programs at subsidized prices" },
            health: { title: "🏥 Health", desc: "Comprehensive health services at reduced prices" },
            insurance: { title: "🛡️ Insurance", desc: "Comprehensive and reliable insurance packages" },
            essentials: { title: "🛒 Essentials", desc: "Get your needs at subsidized prices" },
            transport: { title: "🚗 Transport", desc: "Transportation services at special prices" },
            entertainment: { title: "🎭 Entertainment", desc: "Exclusive entertainment events and activities" }
        },
        formTitle: "Registration Form",
        formLabels: {
            fullName: "Full Name",
            idNumber: "ID Number",
            mobileNumber: "Mobile Number",
            email: "Email Address",
            emirate: "Emirate",
            membershipCategory: "Membership Category"
        },
        formPlaceholders: {
            fullName: "Enter your full name",
            idNumber: "Enter your ID number",
            mobileNumber: "Enter your phone number",
            email: "Enter your email address"
        },
        emirates: {
            select: "Select Emirate",
            "abu-dhabi": "Abu Dhabi",
            "dubai": "Dubai",
            "sharjah": "Sharjah",
            "ajman": "Ajman",
            "umm-al-quwain": "Umm Al Quwain",
            "ras-al-khaimah": "Ras Al Khaimah",
            "fujairah": "Fujairah"
        },
        membershipCategories: {
            select: "Select Membership Category",
            "silver": "Silver",
            "gold": "Gold",
            "platinum": "Platinum"
        },
        acknowledgment: "I confirm that the provided data is correct and agree to the terms and conditions",
        submitBtn: "Submit Application",
        copyright: "© 2026 Fazaa. All rights reserved."
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'ar';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageToggle();
    updatePageLanguage(currentLanguage);
    setupFormHandlers();
});

// Initialize language toggle
function initializeLanguageToggle() {
    const html = document.documentElement;
    const toggleCheckbox = document.getElementById('languageToggle');
    
    if (toggleCheckbox) {
        toggleCheckbox.checked = currentLanguage === 'en';
        toggleCheckbox.addEventListener('change', (e) => {
            currentLanguage = e.target.checked ? 'en' : 'ar';
            localStorage.setItem('language', currentLanguage);
            updatePageLanguage(currentLanguage);
            html.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
            html.lang = currentLanguage;
        });
    }
    
    html.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    html.lang = currentLanguage;
}

// Update page language
function updatePageLanguage(lang) {
    const t = translations[lang];
    
    // Update title and subtitle
    const titleEl = document.querySelector('.title');
    const subtitleEl = document.querySelector('.subtitle');
    if (titleEl) titleEl.textContent = t.title;
    if (subtitleEl) subtitleEl.textContent = t.subtitle;
    
    // Update features section
    const featuresSectionTitle = document.querySelector('.features-section h2');
    if (featuresSectionTitle) featuresSectionTitle.textContent = t.featuresTitle;
    
    const featureCards = document.querySelectorAll('.feature-card');
    const featureKeys = ['housing', 'education', 'health', 'insurance', 'essentials', 'transport', 'entertainment'];
    featureCards.forEach((card, index) => {
        const key = featureKeys[index];
        if (key && t.features[key]) {
            card.querySelector('h3').textContent = t.features[key].title;
            card.querySelector('p').textContent = t.features[key].desc;
        }
    });
    
    // Update form section
    const formSectionTitle = document.querySelector('.form-section h2');
    if (formSectionTitle) formSectionTitle.textContent = t.formTitle;
    
    // Update form labels and placeholders
    updateFormField('fullName', t.formLabels.fullName, t.formPlaceholders.fullName);
    updateFormField('idNumber', t.formLabels.idNumber, t.formPlaceholders.idNumber);
    updateFormField('mobileNumber', t.formLabels.mobileNumber, t.formPlaceholders.mobileNumber);
    updateFormField('email', t.formLabels.email, t.formPlaceholders.email);
    
    // Update emirate select
    const emirateSelect = document.getElementById('emirate');
    if (emirateSelect) {
        emirateSelect.previousElementSibling.textContent = t.formLabels.emirate;
        emirateSelect.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = t.emirates.select;
        emirateSelect.appendChild(defaultOption);
        
        Object.entries(t.emirates).forEach(([key, value]) => {
            if (key !== 'select') {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value;
                emirateSelect.appendChild(option);
            }
        });
    }
    
    // Update membership category select
    const membershipSelect = document.getElementById('membershipCategory');
    if (membershipSelect) {
        membershipSelect.previousElementSibling.textContent = t.formLabels.membershipCategory;
        membershipSelect.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = t.membershipCategories.select;
        membershipSelect.appendChild(defaultOption);
        
        Object.entries(t.membershipCategories).forEach(([key, value]) => {
            if (key !== 'select') {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value;
                membershipSelect.appendChild(option);
            }
        });
    }
    
    // Update acknowledgment
    const acknowledgmentLabel = document.querySelector('.form-group.checkbox label');
    if (acknowledgmentLabel) acknowledgmentLabel.textContent = t.acknowledgment;
    
    // Update submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) submitBtn.textContent = t.submitBtn;
    
    // Update footer
    const footer = document.querySelector('.footer p');
    if (footer) footer.textContent = t.copyright;
}

// Helper function to update form fields
function updateFormField(id, label, placeholder) {
    const input = document.getElementById(id);
    if (input) {
        const labelEl = input.previousElementSibling;
        if (labelEl && labelEl.tagName === 'LABEL') {
            labelEl.textContent = label + ' *';
        }
        input.placeholder = placeholder;
    }
}

// Setup form handlers
function setupFormHandlers() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(form);
        });
    }
}

// Handle form submission
function handleFormSubmit(form) {
    const formData = {
        fullName: document.getElementById('fullName').value,
        idNumber: document.getElementById('idNumber').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        email: document.getElementById('email').value,
        emirate: document.getElementById('emirate').value,
        membershipCategory: document.getElementById('membershipCategory').value,
        acknowledgment: document.getElementById('acknowledgment').checked
    };
    
    // Validate form
    if (!formData.fullName || !formData.idNumber || !formData.mobileNumber || 
        !formData.email || !formData.emirate || !formData.membershipCategory || 
        !formData.acknowledgment) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert(currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
        return;
    }
    
    // Log form data (in real application, send to server)
    console.log('Form Data:', formData);
    alert(currentLanguage === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Your application has been submitted successfully!');
    
    // Reset form
    form.reset();
}
