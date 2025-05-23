# TRMNDLE

## What is this project?

TRMNDLE is a small project inspired by the product [TRMNL](https://usetrmnl.com/), the goal is to recreate (more or less) the same functionalities, using an old unused kindle device.
The idea behind it is pretty simple, we just load up a website in fullscreen mode on the Kindle's display, from there we can show pretty much anything we want, calendar events, todo lists, the latest news, weather updates, etc.
Since it's all web-based, backed by server side functions, we can easily tweak the UI, add new functioanlities, and integrate third party services using APIs.

TODO: Add photos improve intro text

## Requirements

- A kindle that supports jailbreak, this is needed to have the browser in fullscreen mode and disable screen sleep
- Host the website side of this project somewhere, either on the internet or locally
- A stand/case for the kindle, to keep it standing on the desk TODO: Add link to mine when ready

## Project Structure

### Scripts

The scripts folder contains useful scripts to set up the kindle:

- `create_kindle_alpine_image.sh`: This script generates an optimized version of alpine linux ([see here](https://github.com/schuhumi/alpine_kindle)), a ready to install version can be download from the GH releases.
- `start.sh`: Script to execute on linux, it will start the website on fullscreen mode

### App

TODO:

## Instructions

- Jailbreak your kindle, and install KUAL, visit [kindlemodding](https://kindlemodding.org/jailbreaking/) for all the info
- Disable sleep using these [helpers](https://www.mobileread.com/forums/showthread.php?t=293264)
- Install alpine linux kindle, following instructions [here](https://github.com/schuhumi/alpine_kindle) and [here](https://github.com/schuhumi/alpine_kindle_kual), and replacing the alpine.ext3 image provided in the repo with the one in this project releases. Just to give a quick recap of the steps:
  - Download the zip from the latest release [here](https://github.com/schuhumi/alpine_kindle/releases/tag/v0.2-alpha2)
  - Unzip the file and replace the alpine.ext3 file with the image on the releases of this project
  - Move all files to the kindle mass storage, in the root directory, it will take some time
  - Download [alpine_kindle_dual](https://github.com/schuhumi/alpine_kindle_kual/releases/tag/v0.1-alpha3) KUAL extension and place it in the `extensions` folder
  - Open KUAL on kindle, select `Alpine Linux` -> `Start Alpine Linux Desktop`, Linux should load now.
  - **Note** Sometimes when logging out from linux the screen goes blank and unresponsive, in this case just long press the power button and it should prompt you to restart the device
  - **Note 2** Please read the alpine_kindle Readme to avoid any issue during the process.
- We can now move the `start.sh` script to the linux desktop, to do that we will need SSH access, you can enable it using the [USBNetLite](https://github.com/notmarek/kindle-usbnetlite) package
- Once connected with SSH, run `sh alpine.sh`, this should enter the linux CLI, at this point you can paste the script content in a file in the current directory, remember to change the site url to the correct one.
- Now disconnect from SSH, and re-enter the linux UI, with the file manager move the script file to desktop, and run it
- That's it! The website should now load in fullscreen.

## Credits

All credits for the kindle linux side of this project goes to [schuhumi](https://github.com/schuhumi), everything is based on his [alpine_kindle project](https://github.com/schuhumi/alpine_kindle), I've just slightly edited the script to bring alpine and the packages to the latest versions.

Also got inspiration and some tips from these two articles:

- https://samkhawase.com/blog/hacking-kindle
- https://matthealy.com/kindle
