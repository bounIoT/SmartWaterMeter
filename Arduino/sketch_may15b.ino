#define ag_ismi "CMPE_IOT"
#define ag_sifresi "cmpeiot123"
#define address "watermeterreader.eu-gb.mybluemix.net"

float prevReading;
bool validReading;
int threshold;

void setup()
{
  Serial.begin(115200);

  Serial.println("AT");
  prevReading = 0;
  threshold = 800;
  delay(3000);
  if(Serial.find("OK")) {
    Serial.println("AT+CWMODE=1");
    delay(2000);
    String baglantiKomutu= String("AT+CWJAP=\"")+ag_ismi+"\",\""+ag_sifresi+"\"";
    Serial.println(baglantiKomutu);
    delay(5000);
  }
}

void loop() {
  float analogReading1 = analogRead(A1);
  Serial.println(analogReading1);
  if (analogReading1 > threshold && prevReading != 0 && prevReading < threshold && validReading == true){
      Serial.println(analogReading1);
      // Stub, the value passed to the function should change depending on the pin number.
      komut_yolla(1, 10);
  }
  prevReading = analogReading1;
  if (analogReading1 > threshold) {
    validReading = true;
  }
  delay(1000);
}

void komut_yolla(int pinId, int litre) {
  Serial.println(String("AT+CIPSTART=\"TCP\",\"")+ address +"\",80");

  delay(1000);
  if(Serial.find("Error")) {
    Serial.println("AT+CIPSTART Error");
    return;
  }
  
  String yollanacakkomut = "GET /data/submit/litre?&id=";
  yollanacakkomut += (pinId);
  yollanacakkomut += "&value=";
  yollanacakkomut += (litre);
  yollanacakkomut += " HTTP/1.1";
  yollanacakkomut += "\r\n";
  yollanacakkomut += "Host: watermeterreader.eu-gb.mybluemix.net";
  yollanacakkomut += "\r\n";
  yollanacakkomut += "Accept: */*";
  yollanacakkomut += "\r\n\r\n";

  delay(3000);

  Serial.print("AT+CIPSEND=");
  Serial.println(yollanacakkomut.length()+2);
  delay(1000);

  if(Serial.find(">")) {
    Serial.print(yollanacakkomut);
    Serial.print("\r\n\r\n");
  }
  else {
    Serial.println("AT+CIPCLOSE");
  }
}
