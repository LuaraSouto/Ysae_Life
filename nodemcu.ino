/*
  Alterado por: Fernando Costenaro Silva 
  Baseado no exemplo de:
 
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

// Importa as bibliotecas necessarias
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Servo.h>

Servo myservo;

// Substitua com as credenciais da sua rede
const char* ssid     = "EquipeLIFE";
const char* password = "12345678";

// Seu endereço de IP estático (será atribuido à placa)
IPAddress local_IP(192, 168, 150, 50);
// O endereço do gateway
IPAddress gateway(192, 168, 150, 60);

IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //opcional
IPAddress secondaryDNS(8, 8, 4, 4); //opcional

const int pinoMotor = 4; //9; GPIO4 -> D2
const int pinoBalanca = A0;

String strValorMotor; // Estado do LED - ON/OFF


// Cria um objeto AsyncWebServer na porta 80
AsyncWebServer server(80);

String getValorBalanca() {
  int valorLido = analogRead(pinoBalanca);
  //map(value, fromLow, fromHigh, toLow, toHigh)
  float valorConvertido = float(map(valorLido, 0, 1023, 0, 33))/10.0; //le em inteiro de 0 a 33 e divide por 10 -> saida de 0 a 3.3 V
  Serial.println("valor analogico lido: " + String(valorConvertido));
  return String(valorConvertido);
}
  


void setValorMotor(bool estado) {
 
  
}

 
void setup(){
  // Porta Serial para debug
  Serial.begin(115200);

  myservo.attach(pinoMotor);  // attaches the servo on GIO2 to the servo object
  //entrada analógica já vem configurada no pino A0

  // Configura o endereço IP estático
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("Falha ao configurar em modo Station (STA)");
  }
  
  // Conecta na rede Wi-Fi com o SSID e senha (password)
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Imprime pela serial o endereço de IP e inicia o servidor web
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
 
  // Rota para comandar a saida digital (Liga / ON)
  server.on("/motor/abrir", HTTP_GET, [](AsyncWebServerRequest *request){
    setValorMotor(true); // LOW ou HIGH depende da ligação do circuito
    request->send_P(200, "text/plain", "ON");  
  });
  
  // Rota para comandar a saida digital (Desliga / OFF)
  server.on("/motor/fechar", HTTP_GET, [](AsyncWebServerRequest *request){
    setValorMotor(false); // LOW ou HIGH depende da ligação do circuito
    request->send_P(200, "text/plain", "OFF");
  });

  // Rota para ler a entrada analogica
  server.on("/balanca", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", getValorBalanca().c_str());
  });
  
  // Adiciona no cabeçalho para evitar erro de acesso do CORS
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  // Inicia o servidor
  server.begin();
}
 
void loop(){

    
}

  
