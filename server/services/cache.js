const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', err => {
  console.log('Redis Error : ' + err);
});

async function getDataFromCache(redisKey) {
  return new Promise((resolve, reject) => {
    redisClient.get(redisKey, (err, result) => {
      if (result) {
        resolve(JSON.parse(result));
      } else {
        resolve(false);
      }
    });
  });
}

function saveDataToCache(redisKey, expireInSec = 3600 * 24, value) {
  redisClient.setex(redisKey, expireInSec, JSON.stringify(value));
}

module.exports = {
  getDataFromCache,
  saveDataToCache
};
