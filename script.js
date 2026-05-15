// Solar Calculator Logic - Advanced Version
const translations = {
    en: {
        title: "Advanced Solar Guide", subtitle: "Professional Estimator & Unit Calculator", switchLang: "اردو",
        calcTitle: "Solar Calculator", panelWattage: "Select Panel Wattage", defaultPanel: "Recommended",
        appliances: "Home Appliances", totalLoad: "Running Load", peakLoad: "Peak / Startup Load",
        inverterSize: "Req. Inverter", panelCount: "Panels Total", batteryAdvice: "Battery Setup (Hybrid)",
        results: "Calculation Results", techAdvice: "Installation Specs", wireSize: "Wire Gauge",
        breakerSize: "AC/DC Breaker", shareWhatsApp: "Get WhatsApp Quote",
        dailyUnits: "Daily Units", monthlyUnits: "Monthly Units", hoursLabel: "Hrs/Day",
        fullScreen: "Full Screen", exitFullScreen: "Exit Full Screen",
        // Appliance Names
        ceilingFan: "Normal Ceiling Fan", pedestalFan: "Pedestal Fan", acdcFan: "AC/DC Fan",
        ac1tonInv: "1 Ton AC (Inverter)", ac1tonNon: "1 Ton AC (Non-Inv)",
        ac15tonInv: "1.5 Ton AC (Inverter)", ac15tonNon: "1.5 Ton AC (Non-Inv)",
        fridgeInv: "Refrigerator (Inverter)", fridgeNon: "Refrigerator (Non-Inv)",
        iron: "Electric Iron", waterPump: "Water Pump (1HP)", ledBulb: "LED Bulb",
        ledTv: "LED TV", washingMachine: "Washing Machine"
    },
    ur: {
        title: "ایڈوانس سولر گائیڈ", subtitle: "پیشہ ورانہ کیلکولیٹر اور یونٹ کا حساب", switchLang: "English",
        calcTitle: "سولر کیلکولیٹر", panelWattage: "سولر پلیٹ منتخب کریں", defaultPanel: "تجویز کردہ",
        appliances: "بجلی کے آلات", totalLoad: "رننگ لوڈ", peakLoad: "پیک لوڈ",
        inverterSize: "درکار انورٹر", panelCount: "کل پلیٹیں", batteryAdvice: "بیٹری سیٹ اپ (ہائبرڈ)",
        results: "حساب کتاب کے نتائج", techAdvice: "تکنیکی معلومات", wireSize: "تار کا سائز",
        breakerSize: "بریکر کی گنجائش", shareWhatsApp: "واٹس ایپ رپورٹ حاصل کریں",
        dailyUnits: "روزانہ یونٹس", monthlyUnits: "ماہانہ یونٹس", hoursLabel: "گھنٹے/دن",
        fullScreen: "فل سکرین", exitFullScreen: "بند کریں",
        // Appliance Names
        ceilingFan: "عام چھت والا پنکھا", pedestalFan: "پیڈسٹل پنکھا", acdcFan: "اے سی / ڈی سی پنکھا",
        ac1tonInv: "1 ٹن اے سی (انورٹر)", ac1tonNon: "1 ٹن اے سی (عام)",
        ac15tonInv: "1.5 ٹن اے سی (انورٹر)", ac15tonNon: "1.5 ٹن اے سی (عام)",
        fridgeInv: "فریج (انورٹر)", fridgeNon: "فریج (عام)",
        iron: "استری", waterPump: "واٹر پمپ (موٹر)", ledBulb: "ایل ای ڈی بلب",
        ledTv: "ایل ای ڈی ٹی وی", washingMachine: "واشنگ مشین"
    }
};

