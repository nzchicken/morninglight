import fetch from 'node-fetch'

export default class Particle {

  constructor() {
    this.apiKey = process.env.PHOTON_API_KEY
  }

  async runAction(action, data) {
    if (action == 'TEMP_ANIMATE') return this.animateTemp(data)
    return Promise.reject('No such action type')
  }

  async animateTemp(data) {
    const {
      deviceId,
      duration,
      startTemp,
      endTemp,
      startIntensity,
      endIntensity,
      overallDuration
    } = data

    return fetch(
      `https://api.particle.io/v1/devices/${deviceId}/animateLight`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `args=${startTemp},${startIntensity},${endTemp},${endIntensity},${duration*1000},${overallDuration*1000}`
      }
    )
    .then(response => response.json())
    .catch(err => err)
  }

}
