const createFastifyCurrent = require("./avvio-current");
const createFastifyProposed = require("./avvio-proposed");
const stats = require("simple-statistics");

function sleep(timeMs) {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

async function registerPlugins(fastify) {
  // register 50 plugins
  for (let i = 0; i < 50; i++)
    await fastify.register(async function () {
      // add a short async sleep to half of the registrations
      if (i % 2 == 0) {
        await sleep(1);
      }
    });
}

(async function () {
  const elapsedCurrent = [];
  const elapsedProposed = [];
  for (let i = 0; i < 500; i++) {
    const startCurrent = Date.now();
    const fastifyInstanceCurrent = await createFastifyCurrent(registerPlugins);
    fastifyInstanceCurrent.close();
    elapsedCurrent.push(Date.now() - startCurrent);

    const startProposed = Date.now();
    const fastifyInstanceProposed = await createFastifyProposed(
      registerPlugins
    );
    fastifyInstanceProposed.close();
    elapsedProposed.push(Date.now() - startProposed);
  }

  const current = {
    samples: elapsedCurrent.length,
    "min (ms)": stats.min(elapsedCurrent),
    "max (ms)": stats.max(elapsedCurrent),
    "median (ms)": stats.median(elapsedCurrent),
    "total (ms)": stats.sum(elapsedCurrent),
  };

  const proposed = {
    samples: elapsedProposed.length,
    "min (ms)": stats.min(elapsedProposed),
    "max (ms)": stats.max(elapsedProposed),
    "median (ms)": stats.median(elapsedProposed),
    "total (ms)": stats.sum(elapsedProposed),
  };

  console.table({ current, proposed });
})();
