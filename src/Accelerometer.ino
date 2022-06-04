#include <ArduinoBLE.h>
#include <Arduino_LSM9DS1.h>
BLEService Accelservice("1101");
BLEUnsignedCharCharacteristic Magychar("2101",BLERead|BLENotify);

const int xInput = A0;
const int yInput = A1;
const int zInput = A2;
const int scale = 200000;


// initialize minimum and maximum Raw Ranges for each axis
int RawMin = 0;
int RawMax = 1023;

void setup() {
  IMU.begin();
 Serial.begin(9600);
 while(!Serial);
 pinMode(LED_BUILTIN, OUTPUT);
 if(!BLE.begin())
 {
  Serial.println("starting BLE failed!");
  while(1);
 }
 
BLE.setLocalName("EE400D");
BLE.setAdvertisedService(Accelservice);
Accelservice.addCharacteristic(Magychar);
BLE.addService(Accelservice);
BLE.advertise();
Serial.println("Bluetooth device active, waiting for connections...");
}


void loop() {
BLEDevice central = BLE.central();

if (central)
{
Serial.print("Connected to central: ");
Serial.println(central.address());
digitalWrite(LED_BUILTIN, HIGH);

while (central.connected()) {
  //Read raw values
  int xRaw = ReadAxis(xInput);
  int yRaw = ReadAxis(yInput);
  int zRaw = ReadAxis(zInput);

  // Convert raw values to 'milli-Gs"
  float xScaled = mapf(xRaw, RawMin, RawMax, -200000, 200000);
  float yScaled = mapf(yRaw, RawMin, RawMax, -200000, 200000);
  float zScaled = mapf(zRaw, RawMin, RawMax, -200000, 200000);

  // re-scale to fractional Gs
  float xAccel = xScaled/1000;
  float yAccel = yScaled/1000;
  float zAccel = zScaled/1000;
  long magnitude = sqrt(sq(xAccel)+sq(yAccel)+sq(zAccel));

  Serial.print("X, Y, Z  :: ");
  Serial.print(xRaw);
  Serial.print(", ");
  Serial.print(yRaw);
  Serial.print(", ");
  Serial.print(zRaw);
  Serial.print(" :: ");
  Serial.print(xAccel);
  Serial.print("G, ");
  Serial.print(yAccel);
  Serial.print("G, ");
  Serial.print(zAccel);
  Serial.println("G");
  Serial.print(magnitude);
  Serial.println("G");
  Magychar.writeValue(magnitude);
  delay(200);

  }
}
digitalWrite(LED_BUILTIN, LOW);
Serial.print("Disconnected from central: ");
Serial.println(central.address());
}


int ReadAxis(int axisPin)
{
  // Take multiple samples to reduce noise
  const int sampleSize = 175;
  long reading = 0;
  analogRead(axisPin);
  delay(1);
  for (int i = 0; i < sampleSize; i++)
  {
  reading += analogRead(axisPin);
  }
  return reading/sampleSize;
}

float mapf(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
