var Game = {

    values:[1200, 450, -400, 200, 850, 0, 600, 1100, 300, 700, -200, 550, 1000, 50, 900, 150],

    score: 0,

    currentWheelPoints: 0,


    current:'',

    allowSpin:true,


    init:function () {
        document.getElementById('spin-wheel').addEventListener('click', this.onSpin.bind(this));
        this.renderPuzzle();
        this.setAction('spin');
        document.getElementById('solve-submit').addEventListener('click', this.onSolve.bind(this));
    },


    onSpin:function (e) {

        if (!this.allowSpin) return;

        var newRot = Math.floor(Math.random() * 360),
            idx = Math.floor(newRot / (360 / this.values.length)),
            point = this.values[idx];

        document.getElementById('wheel').setAttribute('style', '-webkit-transform: rotate(-' + (newRot + 7 * 360) + 'deg)')

        if (point < 1) {
            this.addPoints(point);
            this.setAction('Spin');
        }
        else {
            this.currentWheelPoints = point;
            document.getElementById('wheelpoints').innerHTML = point;
            this.allowSpin = false;
            this.setAction('Pick Letter');
        }
    },


    renderPuzzle:function () {

        var tbl, tr, td, div,
            pnum = Math.floor((Math.random() * puzzles.length)),
            puzzle = puzzles[pnum],
            words = puzzle.content.split(' ');

        document.getElementById('category').innerHTML = puzzle.cat;

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
        this.setAction('spin');

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
            e.target.setAttribute('class', 'picked');

            this.addPoints(l * this.currentWheelPoints);
        }
        else {
            e.target.setAttribute('class', 'no-exist');
        }
        this.allowSpin = true;
        this.setAction('spin');
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
            document.getElementsByTagName('body')[0].style.background = '#0f0';

            var numChar = this.current.length;
            var tdList = document.getElementsByTagName('td');
            for (var i=0; i < numChar; i++) {
                tdList[i].innerHTML = this.current.substr(i,1);
            }
        }
        else {
            document.getElementById('solve-box').value = '';
            document.getElementsByTagName('body')[0].style.background = '#f00';

            setTimeout(function() {
                document.getElementsByTagName('body')[0].style.background = 'transparent';
            }, 2000);

            this.addPoints(0);
        }

    },

    setAction: function(what) {
        document.getElementById('action').innerHTML = what;
    }

};


var puzzles = [
    {
        cat:'before and after',
        content:'Having a ball and chain'
    },
    {
        cat: 'person',
        content: 'Abraham Lincoln'
    },
    {
        cat: 'thing',
        content: 'super fast macintosh'
    },
    {
        cat: 'thing',
        content: 'broken can opener'
    }

]