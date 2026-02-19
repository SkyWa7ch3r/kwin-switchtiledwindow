registerShortcut(
    "Switch Tiled Window", 
    "Switch to the next window in the same tile zone", 
    "Meta+Alt+Space", 
    () => {
        const currentWindow = workspace.activeWindow;
        
        if (!currentWindow) {
            console.log("No active window");
            return;
        }
        
        const currentOutput = currentWindow.output;
        
        // Get all windows on current screen
        const allWindows = workspace.windowList();
        const windowsOnScreen = allWindows.filter(w => 
            w.output === currentOutput && 
            w.normalWindow && 
            !w.skipTaskbar &&
            !w.minimized
        );
        
        if (windowsOnScreen.length < 2) {
            console.log("Only one window on this screen");
            return;
        }
        
        // Determine window zones
        const screenWidth = currentOutput.geometry.width;
        const screenHeight = currentOutput.geometry.height;
        
        function getWindowZone(window) {
            // Fullscreen/maximized gets its own zone
            if (window.fullScreen || window.maximized) {
                return "fullscreen";
            }
            
            const rect = window.frameGeometry;
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            
            // Determine horizontal position (left, center, right)
            let horizontal = "center";
            if (centerX < screenWidth / 3) {
                horizontal = "left";
            } else if (centerX > (screenWidth * 2) / 3) {
                horizontal = "right";
            }
            
            // Determine vertical position (top, middle, bottom)
            let vertical = "middle";
            if (centerY < screenHeight / 3) {
                vertical = "top";
            } else if (centerY > (screenHeight * 2) / 3) {
                vertical = "bottom";
            }
            
            return `${horizontal}-${vertical}`;
        }
        
        const currentZone = getWindowZone(currentWindow);
        console.log(`[Tiled] Current window: "${currentWindow.caption}" in zone: ${currentZone}`);
        
        // Get windows in the same zone
        const sameZoneWindows = windowsOnScreen.filter(w => 
            getWindowZone(w) === currentZone
        );
        
        console.log(`[Tiled] Windows in ${currentZone}:`, sameZoneWindows.map(w => w.caption));
        
        if (sameZoneWindows.length > 1) {
            // Cycle within the same zone
            const currentIndex = sameZoneWindows.indexOf(currentWindow);
            const nextIndex = (currentIndex + 1) % sameZoneWindows.length;
            console.log(`[Tiled] Switching in zone: "${currentWindow.caption}" → "${sameZoneWindows[nextIndex].caption}"`);
            workspace.activeWindow = sameZoneWindows[nextIndex];
        } else {
            console.log(`[Tiled] Only one window in ${currentZone} zone, no switch performed`);
        }
    }
);