let currentLang = 'en';
let appliances = [
    { id: 'ac1tonInv', nameKey: 'ac1tonInv', wattage: 800, count: 0, hours: 8, isMotor: true, type: 'fixed' },
    { id: 'ac1tonNon', nameKey: 'ac1tonNon', wattage: 1200, count: 0, hours: 8, isMotor: true, type: 'fixed' },
    { id: 'ac15tonInv', nameKey: 'ac15tonInv', wattage: 1200, count: 0, hours: 8, isMotor: true, type: 'fixed' },
    { id: 'ac15tonNon', nameKey: 'ac15tonNon', wattage: 1800, count: 0, hours: 8, isMotor: true, type: 'fixed' },
    { id: 'fanCeiling', nameKey: 'ceilingFan', wattage: 80, count: 2, hours: 12, isMotor: false, type: 'fixed' },
    { id: 'fanPedestal', nameKey: 'pedestalFan', wattage: 130, count: 0, hours: 12, isMotor: false, type: 'fixed' },
    { id: 'fanAcdc', nameKey: 'acdcFan', wattage: 50, count: 0, hours: 12, isMotor: false, type: 'dropdown', options: [30, 50, 60] },
    { id: 'fridgeInv', nameKey: 'fridgeInv', wattage: 180, count: 1, hours: 24, isMotor: true, type: 'fixed' },
    { id: 'fridgeNon', nameKey: 'fridgeNon', wattage: 400, count: 0, hours: 24, isMotor: true, type: 'fixed' },
    { id: 'iron', nameKey: 'iron', wattage: 1000, count: 0, hours: 1, isMotor: false, type: 'fixed' },
    { id: 'waterPump', nameKey: 'waterPump', wattage: 1000, count: 0, hours: 1, isMotor: true, type: 'fixed' },
    { id: 'ledBulb', nameKey: 'ledBulb', wattage: 12, count: 5, hours: 6, isMotor: false, type: 'fixed' },
    { id: 'tv', nameKey: 'ledTv', wattage: 100, count: 1, hours: 5, isMotor: false, type: 'fixed' },
    { id: 'washing', nameKey: 'washingMachine', wattage: 500, count: 0, hours: 1, isMotor: true, type: 'fixed' },
];

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    document.getElementById('body-tag').dir = currentLang === 'ur' ? 'rtl' : 'ltr';
    renderAppliances();
    updateStaticText();
    calculate();
}

function updateStaticText() {
    const t = translations[currentLang];
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('main-subtitle').innerText = t.subtitle;
    document.getElementById('lang-btn-text').innerText = t.switchLang;
    
    // Update Full Screen Button Text
    const fsBtn = document.getElementById('fullscreen-btn');
    const fsText = document.getElementById('fullscreen-btn-text');
    
    if (fsBtn && fsText) {
        const icon = fsBtn.querySelector('i, svg');
        if (document.fullscreenElement) {
            fsText.innerText = t.exitFullScreen;
            if (icon) icon.setAttribute('data-lucide', 'minimize-2');
        } else {
            fsText.innerText = t.fullScreen;
            if (icon) icon.setAttribute('data-lucide', 'maximize-2');
        }
    }

    document.getElementById('calc-heading').innerText = t.calcTitle;
    document.getElementById('label-wattage').innerText = t.panelWattage;
    document.getElementById('label-run-load').innerText = t.totalLoad;
    document.getElementById('label-peak-load').innerText = t.peakLoad;
    document.getElementById('label-inv-size').innerText = t.inverterSize;
    document.getElementById('label-panel-count').innerText = t.panelCount;
    document.getElementById('label-battery').innerText = t.batteryAdvice;
    document.getElementById('label-daily-units').innerText = t.dailyUnits;
    document.getElementById('label-monthly-units').innerText = t.monthlyUnits;
    document.getElementById('share-btn-text').innerText = t.shareWhatsApp;
    lucide.createIcons();
}

