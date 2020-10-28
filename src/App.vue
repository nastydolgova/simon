<template>
  <div class="game">
    <h1 class="game__title">SimSim</h1>
    <div class="game-board">
            <p class="game-board__lost" :class="{ hidden: !isLosing }" id="textLost">
        You lost!
      </p>
      <div
        class="square square_red"
        v-on:click="clickRed"
        :class="{ active: isActive1 }"
      ></div>
      <div
        class="square square_blue"
        v-on:click="clickBlue"
        :class="{ active: isActive2 }"
      ></div>
      <div
        class="square square_yellow"
        v-on:click="clickYellow"
        :class="{ active: isActive3 }"
      ></div>
      <div
        class="square square_green"
        v-on:click="clickGreen"
        :class="{ active: isActive4 }"
      ></div>
    </div>
    <div class="game-info">
      <p class="info__counter">Round: {{ this.counter }}</p>

      <label class="info-level" for="level1">
        <input class="info-level__input"
          id="level1"
          type="radio"
          name="level"
          v-model="levelTime"
          value="1500"
          checked
        /> <span> Легкий </span> 
      </label>
      <label class="info-level" for="level2"
        ><input class="info-level__input"
          id="level2"
          type="radio"
          name="level"
          v-model="levelTime"
          value="1000"
        /> <span> Средний </span> 
        
        </label
      >
      <label class="info-level" for="level3"
        ><input class="info-level__input"
          id="level3"
          type="radio"
          name="level"
          v-model="levelTime"
          value="400"
        /> <span> Сложный </span>
        </label
      >

      <button class="btnStart" id="start" v-on:click="play">Start</button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    order: [],
    playerOrder: [],
    flash: null,
    turn: null,
    good: null,
    compTurn: null,
    intervalId: null,
    levelTime: 1500,
    counter: 0,
    isLosing: false,
    isActive1: false,
    isActive2: false,
    isActive3: false,
    isActive4: false,
  }),
  methods: {
    play: function () {
      this.order = [];
      this.playerOrder = [];
      this.flash = 0;
      this.turn = 1;
      this.counter = 1;
      this.isLosing = false;
      this.intervalId = 0;
      this.good = true;
      this.order.push(Math.floor(Math.random() * 4) + 1);
      this.compTurn = true;
      this.intervalId = setInterval(this.gameTurn, this.levelTime);
    },
    gameTurn: function () {
      if (this.flash == this.turn) {
        clearInterval(this.intervalId);
        this.compTurn = false;
        this.clearColor();
      }
      if (this.compTurn) {
        this.clearColor();
        let a = this.order[this.flash];
        setTimeout(() => {
          if (a == 1) this.one();
          if (a == 2) this.two();
          if (a == 3) this.three();
          if (a == 4) this.four();
          this.flash++;
        }, 200);
      }
    },

    one: function () {
      let audio = new Audio(require("./assets/sounds/1.mp3"));
      audio.play();
      this.isActive1 = true;
    },
    two: function () {
      let audio = new Audio(require("./assets/sounds/2.mp3"));
      audio.play();
      this.isActive2 = true;
    },
    three: function () {
      let audio = new Audio(require("./assets/sounds/3.mp3"));
      audio.play();
      this.isActive3 = true;
    },
    four: function () {
      let audio = new Audio(require("./assets/sounds/4.mp3"));
      audio.play();
      this.isActive4 = true;
    },
    clickRed: function () {
      this.playerOrder.push(1);
      this.check();
      this.one();
      setTimeout(this.clearColor, 300);
    },
    clickBlue: function () {
      this.playerOrder.push(2);
      this.check();
      this.two();
      setTimeout(this.clearColor, 300);
    },
    clickYellow: function () {
      this.playerOrder.push(3);
      this.check();
      this.three();
      setTimeout(this.clearColor, 300);
    },
    clickGreen: function () {
      this.playerOrder.push(4);
      this.check();
      this.four();
      setTimeout(this.clearColor, 300);
    },
    check: function () {
      if (
        this.playerOrder[this.playerOrder.length - 1] !==
        this.order[this.playerOrder.length - 1]
      ) {
        this.flashColor();
        this.isLosing = true;
        setTimeout(() => {
          this.clearColor();
          this.counter = 0;
          this.order = [];
          this.playerOrder = [];
        }, this.levelTime);
      }
      if (this.turn == this.playerOrder.length && this.good) {
        this.order.push(Math.floor(Math.random() * 4) + 1);
        console.log(`Компуктер : ${this.order}`);
        this.turn++;
        this.playerOrder = [];
        this.compTurn = true;
        this.flash = 0;
        this.counter = this.turn;
        this.intervalId = setInterval(this.gameTurn, this.levelTime);
      }
    },
    clearColor: function () {
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    flashColor: function () {
      this.isActive1 = true;
      this.isActive2 = true;
      this.isActive3 = true;
      this.isActive4 = true;
    },
  },
};
</script>

<style lang="sass">
 $font-doc: Roboto, sans-serif

body
  font: 100% $font-doc
  margin: 0
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: flex-start



label
  display: block
  box-sizing: border-box
  font-size: 9px
  text-align: left
  max-width: 500px
  margin-bottom: 3px
  letter-spacing: 1px
  color: grey

p
  margin: 0

.game
  align-items: center
  display: flex
  flex-direction: column
  justify-content: center
  flex-wrap: wrap

  &__title
    font-weight: 100
    margin-bottom: 30px

  &-board
    display: flex
    flex-direction: row
    width: 300px
    height: 300px
    flex-wrap: wrap
    margin: 0 
    margin-bottom: 10px
    position: relative

    &__lost
      position: absolute
      top: 133px
      left: 95px
      font-weight: 700
      font-size: 30px

.square
  width: 150px
  height: 150px
  border: 0

  &_red
    background-color: #FF7373
    border-top-left-radius: 100%

  &_blue
    background-color: #5CCCCC
    border-top-right-radius: 100%

  &_yellow
    background-color: #FFB273
    border-bottom-left-radius: 100%

  &_green
    background-color: #67E667
    border-bottom-right-radius: 100%

.game-info
  display: flex
  flex-direction: column
  justify-content: space-between
  width: 77px

.info__counter
  padding: 10px 0
  font-size: 20px
  font-weight: 100

.active
  opacity: 0.4

.hidden
  display: none

.info-level
  position: relative
  cursor: pointer
  align-items: center
  text-align: center
  color: black
  font-weight: 100
  text-transform: uppercase
  margin: 5px 0

  &:hover
    color: #1D7373

  &__input 
    display: none

    &:checked + span
      color: #1D7373
      font-weight:700

  &:after
    content:''
    position: absolute
    width: 65px
    height: 14px
    border-radius: 7px
    left: 5px
    top: -3px
    border: 1px solid #999

  &:hover:after
    border: 1px solid #1D7373

.btnStart
  margin: 10px 0
  border: 1px solid #999
  background-color: white
  text-transform: uppercase
  border-radius: 11px
  outline: none
  color: black

  &:hover
    color: #999

  &:active
    background-color: #FF7373
    outline: none
    color: white
    border: 1px solid #FF7373
</style>
