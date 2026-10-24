async (page) => {
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  await page.goto('http://127.0.0.1:4329/aasha/developmental-check-in');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('spinbutton',{name:'Age: years'}).fill('6');
  await page.getByRole('button',{name:'Start questions',exact:true}).click();
  await page.waitForFunction(() => Math.abs(document.querySelector('#check-question').getBoundingClientRect().top - document.querySelector('.site-header').getBoundingClientRect().height - 16) < 3);
  const anchored = async () => {
    await page.waitForFunction(() => Math.abs(document.querySelector('#check-question').getBoundingClientRect().top - document.querySelector('.site-header').getBoundingClientRect().height - 16) < 3);
    assert(await page.evaluate(() => scrollY > 100), 'Jumped to page top');
  };
  await page.locator('#check-next').click();
  assert(await page.locator('#answer-error').isVisible(), 'Missing answer has no guidance');
  for (let i=0;i<8;i++) {
    await page.getByRole('radio',{name:'No',exact:true}).check();
    await page.locator('#check-next').click();
    await anchored();
  }
  await page.locator('#check-back').click(); await anchored();
  assert(await page.getByRole('radio',{name:'No',exact:true}).isChecked(), 'Back lost answer');
  await page.screenshot({path:'output/aasha-v2-question-mobile.png'});
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('#check-in'))).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})));
  assert(!violations.length,JSON.stringify(violations));
  await page.locator('#check-review-now').click();
  assert(await page.locator('#check-finish').isDisabled(),'Incomplete summary allowed');
  const change = page.getByRole('button',{name:'Change answer: Does your child often seem not to notice when you call their name?',exact:true});
  await change.click(); await page.getByRole('radio',{name:'Yes',exact:true}).check(); await page.locator('#check-next').click();
  assert((await page.locator('#check-prompt').innerText()).includes('not busy'), 'New follow-up skipped');
  await page.getByRole('radio',{name:'No',exact:true}).check(); await page.locator('#check-next').click();
  assert(await page.locator('#check-review').isVisible(),'Edit did not return to review');
  await change.click(); await page.getByRole('radio',{name:'No',exact:true}).check(); await page.locator('#check-next').click();
  assert(!(await page.locator('#review-list').innerText()).includes('not busy'), 'Stale follow-up retained');
  await page.locator('#check-resume').click();
  for(let i=0;i<65 && await page.locator('#check-question').isVisible();i++) { await page.getByRole('radio',{name:'No',exact:true}).check(); await page.locator('#check-next').click(); }
  await page.locator('#check-finish').click();
  assert((await page.locator('#result-next').innerText()).includes('does not rule out'), 'Wrong summary');
  assert(await page.locator('#check-message').inputValue().then(s=>s.length<2500),'Draft too long');
  await page.emulateMedia({media:'print'}); await page.pdf({path:'output/aasha-v2-summary.pdf',format:'A4'}); await page.emulateMedia({media:'screen'});
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>document.documentElement.dataset.theme='dark');
  await page.screenshot({path:'output/aasha-v2-results-desktop.png',fullPage:true});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desktop overflow');
  await page.getByRole('button',{name:'Change an answer',exact:true}).click();
  await change.click(); await anchored();
  await page.setViewportSize({width:320,height:640});
  await page.getByRole('radio',{name:'Not sure',exact:true}).check();
  await page.locator('#check-next').click(); await anchored();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'320px overflow');
  await page.locator('#check-back').click();
  await page.getByRole('button',{name:'Change answer: Has your child lost a movement skill they used to have?',exact:true}).click();
  await page.getByRole('radio',{name:'Yes',exact:true}).check();
  assert(await page.locator('#loss-note').isVisible(),'Loss advice not immediate');
  await page.locator('#check-next').click();
  await page.locator('#check-review-now').isVisible();
  await page.evaluate(()=>{document.body.dataset.aashaV2Test='passed';});
}
