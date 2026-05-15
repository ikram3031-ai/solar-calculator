// Solar Calculator Logic
const translations = {
    en: {
        title: "Solar Guide", subtitle: "Complete Solar Estimator", switchLang: "اردو",
        calcTitle: "Solar Calculator", panelWattage: "Panel Wattage (W)", defaultPanel: "585W recommended",
        appliances: "Your Appliances", totalLoad: "Running Load", peakLoad: "Peak Load",
        inverterSize: "Recommended Inverter", panelCount: "Panels Required", batteryAdvice: "Battery Advice",
        results: "Your Results", techAdvice: "Technical Advice", wireSize: "Recommended Wire",
        breakerSize: "Recommended Breaker", shareWhatsApp: "Share on WhatsApp",
        inverterAC: "Inverter AC", waterPump: "Water Pump / Motor", fan: "Ceiling Fan",
        light: "LED Light", fridge: "Refrigerator", tv: "LED TV"
    },
    ur: {
        title: "سولر گائیڈ", subtitle: "سولر کیلکولیٹر اور رہنمائی", switchLang: "English",
        calcTitle: "سولر کیلکولیٹر", panelWattage: "پلیٹ کے واٹ (W)", defaultPanel: "585W تجویز کردہ",
        appliances: "آپ کے بجلی کے آلات", totalLoad: "رننگ لوڈ", peakLoad: "پیک لوڈ",
        inverterSize: "تجویز کردہ انورٹر", panelCount: "ضروری پلیٹیں", batteryAdvice: "بیٹری کے لیے مشورہ",
        results: "آپ کے نتائج", techAdvice: "تکنیکی مشورے", wireSize: "تجویز کردہ تار",
        breakerSize: "تجویز کردہ بریکر", shareWhatsApp: "واٹس ایپ پر شیئر کریں",
        inverterAC: "انورٹر اے سی", waterPump: "واٹر پمپ / موٹر", fan: "چھت والا پنکھا",
        light: "ایل ای ڈی لائٹ", fridge: "فریج", tv: "ایل ای ڈی ٹی وی"
    }
};

let currentLang = 'en';
let appliances = [
    { id: 'ac', nameKey: 'inverterAC', wattage: 1800, count: 0, isMotor: true, icon: 'sun' },
    { id: 'water-pump', nameKey: 'waterPump', wattage: 750, count: 0, isMotor: true, icon: 'zap' },
    { id: 'fan', nameKey: 'fan', wattage: 80, count: 2, isMotor: false, icon: 'wind' },
    { id: 'light', nameKey: 'light', wattage: 20, count: 5, isMotor: false, icon: 'lightbulb' },
    { id: 'fridge', nameKey: 'fridge', wattage: 350, count: 1, isMotor: true, icon: 'battery' },
    { id: 'tv', nameKey: 'tv', wattage: 100, count: 1, isMotor: false, icon: 'tv' },
];

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    document.getElementById('body-tag').dir = currentLang === 'ur' ? 'rtl' : 'ltr';
    document.getElementById('body-tag').lang = currentLang;
    renderAppliances();
    updateText();
    calculate();
}

function updateText() {
    const t = translations[currentLang];
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('main-subtitle').innerText = t.subtitle;
    document.getElementById('lang-btn-text').innerText = t.switchLang;
    document.getElementById('calc-heading').innerText = t.calcTitle;
    document.getElementById('label-wattage').innerText = t.panelWattage;
    document.getElementById('label-default-panel').innerText = t.defaultPanel;
    document.getElementById('result-heading').innerHTML = `<i data-lucide="check-circle-2" class="w-8 h-8"></i> ${t.results}`;
    document.getElementById('label-run-load').innerText = t.totalLoad;
    document.getElementById('label-peak-load').innerText = t.peakLoad;
    document.getElementById('label-inv-size').innerText = t.inverterSize;
    document.getElementById('label-panel-count').innerText = t.panelCount;
    document.getElementById('label-battery').innerText = t.batteryAdvice;
    document.getElementById('tech-heading').innerHTML = `<div class="p-1.5 bg-solar-yellow/10 rounded-lg"><i data-lucide="settings" class="w-4 h-4"></i></div> ${t.techAdvice}`;
    document.getElementById('label-wire').innerText = t.wireSize;
    document.getElementById('label-breaker').innerText = t.breakerSize;
    document.getElementById('share-btn-text').innerText = t.shareWhatsApp;
    lucide.createIcons();
}

