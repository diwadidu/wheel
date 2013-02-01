var Game = {

    values:[1200, 450, -400, 200, 850, 0, 600, 1100, 300, 700, -200, 550, 1000, 50, 900, 150],

    score: 0,

    currentWheelPoints: 0,


    current:'',

    allowSpin:true,


    init:function () {
        document.getElementById('spin-wheel').addEventListener('click', this.onSpin.bind(this));
        this.renderPuzzle();
        document.getElementById('solve-submit').addEventListener('click', this.onSolve.bind(this));
    },


    onSpin:function (e) {

        if (!this.allowSpin) return;

        var newRot = Math.floor(Math.random() * 360),
            idx = Math.floor(newRot / this.values.length),
            point = this.values[idx];

        document.getElementById('wheel').setAttribute('style', '-webkit-transform: rotate(-' + (newRot + 7 * 360) + 'deg)')

        this.currentWheelPoints = point;
        this.allowSpin = false;
    },


    renderPuzzle:function () {

        var tbl, tr, td, div,
            puzzle = puzzles[0],
            words = puzzle.content.split(' ');

        div = document.createElement('DIV');
        div.setAttribute('id', 'play-area');

        for (var i = 0; i < words.length; i++) {
            tbl = document.createElement('table');
            tr = document.createElement('tr');
            for (var k = 0; k < words[i].length; k++) {
                td = document.createElement('td')
                tr.appendChild(td)
            }
            tbl.appendChild(tr);
            div.appendChild(tbl)
        }
        document.getElementById('play-area')
            .parentNode
            .replaceChild(div, document.getElementById('play-area'));

        this.current = puzzle.content.toUpperCase().replace(/\s/g, '');


        // Render the alphabet;
        var i, li, alpha = "ABCDEFGHIJKLMNOPQRSTUVXYWZ".split(''),
            ul = document.getElementById('alphabet');

        for (var i = 0; i < 26; i++) {
            li = document.createElement('li');
            li.innerHTML = alpha[i];
            ul.appendChild(li);
        }

        ul.addEventListener('click', this.onLetterClick.bind(this));


    },


    onLetterClick:function (e) {

        if (this.allowSpin === true) {
            return;
        }

        e.preventDefault();
        var letter = e.target.innerHTML,
            pos = this.getPositions(letter),
            l = pos.length,
            i;

        if (l > 0) {
            var tdList = document.getElementsByTagName('td');

            for (i = 0; i < l; i++) {
                tdList[pos[i]].innerHTML = letter;
            }

            this.addPoints(l * this.currentWheelPoints);
        }
        this.allowSpin = true;

        console.log(this.score);

    },


    getPositions:function (letter) {

        var pos = [],
            idx = 0;

        while (this.current.indexOf(letter, idx) > -1) {
            idx = this.current.indexOf(letter, idx);
            pos.push(idx++);
        }

        return pos;
    },


    // add point can be + or -
    addPoints: function(addPoints) {


        if (addPoints === 0) {
            this.score = 0;
        }
        else {
            this.score += addPoints;
        }

        document.getElementById('current-score').innerHTML = this.score;

    },

    onSolve: function(e) {
        e.preventDefault();
        var attempt = document.getElementById('solve-box').value;

        if (attempt.toUpperCase().replace(/\s/g, '') == this.current) {
            console.log('solved');
        }
        else {
            console.log('fail');
            document.getElementById('solve-box').value = '';
            this.addPoints(0);

        }

    }

}


var puzzles = [
    {
        cat:'before and after',
        content:'Having a ball and chain'
    }

]