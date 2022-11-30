'use strict';

class Asm {

  constructor(sel, obj) {

    this.errorprefix = 'asm: ';

    const q = document.querySelector(sel);
    if (!q) throw `${this.errorprefix}css-selector ${sel} not found`;

    this.q = q;

    if (typeof obj !== 'object') {
      throw `${this.errorprefix}obj is neither array nor object`;
    }

    const obj2 = [];

    if (Array.isArray(obj)) {

      for (const o of obj) {

        if (typeof o === 'object') {
          if (!o.value || !o.text) throw `${this.errorprefix}invalid obj format`;
          obj2.push(o);
        } else {
          obj2.push({ value: o, text: o });
        }

      }

    } else {

      for (const key in obj) {

        if (typeof obj[key] === 'object') {
          if (!o.text) throw `${this.errorprefix}invalid obj format`;
          const objtmp = { value: key, text: o.text };
          if (o.selected) objtmp.selected = o.selected;
          obj2.push(objtmp);
        } else {
          obj2.push({ value: key, text: obj[key] });
        }

      }

    }

    obj = obj2;

    for (const sel2 of ['.asm-selected', '.asm-noselect']) {

      const q2 = q.querySelector(sel2);
      if (!q2) throw `${this.errorprefix}css-selector ${sel2} not found`;

      for (const o of obj) {

        const opt = document.createElement('option');
        opt.value = o.value;
        opt.text = o.text;

        if (typeof o.selected === 'boolean') {
          opt.disabled = o.selected !== (sel2 === '.asm-selected');
        } else {
          if (sel2 === '.asm-selected') opt.disabled = 'disabled';
        }

        q2.appendChild(opt);

      }

      const counthandler = () => {

        for (const sel of ['.asm-selected', '.asm-noselect']) {
          const qnum = q.querySelector(`${sel}-num`);
          if (!qnum) continue;
          qnum.innerHTML = Array.from(q.querySelector(sel).options).filter(o => !o.disabled).length;
        }

      }; // counthandler

      const clickhandler = (e, sel2) => {

        if (e.target.tagName !== 'OPTION') return false;
        e.preventDefault();

        const sel3 = sel2 === '.asm-selected' ? '.asm-noselect' : '.asm-selected';
        const scrolltop = document.querySelector(sel2).scrollTop;
        q.querySelector(`${sel3} option[value="${e.target.value}"]`).disabled = null;
        e.target.disabled = 'disabled';
        q.querySelectorAll(`.asm-noselect option`).forEach(qq => qq.selected = null);
        q.querySelectorAll(`.asm-selected option`).forEach(qq => qq.selected = null);
        setTimeout(() => document.querySelector(sel2).scrollTop = scrolltop, 0);

        counthandler();

      }; // clickhandler

      q2.addEventListener('click', e => clickhandler(e, sel2));
      q2.addEventListener('mousemove', e => e.preventDefault());

      counthandler();

    } // for sel2

    document.write(`<style>${sel} option:disabled { display: none; }</style>`);

  } // constructor

  getselected(attr = 'value') {

    if (attr !== 'value' && attr !== 'text') throw `${this.errorprefix}invalid attribute`;
    const ret = Array.from(this.q.querySelectorAll('.asm-selected option:not([disabled])')).map(q => q[attr]);
    return ret;

  } // getselected

  toggle(value, mode = 'select') {

    //if (mode === 'toggle') mode = ~value.indexOf(this.q.querySelectorAll(`.asm-noselect option`).map(o => o.value)) ? 'select' : 'unselect';
    const c1 = mode === 'select' ? 'selected' : 'noselect';
    const c2 = mode === 'select' ? 'noselect' : 'selected';
    const o1 = Array.from(this.q.querySelectorAll(`.asm-${c1} option:not([disabled])`));
    const o2 = Array.from(this.q.querySelectorAll(`.asm-${c2} option:not([disabled])`));
    const v1 = o1.map(o => o.value);
    const v2 = o2.map(o => o.value);
    //if (~value.indexOf(v1) || !~value.indexOf(v2)) return false;

    for (const o of o2) {
      if (value == o.value) {
        o.click();
        return true;
      }
    }

  } // toggle

} // Asm
