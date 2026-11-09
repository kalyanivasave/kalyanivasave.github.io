/* Variant Portfolio Lab
   A fictional task chair ("Model K") with 11 attributes and 1,166,400 possible combinations,
   the same order of complexity as the Herman Miller Aeron (more than 1.2 million, per Infor).
   Every option, volume, price and cost here is invented for demonstration. */
(function () {
  "use strict";

  var CHAIRS = 40000;          // chairs per year
  var BASE_LIST = 1100;        // base list price
  var BASE_CONTRIB = 418;      // contribution per chair before options (38%)
  var ADDER_MARGIN = 0.5;      // contribution on option adders

  // v: code, t: label, o: orders per year, a: list adder ($), k: annual cost to keep ($), s: strategic note
  var ATTRS = [
    { id: "size", name: "Size", values: [
      { v: "A", t: "Size A", o: 9000, a: 0, k: 6000 }, { v: "B", t: "Size B", o: 24000, a: 0, k: 6000 }, { v: "C", t: "Size C", o: 7000, a: 0, k: 6000 }] },
    { id: "mesh", name: "Seat and back", values: [
      { v: "STD", t: "Standard mesh", o: 30000, a: 0, k: 4000 }, { v: "KNT", t: "Premium knit", o: 7000, a: 95, k: 9000 }, { v: "3D", t: "3D mesh", o: 3000, a: 140, k: 12000 }] },
    { id: "color", name: "Colour", values: [
      { v: "GR", t: "Graphite", o: 14000, a: 0, k: 6000 }, { v: "CB", t: "Carbon", o: 9000, a: 0, k: 6000 }, { v: "MN", t: "Mineral", o: 6000, a: 0, k: 6000 },
      { v: "ON", t: "Onyx", o: 4200, a: 0, k: 6000 }, { v: "GL", t: "Glacier", o: 2600, a: 0, k: 7000 }, { v: "SG", t: "Sage", o: 1500, a: 0, k: 9000 },
      { v: "SD", t: "Sand", o: 1100, a: 0, k: 9000 }, { v: "SL", t: "Slate", o: 700, a: 0, k: 12000 }, { v: "RB", t: "Ruby", o: 450, a: 25, k: 22000 },
      { v: "OC", t: "Ocean", o: 250, a: 25, k: 22000 }, { v: "CT", t: "Citrus", o: 150, a: 25, k: 22000 }, { v: "AU", t: "Aubergine", o: 50, a: 25, k: 22000 }] },
    { id: "frame", name: "Frame finish", values: [
      { v: "G", t: "Graphite", o: 28000, a: 0, k: 5000 }, { v: "M", t: "Mineral", o: 9000, a: 0, k: 5000 }, { v: "P", t: "Polished", o: 3000, a: 180, k: 14000 }] },
    { id: "base", name: "Base finish", values: [
      { v: "G", t: "Graphite", o: 25000, a: 0, k: 5000 }, { v: "M", t: "Mineral", o: 9000, a: 0, k: 5000 },
      { v: "PA", t: "Polished aluminium", o: 5500, a: 150, k: 10000 }, { v: "BZ", t: "Bronze tone", o: 500, a: 150, k: 25000 }] },
    { id: "tilt", name: "Tilt", values: [
      { v: "ST", t: "Standard tilt", o: 12000, a: 0, k: 6000 }, { v: "TL", t: "Tilt limiter", o: 21000, a: 60, k: 6000 }, { v: "TS", t: "Tilt limiter and seat angle", o: 7000, a: 140, k: 8000 }] },
    { id: "arms", name: "Arms", values: [
      { v: "NA", t: "Armless", o: 3000, a: -40, k: 5000 }, { v: "FX", t: "Fixed", o: 4500, a: 0, k: 5000 }, { v: "HA", t: "Height adjustable", o: 12500, a: 70, k: 6000 },
      { v: "FA", t: "Fully adjustable", o: 19500, a: 150, k: 7000 }, { v: "LP", t: "Fully adjustable, leather pads", o: 500, a: 260, k: 11000, s: "Low volume, but it anchors the executive price point and wins large office fit-outs." }] },
    { id: "back", name: "Back support", values: [
      { v: "NO", t: "None", o: 6000, a: 0, k: 4000 }, { v: "LU", t: "Adjustable lumbar", o: 20000, a: 60, k: 6000 }, { v: "SA", t: "Sacral pad", o: 14000, a: 90, k: 6000 }] },
    { id: "casters", name: "Casters", values: [
      { v: "CP", t: "Carpet casters", o: 22000, a: 0, k: 4000 }, { v: "HF", t: "Hard-floor casters", o: 15500, a: 0, k: 4000 },
      { v: "GD", t: "Glides", o: 1800, a: 0, k: 8000, s: "Required by healthcare and lab contracts, where chairs must not roll." },
      { v: "LK", t: "Locking casters", o: 500, a: 45, k: 18000 }, { v: "OV", t: "Oversized casters", o: 200, a: 60, k: 18000 }] },
    { id: "depth", name: "Seat depth", values: [
      { v: "F", t: "Fixed depth", o: 26000, a: 0, k: 4000 }, { v: "AD", t: "Adjustable depth", o: 14000, a: 65, k: 6000 }] },
    { id: "head", name: "Headrest", values: [
      { v: "N", t: "No headrest", o: 36500, a: 0, k: 4000 }, { v: "H", t: "Headrest", o: 3500, a: 190, k: 10000 }] }
  ];
  var SEASONAL = ["RB", "OC", "CT", "AU"];

  var RULES = [
    { id: "K1", attrs: ["mesh", "color"], text: "Seasonal colours (Ruby, Ocean, Citrus, Aubergine) are only made in standard mesh.",
      broken: function (s) { return s.mesh !== "STD" && SEASONAL.indexOf(s.color) !== -1; } },
    { id: "K2", attrs: ["frame", "base"], text: "A polished frame is only sold with a polished aluminium base.",
      broken: function (s) { return s.frame === "P" && s.base !== "PA"; } },
    { id: "K3", attrs: ["head", "size"], text: "The headrest needs the taller back of size B or C.",
      broken: function (s) { return s.head === "H" && s.size === "A"; } },
    { id: "K4", attrs: ["casters", "tilt"], text: "Glides are only certified with standard tilt.",
      broken: function (s) { return s.casters === "GD" && s.tilt !== "ST"; } },
    { id: "K5", attrs: ["depth", "size"], text: "Size A's seat pan is too short for adjustable depth.",
      broken: function (s) { return s.depth === "AD" && s.size === "A"; } }
  ];

  function attr(id) { return ATTRS.filter(function (a) { return a.id === id; })[0]; }
  function val(aid, v) { return attr(aid).values.filter(function (x) { return x.v === v; })[0]; }
  function nextBest(a, x) { return a.values.filter(function (y) { return y !== x; }).reduce(function (m, y) { return y.o > m.o ? y : m; }); }
  function defaultOf(a) { return a.values.reduce(function (m, x) { return x.o > m.o ? x : m; }, a.values[0]); }
  function money(n) { var neg = n < 0; n = Math.abs(n); var s = n >= 1e6 ? "$" + (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? "$" + Math.round(n / 1e3).toLocaleString("en-US") + "k" : "$" + Math.round(n); return (neg ? "-" : "") + s; }
  function int(n) { return Math.round(n).toLocaleString("en-US"); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- Count valid configurations over the values still offered ----------
  function countValid(offered) {
    var lists = ATTRS.map(function (a) { return a.values.filter(function (x) { return offered[a.id + ":" + x.v]; }).map(function (x) { return x.v; }); });
    var total = lists.reduce(function (n, l) { return n * l.length; }, 1);
    // Count invalid ones by brute force over the attributes the rules touch, multiply by the rest.
    var ruleAttrs = ["mesh", "color", "frame", "base", "head", "size", "casters", "tilt", "depth"];
    var idx = ruleAttrs.map(function (id) { return ATTRS.map(function (a) { return a.id; }).indexOf(id); });
    var rest = ATTRS.reduce(function (n, a, i) { return idx.indexOf(i) === -1 ? n * lists[i].length : n; }, 1);
    var valid = 0, s = {};
    (function walk(d) {
      if (d === idx.length) {
        for (var r = 0; r < RULES.length; r++) if (RULES[r].broken(s)) return;
        valid++; return;
      }
      var l = lists[idx[d]];
      for (var i = 0; i < l.length; i++) { s[ruleAttrs[d]] = l[i]; walk(d + 1); }
    })(0);
    return { total: total, valid: valid * rest };
  }

  // ---------- Portfolio model ----------
  var decisions = {};   // key "attr:v" -> "keep" | "retire" | "+10" | "+20" | "-10"
  var reasons = {};
  function key(a, x) { return a.id + ":" + x.v; }

  function evaluate(subst, elast) {
    var lostChairs = 0, adderContrib = 0, keepCost = 0, options = 0, offered = {};
    ATTRS.forEach(function (a) {
      var def = defaultOf(a);
      var orders = {}; a.values.forEach(function (x) { orders[x.v] = x.o; });
      var adder = {}; a.values.forEach(function (x) { adder[x.v] = x.a; });
      a.values.forEach(function (x) {
        var d = decisions[key(a, x)] || "keep";
        if (d === "retire" && x !== def) {
          lostChairs += x.o * (1 - subst);
          orders[def.v] += x.o * subst;
          orders[x.v] = 0;
        } else if (d.charAt(0) === "+" || d.charAt(0) === "-") {
          var p = parseInt(d, 10) / 100;
          adder[x.v] = x.a * (1 + p);
          var shift = x.o * (-elast * p);           // a price rise sends some buyers to the next most popular choice
          shift = Math.max(-x.o * 0.5, Math.min(x.o, shift));
          var alt = nextBest(a, x);
          orders[x.v] -= shift;
          orders[alt.v] += shift;
        }
      });
      a.values.forEach(function (x) {
        var d = decisions[key(a, x)] || "keep";
        var on = !(d === "retire" && x !== def);
        offered[key(a, x)] = on;
        if (on) { options++; keepCost += x.k; adderContrib += orders[x.v] * adder[x.v] * ADDER_MARGIN; }
      });
    });
    var chairs = CHAIRS - lostChairs;
    // scale option revenue for lost chairs
    adderContrib *= chairs / CHAIRS;
    var contrib = chairs * BASE_CONTRIB + adderContrib;
    var space = countValid(offered);
    return { options: options, chairs: chairs, contrib: contrib, keepCost: keepCost, net: contrib - keepCost, valid: space.valid, total: space.total };
  }

  function suggest() {
    decisions = {}; reasons = {};
    ATTRS.forEach(function (a) {
      var def = defaultOf(a);
      a.values.forEach(function (x) {
        var k = key(a, x), share = x.o / CHAIRS;
        var optContrib = x.o * Math.max(x.a, 0) * ADDER_MARGIN;
        if (x.a > 0 && share > 0.4) { decisions[k] = "+10"; reasons[k] = "Chosen on " + Math.round(share * 100) + "% of chairs at a small adder. A 10% increase is unlikely to move many buyers."; return; }
        if (x === def) { decisions[k] = "keep"; reasons[k] = "The most popular choice; retired options move here."; return; }
        if (x.s) { decisions[k] = "keep"; reasons[k] = x.s; return; }
        if (share < 0.015 && x.k > optContrib) { decisions[k] = "retire"; reasons[k] = int(x.o) + " chairs a year. Keeping it costs " + money(x.k) + ", more than the " + money(optContrib) + " its price adds."; return; }
        if (share < 0.015) { decisions[k] = "keep"; reasons[k] = "Low volume, but its price adder earns " + money(optContrib) + " against " + money(x.k) + " to keep."; return; }
        decisions[k] = "keep";
      });
    });
  }

  // ---------- UI: configure ----------
  var sel = {}; ATTRS.forEach(function (a) { sel[a.id] = defaultOf(a).v; });
  var cfg = document.getElementById("pl-form");
  ATTRS.forEach(function (a) {
    var f = document.createElement("div"); f.className = "field";
    f.innerHTML = '<label for="pl-' + a.id + '">' + esc(a.name) + '</label><select id="pl-' + a.id + '" data-attr="' + a.id + '"></select>';
    cfg.appendChild(f);
  });
  function blockers(s, aid, v) { var t = {}; for (var k in s) t[k] = s[k]; t[aid] = v; return RULES.filter(function (r) { return r.attrs.indexOf(aid) !== -1 && r.broken(t); }); }
  function settle(changed) {
    var notes = [];
    RULES.forEach(function (r) {
      if (!r.broken(sel)) return;
      var target = r.attrs.filter(function (x) { return x !== changed; })[0];
      var a = attr(target);
      for (var i = 0; i < a.values.length; i++) {
        var t = {}; for (var k in sel) t[k] = sel[k]; t[target] = a.values[i].v;
        if (!r.broken(t)) { sel[target] = a.values[i].v; notes.push(a.name + " changed to " + a.values[i].t + ". " + r.text); break; }
      }
    });
    return notes;
  }
  cfg.addEventListener("change", function (e) { var a = e.target.getAttribute("data-attr"); if (!a) return; sel[a] = e.target.value; renderCfg(settle(a)); });
  function renderCfg(notes) {
    ATTRS.forEach(function (a) {
      document.getElementById("pl-" + a.id).innerHTML = a.values.map(function (x) {
        var b = x.v === sel[a.id] ? [] : blockers(sel, a.id, x.v);
        var others = []; b.forEach(function (r) { r.attrs.forEach(function (y) { if (y !== a.id && others.indexOf(attr(y).name) === -1) others.push(attr(y).name); }); });
        var price = x.a ? " (" + (x.a > 0 ? "+" : "-") + "$" + Math.abs(x.a) + ")" : "";
        return '<option value="' + x.v + '"' + (x.v === sel[a.id] ? " selected" : "") + ">" + esc(x.t) + price + (others.length ? ", changes " + others.join(", ").toLowerCase() : "") + "</option>";
      }).join("");
    });
    document.getElementById("pl-notice").textContent = notes && notes.length ? notes.join(" ") : "";
    document.getElementById("pl-code").textContent = "K-" + ATTRS.map(function (a) { return sel[a.id]; }).join("-");
    var lines = [["Base chair", BASE_LIST]];
    ATTRS.forEach(function (a) { var x = val(a.id, sel[a.id]); if (x.a) lines.push([a.name + ": " + x.t, x.a]); });
    var list = lines.reduce(function (n, l) { return n + l[1]; }, 0);
    document.getElementById("pl-price").innerHTML = lines.map(function (l) { return "<tr><td>" + esc(l[0]) + '</td><td class="num">' + (l[1] < 0 ? "-$" + Math.abs(l[1]) : "$" + l[1].toLocaleString("en-US")) + "</td></tr>"; }).join("") +
      '<tr><td><strong>List price</strong></td><td class="num"><strong>$' + list.toLocaleString("en-US") + "</strong></td></tr>";
    // how common is this exact chair? independent-share estimate
    var p = ATTRS.reduce(function (n, a) { return n * val(a.id, sel[a.id]).o / CHAIRS; }, 1);
    var perYear = p * CHAIRS;
    document.getElementById("pl-rarity").textContent = perYear >= 1 ? "About " + int(perYear) + " of these exact chairs a year, if choices were independent."
      : "Statistically, about one of these exact chairs every " + int(1 / perYear) + " years. Most configurations are like this.";
  }

  // ---------- UI: variant space ----------
  function renderSpace() {
    var all = {}; ATTRS.forEach(function (a) { a.values.forEach(function (x) { all[key(a, x)] = true; }); });
    var s = countValid(all);
    var nVals = ATTRS.reduce(function (n, a) { return n + a.values.length; }, 0);
    document.getElementById("pl-space-figs").innerHTML =
      '<div class="kpi"><div class="label">Attributes and values</div><div class="val">' + ATTRS.length + " / " + nVals + "</div></div>" +
      '<div class="kpi"><div class="label">Possible combinations</div><div class="val">' + int(s.total) + "</div></div>" +
      '<div class="kpi dark"><div class="label">Valid after 5 constraints</div><div class="val">' + int(s.valid) + "</div></div>";
    var items = [];
    ATTRS.forEach(function (a) { a.values.forEach(function (x) { items.push({ a: a, x: x, share: x.o / CHAIRS }); }); });
    items.sort(function (p, q) { return q.share - p.share; });
    var W = 760, rowH = 16, H = items.length * rowH + 28, maxS = items[0].share;
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" role="img" aria-label="Every option sorted by the share of chairs that include it">';
    items.forEach(function (it, i) {
      var y = 14 + i * rowH, w = Math.max(2, (it.share / maxS) * (W - 330));
      var tail = it.share < 0.015;
      svg += '<text x="220" y="' + (y + 11) + '" text-anchor="end" font-size="11" fill="#66736E">' + esc(it.a.name + ": " + it.x.t) + "</text>";
      svg += '<rect x="230" y="' + (y + 2) + '" width="' + w.toFixed(1) + '" height="11" rx="3" fill="' + (tail ? "#D9D2CA" : "#255B52") + '"/>';
      svg += '<text x="' + (236 + w).toFixed(1) + '" y="' + (y + 11) + '" font-size="11" fill="' + (tail ? "#B42318" : "#263431") + '">' + (it.share * 100).toFixed(it.share < 0.01 ? 2 : 1) + "%</text>";
    });
    svg += "</svg>";
    document.getElementById("pl-chart").innerHTML = svg;
    var tailN = items.filter(function (i) { return i.share < 0.015; }).length;
    document.getElementById("pl-tail-note").textContent = tailN + " of " + items.length + " options appear on fewer than 1.5% of chairs. They are the long tail, shown in grey.";
  }

  // ---------- UI: portfolio ----------
  var substEl = document.getElementById("pl-subst"), elastEl = document.getElementById("pl-elast");
  var baseline;
  function renderPortfolio() {
    var subst = substEl.value / 100, elast = -elastEl.value / 10;
    document.getElementById("pl-subst-out").textContent = substEl.value + "%";
    document.getElementById("pl-elast-out").textContent = elast.toFixed(1);
    var saved = decisions; decisions = {}; baseline = evaluate(subst, elast); decisions = saved;
    var now = evaluate(subst, elast);
    function kpi(label, v, b, fmt, dark, invert) {
      var d = v - b, cls = Math.abs(d) < 0.5 ? "flat" : ((d > 0) !== !!invert ? "up" : "down");
      var dt = Math.abs(d) < 0.5 ? "No change" : (d > 0 ? "+" : "-") + fmt(Math.abs(d)).replace("-", "") + " vs today";
      return '<div class="kpi' + (dark ? " dark" : "") + '"><div class="label">' + label + '</div><div class="val">' + fmt(v) + '</div><div class="delta ' + cls + '">' + dt + "</div></div>";
    }
    document.getElementById("pl-kpis").innerHTML =
      kpi("Options offered", now.options, baseline.options, int, false, true) +
      kpi("Valid configurations", now.valid, baseline.valid, int, false, true) +
      kpi("Chairs a year", now.chairs, baseline.chairs, int) +
      kpi("Cost to keep options", now.keepCost, baseline.keepCost, money, false, true) +
      kpi("Net contribution", now.net, baseline.net, money, true);
    var rows = "";
    ATTRS.forEach(function (a) {
      var def = defaultOf(a), maxO = Math.max.apply(null, a.values.map(function (x) { return x.o; }));
      rows += '<tr class="attr-row"><td colspan="7">' + esc(a.name) + "</td></tr>";
      a.values.forEach(function (x) {
        var k = key(a, x), d = decisions[k] || "keep", share = x.o / CHAIRS;
        var opts = [["keep", "Keep"]];
        if (x !== def) opts.push(["retire", "Retire"]);
        if (x.a > 0) opts.push(["+10", "Reprice +10%"], ["+20", "Reprice +20%"], ["-10", "Reprice -10%"]);
        var tag = x === def ? '<span class="tag-mini">default</span>' : x.s ? '<span class="tag-mini">strategic</span>' : share < 0.015 ? '<span class="tag-mini warn">long tail</span>' : "";
        rows += '<tr class="' + (d === "retire" ? "retire" : d !== "keep" ? "reprice" : "") + '"><td>' + esc(x.t) + tag + "</td>" +
          '<td style="min-width:120px"><div class="bar' + (share < 0.015 ? " low" : "") + '" style="width:' + Math.max(2, x.o / maxO * 100) + '%"></div></td>' +
          '<td class="num">' + int(x.o) + "</td>" +
          '<td class="num">' + (x.a ? (x.a > 0 ? "+$" : "-$") + Math.abs(x.a) : "None") + "</td>" +
          '<td class="num">' + money(x.k) + "</td>" +
          '<td class="act"><select class="decision" data-key="' + k + '" aria-label="Decision for ' + esc(a.name + " " + x.t) + '">' +
            opts.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === d ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></td>" +
          '<td class="why-col">' + esc(reasons[k] || "") + "</td></tr>";
      });
    });
    document.getElementById("pl-rows").innerHTML = rows;
  }
  document.getElementById("pl-rows").addEventListener("change", function (e) {
    var k = e.target.getAttribute("data-key"); if (!k) return;
    decisions[k] = e.target.value; reasons[k] = reasons[k] && decisions[k] !== "keep" ? reasons[k] : (decisions[k] === "keep" ? "" : "Your call.");
    renderPortfolio();
  });
  substEl.addEventListener("input", renderPortfolio);
  elastEl.addEventListener("input", renderPortfolio);
  document.getElementById("pl-suggest").addEventListener("click", function () { suggest(); renderPortfolio(); });
  document.getElementById("pl-reset").addEventListener("click", function () { decisions = {}; reasons = {}; renderPortfolio(); });

  // ---------- Tabs ----------
  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var i = Array.prototype.indexOf.call(tabs, t), j = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : -1;
      if (j > -1) { tabs[j].focus(); select(tabs[j]); }
    });
  });
  function select(tab) {
    tabs.forEach(function (t) { var on = t === tab; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute("aria-controls")).hidden = !on; });
  }

  window.PortfolioLab = { evaluate: evaluate, countValid: countValid, suggest: suggest, ATTRS: ATTRS, get decisions() { return decisions; } };
  renderCfg([]);
  renderSpace();
  renderPortfolio();
})();
