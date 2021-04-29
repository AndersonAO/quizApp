(function () {
  fetch('assets/js/quest.json')
  .then(response => response.json())
  .then(array => carregaJson(array));
  function carregaJson(json){
    const game = new Game(json);
    game.start();
    listener(game);
  };
  function Game(json) {
    this.score = 0;
    this.quests = json;
    this.already = [];
    this.letters = ["a) ", "b) ", "c) ", "d) ", "e) "];
    console.log('dada' + this.quests.length)


    this.numberGenerator = (lengh) => {};

    this.next = function () {
      this.start();
    };
    this.start = function () {
      this.obj = this.getNewQuest();
      this.writeQuest();
    };

    this.writeQuest = () => {
      const title = document.querySelector(".quest-title");
      this.checkAlready(this.obj.title);
      title.innerText = this.obj.title;
      this.writeAnswers(this.obj);
    };

    this.updateScore = () => {
      const score = document.querySelector(".score");
      score.innerText = this.score;
    };

    this.writeAnswers = (obj) => {
      const ans = document.querySelector(".ans");
      const p = document.querySelectorAll("p");

      for (let i in p) {
        p[i].innerText = this.letters[i] + obj[`alt0${i}`];
      }
    };

    this.checkAnswers = (a) => {
      if (a == this.obj.correctAnswer) {
        this.score++;
        console.log(this.score);
      }
      this.updateScore();
      this.next();
    };

    this.getNewQuest = () => {
      const number = Math.floor(Math.random() * this.quests.length);
      return this.quests[number];
    }
    
    this.checkAlready = (a) => {
      if(!this.already) {
        this.aready.push(a);
        return;
      }
      for (let obj of this.already) {
        if(obj == a){
          this.obj = this.getNewQuest();
          return;
        }
      this.already.push(a);
      }
    }
  }


  

  

  function listener(game) {
    document.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("answers")) {
        let answer = el.innerText;
        answer = answer.substr(3);
        game.checkAnswers(answer);
      }
    });
  }
})();
