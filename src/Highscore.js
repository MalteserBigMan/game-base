import Bottleneck from 'bottleneck'

export default class Highscore {
  constructor(game) {
    this.game = game
    this.url = "https://victorious-wakeful-mistake.glitch.me"
    this.limiter = new Bottleneck({
      minTime: 200 // 5 requests per second
    })


  }

  async testApi() {
    try {
        const response = await fetch('https://victorious-wakeful-mistake.glitch.me/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

  fetch(options) {
    return this.limiter.schedule(() => fetch(this.url, options))
  }



  postScore(score) {
    console.log("skicka score")

    const data = { score, namn: "Malte" }
    console.log(score)
    fetch(`${this.url}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode:"cors"
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text)

      })


  }

  getScore() {
    console.log("hämta hiscore med jens kod")

    fetch(`${this.url}/score`)
      .then((response) => response.text())
      .then((text) => {
        console.log(text)
        const scores = JSON.parse(text)
        const list = document.createElement("ul")
        scores.forEach((score) => {
          const item = document.createElement("li")
          item.textContent = `${score.name}: ${score.score}`
          list.appendChild(item)
        })
        element.appendChild(list)
      })
      .catch((error) => {
        console.error(error)
      })
  }




  testApi() {

    fetch(this.url)
      .then((response) => response.text())
      .then((text) => {
        console.log(text)
      })
      .catch((error) => {
        console.error(error)
      })
  }







}