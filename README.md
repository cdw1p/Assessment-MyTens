# Assessment-MyTens
Backend Developer - Assessment Test

## Instalation
```bash
git clone https://github.com/cdw1p/Assessment-MyTens.git
cd Assessment-MyTens
npm install
```

## Usage
```bash
RULES :
- default convertion format is "PLAIN TEXT"

COMMAND LINE ARGUMENT : node filename.js <path_source> -flag
-o	write an output file
-t	type of file convert (json or text)

EXAMPLE :
default command		node access_log /var/log/apache2/access_log
with output file	node access_log /var/log/apache2/access_log -o /User/johnmayer/Desktop/apachelog.json
with json output	node access_log /var/log/apache2/access_log -t json
with plain output	node access_log /var/log/apache2/access_log -t text
```

## Screenshoot
- help
![images](/screenshoot/1.png?raw=true)

- default command
![images](/screenshoot/2.png?raw=true)

- with plain output
![images](/screenshoot/4.png?raw=true)

- with json output
![images](/screenshoot/3.png?raw=true)

- with plain output (custom path)
![images](/screenshoot/5.png?raw=true)

- with json output (custom path)
![images](/screenshoot/6.png?raw=true)

## Notes
- am set default path for writting file on Line 70 [https://github.com/cdw1p/Assessment-MyTens/blob/master/access_log.js#L70]
- i just focused conversion only for apache access log, because different log using different format
