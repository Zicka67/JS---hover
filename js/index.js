import { DoubleImageEffect } from './doubleImageEffect.js';


[...document.querySelectorAll('.double')].forEach(el => new DoubleImageEffect(el));
