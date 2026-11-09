(function () {
  "use strict";
  var L = window.RulesLab;
  var sel = L.copy(L.DEFAULT);
  var form = document.getElementById("lab-form");
  var noticeEl = document.getElementById("lab-notice");

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function money(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  // ---------- Build the form ----------
  L.ATTRS.forEach(function (a) {
    var f = document.createElement("div");
    f.className = "field";
    f.innerHTML = '<label for="f-' + a.id + '">' + esc(a.name) + '</label><select id="f-' + a.id + '" data-attr="' + a.id + '"></select><span class="why" id="why-' + a.id + '"></span>';
    form.appendChild(f);
  });
  var dateField = document.createElement("div");
  dateField.className = "field";
  dateField.innerHTML = '<label for="f-date">Order date</label><input type="date" id="f-date" value="' + sel.date + '"><span class="hint">Try 2026-12-01 (lever revision) or 2027-01-01 (bronze phase-out).</span>';
  form.appendChild(dateField);

  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "f-date") { if (!t.value) return; sel.date = t.value; render(L.settle(sel, "date")); return; }
    var a = t.getAttribute("data-attr");
    if (!a) return;
    sel[a] = t.value;
    render(L.settle(sel, a));
  });

  document.getElementById("lab-reset").addEventListener("click", function () {
    sel = L.copy(L.DEFAULT);
    document.getElementById("f-date").value = sel.date;
    render(["Reset to the default office lock."]);
  });

  // ---------- Render ----------
  function render(notes) {
    L.ATTRS.forEach(function (a) {
      var s = document.getElementById("f-" + a.id);
      var whyText = [];
      s.innerHTML = a.options.map(function (o) {
        var b = o.v === sel[a.id] ? [] : L.blockers(sel, a.id, o.v);
        // A rule that involves only this attribute (like a phase-out date) cannot be repaired: block the option.
        // Otherwise allow it and say which other choice it will change.
        var hard = b.filter(function (r) { return r.attrs.length === 1; });
        var soft = b.filter(function (r) { return r.attrs.length > 1; });
        var suffix = "";
        if (hard.length) {
          suffix = " (not available, " + hard.map(function (r) { return r.id; }).join(", ") + ")";
          whyText.push(o.t + " is blocked by " + hard.map(function (r) { return r.id; }).join(", "));
        } else if (soft.length) {
          var others = [];
          soft.forEach(function (r) { r.attrs.forEach(function (x) { if (x !== a.id) { var at = L.ATTRS.filter(function (y) { return y.id === x; })[0]; if (at && others.indexOf(at.name) === -1) others.push(at.name); } }); });
          suffix = " (changes " + others.join(", ").toLowerCase() + ")";
        }
        return '<option value="' + o.v + '"' + (o.v === sel[a.id] ? " selected" : "") + (hard.length ? " disabled" : "") + ">" +
          esc(o.t) + suffix + "</option>";
      }).join("");
      document.getElementById("why-" + a.id).textContent = whyText.join("; ");
    });

    noticeEl.textContent = (notes && notes.length) ? notes.join(" ") : "";

    var v = L.violations(sel);
    var status = document.getElementById("lab-status");
    status.className = "status " + (v.length ? "bad" : "ok");
    status.textContent = v.length ? "Not buildable: " + v.map(function (r) { return r.id; }).join(", ") : "Valid and buildable";
    document.getElementById("lab-code").textContent = L.code(sel);

    var bom = L.resolveBom(sel);
    document.getElementById("bom-body").innerHTML = bom.map(function (b) {
      return "<tr><td>" + b.id + '</td><td class="pn">' + esc(b.pn) + "</td><td>" + esc(b.d) + '</td><td class="num">' + b.qty + "</td></tr>";
    }).join("");
    document.getElementById("bom-count").textContent = bom.length + " of " + L.BOM.length + " lines from the generic BOM";

    var rt = L.resolveRouting(sel);
    document.getElementById("routing-body").innerHTML = rt.map(function (r) {
      return '<tr><td class="num">' + r.op + "</td><td>" + esc(r.d) + '</td><td class="num">' + r.min + "</td></tr>";
    }).join("") + '<tr><td></td><td><strong>Standard time</strong></td><td class="num"><strong>' + rt.reduce(function (n, r) { return n + r.min; }, 0) + "</strong></td></tr>";

    var p = L.price(sel);
    document.getElementById("price-body").innerHTML = p.lines.map(function (l) {
      return "<tr><td>" + esc(l.d) + '</td><td class="num">' + money(l.p) + "</td></tr>";
    }).join("") +
      '<tr><td><strong>List price</strong></td><td class="num"><strong>' + money(p.list) + "</strong></td></tr>" +
      '<tr><td>Dealer multiplier</td><td class="num">× ' + p.mult.toFixed(2) + "</td></tr>" +
      '<tr><td><strong>Dealer net</strong></td><td class="num"><strong>' + money(p.net) + "</strong></td></tr>";

    document.getElementById("generic-body").innerHTML = L.BOM.map(function (b) {
      var on = bom.some(function (x) { return x.id === b.id; });
      return "<tr" + (on ? "" : ' class="muted"') + "><td>" + b.id + "</td><td>" + esc(b.d) + "</td><td>" + esc(b.cond) + "</td><td>" + (on ? '<span class="pass">In this order</span>' : "Not used") + "</td></tr>";
    }).join("");

    document.getElementById("rules-body").innerHTML = L.RULES.map(function (r) {
      var broken = v.indexOf(r) !== -1;
      return "<tr><td><strong>" + r.id + "</strong></td><td>" + esc(r.text) + "</td><td>" + r.attrs.map(function (a) {
        var at = L.ATTRS.filter(function (x) { return x.id === a; })[0];
        return at ? at.name : a;
      }).join(", ") + (r.dated ? ", order date" : "") + "</td><td>" + (broken ? '<span class="fail">Broken</span>' : '<span class="pass">Satisfied</span>') + "</td></tr>";
    }).join("");
  }

  // ---------- Tabs ----------
  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var i = Array.prototype.indexOf.call(tabs, t);
      if (e.key === "ArrowRight") { tabs[(i + 1) % tabs.length].focus(); select(tabs[(i + 1) % tabs.length]); }
      if (e.key === "ArrowLeft") { tabs[(i - 1 + tabs.length) % tabs.length].focus(); select(tabs[(i - 1 + tabs.length) % tabs.length]); }
    });
  });
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }

  // ---------- Tests ----------
  document.getElementById("run-tests").addEventListener("click", function () {
    var res = L.runTests();
    var passed = res.filter(function (r) { return r.pass; }).length;
    document.getElementById("test-summary").textContent = passed + " of " + res.length + " test configurations passed";
    document.getElementById("tests-body").innerHTML = res.map(function (r, i) {
      return '<tr><td class="num">' + (i + 1) + "</td><td>" + esc(r.name) + '</td><td class="pn">' + esc(L.code(r.s)) + (r.s.date !== L.DEFAULT.date ? " @ " + r.s.date : "") + "</td><td>" +
        (r.pass ? '<span class="pass">Pass</span>' : '<span class="fail">Fail</span>') + '</td><td class="muted">' + esc(r.detail) + "</td></tr>";
    }).join("");
  });

  render([]);
})();
