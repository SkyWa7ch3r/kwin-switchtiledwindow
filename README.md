# kwin-switchtiledwindow
Switch between Tiled Windows on KDE Plasma

# Usage

1. Clone the Repo into `~/.local/share/kwin/scripts`
2. Enable the script, KWin should automatically pick up the script you need to enable it.
```
# Enable in config
kwriteconfig6 --file kwinrc --group Plugins --key switchtiledwindowEnabled true

# Start/reload scripting
qdbus6 org.kde.KWin /Scripting start
```
3. In a terminal run:
```
journalctl --user -f | grep -i kwin
```
To see the script output for debugging.

Press <kbd>Meta/Super + Shift + T</kbd> to switch between active tiled windows on the current screen.

If you wish to make changes yourself, you can edit `main.js` and then run the following in a terminal:
```
qdbus6 org.kde.KWin /Scripting unloadScript switchtiledwindow
qdbus6 org.kde.KWin /Scripting start
```

The development for this kwin script was done on KDE Plasma 6
