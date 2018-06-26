module.exports = {
	arduinoStart: function() {
		return "//----------------------------------------------------------------\n\
//-- CC BY SA (http://ottodiy.com)\n\
//-----------------------------------------------------------------\n\
//-- Otto will run fast straight forward with this code!\n\
//-----------------------------------------------------------------\n\
#include <Servo.h>\n\
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
#define DEBUG\n\
bool button;\n\
int limit = 1;\n\
int D = 500;\n\
void setup(){\n\
  //Set the servo pins\n\
  Otto.init(PIN_YL,PIN_YR,PIN_RL,PIN_RR,true);\n\
  Otto.home();\n\
  HC06.begin(9600);\n\
  #ifdef DEBUG\n\
    Serial.begin(9600);\n\
 #endif\n\
}\n\"";
	},

	arduinoButtons: function(choregraphies) {
		var buttons;
		for(var i in choregraphies) {
			buttons = "bool button" + i + " = 0;";
		}
		return buttons;
	},

	arduinoMovement: function(movement) {
		var codeLine
		if(movement.steps && movement.time && !movement.direction && !movement.height) {
			codeLine = "void " + movement.name + "(float steps=" + movement.steps+ ", int T = " + movement.time + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && movement.direction && !movement.height) {
			var codeLine = "void " + movement.name + "(float steps=" + movement.steps+ ", int T = " + movement.time + ", int dir = " + movement.direction + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && !movement.direction && movement.height) {
			var codeLine = "void " + movement.name + "(float steps=" + movement.steps+ ", int T = " + movement.time + ", int h = " + movement.height + ");\n\
delay(D);";
		} else if(movement.steps && movement.time && movement.direction && movement.height) {
				var codeLine = "void " + movement.name + "(float steps=" + movement.steps+ ", int T = " + movement.time + ", int h = " + movement.height + ", int dir = " + movement.direction + ");\n\
delay(D);";
		} else if(movement.name === "delay") {
				var codeLine = "delay(" + movement.time + ");";
		} else {
			codeLine = "//Error while generating the movement : " + movement.name;
		}
	  return codeLine;
	}
}
