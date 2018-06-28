#include <Servo.h>
#include <SoftwareSerial.h>
#include <Oscillator.h>
#include <US.h>
#include <Otto.h>
Otto Otto;  //This is Otto!
SoftwareSerial HC06(6, 7);
#define PIN_YL 2 //servo[2]
#define PIN_YR 3 //servo[3]
#define PIN_RL 4 //servo[4]
#define PIN_RR 5 //servo[5]

String read; // read the app information
String key_btn_0 = "choregraphy_0"; // value of the first btn
String key_btn_1 = "choregraphy_1"; // value of the second btn
int choregraphy_limit_1 = 5; // number of iteration by the choregraphy 1
int choregraphy_limit_2 = 1; // number of iteration by the choregraphy 2
int D = 500;  // value of the delay between each move

void setup(){
  //Set the servo pins
  Otto.init(PIN_YL,PIN_YR,PIN_RL,PIN_RR,true);
  Otto.home(); // Initialisation de l'OTTO
  HC06.begin(9600); // Initialisation hc06
}
void loop() {
  while(HC06.available() > 0) { // if bluetooth is connected
   read = HC06.readString();
   if(read == key_btn_1){
       //for (int index = 0; index < choregraphy_limit_1; index += 1) {  
      choregraphy1();
   }
   if(read == key_btn_2){
     //for (int index = 0; index < choregraphy_limit_2; index += 1) {  
      choregraphy2();
    }
  }
 }

 void choregraphy0(){
   Otto.moonwalker(1,500,4,2); // steps (nombre d'itération de l'action), T durée, h hauteur et direction (si la direction n'est pas indiqué elle est à 1)
  delay(D);
  Otto.crusaito(2,500,1); // steps (nombre d'itération de l'action), T durée, h hauteur et direction
  delay(D);
  Otto.tiptoeSwing(3,1500,2);
  delay(D);
  Otto.updown(4,500,50);
  delay(D);
 }
 void choregraphy1(){
  Otto.walk(1,500,1); // steps, T dir : avant(1) ou arrière (2)
    delay(D);
  Otto.crusaito(2,500,1);
  delay(D);
  Otto.tiptoeSwing(3,1500,2);
  delay(D);
  Otto.updown(4,500,50);
  delay(D);
 }
