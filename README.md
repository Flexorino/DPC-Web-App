# DPC-Web-App

Dies ist die Web-App des DPC-Projektes.

## Voraussetzungen

Folgendes muss installiert sein:

* NodeJS
* NPM (Node Paket Manager)

Unter  https://nodejs.org/en/download/ kann beides zusammen bezogen werden.

## Generelles

* Da die Authentifizierung mit Auth0 bewerkstelligt wird, ist stets eine Internetverbindung notwendig. Weiterhin muss die Website stets unter der Origin localhost:4200 oder diapc.com aufgerufen werden. Eine Anmeldung ist notwendig, da der Server den Nutzer anhand des Tokens identifiziert und somit Daten, wie z.B. Tagebücher des Nutzers, speichert.
* Der Testserver der Web-App kann mit dem Befehl **npm start -- --port** gestartet werden. Hierbei reicht der Befehl **npm start** aus, welcher den Server automatisch auf Port 4200 startet. Der Befehl öffnet automatisch ein Browserfenster. Es sei zu beachten, dass bei einem Testserver kein Service Worker angewendet wird. Der Webservice muss gleichzeitig laufen. Falls dieser auf einer anderen origin als standardmäßig localhost:8889 läuft, ist dies dementsprechend in * *src/app/assets/appConfig/appConfig.json* * anzugeben.
* Mit npm **run build** kann die Web-App erzeugt werden. Die App befindet sich dann in * *dist/dia-pc2* *. Gleichzeitig startet dieser Befehl einen Server, der diese erzeugte Web-App unter localhost:4200 anbietet. Bei diesem Server ist dann der Service Worker anwendbar (Die App kann installiert werden etc.). Eine Anpassung des Ports ist in * *lite-server-config.json* * machbar, während die origin Problematik beachtet werden muss.
* Eine wirkliche Nutzung auf einem anderen Gerät als der Server ist momentan nicht möglich (Es kann sich nicht angemeldet) werden. Dies liegt an dem verwendeten OIDC-Protokoll (Origin ändert sich dann). Bei einer wirklichen Veröffentlichung wäre die Origin konstant und dies wäre kein Problem mehr. Falls dieses Problem selbständig umgegangen werden soll, müssen die Parameter client_id, audience und domain entsprechend in * *src/app/assets/appConfig/appConfig.json* * angepasst werden.

## Sonstiges

* Für eine Nutzung eines Service Workers muss eine Web-App mit HTTPS geliefert werden oder über localhost aufgerufen werden. Mit Diensten, wie z.B. https://www.npmjs.com/package/localtunnel, ist es einfach möglich einen lokalen Server öffentlich über HTTPS verfügbar zu machen. Da die vergebenen Domainnahmen jedoch immer zufällig sind, ist die Anwendung mit Auth0 (Origin-Problematik) kritisch, da immer eine entsprechende Anpassung in den Auth0 Konfigurationen vorgenommen werden muss. Außerdem muss auch dann stets die Webservice Origin angepasst werden, da diese gleichermaßen über HTTPS angeboten werden muss und der Name der Origin zufällig ist.