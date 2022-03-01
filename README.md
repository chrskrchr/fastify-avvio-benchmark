This repo contains a benchmark script to test the performance impact of the changes being proposed in the following `avvio` PR:

https://github.com/fastify/avvio/pull/177/files

The script performs 500 iterations of creating two `fastify` instances, one with the proposed `avvio` changes and another without.
The script registers 50 plugins with each instance with a mix of sync and async plugin registrations functions and dumps a table of startup latency statistics when finished.

### Running the Benchmark
 
1. Switch to `node@16`, `npm@8.3.1+` 
    * required for the `avvio` package override defined in `avvio-proposed/package.json`
3. Install all dependencies: `npm install && cd avvio-current && npm install && cd ../avvio-proposed && npm install && cd ..`
4. Run the benchmark script: `node index.js`


### Results
The results below are from my local machine with the following specs: 

* MacBook Pro (16-inch, 2019)
* 2.3 GHz 8-Core Intel Core i9
* 16 GB 2667 MHz DDR4

#### Run #1 (+0.47%)
```
┌──────────┬─────────┬──────────┬──────────┬─────────────┬────────────┐
│ (index)  │ samples │ min (ms) │ max (ms) │ median (ms) │ total (ms) │
├──────────┼─────────┼──────────┼──────────┼─────────────┼────────────┤
│ current  │   500   │    33    │    82    │     40      │   20124    │
│ proposed │   500   │    35    │    70    │     40      │   20218    │
└──────────┴─────────┴──────────┴──────────┴─────────────┴────────────┘
```

#### Run #2 (+0.42%)
```
┌──────────┬─────────┬──────────┬──────────┬─────────────┬────────────┐
│ (index)  │ samples │ min (ms) │ max (ms) │ median (ms) │ total (ms) │
├──────────┼─────────┼──────────┼──────────┼─────────────┼────────────┤
│ current  │   500   │    32    │    77    │     37      │   18612    │
│ proposed │   500   │    31    │    56    │     37      │   18691    │
└──────────┴─────────┴──────────┴──────────┴─────────────┴────────────┘
```

#### Run #3 (+0.27%)
```
┌──────────┬─────────┬──────────┬──────────┬─────────────┬────────────┐
│ (index)  │ samples │ min (ms) │ max (ms) │ median (ms) │ total (ms) │
├──────────┼─────────┼──────────┼──────────┼─────────────┼────────────┤
│ current  │   500   │    33    │    83    │     39      │   19473    │
│ proposed │   500   │    33    │    62    │     39      │   19525    │
└──────────┴─────────┴──────────┴──────────┴─────────────┴────────────┘
```