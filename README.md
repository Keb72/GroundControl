# GroundControl

## What is it?  
A UI for KSP based on Telemachus.  
With you can view the ground tracks of a vessel when orbiting a body or view its localisation on a sub-orbital flight.  
![alt text](http://i.imgur.com/WekfIRN.jpg)  
Another mode allows you to visualise the profile of your flight during ascent or while flying an aircaft  
![alt text](http://i.imgur.com/lLxOuqF.jpg)  

## Dependencies  
- You must have Telemachus installed
- For best looking display, install the font Digital-7 (http://www.dafont.com/fr/digital-7.font or included in the release)

## Installation  
- Install Digital-7 font
- Copy the "groundcontrol" folder in /Game Data/Telemachus/Plugins/PluginData/Telemachus/
- To access (similar to Telemachus) input in a web browser:  
    From the machine running KSP: http://127.0.0.1:8085/telemachus/groundcontrol/ground_control.html  
    From any other location: http://[IP of the machine running KSP]:[port]/telemachus/groundcontrol/ground_control.html  
- Go full screen for best expreience  

## Known issues  
- GroundControl interacts with Telemachus HTTP server and there is at the moment no error management included.  
Therefore it may happen that browser freezes, for instance when switching vessel and it is required to refresh the page.  
- Tested with Chrome

## Future development ideas:  
- Add as reference the ideal flight profile for ascent 
- Add a zoom function on ground tracks mode  
- Add the past trajectory on the map when flying suborbital

## Credits:  
The Telemachus development guys who keep it up-to-date and running  
http://mecaspa.cannes-aero-patrimoine.net/COURS_SA/SURVOL/SURVOL.htm for the math  
