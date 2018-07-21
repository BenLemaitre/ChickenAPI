//The "first bloc" of the arduino script
//It contains the librairies and the required Bluetooth information
//To make the Otto working
module.exports = {
	arduinoStart: function(choregraphies) {
		var buttons;
		var ifBtn;
		var scriptStarts = "#include <Servo.h>\n\
#include <SoftwareSerial.h>\n\
#include <Oscillator.h>\n\
#include <US.h>\n\
#include <Otto.h>\n\
Otto Otto;  //This is Otto!\n\
SoftwareSerial HC06(6, 7);\n\
#define PIN_YL 2 //servo[2]\n\
#define PIN_YR 3 //servo[3]\n\
#define PIN_RL 4 //servo[4]\n\
#define PIN_RR 5 //servo[5]\n\
int D = 500; // value of the delay between each move\n\
String read; // read the app information\n\
void setup(){\n\
  //Set the servo pins\n\
  Otto.init(PIN_YL,PIN_YR,PIN_RL,PIN_RR,true);\n\
  Otto.home(); // Initialisation de l'OTTO\n\
  HC06.begin(9600); // Initialisation hc06\n\
}\n";
		//For each choregraphies, we generate a "button" that will be used
		//By the phone app to run the different choregraphies
		for(var i in choregraphies) {
			if(buttons == undefined)
				buttons = "String key_btn_0 = \"choregraphy_0\";\n";
			else
				buttons += "String key_btn_" + i + " = \"choregraphy_" + i + "\";\n";
		}

		var voidLoop = "void loop() {\n\
  while(HC06.available() > 0) { // if bluetooth is connected\n\
    read = HC06.readString();\n";

    	for(var i in choregraphies) {
    		if(ifBtn == undefined) {
    			ifBtn = "if(read == key_btn_0){\n\
  choregraphy0();\n\
 }\n";
    		} else {
    			ifBtn += "if(read == key_btn_" + i + "){\n\
  choregraphy" + i + "();\n\
 }\n";
 			}
    	}

    	var closingLoop = "}\n}\n";

		var script_done = scriptStarts + buttons + voidLoop + ifBtn + closingLoop;

		return script_done;
	},

	arduinoMovement: function(movement) {
		var codeLine;
		//We write every movements with the right parameters
		if(movement.steps && movement.time && !movement.direction && !movement.height) {
			codeLine = "Otto." + movement.name + "(" + movement.steps+ "," + movement.time + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && movement.direction && !movement.height) {
			var codeLine = "Otto." + movement.name + "(" + movement.steps + "," + movement.time + "," + movement.direction + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && !movement.direction && movement.height) {
			var codeLine = "Otto." + movement.name + "(" + movement.steps + "," + movement.time + "," + movement.height + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && movement.direction && movement.height) {
				var codeLine = "Otto." + movement.name + "(" + movement.steps+ "," + movement.time + "," + movement.height + "," + movement.direction + ");\n\
delay(D);";
		} else if(!movement.steps && !movement.time && !movement.direction && !movement.height) {
				var codeLine = "Otto." + movement.name + "();\n\
delay(D);";
		} else if(movement.name === "delay") {
				var codeLine = "delay(" + movement.time + ");";
		} else {
			codeLine = "//Error while generating the movement : " + movement.name;
		}
	  return codeLine;
	}
}
