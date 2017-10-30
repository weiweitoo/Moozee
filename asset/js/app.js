var game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var normalColor = 0xFFFFFF;
var pressColor = 0xa55cb2;
var ScreenWidth = window.screen.availWidth;
var ScreenHeight = window.screen.availHeight;
var middleX = ScreenWidth / 2;
var middleY = ScreenHeight / 2;


function playSound(Note,delaytime,Velocity = 127,Volume = 127){
	MIDI.loadPlugin({
		soundfontUrl: "soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			//console.log(state, progress);
		},
		onsuccess: function() {
			var delay = delaytime; // play one note every quarter second
			var note = Note; // the MIDI note
			var velocity = Velocity; // how hard the note hits
			// play the note
			MIDI.setVolume(0, Volume);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.25);
		}
	});

}


function preload(){
	console.log("preload");

	game.load.audio('slowblue', ['asset/audio/slowmusic.mp3']);


	game.load.image('btn-playbackground','./asset/img/playbackgroundbutton.jpg');
	game.load.image('btn-stopbackground','asset/img/stopbackgroundbutton.png');
	game.load.image('btn-record','asset/img/recordbutton.png');
	game.load.image('btn-replay','asset/img/replaybutton.png');
	game.load.image('btn-inspiration','asset/img/inspirationbutton.png');
	game.load.image('btn-instrument','/asset/img/instrumentbutton.png');
	game.load.image('btn-backgroundsong','/asset/img/backgroundsongbutton.png');
	
}

function PlayBGMover(){
	console.log('in');
}

function PlayBGMout(){
	console.log("out");
}

function create(){
	console.log('create');

	music = game.add.audio('slowblue');
    music.play();

    /////////////////////////////////
    // Draw Menu
    ////////////////////////////////
    // Button
	var btnPlayBGM = game.add.button(game.world.centerX - 95, 400, 'btn-playbackground', function(){}, this, 2, 1, 0);

	
    btnPlayBGM.onInputOver.add(PlayBGMover, this);
    btnPlayBGM.onInputOut.add(PlayBGMout, this);


    var btnStopBGM = game.add.sprite(ScreenWidth - 150,50,'btn-stopbackground');
    btnStopBGM.scale.setTo(0.15,0.15);

    var btnRecord = game.add.sprite(ScreenWidth - 200,140,'btn-stopbackground');
    btnRecord.scale.setTo(0.15,0.15);

    var btnReplay = game.add.sprite(ScreenWidth - 200,220,'btn-stopbackground');
    btnReplay.scale.setTo(0.15,0.15);

    var btnInspiration = game.add.sprite(ScreenWidth - 200,280,'btn-stopbackground');
    btnInspiration.scale.setTo(0.15,0.15);

    var btnInstrument = game.add.sprite(ScreenWidth - 200,340,'btn-stopbackground');
    btnInstrument.scale.setTo(0.15,0.15);

    var btnBackGroundSong = game.add.sprite(ScreenWidth - 200,400,'btn-stopbackground');
    btnBackGroundSong.scale.setTo(0.15,0.15);


    ///////////////////////////////////////
    // Key event
    /////////////////////////////////////////
	Qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	Qkey.onDown.add(QKeyEvent, this);
	Qkey.onUp.add(QKeyEventUp, this);
	
	Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	Wkey.onDown.add(WKeyEvent, this);
	Wkey.onUp.add(WKeyEventUp, this);
	
	Ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);
	Ekey.onDown.add(EKeyEvent, this);
	Ekey.onUp.add(EKeyEventUp, this);

	Rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	Rkey.onDown.add(RKeyEvent, this);
	Rkey.onUp.add(RKeyEventUp, this);

	Tkey = game.input.keyboard.addKey(Phaser.Keyboard.T);
	Tkey.onDown.add(TKeyEvent, this);
	Tkey.onUp.add(TKeyEventUp, this);

	Ykey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
	Ykey.onDown.add(YKeyEvent, this);
	Ykey.onUp.add(YKeyEventUp, this);

	Ukey = game.input.keyboard.addKey(Phaser.Keyboard.U);
	Ukey.onDown.add(UKeyEvent, this);
	Ukey.onUp.add(UKeyEventUp, this);

	Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	Ikey.onDown.add(IKeyEvent, this);
	Ikey.onUp.add(IKeyEventUp, this);

	Okey = game.input.keyboard.addKey(Phaser.Keyboard.O);
	Okey.onDown.add(OKeyEvent, this);
	Okey.onUp.add(OKeyEventUp, this);

	Pkey = game.input.keyboard.addKey(Phaser.Keyboard.P);
	Pkey.onDown.add(PKeyEvent, this);
	Pkey.onUp.add(PKeyEventUp, this);

	OpenBracketkey = game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET);
	OpenBracketkey.onDown.add(OpenBracketKeyEvent, this);
	OpenBracketkey.onUp.add(OpenBracketKeyEventUp, this);

	/////////////////////////////////////////////
	// Graphic
	/////////////////////////////////////////////
	

	// for row 1 and 2
	// the varaible is keep resuing hehe, since it is lazy to change
	var noteWidth = 80;
	var noteHeight = 80;
	var noteIntervalX = 60;
	var noteIntervalY = 50;

	var graphics = game.add.graphics(350, 100);

    // set a fill and line style
    graphics.beginFill(normalColor);
    // draw a rectangle
    graphics.lineStyle(0, 0x0000FF, 0);
    for (var i = 0; i < 4; i++) {
    	graphics.drawRect((noteWidth + noteIntervalX) * i,0,noteWidth,noteHeight);	
    }
    for (var i = 0; i < 4; i++) {
    	graphics.drawRect((noteWidth + noteIntervalX) * i,noteHeight + noteIntervalY,noteWidth,noteHeight);	
    }

    // For row 3, i am damn lazy to change the variable name lol
    var noteWidth = 140;
	var noteHeight = 80;
	var noteIntervalX = 40;
	var noteIntervalY = 50;

    for (var i = 0; i < 3; i++) {
    	graphics.drawRect((noteWidth + noteIntervalX) * i,(noteHeight + noteIntervalY) * 2,noteWidth,noteHeight);	
    }

    // row 4
    graphics.drawRect(0,(noteHeight + noteIntervalY) * 3,500,noteHeight);	
    

    window.graphics = graphics;
}

