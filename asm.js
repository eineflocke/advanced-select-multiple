'use strict';

class Asm {
  constructor(sel, obj) {
    this.errorprefix = 'asm: ';

    const q = document.querySelector(sel);
    if (!q) throw `${this.errorprefix}css-selector ${sel} not found`;

    this.q = q;

    if (Array.isArray(obj)) {
      const obj2 = {};
      for (const o of obj) {
        const ostr = String(o);
        obj2[ostr] = ostr;
      }
      obj = obj2;
    } else if (typeof obj !== 'object') {
      throw `${this.errorprefix}obj is neither array nor object`;
    }

    for (const sel2 of ['.asm-selected', '.asm-noselect']) {

      const q2 = q.querySelector(sel2);
      if (!q2) throw `${this.errorprefix}css-selector ${sel2} not found`;

      for (const key of Object.keys(obj)) {
        const opt = document.createElement('option');
        opt.value = key;
        if (typeof obj[key] === 'string') {
          opt.text = obj[key];
        } else if (obj[key].text) {
          opt.text = obj[key].text;
        }
        if (typeof obj[key].selected === 'boolean') {
          opt.disabled = obj[key].selected !== (sel2 === '.asm-selected');
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
      };

      const clickhandler = (e, sel2) => {
        if (e.target.tagName !== 'OPTION') return false;
        e.preventDefault();

        const sel3 = sel2 === '.asm-selected' ? '.asm-noselect' : '.asm-selected';
        const scrolltop = document.querySelector(sel3).scrollTop;
        q.querySelector(`${sel3} option[value="${e.target.value}"]`).disabled = null;
        e.target.disabled = 'disabled';
        q.querySelectorAll(`.asm-noselect option`).forEach(qq => qq.selected = null);
        q.querySelectorAll(`.asm-selected option`).forEach(qq => qq.selected = 'selected');
        setTimeout(() => document.querySelector(sel2).scrollTop = scrolltop, 0);

        counthandler();
      };

      q2.addEventListener('click', e => clickhandler(e, sel2));
      q2.addEventListener('mousemove', e => e.preventDefault());

      counthandler();

    } // for sel2

    document.write(`<style>${sel} option:disabled { display: none; }</style>`);
  } // constructor

  getselected(attr = 'value') {
    if (attr !== 'value' && attr !== 'text') throw `${this.errorprefix}invalid attribute`;
    const ret = [];
    this.q.querySelectorAll('.asm-selected option:not([disabled])').forEach(q => {
      ret.push(q[attr]);
    });
    return ret;
  }
}
