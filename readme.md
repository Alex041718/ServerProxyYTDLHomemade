# Projet de téléchargement de vidéo youtube
### c'est un serveur proxy maison pour télécharger des vidéos youtube. c'est mon rapsberry pi qui se connectera à mon VPS pour que je n'ouvre pas les ports de ma box. Mon VPS est le serveur et demander au raspberry pi de lui forurnir l'url de l'audio d'un vidéo youtube puisque le raspberry pi ne sera pas black lister par youtube.

## Les 3 fichiers à lancer

```serverIPC&TCP.js``` 
sera le fichier qui contiendra le code de notre serveur.  Il sera lancer sur notre VPS.

```api.js``` 
sera le fichier qui contiendra le code de notre API.  Il sera lancer sur notre VPS. C'est lui qui sera utiliser par les projet présent sur le vps qui on besoin de l'audio d'une vidéo youtube.

```client.js``` 
sera le fichier qui contiendra le code de notre client.  Il sera lancer sur notre raspberry pi.

## Une seule route pour l'API:
```localhost/apiYTDL/:id```
- id: l'id de la vidéo youtube que l'on veut télécharger.

### Exemple d'utilisation:
```http://localhost:6000/apiYTDL/y2u_-QomGXU```