function update(){
	
}

function drawRectPadding(x,y,width,height,padding,color){
	graphics.beginFill(color);
	graphics.drawRect( x - padding / 2,y - padding / 2,width + padding,height + padding);
	
}

function QKeyEvent(){
	console.log("Q");
	playSound(57,0);
	// lol, worry no enough time to code,better use fastest way
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 0,0,80,80);

	drawRectPadding((80 + 60) * 0,0,80,80,-6,pressColor);
	
}

function WKeyEvent(){
	console.log("W");
	playSound(60,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 1,0,80,80);

	drawRectPadding((80 + 60) * 1,0,80,80,-6,pressColor);
}

function EKeyEvent(){
	console.log("E");
	playSound(62,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 2,0,80,80);

	drawRectPadding((80 + 60) * 2,0,80,80,-6,pressColor);
}

function RKeyEvent(){
	console.log("R");
	playSound(64,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 3,0,80,80);

	drawRectPadding((80 + 60) * 3,0,80,80,-6,pressColor);
}

function TKeyEvent(){
	console.log("T");
	playSound(67,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 0,80 + 50,80,80);	

	drawRectPadding((80 + 60) * 0,80 + 50,80,80,-6,pressColor);
}

function YKeyEvent(){
	console.log("Y");
	playSound(69,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 1,80 + 50,80,80);	

	drawRectPadding((80 + 60) * 1,80 + 50,80,80,-6,pressColor);
}

function UKeyEvent(){
	console.log("U");
	playSound(72,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 2,80 + 50,80,80);	

	drawRectPadding((80 + 60) * 2,80 + 50,80,80,-6,pressColor);
}

function IKeyEvent(){
	console.log("I");
	playSound(74,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((80 + 60) * 3,80 + 50,80,80);	

	drawRectPadding((80 + 60) * 3,80 + 50,80,80,-6,pressColor);
}

function OKeyEvent(){
	console.log("O");
	playSound(76,0);

	graphics.beginFill(0x000000);
	graphics.drawRect((140 + 40) * 0,(80 + 50) * 2,140,80)

	drawRectPadding((140 + 40) * 0,(80 + 50) * 2,140,80,-6,pressColor);

}

function PKeyEvent(){
	console.log("P");
	playSound(79,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((140 + 40) * 1,(80 + 50) * 2,140,80)

	drawRectPadding((140 + 40) * 1,(80 + 50) * 2,140,80,-6,pressColor);

	
}

function OpenBracketKeyEvent(){
	console.log("[");
	playSound(81,0);
	graphics.beginFill(0x000000);
	graphics.drawRect((140 + 40) * 2,(80 + 50) * 2,140,80)

	drawRectPadding((140 + 40) * 2,(80 + 50) * 2,140,80,-6,pressColor);

}	



function QKeyEventUp(){
	console.log("Q-Up");
	// lol, worry no enough time to code,better use fastest way
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 0,0,80,80);
	
}

function WKeyEventUp(){
	console.log("W");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 1,0,80,80);	
}

function EKeyEventUp(){
	console.log("E");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 2,0,80,80);	
}

function RKeyEventUp(){
	console.log("R");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 3,0,80,80);	
}

function TKeyEventUp(){
	console.log("T");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 0,80 + 50,80,80);	
}

function YKeyEventUp(){
	console.log("Y");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 1,80 + 50,80,80);	
}

function UKeyEventUp(){
	console.log("U");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 2,80 + 50,80,80);	
}

function IKeyEventUp(){
	console.log("I");
	graphics.beginFill(normalColor);
	graphics.drawRect((80 + 60) * 3,80 + 50,80,80);	
}

function OKeyEventUp(){
	console.log("O");
	graphics.beginFill(normalColor);
	graphics.drawRect((140 + 40) * 0,(80 + 50) * 2,140,80);	
}

function PKeyEventUp(){
	console.log("P");
	graphics.beginFill(normalColor);
	graphics.drawRect((140 + 40) * 1,(80 + 50) * 2,140,80);	
	
}

function OpenBracketKeyEventUp(){
	console.log("[");
	graphics.beginFill(normalColor);
	graphics.drawRect((140 + 40) * 2,(80 + 50) * 2,140,80);	
}	