function renderAppliances() {
    const container = document.getElementById('appliance-container');
    const t = translations[currentLang];
    
    container.innerHTML = appliances.map(app => `
        <div class="bg-solar-blue/60 p-5 rounded-3xl border border-slate-700/30 shadow-lg mb-4">
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                            <i data-lucide="zap" class="w-5 h-5 text-solar-yellow"></i>
                        </div>
                        <span class="font-bold text-slate-100 text-sm md:text-base">${t[app.nameKey]}</span>
                    </div>
                    <div class="flex items-center gap-3 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                        <button onclick="changeCount('${app.id}', -1)" class="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 active:bg-slate-950 transition-all shadow-md"><i data-lucide="minus" class="w-4 h-4"></i></button>
                        <span class="w-8 text-center font-black text-solar-yellow text-lg tabular-nums">${app.count}</span>
                        <button onclick="changeCount('${app.id}', 1)" class="w-10 h-10 flex items-center justify-center bg-solar-yellow text-solar-blue rounded-lg hover:bg-solar-yellow/90 active:scale-95 transition-all shadow-md"><i data-lucide="plus" class="w-4 h-4"></i></button>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/30">
                    <div>
                        <label class="text-[10px] text-slate-500 font-black uppercase tracking-widest block mb-1">Watts</label>
                        ${app.type === 'dropdown' ? `
                            <select onchange="changeWattage('${app.id}', this.value)" class="bg-solar-blue/40 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-200 w-full outline-none focus:border-solar-yellow/50">
                                ${app.options.map(opt => `<option value="${opt}" ${app.wattage === opt ? 'selected' : ''}>${opt}W</option>`).join('')}
                            </select>
                        ` : `
                            <input type="number" value="${app.wattage}" oninput="changeWattage('${app.id}', this.value)" class="bg-solar-blue/40 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-200 w-full outline-none focus:border-solar-yellow/50">
                        `}
                    </div>
                    <div>
                        <label class="text-[10px] text-slate-500 font-black uppercase tracking-widest block mb-1">${t.hoursLabel}</label>
                        <input type="number" value="${app.hours}" oninput="changeHours('${app.id}', this.value)" class="bg-solar-blue/40 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-200 w-full outline-none focus:border-solar-yellow/50">
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function changeCount(id, delta) {
    const app = appliances.find(a => a.id === id);
    if (app) {
        app.count = Math.max(0, app.count + delta);
        renderAppliances();
        calculate();
    }
}

function changeWattage(id, val) {
    const app = appliances.find(a => a.id === id);
    if (app) {
        app.wattage = Number(val) || 0;
        calculate();
    }
}

function changeHours(id, val) {
    const app = appliances.find(a => a.id === id);
    if (app) {
        app.hours = Number(val) || 0;
        calculate();
    }
}

function calculate() {
    const panelWatts = Number(document.getElementById('panel-watts').value) || 585;

    let runningLoad = 0;
    let peakLoad = 0;
    let dailyWh = 0;

    appliances.forEach(app => {
        const load = app.count * app.wattage;
        runningLoad += load;
        peakLoad += app.isMotor ? load * 1.5 : load;
        dailyWh += (load * app.hours);
    });

    const inverterSize = Math.ceil((peakLoad * 1.1) / 500) * 500;
    const neededWatts = runningLoad * 1.30; 
    const panelCount = runningLoad > 0 ? Math.ceil(neededWatts / panelWatts) : 0;
    
    const dailyUnits = (dailyWh / 1000).toFixed(2);
    const monthlyUnits = (dailyUnits * 30).toFixed(0);

    // Update UI
    document.getElementById('res-running').innerText = runningLoad;
    document.getElementById('res-peak').innerText = Math.round(peakLoad);
    document.getElementById('res-inverter').innerText = inverterSize;
    document.getElementById('res-panels').innerText = panelCount;
    document.getElementById('res-panel-w').innerText = panelWatts;
    document.getElementById('res-daily-units').innerText = dailyUnits;
    document.getElementById('res-monthly-units').innerText = monthlyUnits;

    // Battery Logic for Hybrid Inverter
    let batteryMsg = "---";
    if (runningLoad > 0) {
        if (runningLoad < 1000) {
            batteryMsg = currentLang === 'ur' ? "12V 150Ah (1 بیٹری)" : "12V 150Ah (1 Battery)";
        } else if (runningLoad < 3000) {
            batteryMsg = currentLang === 'ur' ? "24V 200Ah (2 بیٹریاں)" : "24V 200Ah (2 Batteries)";
        } else if (runningLoad < 5500) {
            batteryMsg = currentLang === 'ur' ? "48V 200Ah (4 بیٹریاں)" : "48V 200Ah (4 Batteries)";
        } else {
            batteryMsg = currentLang === 'ur' ? "48V 400Ah (8 بیٹریاں / لیتھیم)" : "48V 400Ah (8 Batteries / Lithium)";
        }
    }
    document.getElementById('res-battery').innerText = batteryMsg;

    // Tech Advice
    const wire = runningLoad < 3000 ? "6mm Copper" : "10mm / DC Solar Wire";
    const breaker = runningLoad < 2000 ? "32A AC/DC" : runningLoad < 5000 ? "63A AC/DC" : "100A / MCCB";
    document.getElementById('res-wire').innerText = runningLoad > 0 ? wire : "---";
    document.getElementById('res-breaker').innerText = runningLoad > 0 ? breaker : "---";
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Fullscreen change listener to update icons
document.addEventListener('fullscreenchange', () => {
    updateStaticText();
    lucide.createIcons();
});

function shareWhatsApp() {
    const t = translations[currentLang];
    const data = {
        running: document.getElementById('res-running').innerText,
        peak: document.getElementById('res-peak').innerText,
        inverter: document.getElementById('res-inverter').innerText,
        panels: document.getElementById('res-panels').innerText,
        pwatt: document.getElementById('res-panel-w').innerText,
        daily: document.getElementById('res-daily-units').innerText,
        monthly: document.getElementById('res-monthly-units').innerText,
        battery: document.getElementById('res-battery').innerText,
    };

    let selectedList = appliances
        .filter(a => a.count > 0)
        .map(a => `- ${t[a.nameKey]}: ${a.count}x (${a.wattage}W x ${a.hours}h)`)
        .join('%0A');

    const msg = `*Solar Power Report*%0A------------------%0A*Items Selected:*%0A${selectedList}%0A------------------%0A*Running Load:* ${data.running}W%0A*Peak Load:* ${data.peak}W%0A*Inv Recommendation:* ${data.inverter}W%0A*Solar Panels:* ${data.panels} x ${data.pwatt}W%0A*Battery Setup:* ${data.battery}%0A*Expected Daily Units:* ${data.daily}%0A*Expected Monthly Units:* ${data.monthly}%0A------------------%0AGenerated by Advanced Solar Guide`;
    
    window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// Initial Run
renderAppliances();
calculate();
lucide.createIcons();