function renderAppliances() {
    const container = document.getElementById('appliance-container');
    const t = translations[currentLang];
    container.innerHTML = appliances.map(app => `
        <div class="bg-solar-blue/60 p-6 rounded-3xl border border-slate-700/30 shadow-lg">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                        <i data-lucide="${app.icon}" class="w-5 h-5 text-solar-yellow"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-slate-100 text-base md:text-lg">${t[app.nameKey]}</span>
                        ${app.isMotor ? '<span class="text-[10px] text-slate-500 font-medium">Auto Peak Load calc</span>' : ''}
                    </div>
                </div>
                <div class="flex items-center justify-between sm:justify-start gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
                    <button onclick="changeCount('${app.id}', -1)" class="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl hover:bg-slate-700 active:bg-slate-950 transition-all shadow-md"><i data-lucide="minus"></i></button>
                    <span class="w-12 text-center font-black text-solar-yellow text-2xl tabular-nums">${app.count}</span>
                    <button onclick="changeCount('${app.id}', 1)" class="w-12 h-12 flex items-center justify-center bg-solar-yellow text-solar-blue rounded-xl hover:bg-solar-yellow/90 active:scale-95 transition-all shadow-md shadow-solar-yellow/20"><i data-lucide="plus"></i></button>
                </div>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                <div class="flex-1 flex items-center gap-3">
                    <label class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Watts / Unit</label>
                    <input type="number" value="${app.wattage}" oninput="changeWattage('${app.id}', this.value)" class="bg-solar-blue/40 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-200 focus:outline-none focus:border-solar-yellow/50 w-full">
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

function calculate() {
    const pWattInput = document.getElementById('panel-watts');
    const panelWatts = Number(pWattInput.value) || 585;

    let runningLoad = 0;
    let peakLoad = 0;

    appliances.forEach(app => {
        const load = app.count * app.wattage;
        runningLoad += load;
        peakLoad += app.isMotor ? load * 1.5 : load;
    });

    const inverterSize = Math.ceil((peakLoad * 1.1) / 500) * 500;
    const neededWatts = runningLoad * 1.25;
    const panelCount = runningLoad > 0 ? Math.ceil(neededWatts / panelWatts) : 0;

    // Updates
    document.getElementById('res-running').innerText = runningLoad;
    document.getElementById('res-peak').innerText = Math.round(peakLoad);
    document.getElementById('res-inverter').innerText = inverterSize;
    document.getElementById('res-panels').innerText = panelCount;
    document.getElementById('res-panel-w').innerText = panelWatts;

    // Battery
    let batteryMsg = "---";
    if (runningLoad > 0) {
        if (runningLoad < 500) batteryMsg = "12V 100Ah (1 Battery)";
        else if (runningLoad < 1500) batteryMsg = "24V 200Ah (2 Batteries)";
        else if (runningLoad < 3000) batteryMsg = "48V 200Ah (4 Batteries)";
        else batteryMsg = "48V 400Ah (8 Batteries / Lithium)";
    }
    document.getElementById('res-battery').innerText = batteryMsg;

    // Tech
    const wire = runningLoad < 3000 ? "6mm Copper Wire" : "10mm or DC Solar Wire";
    const breaker = runningLoad < 2000 ? "32A AC/DC" : runningLoad < 5000 ? "63A AC/DC" : "100A / MCCB";
    
    document.getElementById('res-wire').innerText = runningLoad > 0 ? wire : "---";
    document.getElementById('res-breaker').innerText = runningLoad > 0 ? breaker : "---";
}

function shareWhatsApp() {
    const running = document.getElementById('res-running').innerText;
    const peak = document.getElementById('res-peak').innerText;
    const inverter = document.getElementById('res-inverter').innerText;
    const panels = document.getElementById('res-panels').innerText;
    const pwatt = document.getElementById('res-panel-w').innerText;
    const wire = document.getElementById('res-wire').innerText;
    const breaker = document.getElementById('res-breaker').innerText;

    const msg = `*Solar Power Report*%0A------------------%0A*Running Load:* ${running}W%0A*Peak Load:* ${peak}W%0A*Recommended Inverter:* ${inverter}W%0A*Solar Panels:* ${panels} x ${pwatt}W%0A*Wire Size:* ${wire}%0A*Breaker:* ${breaker}%0A------------------%0AGenerated by Smart Solar Guide`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// Initial Run
renderAppliances();
calculate();
lucide.createIcons();
