// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import { getMakerlog, getLastfm } from './stats/index'

export async function handler() {
  try {
    const promises = {
      makerlog: getMakerlog(),
      lastfm: getLastfm(),
    }
    await Promise.all(Object.values(promises))

    const result = {}
    for (let key of Object.keys(promises)) {
      result[key] = await promises[key]
    }
    console.dir(result)

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
