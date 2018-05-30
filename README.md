# Smeter - Smart Meter 
Smeter is an arduino project which uses an opitcal sensor to monitor the consumption and sends them to a bluemix server using MQTT and WIFI. 

## Hardware requirements

 - Arduino and USB cable
 - CNY70 Reflective Optical Sensor
 - ESP8266 Wifi Module

### Hardware setup
>**ESP8266** Sensor pin to pin  connection:
-----------------  
	  Esp8266 | Arduino   
	       RX | RX   
           TX | TX   
          GND | GND  
          VCC | 5v   
        CH_PD | 5v   
       GPIO 0 | None   
	   GPIO 2 | None
 ![](https://cdn-images-1.medium.com/max/1600/1*IfHONRU0cWu3g9wnfI_GjQ.png)
https://cdn-images-1.medium.com/max/1600/1*IfHONRU0cWu3g9wnfI_GjQ.png

  --------------- 
   --------------- 
>**CNY70** Sensor pin to pin  connection:

Circuit diagram:  
>--------------- 

                                
         3V3         GND
          |           |
        White       Green      Colors shown are arbitrary wire colors
          |           |        that can be used to keep things straight
        |-o----   ----o-|      
        |      ---      |      Looking down on CNY70 with
        |               |        - emitter LED on left
        |   O       O   |        - detector phototransistor on right
        |               |        - pins on bottom connect as shown
        |      ---      |        
        |-o----   ----o-|      Lettering is on right vertical face   
          |           |          with indents as shown
          |           |
          |           ------ Pin 5
          |           |
       Purple        Red       
          |           |
       100 ohm      100 k Ohm      
          |           |
         GND         3V3

Arduino note: May use 5V instead of 3V3, this will increase the range significantly.

