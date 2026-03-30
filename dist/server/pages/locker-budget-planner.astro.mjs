import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$LockerBudgetPlanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Locker Room Budget Planner | Free Cost Estimate | PlayerStall", "description": "Free locker room budget planner. Get an instant cost estimate for your facility. 30+ years experience, five year guarantee. Request a formal quote\u2014no obligation." }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="planner-page"> <div class="planner-container"> <div class="hero"> <div class="hero-eyebrow">North American Institutional Markets</div> <h1>Locker Room<br><em>Budget Planner</em></h1> <p>Get an instant cost estimate tailored to your facility \u2014 ready to take to your board or budget committee. Built for coaches, athletic directors, and facilities managers.</p> </div> <div class="planner"> <div class="planner-grid" id="formGrid"> <div class="section-header"> <div class="section-num">01</div> <div class="section-title">Your Program</div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Institution Type <span>*</span></div> <select id="instType"> <option value="">Select institution...</option> <option value="high_school">High School / Secondary</option> <option value="college">College / University</option> <option value="pro_club">Pro / Semi-Pro Club</option> <option value="rec_center">Recreation Center / YMCA</option> <option value="police">Police Department</option> <option value="fire">Fire Department</option> <option value="military">Military / Government</option> <option value="corporate">Corporate Facility</option> </select> </div> <div class="field-group"> <div class="field-label">Primary Sport / Use <span>*</span></div> <select id="sport"> <option value="">Select sport/use...</option> <option value="football">Football</option> <option value="basketball">Basketball</option> <option value="hockey">Hockey</option> <option value="baseball">Baseball / Softball</option> <option value="soccer">Soccer / Lacrosse</option> <option value="multi_sport">Multi-Sport / General Athletics</option> <option value="aquatics">Aquatics / Pool</option> <option value="first_responder">First Responder / Tactical Gear</option> <option value="general">General / Fitness Facility</option> </select> </div> </div> <div class="fields-col"> <div class="field-group"> <div class="range-header"> <div class="field-label">Number of Athletes / Users <span>*</span></div> <div class="range-value" id="usersVal">48</div> </div> <input type="range" id="userCount" min="12" max="300" value="48" step="4" oninput="updateRange(this, 'usersVal', '', '', 0)"> <div class="range-labels"><span>12</span><span>300+</span></div> </div> <div class="field-group"> <div class="field-label">Project Timeline</div> <select id="timeline"> <option value="urgent">ASAP (under 3 months)</option> <option value="standard" selected>Standard (3\u20136 months)</option> <option value="planning">Planning Phase (6\u201312 months)</option> <option value="future">Future Budget (1\u20132 years)</option> </select> </div> </div> <div class="section-header"> <div class="section-num">02</div> <div class="section-title">Space & Configuration</div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Room Width (feet)</div> <input type="number" id="roomW" placeholder="e.g. 40" min="10" max="200" value="40"> </div> <div class="field-group"> <div class="field-label">Room Length (feet)</div> <input type="number" id="roomL" placeholder="e.g. 60" min="10" max="500" value="60"> </div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Locker Configuration</div> <div class="chip-group"> <div class="chip"><input type="radio" name="config" id="cWall" value="wall" checked><label for="cWall">Wall-Mounted</label></div> <div class="chip"><input type="radio" name="config" id="cIsland" value="island"><label for="cIsland">Island/Back-to-Back</label></div> <div class="chip"><input type="radio" name="config" id="cPerimeter" value="perimeter"><label for="cPerimeter">Full Perimeter</label></div> </div> </div> <div class="field-group"> <div class="field-label">Locker Size Preference</div> <div class="chip-group"> <div class="chip"><input type="radio" name="size" id="sCompact" value="compact"><label for="sCompact">Compact (12")</label></div> <div class="chip"><input type="radio" name="size" id="sStandard" value="standard" checked><label for="sStandard">Standard (15")</label></div> <div class="chip"><input type="radio" name="size" id="sWide" value="wide"><label for="sWide">Wide (18")</label></div> <div class="chip"><input type="radio" name="size" id="sXL" value="xl"><label for="sXL">Extra-Wide (24")</label></div> </div> </div> </div> <div class="section-header"> <div class="section-num">03</div> <div class="section-title">Features & Finish</div> </div> <div class="full-row"> <div class="full-row-inner"> <div class="field-group"> <div class="field-label">Finish Level</div> <div class="chip-group chip-group-col"> <div class="chip"><input type="radio" name="finish" id="fEssential" value="essential"><label for="fEssential">Essential \u2014 Durable powder coat</label></div> <div class="chip"><input type="radio" name="finish" id="fPremium" value="premium" checked><label for="fPremium">Premium \u2014 Solid wood accents</label></div> <div class="chip"><input type="radio" name="finish" id="fElite" value="elite"><label for="fElite">Elite \u2014 Custom color + branding</label></div> </div> </div> <div class="field-group"> <div class="field-label">Add-Ons Required</div> <div class="chip-group chip-group-col"> <div class="chip"><input type="checkbox" id="aoBench" value="bench"><label for="aoBench">Integrated Bench Seating</label></div> <div class="chip"><input type="checkbox" id="aoNameplate" value="nameplate"><label for="aoNameplate">Nameplates / Jersey Holders</label></div> <div class="chip"><input type="checkbox" id="aoCharging" value="charging"><label for="aoCharging">USB Charging Ports</label></div> <div class="chip"><input type="checkbox" id="aoVent" value="ventilation"><label for="aoVent">Enhanced Ventilation</label></div> <div class="chip"><input type="checkbox" id="aoInstall" value="install" checked><label for="aoInstall">Installation & Project Mgmt</label></div> </div> </div> <div class="field-group"> <div class="field-label">Delivery State/Province</div> <select id="region"> <option value="northeast">Northeast US</option> <option value="southeast">Southeast US</option> <option value="midwest">Midwest US</option> <option value="southwest">Southwest US</option> <option value="west">West Coast US</option> <option value="canada_east">Eastern Canada</option> <option value="canada_west">Western Canada</option> </select> </div> </div> </div> <div class="calc-wrap"> <button type="button" class="btn-calculate" id="btnGetQuote" onclick="openQuoteModal()">GET MY QUOTE \u2192</button> </div> </div> <!-- Quote modal: email only, then submit to show quote --> <div class="quote-modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="quoteModalTitle" aria-hidden="true"> <div class="quote-modal"> <button type="button" class="quote-modal-close" id="quoteModalClose" onclick="closeQuoteModal()" aria-label="Close">\xD7</button> <h2 class="quote-modal-title" id="quoteModalTitle">Get your quote</h2> <p class="quote-modal-desc">Enter your email and we'll generate your budget estimate and send a copy to your inbox.</p> <form class="quote-modal-form" id="quoteModalForm" onsubmit="return submitQuoteModal(event)"> <div class="field-group"> <label class="field-label" for="modalQuoteEmail">Email <span>*</span></label> <input type="email" id="modalQuoteEmail" name="email" placeholder="you@school.edu" required autocomplete="email"> </div> <button type="submit" class="btn-calculate btn-modal-submit">Submit &amp; view quote</button> </form> </div> </div> <div id="results"> <div class="planner-grid"> <div class="results-header"> <div class="section-num">04</div> <div class="section-title">Budget Estimate</div> <div class="results-header-content"> <p class="results-sent" id="results-sent" style="display: none;">We've saved your request. Download your quote below or we'll follow up with a formal proposal.</p> <div class="results-eyebrow">Your Budget Estimate \u2014 <span id="res-date"></span></div> <div class="results-title" id="res-title">Locker Room Budget Summary</div> </div> </div> <div class="budget-range-box"> <div class="budget-tier"> <div class="tier-label">Essential Budget</div> <div class="tier-price" id="res-low">$0</div> <div class="tier-subtitle">Basic configuration, functional finish</div> </div> <div class="budget-tier featured"> <div class="tier-label">Recommended Range</div> <div class="tier-price" id="res-mid">$0</div> <div class="tier-subtitle">Premium materials, full add-ons selected</div> </div> <div class="budget-tier"> <div class="tier-label">Premium / Elite</div> <div class="tier-price" id="res-high">$0</div> <div class="tier-subtitle">Custom branding, elite finish, all features</div> </div> </div> <div class="utilization-row"> <div class="stat-box"> <div class="stat-label">Lockers Required</div> <div class="stat-value" id="res-lockers">\u2014</div> <div class="stat-sub" id="res-locker-sub">based on squad size</div> </div> <div class="stat-box"> <div class="stat-label">Space Utilization</div> <div class="stat-value" id="res-util">\u2014</div> <div class="stat-sub" id="res-util-sub">of available floor area</div> </div> <div class="stat-box"> <div class="stat-label">Per-Athlete Cost</div> <div class="stat-value" id="res-per">\u2014</div> <div class="stat-sub">recommended tier</div> </div> </div> <div class="recs-section"> <div class="recs-label">Recommended Models for Your Program</div> <div class="rec-cards" id="rec-cards"></div> </div> <div class="print-bar"> <button type="button" class="btn-print btn-download-quote" id="btnDownloadQuote" onclick="openQuotePage()"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
Download quote (PDF)
</button> <button type="button" class="btn-print" onclick="window.print()"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
Print this page
</button> </div> <div class="cta-section"> <div class="cta-text"> <h3>Ready for a Formal Quote?</h3> <p>Our team will review your requirements and send a detailed proposal within 2 business days. No obligation.</p> </div> <div class="cta-buttons"> <a href="/contact" class="btn-primary">Request a Quote</a> <a href="/shop" class="btn-secondary">View Catalog</a> </div> </div> </div> </div> </div> <div class="trust-bar"> <div class="trust-item"> <div class="trust-num">30+</div> <div class="trust-label">Years Manufacturing</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">4,200+</div> <div class="trust-label">Rooms Installed</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">NCAA</div> <div class="trust-label">Division I Trusted</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">500+</div> <div class="trust-label">Schools & Colleges</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">5 YEAR</div> <div class="trust-label">Guarantee</div> </div> </div> <div class="disclaimer">
Estimates are for budgeting purposes only and reflect typical institutional project costs based on PlayerStall historical data.<br>
Final pricing varies by project specifications, site conditions, and current material costs.<br> <a href="/contact">Contact us</a> for a detailed, no-obligation proposal.
</div> </div> </section> <script>
  const BASE_LOCKER = {
    compact:  { essential: 340, premium: 520, elite: 780 },
    standard: { essential: 420, premium: 640, elite: 960 },
    wide:     { essential: 520, premium: 790, elite: 1180 },
    xl:       { essential: 680, premium: 1040, elite: 1560 }
  };

  const SPORT_MULTIPLIER = {
    hockey: 1.22, football: 1.15, first_responder: 1.18,
    aquatics: 1.12, baseball: 1.05, multi_sport: 1.08,
    basketball: 1.0, soccer: 1.0, general: 0.95
  };

  const INST_MULTIPLIER = {
    pro_club: 1.30, college: 1.15, military: 1.12,
    high_school: 1.0, rec_center: 0.92, police: 1.10,
    fire: 1.08, corporate: 1.20
  };

  const ADDON_COSTS = {
    bench:       { essential: 85, premium: 120, elite: 160 },
    nameplate:   { essential: 28, premium: 45, elite: 70 },
    charging:    { essential: 65, premium: 65, elite: 65 },
    ventilation: { essential: 45, premium: 45, elite: 45 },
    install:     0.12
  };

  const REGION_SHIP = {
    northeast: 0.04, southeast: 0.05, midwest: 0.04,
    southwest: 0.06, west: 0.08, canada_east: 0.09, canada_west: 0.11
  };

  const MODELS = {
    football:  [
      { tag: 'TOP PICK \u2014 FOOTBALL', model: 'ProShield\u2122 XL', desc: 'Wide-body steel with full-length ventilation & equipment hooks. NCAA standard.', price: '$640\u2013$960' },
      { tag: 'TEAM FAVE', model: 'GameDay\u2122 18', desc: 'Heavy-duty 18" with integrated bench base. Handles full pads with ease.', price: '$520\u2013$790' },
      { tag: 'ELITE OPTION', model: 'Varsity Elite\u2122', desc: 'Custom team colors, engraved nameplates, USB charging. Recruit-room ready.', price: '$960\u2013$1,560' }
    ],
    hockey: [
      { tag: 'TOP PICK \u2014 HOCKEY', model: 'IcePro\u2122 XL', desc: 'Extra-deep ventilation for skates & pads. Moisture-resistant lining.', price: '$790\u2013$1,180' },
      { tag: 'DURABLE', model: 'RinkSide\u2122 24', desc: '24" extra-wide with stick rack and helmet shelf. Purpose-built for ice sports.', price: '$680\u2013$1,040' },
      { tag: 'VALUE', model: 'BladeReady\u2122', desc: 'Steel construction, perforated doors, integrated boot dryer port.', price: '$520\u2013$780' }
    ],
    basketball: [
      { tag: 'TOP PICK \u2014 BASKETBALL', model: 'CourtPro\u2122 15', desc: 'Clean, pro-style aesthetic with full-length mirror option. Standard 15" width.', price: '$640\u2013$960' },
      { tag: 'VERSATILE', model: 'AllCourt\u2122', desc: 'Adaptable shelf configuration, ideal for dual sport programs.', price: '$520\u2013$780' },
      { tag: 'ELITE', model: 'Arena Elite\u2122', desc: 'Backlit nameplate, custom team graphics, USB & wireless charging.', price: '$960\u2013$1,400' }
    ],
    first_responder: [
      { tag: 'TOP PICK \u2014 TACTICAL', model: 'Response\u2122 XL', desc: 'Full-length weapon lockbox integration, SCBA bottle rack, turnout gear drying.', price: '$790\u2013$1,180' },
      { tag: 'STANDARD ISSUE', model: 'Duty\u2122 Series', desc: 'Double-tier option for larger departments. PIN or key-lock standard.', price: '$420\u2013$640' },
      { tag: 'PREMIUM', model: 'Command\u2122 Elite', desc: 'Electronic lock, charging, full turnout storage. For modern facility upgrades.', price: '$1,040\u2013$1,560' }
    ],
    default: [
      { tag: 'BEST VALUE', model: 'Institutional\u2122 15', desc: 'Our most popular model \u2014 reliable, clean, and built for decades of daily use.', price: '$420\u2013$640' },
      { tag: 'PREMIUM', model: 'Signature\u2122 Series', desc: 'Solid wood accents, premium handle, fully configurable interior.', price: '$640\u2013$960' },
      { tag: 'ELITE', model: 'Custom\u2122 Pro', desc: 'Full custom program \u2014 colors, graphics, digital integration.', price: '$960\u2013$1,560' }
    ]
  };

  function updateRange(el, valId, prefix, suffix, decimals) {
    document.getElementById(valId).textContent = (prefix || '') + Number(el.value).toLocaleString() + (suffix || '');
    const pct = ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1);
    el.style.setProperty('--pct', pct + '%');
  }

  function fmt(n) {
    if (n >= 1000000) return '$' + (n/1000000).toFixed(2) + 'M';
    if (n >= 1000) return '$' + Math.round(n/1000) + 'K';
    return '$' + Math.round(n).toLocaleString();
  }

  let lastQuoteData = null;

  function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const input = document.getElementById('modalQuoteEmail');
    if (modal && input) {
      modal.classList.add('quote-modal--open');
      modal.setAttribute('aria-hidden', 'false');
      input.value = '';
      input.removeAttribute('aria-invalid');
      input.focus();
    }
  }

  function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
      modal.classList.remove('quote-modal--open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function submitQuoteModal(e) {
    e.preventDefault();
    const emailEl = document.getElementById('modalQuoteEmail');
    const email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
    if (!email) {
      emailEl?.focus();
      emailEl?.setAttribute('aria-invalid', 'true');
      return false;
    }
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!re.test(email)) {
      emailEl?.focus();
      emailEl?.setAttribute('aria-invalid', 'true');
      alert('Please enter a valid email address.');
      return false;
    }
    emailEl?.removeAttribute('aria-invalid');
    calculate();
    if (lastQuoteData) {
      submitLead(email, '', lastQuoteData);
      closeQuoteModal();
      const sentEl = document.getElementById('results-sent');
      if (sentEl) sentEl.style.display = 'block';
    }
    return false;
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeQuoteModal();
  });
  document.getElementById('quoteModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeQuoteModal();
  });

  function submitLead(email, name, data) {
    const body = [
      'Source: Locker Budget Planner',
      '',
      '--- Quote summary ---',
      \`Institution: \${data.instLabel}\`,
      \`Sport/Use: \${data.sportLabel}\`,
      \`Lockers: \${data.lockerCount} (\${data.users} users)\`,
      \`Essential: \${data.lowFmt}\`,
      \`Recommended: \${data.midFmt}\`,
      \`Premium/Elite: \${data.highFmt}\`,
      \`Per athlete (recommended): \${data.perAthleteFmt}\`,
      \`Room: \${data.roomW}\xD7\${data.roomL} ft\`,
      \`Date: \${data.dateStr}\`
    ].join('\\n');
    const form = new FormData();
    form.append('email', email);
    form.append('name', name || '(not provided)');
    form.append('message', body);
    form.append('_subject', 'Budget Planner Quote \u2014 ' + (name || email));
    fetch('https://formspree.io/f/xqedgojb', {
      method: 'POST',
      body: form
    }).catch(() => {});
  }

  function openQuotePage() {
    if (!lastQuoteData) return;
    const d = lastQuoteData;
    const html = \`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Locker Room Budget Quote \u2014 PlayerStall</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Georgia', serif; max-width: 700px; margin: 40px auto; padding: 24px; color: #1a1a1a; font-size: 14px; line-height: 1.5; }
    h1 { font-size: 22px; margin-bottom: 8px; }
    .meta { color: #666; font-size: 12px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 10px 12px; text-align: left; }
    th { background: #f5f5f5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .tier-mid { background: #fff8f0; }
    .total { font-weight: bold; }
    .recs { margin-top: 28px; }
    .recs h2 { font-size: 16px; margin-bottom: 12px; }
    .rec { border: 1px solid #eee; padding: 12px; margin-bottom: 10px; }
    .rec-model { font-weight: bold; }
    .rec-price { color: #fe5900; }
    .footer { margin-top: 32px; font-size: 12px; color: #666; }
    @media print { body { margin: 16px; } }
  </style>
</head>
<body>
  <h1>Locker Room Budget Quote</h1>
  <p class="meta">\${d.dateStr} \xB7 PlayerStall \u2014 Budget Planner Estimate</p>
  <p><strong>\${d.instLabel}</strong> \u2014 \${d.sportLabel}</p>
  <table>
    <tr><th>Summary</th><th>Value</th></tr>
    <tr><td>Lockers (est.)</td><td>\${d.lockerCount}</td></tr>
    <tr><td>Room size</td><td>\${d.roomW}\xD7\${d.roomL} ft</td></tr>
    <tr><td>Essential budget</td><td>\${d.lowFmt}</td></tr>
    <tr class="tier-mid"><td>Recommended range</td><td>\${d.midFmt}</td></tr>
    <tr><td>Premium / Elite</td><td>\${d.highFmt}</td></tr>
    <tr class="total"><td>Per athlete (recommended)</td><td>\${d.perAthleteFmt}</td></tr>
  </table>
  <div class="recs">
    <h2>Recommended models for your program</h2>
    \${d.recsHtml}
  </div>
  <p class="footer">This is an estimate for budgeting only. Final pricing requires a formal quote. Contact sales@playerstall.com or visit playerstall.com for a detailed proposal.</p>
</body>
</html>\`;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 400);
    }
  }

  function calculate() {
    const users    = parseInt(document.getElementById('userCount').value) || 48;
    const sizeKey  = document.querySelector('input[name="size"]:checked')?.value || 'standard';
    const finKey   = document.querySelector('input[name="finish"]:checked')?.value || 'premium';
    const sport    = document.getElementById('sport').value || 'general';
    const inst     = document.getElementById('instType').value || 'high_school';
    const roomW    = parseFloat(document.getElementById('roomW').value) || 40;
    const roomL    = parseFloat(document.getElementById('roomL').value) || 60;
    const region   = document.getElementById('region').value || 'midwest';
    const config   = document.querySelector('input[name="config"]:checked')?.value || 'wall';

    const addons = ['bench','nameplate','charging','ventilation','install']
      .filter(id => document.getElementById('ao'+id.charAt(0).toUpperCase()+id.slice(1))?.checked);

    const lockerCount = Math.ceil(users * 1.10);
    const base = BASE_LOCKER[sizeKey];
    const sm   = SPORT_MULTIPLIER[sport] || 1.0;
    const im   = INST_MULTIPLIER[inst] || 1.0;

    function tierCost(tier) {
      let perLocker = base[tier] * sm * im;
      addons.forEach(a => {
        if (a === 'install') return;
        const c = ADDON_COSTS[a];
        if (c && typeof c === 'object') perLocker += c[tier];
        else if (c && typeof c === 'number') perLocker += c;
      });
      let sub = perLocker * lockerCount;
      if (addons.includes('install')) sub *= (1 + ADDON_COSTS.install);
      sub *= (1 + (REGION_SHIP[region] || 0.05));
      if (config === 'perimeter') sub *= 1.08;
      if (config === 'island') sub *= 1.05;
      return sub;
    }

    const low  = tierCost('essential');
    const mid  = tierCost(finKey);
    const high = tierCost('elite') * 1.05;

    const lockerWidth = { compact: 12, standard: 15, wide: 18, xl: 24 }[sizeKey] / 12;
    const lockerDepth = 1.5;
    const lockerFootprint = lockerCount * lockerWidth * lockerDepth;
    const roomArea = roomW * roomL;
    const circulation = roomArea * 0.5;
    const utilPct = Math.min(99, Math.round((lockerFootprint / circulation) * 100));
    const fitsOk = lockerFootprint < circulation;
    const perAthlete = mid / users;

    document.getElementById('res-date').textContent = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
    const instLabels = { high_school:'High School', college:'College/University', pro_club:'Pro/Semi-Pro Club', rec_center:'Recreation Center', police:'Police Dept.', fire:'Fire Dept.', military:'Military', corporate:'Corporate Facility' };
    const sportLabels = { football:'Football', basketball:'Basketball', hockey:'Hockey', baseball:'Baseball/Softball', soccer:'Soccer/Lacrosse', multi_sport:'Multi-Sport', aquatics:'Aquatics', first_responder:'First Responder', general:'General Athletics' };
    document.getElementById('res-title').textContent = \`\${(instLabels[inst]||'Institutional')} Locker Room \u2014 \${(sportLabels[sport]||'Athletics')}\`;

    document.getElementById('res-low').textContent = fmt(low);
    document.getElementById('res-mid').textContent = fmt(mid);
    document.getElementById('res-high').textContent = fmt(high);
    document.getElementById('res-lockers').textContent = lockerCount;
    document.getElementById('res-locker-sub').textContent = \`+10% bench reserve for \${users} users\`;
    document.getElementById('res-util').textContent = utilPct + '%';
    document.getElementById('res-util-sub').textContent = fitsOk ? \`of \${roomW}\xD7\${roomL} ft space \u2014 good fit\` : \`\u26A0 May be tight \u2014 consider compact or additional space\`;
    document.getElementById('res-per').textContent = fmt(perAthlete);

    const sportKey = ['football','hockey','basketball','first_responder'].includes(sport) ? sport : 'default';
    const models = MODELS[sportKey];
    const cardHtml = models.map((m, i) => \`
      <div class="rec-card \${i===0?'top-pick':''}">
        <span class="rec-tag">\${m.tag}</span>
        <div class="rec-model">\${m.model}</div>
        <div class="rec-desc">\${m.desc}</div>
        <div class="rec-price">\${m.price} / unit</div>
      </div>
    \`).join('');
    document.getElementById('rec-cards').innerHTML = cardHtml;

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const recsHtml = models.map(m => \`<div class="rec"><span class="rec-model">\${m.model}</span> \u2014 \${m.desc}<br><span class="rec-price">\${m.price} / unit</span></div>\`).join('');
    lastQuoteData = {
      instLabel: instLabels[inst] || 'Institutional',
      sportLabel: sportLabels[sport] || 'Athletics',
      lockerCount,
      users,
      lowFmt: fmt(low),
      midFmt: fmt(mid),
      highFmt: fmt(high),
      perAthleteFmt: fmt(perAthlete),
      roomW,
      roomL,
      dateStr,
      recsHtml
    };

    const r = document.getElementById('results');
    r.style.display = 'block';
    setTimeout(() => r.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const r = document.getElementById('userCount');
    if (r) {
      const pct = ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1);
      r.style.setProperty('--pct', pct + '%');
    }
  });
<\/script> `], [" ", `<section class="planner-page"> <div class="planner-container"> <div class="hero"> <div class="hero-eyebrow">North American Institutional Markets</div> <h1>Locker Room<br><em>Budget Planner</em></h1> <p>Get an instant cost estimate tailored to your facility \u2014 ready to take to your board or budget committee. Built for coaches, athletic directors, and facilities managers.</p> </div> <div class="planner"> <div class="planner-grid" id="formGrid"> <div class="section-header"> <div class="section-num">01</div> <div class="section-title">Your Program</div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Institution Type <span>*</span></div> <select id="instType"> <option value="">Select institution...</option> <option value="high_school">High School / Secondary</option> <option value="college">College / University</option> <option value="pro_club">Pro / Semi-Pro Club</option> <option value="rec_center">Recreation Center / YMCA</option> <option value="police">Police Department</option> <option value="fire">Fire Department</option> <option value="military">Military / Government</option> <option value="corporate">Corporate Facility</option> </select> </div> <div class="field-group"> <div class="field-label">Primary Sport / Use <span>*</span></div> <select id="sport"> <option value="">Select sport/use...</option> <option value="football">Football</option> <option value="basketball">Basketball</option> <option value="hockey">Hockey</option> <option value="baseball">Baseball / Softball</option> <option value="soccer">Soccer / Lacrosse</option> <option value="multi_sport">Multi-Sport / General Athletics</option> <option value="aquatics">Aquatics / Pool</option> <option value="first_responder">First Responder / Tactical Gear</option> <option value="general">General / Fitness Facility</option> </select> </div> </div> <div class="fields-col"> <div class="field-group"> <div class="range-header"> <div class="field-label">Number of Athletes / Users <span>*</span></div> <div class="range-value" id="usersVal">48</div> </div> <input type="range" id="userCount" min="12" max="300" value="48" step="4" oninput="updateRange(this, 'usersVal', '', '', 0)"> <div class="range-labels"><span>12</span><span>300+</span></div> </div> <div class="field-group"> <div class="field-label">Project Timeline</div> <select id="timeline"> <option value="urgent">ASAP (under 3 months)</option> <option value="standard" selected>Standard (3\u20136 months)</option> <option value="planning">Planning Phase (6\u201312 months)</option> <option value="future">Future Budget (1\u20132 years)</option> </select> </div> </div> <div class="section-header"> <div class="section-num">02</div> <div class="section-title">Space & Configuration</div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Room Width (feet)</div> <input type="number" id="roomW" placeholder="e.g. 40" min="10" max="200" value="40"> </div> <div class="field-group"> <div class="field-label">Room Length (feet)</div> <input type="number" id="roomL" placeholder="e.g. 60" min="10" max="500" value="60"> </div> </div> <div class="fields-col"> <div class="field-group"> <div class="field-label">Locker Configuration</div> <div class="chip-group"> <div class="chip"><input type="radio" name="config" id="cWall" value="wall" checked><label for="cWall">Wall-Mounted</label></div> <div class="chip"><input type="radio" name="config" id="cIsland" value="island"><label for="cIsland">Island/Back-to-Back</label></div> <div class="chip"><input type="radio" name="config" id="cPerimeter" value="perimeter"><label for="cPerimeter">Full Perimeter</label></div> </div> </div> <div class="field-group"> <div class="field-label">Locker Size Preference</div> <div class="chip-group"> <div class="chip"><input type="radio" name="size" id="sCompact" value="compact"><label for="sCompact">Compact (12")</label></div> <div class="chip"><input type="radio" name="size" id="sStandard" value="standard" checked><label for="sStandard">Standard (15")</label></div> <div class="chip"><input type="radio" name="size" id="sWide" value="wide"><label for="sWide">Wide (18")</label></div> <div class="chip"><input type="radio" name="size" id="sXL" value="xl"><label for="sXL">Extra-Wide (24")</label></div> </div> </div> </div> <div class="section-header"> <div class="section-num">03</div> <div class="section-title">Features & Finish</div> </div> <div class="full-row"> <div class="full-row-inner"> <div class="field-group"> <div class="field-label">Finish Level</div> <div class="chip-group chip-group-col"> <div class="chip"><input type="radio" name="finish" id="fEssential" value="essential"><label for="fEssential">Essential \u2014 Durable powder coat</label></div> <div class="chip"><input type="radio" name="finish" id="fPremium" value="premium" checked><label for="fPremium">Premium \u2014 Solid wood accents</label></div> <div class="chip"><input type="radio" name="finish" id="fElite" value="elite"><label for="fElite">Elite \u2014 Custom color + branding</label></div> </div> </div> <div class="field-group"> <div class="field-label">Add-Ons Required</div> <div class="chip-group chip-group-col"> <div class="chip"><input type="checkbox" id="aoBench" value="bench"><label for="aoBench">Integrated Bench Seating</label></div> <div class="chip"><input type="checkbox" id="aoNameplate" value="nameplate"><label for="aoNameplate">Nameplates / Jersey Holders</label></div> <div class="chip"><input type="checkbox" id="aoCharging" value="charging"><label for="aoCharging">USB Charging Ports</label></div> <div class="chip"><input type="checkbox" id="aoVent" value="ventilation"><label for="aoVent">Enhanced Ventilation</label></div> <div class="chip"><input type="checkbox" id="aoInstall" value="install" checked><label for="aoInstall">Installation & Project Mgmt</label></div> </div> </div> <div class="field-group"> <div class="field-label">Delivery State/Province</div> <select id="region"> <option value="northeast">Northeast US</option> <option value="southeast">Southeast US</option> <option value="midwest">Midwest US</option> <option value="southwest">Southwest US</option> <option value="west">West Coast US</option> <option value="canada_east">Eastern Canada</option> <option value="canada_west">Western Canada</option> </select> </div> </div> </div> <div class="calc-wrap"> <button type="button" class="btn-calculate" id="btnGetQuote" onclick="openQuoteModal()">GET MY QUOTE \u2192</button> </div> </div> <!-- Quote modal: email only, then submit to show quote --> <div class="quote-modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="quoteModalTitle" aria-hidden="true"> <div class="quote-modal"> <button type="button" class="quote-modal-close" id="quoteModalClose" onclick="closeQuoteModal()" aria-label="Close">\xD7</button> <h2 class="quote-modal-title" id="quoteModalTitle">Get your quote</h2> <p class="quote-modal-desc">Enter your email and we'll generate your budget estimate and send a copy to your inbox.</p> <form class="quote-modal-form" id="quoteModalForm" onsubmit="return submitQuoteModal(event)"> <div class="field-group"> <label class="field-label" for="modalQuoteEmail">Email <span>*</span></label> <input type="email" id="modalQuoteEmail" name="email" placeholder="you@school.edu" required autocomplete="email"> </div> <button type="submit" class="btn-calculate btn-modal-submit">Submit &amp; view quote</button> </form> </div> </div> <div id="results"> <div class="planner-grid"> <div class="results-header"> <div class="section-num">04</div> <div class="section-title">Budget Estimate</div> <div class="results-header-content"> <p class="results-sent" id="results-sent" style="display: none;">We've saved your request. Download your quote below or we'll follow up with a formal proposal.</p> <div class="results-eyebrow">Your Budget Estimate \u2014 <span id="res-date"></span></div> <div class="results-title" id="res-title">Locker Room Budget Summary</div> </div> </div> <div class="budget-range-box"> <div class="budget-tier"> <div class="tier-label">Essential Budget</div> <div class="tier-price" id="res-low">$0</div> <div class="tier-subtitle">Basic configuration, functional finish</div> </div> <div class="budget-tier featured"> <div class="tier-label">Recommended Range</div> <div class="tier-price" id="res-mid">$0</div> <div class="tier-subtitle">Premium materials, full add-ons selected</div> </div> <div class="budget-tier"> <div class="tier-label">Premium / Elite</div> <div class="tier-price" id="res-high">$0</div> <div class="tier-subtitle">Custom branding, elite finish, all features</div> </div> </div> <div class="utilization-row"> <div class="stat-box"> <div class="stat-label">Lockers Required</div> <div class="stat-value" id="res-lockers">\u2014</div> <div class="stat-sub" id="res-locker-sub">based on squad size</div> </div> <div class="stat-box"> <div class="stat-label">Space Utilization</div> <div class="stat-value" id="res-util">\u2014</div> <div class="stat-sub" id="res-util-sub">of available floor area</div> </div> <div class="stat-box"> <div class="stat-label">Per-Athlete Cost</div> <div class="stat-value" id="res-per">\u2014</div> <div class="stat-sub">recommended tier</div> </div> </div> <div class="recs-section"> <div class="recs-label">Recommended Models for Your Program</div> <div class="rec-cards" id="rec-cards"></div> </div> <div class="print-bar"> <button type="button" class="btn-print btn-download-quote" id="btnDownloadQuote" onclick="openQuotePage()"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
Download quote (PDF)
</button> <button type="button" class="btn-print" onclick="window.print()"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
Print this page
</button> </div> <div class="cta-section"> <div class="cta-text"> <h3>Ready for a Formal Quote?</h3> <p>Our team will review your requirements and send a detailed proposal within 2 business days. No obligation.</p> </div> <div class="cta-buttons"> <a href="/contact" class="btn-primary">Request a Quote</a> <a href="/shop" class="btn-secondary">View Catalog</a> </div> </div> </div> </div> </div> <div class="trust-bar"> <div class="trust-item"> <div class="trust-num">30+</div> <div class="trust-label">Years Manufacturing</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">4,200+</div> <div class="trust-label">Rooms Installed</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">NCAA</div> <div class="trust-label">Division I Trusted</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">500+</div> <div class="trust-label">Schools & Colleges</div> </div> <div class="trust-sep"></div> <div class="trust-item"> <div class="trust-num">5 YEAR</div> <div class="trust-label">Guarantee</div> </div> </div> <div class="disclaimer">
Estimates are for budgeting purposes only and reflect typical institutional project costs based on PlayerStall historical data.<br>
Final pricing varies by project specifications, site conditions, and current material costs.<br> <a href="/contact">Contact us</a> for a detailed, no-obligation proposal.
</div> </div> </section> <script>
  const BASE_LOCKER = {
    compact:  { essential: 340, premium: 520, elite: 780 },
    standard: { essential: 420, premium: 640, elite: 960 },
    wide:     { essential: 520, premium: 790, elite: 1180 },
    xl:       { essential: 680, premium: 1040, elite: 1560 }
  };

  const SPORT_MULTIPLIER = {
    hockey: 1.22, football: 1.15, first_responder: 1.18,
    aquatics: 1.12, baseball: 1.05, multi_sport: 1.08,
    basketball: 1.0, soccer: 1.0, general: 0.95
  };

  const INST_MULTIPLIER = {
    pro_club: 1.30, college: 1.15, military: 1.12,
    high_school: 1.0, rec_center: 0.92, police: 1.10,
    fire: 1.08, corporate: 1.20
  };

  const ADDON_COSTS = {
    bench:       { essential: 85, premium: 120, elite: 160 },
    nameplate:   { essential: 28, premium: 45, elite: 70 },
    charging:    { essential: 65, premium: 65, elite: 65 },
    ventilation: { essential: 45, premium: 45, elite: 45 },
    install:     0.12
  };

  const REGION_SHIP = {
    northeast: 0.04, southeast: 0.05, midwest: 0.04,
    southwest: 0.06, west: 0.08, canada_east: 0.09, canada_west: 0.11
  };

  const MODELS = {
    football:  [
      { tag: 'TOP PICK \u2014 FOOTBALL', model: 'ProShield\u2122 XL', desc: 'Wide-body steel with full-length ventilation & equipment hooks. NCAA standard.', price: '$640\u2013$960' },
      { tag: 'TEAM FAVE', model: 'GameDay\u2122 18', desc: 'Heavy-duty 18" with integrated bench base. Handles full pads with ease.', price: '$520\u2013$790' },
      { tag: 'ELITE OPTION', model: 'Varsity Elite\u2122', desc: 'Custom team colors, engraved nameplates, USB charging. Recruit-room ready.', price: '$960\u2013$1,560' }
    ],
    hockey: [
      { tag: 'TOP PICK \u2014 HOCKEY', model: 'IcePro\u2122 XL', desc: 'Extra-deep ventilation for skates & pads. Moisture-resistant lining.', price: '$790\u2013$1,180' },
      { tag: 'DURABLE', model: 'RinkSide\u2122 24', desc: '24" extra-wide with stick rack and helmet shelf. Purpose-built for ice sports.', price: '$680\u2013$1,040' },
      { tag: 'VALUE', model: 'BladeReady\u2122', desc: 'Steel construction, perforated doors, integrated boot dryer port.', price: '$520\u2013$780' }
    ],
    basketball: [
      { tag: 'TOP PICK \u2014 BASKETBALL', model: 'CourtPro\u2122 15', desc: 'Clean, pro-style aesthetic with full-length mirror option. Standard 15" width.', price: '$640\u2013$960' },
      { tag: 'VERSATILE', model: 'AllCourt\u2122', desc: 'Adaptable shelf configuration, ideal for dual sport programs.', price: '$520\u2013$780' },
      { tag: 'ELITE', model: 'Arena Elite\u2122', desc: 'Backlit nameplate, custom team graphics, USB & wireless charging.', price: '$960\u2013$1,400' }
    ],
    first_responder: [
      { tag: 'TOP PICK \u2014 TACTICAL', model: 'Response\u2122 XL', desc: 'Full-length weapon lockbox integration, SCBA bottle rack, turnout gear drying.', price: '$790\u2013$1,180' },
      { tag: 'STANDARD ISSUE', model: 'Duty\u2122 Series', desc: 'Double-tier option for larger departments. PIN or key-lock standard.', price: '$420\u2013$640' },
      { tag: 'PREMIUM', model: 'Command\u2122 Elite', desc: 'Electronic lock, charging, full turnout storage. For modern facility upgrades.', price: '$1,040\u2013$1,560' }
    ],
    default: [
      { tag: 'BEST VALUE', model: 'Institutional\u2122 15', desc: 'Our most popular model \u2014 reliable, clean, and built for decades of daily use.', price: '$420\u2013$640' },
      { tag: 'PREMIUM', model: 'Signature\u2122 Series', desc: 'Solid wood accents, premium handle, fully configurable interior.', price: '$640\u2013$960' },
      { tag: 'ELITE', model: 'Custom\u2122 Pro', desc: 'Full custom program \u2014 colors, graphics, digital integration.', price: '$960\u2013$1,560' }
    ]
  };

  function updateRange(el, valId, prefix, suffix, decimals) {
    document.getElementById(valId).textContent = (prefix || '') + Number(el.value).toLocaleString() + (suffix || '');
    const pct = ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1);
    el.style.setProperty('--pct', pct + '%');
  }

  function fmt(n) {
    if (n >= 1000000) return '$' + (n/1000000).toFixed(2) + 'M';
    if (n >= 1000) return '$' + Math.round(n/1000) + 'K';
    return '$' + Math.round(n).toLocaleString();
  }

  let lastQuoteData = null;

  function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const input = document.getElementById('modalQuoteEmail');
    if (modal && input) {
      modal.classList.add('quote-modal--open');
      modal.setAttribute('aria-hidden', 'false');
      input.value = '';
      input.removeAttribute('aria-invalid');
      input.focus();
    }
  }

  function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
      modal.classList.remove('quote-modal--open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function submitQuoteModal(e) {
    e.preventDefault();
    const emailEl = document.getElementById('modalQuoteEmail');
    const email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
    if (!email) {
      emailEl?.focus();
      emailEl?.setAttribute('aria-invalid', 'true');
      return false;
    }
    const re = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
    if (!re.test(email)) {
      emailEl?.focus();
      emailEl?.setAttribute('aria-invalid', 'true');
      alert('Please enter a valid email address.');
      return false;
    }
    emailEl?.removeAttribute('aria-invalid');
    calculate();
    if (lastQuoteData) {
      submitLead(email, '', lastQuoteData);
      closeQuoteModal();
      const sentEl = document.getElementById('results-sent');
      if (sentEl) sentEl.style.display = 'block';
    }
    return false;
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeQuoteModal();
  });
  document.getElementById('quoteModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeQuoteModal();
  });

  function submitLead(email, name, data) {
    const body = [
      'Source: Locker Budget Planner',
      '',
      '--- Quote summary ---',
      \\\`Institution: \\\${data.instLabel}\\\`,
      \\\`Sport/Use: \\\${data.sportLabel}\\\`,
      \\\`Lockers: \\\${data.lockerCount} (\\\${data.users} users)\\\`,
      \\\`Essential: \\\${data.lowFmt}\\\`,
      \\\`Recommended: \\\${data.midFmt}\\\`,
      \\\`Premium/Elite: \\\${data.highFmt}\\\`,
      \\\`Per athlete (recommended): \\\${data.perAthleteFmt}\\\`,
      \\\`Room: \\\${data.roomW}\xD7\\\${data.roomL} ft\\\`,
      \\\`Date: \\\${data.dateStr}\\\`
    ].join('\\\\n');
    const form = new FormData();
    form.append('email', email);
    form.append('name', name || '(not provided)');
    form.append('message', body);
    form.append('_subject', 'Budget Planner Quote \u2014 ' + (name || email));
    fetch('https://formspree.io/f/xqedgojb', {
      method: 'POST',
      body: form
    }).catch(() => {});
  }

  function openQuotePage() {
    if (!lastQuoteData) return;
    const d = lastQuoteData;
    const html = \\\`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Locker Room Budget Quote \u2014 PlayerStall</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Georgia', serif; max-width: 700px; margin: 40px auto; padding: 24px; color: #1a1a1a; font-size: 14px; line-height: 1.5; }
    h1 { font-size: 22px; margin-bottom: 8px; }
    .meta { color: #666; font-size: 12px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 10px 12px; text-align: left; }
    th { background: #f5f5f5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .tier-mid { background: #fff8f0; }
    .total { font-weight: bold; }
    .recs { margin-top: 28px; }
    .recs h2 { font-size: 16px; margin-bottom: 12px; }
    .rec { border: 1px solid #eee; padding: 12px; margin-bottom: 10px; }
    .rec-model { font-weight: bold; }
    .rec-price { color: #fe5900; }
    .footer { margin-top: 32px; font-size: 12px; color: #666; }
    @media print { body { margin: 16px; } }
  </style>
</head>
<body>
  <h1>Locker Room Budget Quote</h1>
  <p class="meta">\\\${d.dateStr} \xB7 PlayerStall \u2014 Budget Planner Estimate</p>
  <p><strong>\\\${d.instLabel}</strong> \u2014 \\\${d.sportLabel}</p>
  <table>
    <tr><th>Summary</th><th>Value</th></tr>
    <tr><td>Lockers (est.)</td><td>\\\${d.lockerCount}</td></tr>
    <tr><td>Room size</td><td>\\\${d.roomW}\xD7\\\${d.roomL} ft</td></tr>
    <tr><td>Essential budget</td><td>\\\${d.lowFmt}</td></tr>
    <tr class="tier-mid"><td>Recommended range</td><td>\\\${d.midFmt}</td></tr>
    <tr><td>Premium / Elite</td><td>\\\${d.highFmt}</td></tr>
    <tr class="total"><td>Per athlete (recommended)</td><td>\\\${d.perAthleteFmt}</td></tr>
  </table>
  <div class="recs">
    <h2>Recommended models for your program</h2>
    \\\${d.recsHtml}
  </div>
  <p class="footer">This is an estimate for budgeting only. Final pricing requires a formal quote. Contact sales@playerstall.com or visit playerstall.com for a detailed proposal.</p>
</body>
</html>\\\`;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 400);
    }
  }

  function calculate() {
    const users    = parseInt(document.getElementById('userCount').value) || 48;
    const sizeKey  = document.querySelector('input[name="size"]:checked')?.value || 'standard';
    const finKey   = document.querySelector('input[name="finish"]:checked')?.value || 'premium';
    const sport    = document.getElementById('sport').value || 'general';
    const inst     = document.getElementById('instType').value || 'high_school';
    const roomW    = parseFloat(document.getElementById('roomW').value) || 40;
    const roomL    = parseFloat(document.getElementById('roomL').value) || 60;
    const region   = document.getElementById('region').value || 'midwest';
    const config   = document.querySelector('input[name="config"]:checked')?.value || 'wall';

    const addons = ['bench','nameplate','charging','ventilation','install']
      .filter(id => document.getElementById('ao'+id.charAt(0).toUpperCase()+id.slice(1))?.checked);

    const lockerCount = Math.ceil(users * 1.10);
    const base = BASE_LOCKER[sizeKey];
    const sm   = SPORT_MULTIPLIER[sport] || 1.0;
    const im   = INST_MULTIPLIER[inst] || 1.0;

    function tierCost(tier) {
      let perLocker = base[tier] * sm * im;
      addons.forEach(a => {
        if (a === 'install') return;
        const c = ADDON_COSTS[a];
        if (c && typeof c === 'object') perLocker += c[tier];
        else if (c && typeof c === 'number') perLocker += c;
      });
      let sub = perLocker * lockerCount;
      if (addons.includes('install')) sub *= (1 + ADDON_COSTS.install);
      sub *= (1 + (REGION_SHIP[region] || 0.05));
      if (config === 'perimeter') sub *= 1.08;
      if (config === 'island') sub *= 1.05;
      return sub;
    }

    const low  = tierCost('essential');
    const mid  = tierCost(finKey);
    const high = tierCost('elite') * 1.05;

    const lockerWidth = { compact: 12, standard: 15, wide: 18, xl: 24 }[sizeKey] / 12;
    const lockerDepth = 1.5;
    const lockerFootprint = lockerCount * lockerWidth * lockerDepth;
    const roomArea = roomW * roomL;
    const circulation = roomArea * 0.5;
    const utilPct = Math.min(99, Math.round((lockerFootprint / circulation) * 100));
    const fitsOk = lockerFootprint < circulation;
    const perAthlete = mid / users;

    document.getElementById('res-date').textContent = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
    const instLabels = { high_school:'High School', college:'College/University', pro_club:'Pro/Semi-Pro Club', rec_center:'Recreation Center', police:'Police Dept.', fire:'Fire Dept.', military:'Military', corporate:'Corporate Facility' };
    const sportLabels = { football:'Football', basketball:'Basketball', hockey:'Hockey', baseball:'Baseball/Softball', soccer:'Soccer/Lacrosse', multi_sport:'Multi-Sport', aquatics:'Aquatics', first_responder:'First Responder', general:'General Athletics' };
    document.getElementById('res-title').textContent = \\\`\\\${(instLabels[inst]||'Institutional')} Locker Room \u2014 \\\${(sportLabels[sport]||'Athletics')}\\\`;

    document.getElementById('res-low').textContent = fmt(low);
    document.getElementById('res-mid').textContent = fmt(mid);
    document.getElementById('res-high').textContent = fmt(high);
    document.getElementById('res-lockers').textContent = lockerCount;
    document.getElementById('res-locker-sub').textContent = \\\`+10% bench reserve for \\\${users} users\\\`;
    document.getElementById('res-util').textContent = utilPct + '%';
    document.getElementById('res-util-sub').textContent = fitsOk ? \\\`of \\\${roomW}\xD7\\\${roomL} ft space \u2014 good fit\\\` : \\\`\u26A0 May be tight \u2014 consider compact or additional space\\\`;
    document.getElementById('res-per').textContent = fmt(perAthlete);

    const sportKey = ['football','hockey','basketball','first_responder'].includes(sport) ? sport : 'default';
    const models = MODELS[sportKey];
    const cardHtml = models.map((m, i) => \\\`
      <div class="rec-card \\\${i===0?'top-pick':''}">
        <span class="rec-tag">\\\${m.tag}</span>
        <div class="rec-model">\\\${m.model}</div>
        <div class="rec-desc">\\\${m.desc}</div>
        <div class="rec-price">\\\${m.price} / unit</div>
      </div>
    \\\`).join('');
    document.getElementById('rec-cards').innerHTML = cardHtml;

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const recsHtml = models.map(m => \\\`<div class="rec"><span class="rec-model">\\\${m.model}</span> \u2014 \\\${m.desc}<br><span class="rec-price">\\\${m.price} / unit</span></div>\\\`).join('');
    lastQuoteData = {
      instLabel: instLabels[inst] || 'Institutional',
      sportLabel: sportLabels[sport] || 'Athletics',
      lockerCount,
      users,
      lowFmt: fmt(low),
      midFmt: fmt(mid),
      highFmt: fmt(high),
      perAthleteFmt: fmt(perAthlete),
      roomW,
      roomL,
      dateStr,
      recsHtml
    };

    const r = document.getElementById('results');
    r.style.display = 'block';
    setTimeout(() => r.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const r = document.getElementById('userCount');
    if (r) {
      const pct = ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1);
      r.style.setProperty('--pct', pct + '%');
    }
  });
<\/script> `])), maybeRenderHead()) })}`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/locker-budget-planner.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/locker-budget-planner.astro";
const $$url = "/locker-budget-planner";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LockerBudgetPlanner,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
