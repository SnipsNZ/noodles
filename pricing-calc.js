// pricing-calc.js — United Food Co

function initCalc() {
  const $ = id => document.getElementById(id);

  function fmt(n) {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function run() {
    const cost    = parseFloat($('cost').value)    || 0;
    const freight = parseFloat($('freight').value) || 0;
    const margin  = Math.min(parseFloat($('margin').value) || 0, 99.9);
    const gst     = $('gst-toggle').checked;

    if (cost <= 0) {
      $('r-placeholder').style.display = 'block';
      $('r-inner').style.display = 'none';
      return;
    }

    const landed  = cost + freight;
    const sellEx  = landed / (1 - margin / 100);
    const mAmt    = sellEx - landed;
    const gstAmt  = gst ? sellEx * 0.15 : 0;
    const total   = sellEx + gstAmt;

    $('r-cost').textContent    = fmt(cost);
    $('r-freight').textContent = fmt(freight);
    $('r-landed').textContent  = fmt(landed);
    $('r-mamt').textContent    = fmt(mAmt);
    $('r-exgst').textContent   = fmt(sellEx);
    $('r-gstamt').textContent  = fmt(gstAmt);
    $('r-gstrow').style.display = gst ? 'flex' : 'none';
    $('r-total').textContent   = fmt(total);
    $('r-profit').textContent  = fmt(mAmt);
    $('r-mpct').textContent    = margin.toFixed(1) + '%';

    const barW = Math.min((margin / 65) * 100, 100);
    $('margin-fill').style.width = barW + '%';

    $('r-placeholder').style.display = 'none';
    $('r-inner').style.display = 'block';
  }

  $('calc-btn').addEventListener('click', run);
  ['cost','freight','margin'].forEach(id => {
    $(id).addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
  });
  $('gst-toggle').addEventListener('change', () => {
    if ($('r-inner').style.display === 'block') run();
  });
}

document.addEventListener('DOMContentLoaded', initCalc);
