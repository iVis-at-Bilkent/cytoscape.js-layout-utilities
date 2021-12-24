const puppeteer = require('puppeteer');
const fs = require('fs');

async function run () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  async function setParameters(averageDegree, nodeCount, compoundNodeRatio, childrenRatio, newNodeRatio) {
    await page.evaluate(val => { document.getElementById('averageDegree').value = val; }, averageDegree.toString());
    await page.evaluate(val => { document.getElementById('initialNodeCount').value = val; }, nodeCount.toString());
    await page.evaluate(val => { document.getElementById('compoundNodeRatio').value = val; }, compoundNodeRatio.toString());
    await page.evaluate(val => { document.getElementById('childrenRatio').value = val; }, childrenRatio.toString());
    await page.evaluate(val => { document.getElementById('newNodeRatio').value = val; }, newNodeRatio.toString());
  }

  // Async function for waiting for a specific event
  page.waitForEvent = async function waitForEvent(event, timeout = 500000) {
    return Promise.race([
        page.evaluate(
            event => new Promise(resolve => document.addEventListener(event, resolve, { once: true })),
            event
        ),
        page.waitForTimeout(timeout)
    ]);
  };
  
  let result;
  await page.exposeFunction('onCustomEvent', e => {
    result = e;
  });

  // Get result of a single placement into result variable
  await page.evaluateOnNewDocument((type) => {
      document.addEventListener(type, ({detail}) => {
        window.onCustomEvent(detail);
      });
    }, 'result');

  await page.goto('file:///' + __dirname + '/demo.html');

  const averageDegreeVals = [3, 6, 10, 20, 50, 100];
  const nodeCountVals = [10, 50, 100, 200, 500, 1000];
  const compoundNodeRatioVals = [0.1, 0.3, 0.5, 0.7, 0.9];
  const childrenRatioVals = [0.1, 0.3, 0.5, 0.7, 0.9];
  const newNodeRatioVals = [0.1, 0.3, 0.5, 0.7, 0.9];

  // Create empty CSV file
  fs.truncate('result.csv', 0, () => {})
  const stream = fs.createWriteStream("result.csv", { flags:'a' });
  stream.write('Average Degree,Node Count,Compound Node Ratio, Children Ratio, New Node Ratio, Elapsed Time (ms)\n');

  
  // For every combination of the parameter values, calculate the time and write the result to the CSV file
  for (let a = 0; a < averageDegreeVals.length; a++) {
    const averageDegree = averageDegreeVals[a];
    for (let b = 0; b < nodeCountVals.length; b++) {
      const nodeCount = nodeCountVals[b];
      for (let c = 0; c < compoundNodeRatioVals.length; c++) {
        const compoundNodeRatio = compoundNodeRatioVals[c];
        for (let d = 0; d < childrenRatioVals.length; d++) {
          const childrenRatio = childrenRatioVals[d];
          for (let e = 0; e < newNodeRatioVals.length; e++) {
            const newNodeRatio = newNodeRatioVals[e];
            
            // Skip invalid combinations
            if (averageDegree >= nodeCount || compoundNodeRatio + childrenRatio >= 1) {
              continue;
            }
            
            await setParameters(averageDegree, nodeCount, compoundNodeRatio, childrenRatio, newNodeRatio);
            await page.click('#calculateTime');
            await page.waitForEvent('result');
            
            const newLine = [averageDegree, nodeCount, compoundNodeRatio, childrenRatio, newNodeRatio].join(',') + `,${result.averageTime.toFixed(3)}\n`;
            stream.write(newLine);
          }
        }
      }
    }
  }
  
  stream.end();
  console.log('finished');
  await browser.close();
}
run();