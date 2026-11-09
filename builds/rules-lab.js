/* Configure-to-Order Rules Lab
   A fictional commercial mortise lock family ("Northline 7100"), modelled the way a
   CTO manufacturer would: attributes and options, constraint rules, a generic (150%)
   BOM with conditions and effectivity, a routing, a price build-up and a test suite.
   Every product, part number and price here is invented for demonstration. */

(function () {
  "use strict";

  // ---------- Product model ----------
  var ATTRS = [
    { id: "fn", name: "Function", options: [
      { v: "PS", t: "Passage (no lock)" },
      { v: "PR", t: "Privacy (thumb-turn)" },
      { v: "OF", t: "Office / entry" },
      { v: "CL", t: "Classroom" },
      { v: "SR", t: "Storeroom" } ] },
    { id: "lev", name: "Lever", options: [
      { v: "L1", t: "Straight" },
      { v: "L2", t: "Return" },
      { v: "L3", t: "Curved" } ] },
    { id: "fin", name: "Finish", options: [
      { v: "626", t: "Satin chrome (626)" },
      { v: "630", t: "Satin stainless (630)" },
      { v: "613", t: "Oil-rubbed bronze (613)" },
      { v: "622", t: "Matte black (622)" } ] },
    { id: "cyl", name: "Cylinder", options: [
      { v: "NONE", t: "None" },
      { v: "STD", t: "Standard keyed" },
      { v: "IC", t: "Interchangeable core" } ] },
    { id: "hand", name: "Handing", options: [
      { v: "LH", t: "Left hand (LH)" },
      { v: "RH", t: "Right hand (RH)" },
      { v: "LHR", t: "Left hand reverse (LHR)" },
      { v: "RHR", t: "Right hand reverse (RHR)" } ] },
    { id: "door", name: "Door thickness", options: [
      { v: "175", t: "1-3/4 in" },
      { v: "225", t: "2-1/4 in" } ] },
    { id: "fire", name: "Fire label", options: [
      { v: "N", t: "Not labelled" },
      { v: "F3", t: "3-hour fire label" } ] },
    { id: "el", name: "Electrified", options: [
      { v: "N", t: "Mechanical" },
      { v: "FS", t: "Fail-safe (unlocks on power loss)" },
      { v: "FX", t: "Fail-secure (stays locked on power loss)" } ] }
  ];

  var DEFAULT = { fn: "OF", lev: "L1", fin: "626", cyl: "STD", hand: "RH", door: "175", fire: "N", el: "N", date: "2026-11-15" };

  // ---------- Rules ----------
  // Each rule names the attributes it touches and returns true when the selection breaks it.
  var RULES = [
    { id: "R1", attrs: ["fn", "cyl"], text: "Passage and privacy locks have no key, so the cylinder must be None.",
      broken: function (s) { return (s.fn === "PS" || s.fn === "PR") && s.cyl !== "NONE"; } },
    { id: "R2", attrs: ["fn", "cyl"], text: "Office, classroom and storeroom locks are keyed, so they need a cylinder.",
      broken: function (s) { return (s.fn === "OF" || s.fn === "CL" || s.fn === "SR") && s.cyl === "NONE"; } },
    { id: "R3", attrs: ["fn", "el"], text: "Privacy locks are mechanical only.",
      broken: function (s) { return s.fn === "PR" && s.el !== "N"; } },
    { id: "R4", attrs: ["fn", "el"], text: "The classroom function is mechanical only in this family.",
      broken: function (s) { return s.fn === "CL" && s.el !== "N"; } },
    { id: "R5", attrs: ["fire", "lev"], text: "Only the straight and return levers passed the fire test, so a fire-labelled lock cannot use the curved lever.",
      broken: function (s) { return s.fire === "F3" && s.lev === "L3"; } },
    { id: "R6", attrs: ["fin", "door"], text: "Matte black is not made in the long spindle needed for 2-1/4 in doors.",
      broken: function (s) { return s.fin === "622" && s.door === "225"; } },
    { id: "R7", attrs: ["el", "door"], text: "The electrified chassis fits 1-3/4 in doors only.",
      broken: function (s) { return s.el !== "N" && s.door === "225"; } },
    { id: "R8", attrs: ["fin"], dated: true, text: "Oil-rubbed bronze is phased out: it cannot be ordered for dates on or after 2027-01-01.",
      broken: function (s) { return s.fin === "613" && s.date >= "2027-01-01"; } }
  ];

  // ---------- Generic (150%) BOM ----------
  // when(s) decides whether the line belongs to this configuration; pn(s) builds the part number.
  var BOM = [
    { id: "B10", pn: function () { return "7100-CHS-M"; }, d: "Mortise chassis, mechanical", qty: 1,
      cond: "Electrified = Mechanical", when: function (s) { return s.el === "N"; } },
    { id: "B11", pn: function () { return "7100-CHS-E"; }, d: "Mortise chassis, electrified 24 V", qty: 1,
      cond: "Electrified = Fail-safe or Fail-secure", when: function (s) { return s.el !== "N"; } },
    { id: "B12", pn: function (s) { return "7100-SOL-" + s.el; }, d: "Solenoid module", qty: 1,
      cond: "Electrified = Fail-safe or Fail-secure", when: function (s) { return s.el !== "N"; } },
    { id: "B13", pn: function () { return "7100-HRN-24"; }, d: "Wire harness, 24 V", qty: 1,
      cond: "Electrified = Fail-safe or Fail-secure", when: function (s) { return s.el !== "N"; } },
    { id: "B20", pn: function (s) { return "7100-FN-" + s.fn; }, d: "Function cam pack", qty: 1,
      cond: "Always (one per function)", when: function () { return true; } },
    { id: "B21", pn: function () { return "7100-IND-PR"; }, d: "Privacy indicator", qty: 1,
      cond: "Function = Privacy", when: function (s) { return s.fn === "PR"; } },
    { id: "B30", pn: function (s) { return leverPn(s); }, d: "Lever, pair", qty: 1,
      cond: "Always; Return lever is rev A before 2026-12-01, rev B from 2026-12-01", when: function () { return true; } },
    { id: "B31", pn: function (s) { return "TRM-7100-" + s.fin; }, d: "Escutcheon trim, pair", qty: 1,
      cond: "Always (one per finish)", when: function () { return true; } },
    { id: "B40", pn: function (s) { return "CYL-" + s.cyl + "-" + s.fin; }, d: "Cylinder", qty: 1,
      cond: "Cylinder = Standard or Interchangeable core", when: function (s) { return s.cyl !== "NONE"; } },
    { id: "B50", pn: function (s) { return "SPN-" + s.door; }, d: "Spindle for door thickness", qty: 1,
      cond: "Always (one per door thickness)", when: function () { return true; } },
    { id: "B60", pn: function () { return "LBL-F3"; }, d: "Fire label, 3-hour", qty: 1,
      cond: "Fire label = 3-hour", when: function (s) { return s.fire === "F3"; } },
    { id: "B61", pn: function () { return "7100-LCH-F"; }, d: "Fire-rated latch bolt", qty: 1,
      cond: "Fire label = 3-hour", when: function (s) { return s.fire === "F3"; } },
    { id: "B62", pn: function () { return "7100-LCH-S"; }, d: "Standard latch bolt", qty: 1,
      cond: "Fire label = Not labelled", when: function (s) { return s.fire === "N"; } },
    { id: "B70", pn: function (s) { return "HND-" + s.hand; }, d: "Handing kit", qty: 1,
      cond: "Always (one per handing)", when: function () { return true; } },
    { id: "B80", pn: function () { return "HW-7100"; }, d: "Fastener pack", qty: 1,
      cond: "Always", when: function () { return true; } }
  ];

  function leverPn(s) {
    var base = "LEV-" + s.lev + "-" + s.fin;
    if (s.lev === "L2") return base + (s.date >= "2026-12-01" ? " rev B" : " rev A");
    return base;
  }

  // ---------- Routing ----------
  var ROUTING = [
    { op: 10, d: "Assemble chassis", min: 6, when: function () { return true; } },
    { op: 20, d: "Set function and handing", min: 4, when: function () { return true; } },
    { op: 30, d: "Fit trim, lever and cylinder", min: 5, when: function () { return true; } },
    { op: 40, d: "Electrical function test", min: 7, when: function (s) { return s.el !== "N"; } },
    { op: 50, d: "Apply fire label and record serial", min: 2, when: function (s) { return s.fire === "F3"; } },
    { op: 60, d: "Final inspection and pack", min: 3, when: function () { return true; } }
  ];

  // ---------- Pricing (list price, USD) ----------
  var PRICE = {
    base: 412,
    fn: { PS: 0, PR: 18, OF: 46, CL: 52, SR: 46 },
    lev: { L1: 0, L2: 12, L3: 24 },
    fin: { "626": 0, "630": 38, "613": 29, "622": 33 },
    cyl: { NONE: 0, STD: 38, IC: 96 },
    door: { "175": 0, "225": 22 },
    fire: { N: 0, F3: 64 },
    el: { N: 0, FS: 318, FX: 318 }
  };
  var DEALER_MULTIPLIER = 0.52;

  // ---------- Engine ----------
  function violations(s) {
    return RULES.filter(function (r) { return r.broken(s); });
  }

  function isValid(s) { return violations(s).length === 0; }

  function copy(s) { var o = {}; for (var k in s) o[k] = s[k]; return o; }

  // Rules that would be broken if attribute `a` took value `v`, given the rest of the selection.
  function blockers(s, a, v) {
    var t = copy(s); t[a] = v;
    return RULES.filter(function (r) { return r.attrs.indexOf(a) !== -1 && r.broken(t); });
  }

  // After `changed` is set, repair any other attribute the change made invalid.
  function settle(s, changed) {
    var notes = [];
    for (var pass = 0; pass < 3; pass++) {
      var broken = violations(s);
      if (!broken.length) break;
      broken.forEach(function (r) {
        if (!r.broken(s)) return;
        var target = r.attrs.filter(function (a) { return a !== changed; })[0] || r.attrs[0];
        var attr = ATTRS.filter(function (x) { return x.id === target; })[0];
        if (!attr) return;
        for (var i = 0; i < attr.options.length; i++) {
          var t = copy(s); t[target] = attr.options[i].v;
          if (!r.broken(t) && blockers(t, target, attr.options[i].v).length === 0) {
            notes.push(attr.name + " changed to " + attr.options[i].t + ". " + r.id + ": " + r.text);
            s[target] = attr.options[i].v;
            break;
          }
        }
      });
    }
    return notes;
  }

  function resolveBom(s) {
    return BOM.filter(function (b) { return b.when(s); })
      .map(function (b) { return { id: b.id, pn: b.pn(s), d: b.d, qty: b.qty }; });
  }

  function resolveRouting(s) { return ROUTING.filter(function (r) { return r.when(s); }); }

  function price(s) {
    var lines = [{ d: "Base lock", p: PRICE.base }];
    ATTRS.forEach(function (a) {
      var table = PRICE[a.id];
      if (!table) return;
      var add = table[s[a.id]] || 0;
      if (add) {
        var opt = a.options.filter(function (o) { return o.v === s[a.id]; })[0];
        lines.push({ d: a.name + ": " + opt.t, p: add });
      }
    });
    var list = lines.reduce(function (n, l) { return n + l.p; }, 0);
    return { lines: lines, list: list, mult: DEALER_MULTIPLIER, net: Math.round(list * DEALER_MULTIPLIER * 100) / 100 };
  }

  function code(s) {
    return ["NL7100", s.fn, s.lev, s.fin, s.cyl, s.hand, s.door, s.fire, s.el].join("-");
  }

  // ---------- Test suite ----------
  // Each case: a selection, whether it should be valid, and the parts or rules it must produce.
  var TESTS = [
    { name: "Default office lock is buildable", s: {}, valid: true, has: ["7100-CHS-M", "CYL-STD-626", "7100-LCH-S"] },
    { name: "Passage lock with a key is rejected", s: { fn: "PS", cyl: "STD" }, valid: false, rules: ["R1"] },
    { name: "Passage lock without a key is buildable", s: { fn: "PS", cyl: "NONE" }, valid: true, hasNot: ["CYL-STD-626", "CYL-IC-626"] },
    { name: "Storeroom lock without a key is rejected", s: { fn: "SR", cyl: "NONE" }, valid: false, rules: ["R2"] },
    { name: "Privacy lock brings the indicator", s: { fn: "PR", cyl: "NONE" }, valid: true, has: ["7100-IND-PR"] },
    { name: "Electrified privacy lock is rejected", s: { fn: "PR", cyl: "NONE", el: "FS" }, valid: false, rules: ["R3"] },
    { name: "Electrified classroom lock is rejected", s: { fn: "CL", el: "FX" }, valid: false, rules: ["R4"] },
    { name: "Fail-secure office lock swaps the chassis", s: { el: "FX" }, valid: true, has: ["7100-CHS-E", "7100-SOL-FX", "7100-HRN-24"], hasNot: ["7100-CHS-M"] },
    { name: "Fire-labelled curved lever is rejected", s: { fire: "F3", lev: "L3" }, valid: false, rules: ["R5"] },
    { name: "Fire label brings label and fire latch", s: { fire: "F3" }, valid: true, has: ["LBL-F3", "7100-LCH-F"], hasNot: ["7100-LCH-S"] },
    { name: "Matte black on a 2-1/4 in door is rejected", s: { fin: "622", door: "225" }, valid: false, rules: ["R6"] },
    { name: "Electrified lock on a 2-1/4 in door is rejected", s: { el: "FS", door: "225" }, valid: false, rules: ["R7"] },
    { name: "Bronze can be ordered in 2026", s: { fin: "613", date: "2026-12-31" }, valid: true, has: ["TRM-7100-613"] },
    { name: "Bronze is blocked from 2027-01-01", s: { fin: "613", date: "2027-01-01" }, valid: false, rules: ["R8"] },
    { name: "Return lever is rev A before the change", s: { lev: "L2", date: "2026-11-30" }, valid: true, has: ["LEV-L2-626 rev A"] },
    { name: "Return lever is rev B from the change date", s: { lev: "L2", date: "2026-12-01" }, valid: true, has: ["LEV-L2-626 rev B"] },
    { name: "Two rules can break at once", s: { fn: "PR", cyl: "IC", el: "FS" }, valid: false, rules: ["R1", "R3"] },
    { name: "Price of the default lock is 496 list", s: {}, valid: true, listPrice: 496 }
  ];

  function runTests() {
    return TESTS.map(function (t) {
      var s = copy(DEFAULT); for (var k in t.s) s[k] = t.s[k];
      var v = violations(s).map(function (r) { return r.id; });
      var pns = resolveBom(s).map(function (b) { return b.pn; });
      var problems = [];
      if ((v.length === 0) !== t.valid) problems.push(t.valid ? "expected valid, got " + v.join(", ") : "expected invalid, got valid");
      (t.rules || []).forEach(function (r) { if (v.indexOf(r) === -1) problems.push("expected " + r + " to fire"); });
      if (t.valid) {
        (t.has || []).forEach(function (p) { if (pns.indexOf(p) === -1) problems.push("missing " + p); });
        (t.hasNot || []).forEach(function (p) { if (pns.indexOf(p) !== -1) problems.push("unexpected " + p); });
        if (t.listPrice != null && price(s).list !== t.listPrice) problems.push("list price " + price(s).list + ", expected " + t.listPrice);
      }
      return { name: t.name, s: s, pass: problems.length === 0, detail: problems.join("; ") || (t.valid ? "valid, parts as expected" : "rejected by " + v.join(", ")) };
    });
  }

  window.RulesLab = {
    ATTRS: ATTRS, RULES: RULES, BOM: BOM, ROUTING: ROUTING, PRICE: PRICE, DEFAULT: DEFAULT,
    violations: violations, isValid: isValid, blockers: blockers, settle: settle,
    resolveBom: resolveBom, resolveRouting: resolveRouting, price: price, code: code,
    runTests: runTests, copy: copy
  };
})();
