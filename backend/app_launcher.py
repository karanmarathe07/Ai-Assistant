import os
import subprocess
import webbrowser

# Common app mappings. Can add explicit paths for popular apps
APP_ALIASES = {
    "chrome": "chrome.exe",
    "google chrome": "chrome.exe",
    "brave": "brave.exe",
    "firefox": "firefox.exe",
    "edge": "msedge.exe",
    "microsoft edge": "msedge.exe",
    "notepad": "notepad.exe",
    "calculator": "calc.exe",
    "calc": "calc.exe",
    "paint": "mspaint.exe",
    "word": "winword.exe",
    "excel": "excel.exe",
    "powerpoint": "powerpnt.exe",
    "outlook": "outlook.exe",
    "teams": "msteams.exe",
    "spotify": "spotify.exe",
    "discord": "Update.exe --processStart Discord.exe", # Discord pattern
    "vlc": "vlc.exe",
    "obs": "obs64.exe",
    "vs code": "code",
    "vscode": "code",
    "cmd": "cmd.exe",
    "command prompt": "cmd.exe",
    "powershell": "powershell.exe",
    "terminal": "wt.exe",
    "file explorer": "explorer.exe",
    "explorer": "explorer.exe",
    "task manager": "taskmgr.exe",
    "settings": "ms-settings:",
    "whatsapp": "whatsapp:",
    "telegram": "telegram.exe",
}

def open_app(app_name):
    """Open an application on Windows in the most robust way available."""
    name_lower = app_name.strip().lower()
    
    print(f"[APP LAUNCHER] Received request to open: '{app_name}'")

    # 1. Alias Check
    command = APP_ALIASES.get(name_lower)
    
    if command:
        print(f"[APP LAUNCHER] Found alias map: '{command}'")
        try:
            # Handle URI schemes (Settings, WhatsApp UWP)
            if command.endswith(":"):
                os.startfile(command)
                return {"success": True, "message": f"Opened {app_name} via URI scheme."}
            
            # Use PowerShell to invoke start-process, which resolves PATH very cleanly on Windows
            subprocess.Popen(["powershell", "-Command", f"Start-Process '{command}'"], shell=True)
            return {"success": True, "message": f"Opened {app_name}."}
        except Exception as e:
            print(f"[APP LAUNCHER] Alias launch failed: {e}")
            # Fallback to direct subprocess
            pass

    # 2. Fallback: Search Windows Start Menu via PowerShell
    print(f"[APP LAUNCHER] Attempting fuzzy Start Menu search for '{app_name}'...")
    try:
        # This script searches Start Menu shortcuts and runs the first match
        ps_script = f"""
        $name = "{app_name}"
        $paths = @(
            "$env:ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
            "$env:APPDATA\\Microsoft\\Windows\\Start Menu\\Programs"
        )
        $shortcut = Get-ChildItem -Path $paths -Recurse -Filter "*$name*.lnk" -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($shortcut) {{
            Start-Process $shortcut.FullName
            Write-Output "FOUND"
        }} else {{
            Write-Output "NOT FOUND"
        }}
        """
        result = subprocess.run(["powershell", "-Command", ps_script], capture_output=True, text=True, shell=True)
        if "FOUND" in result.stdout:
            return {"success": True, "message": f"Opened {app_name} from Start Menu."}
    except Exception as e:
        print(f"[APP LAUNCHER] Start menu search failed: {e}")

    # 3. Last Resort: Just try to start the raw name
    print(f"[APP LAUNCHER] Attempting raw os.startfile for '{app_name}'...")
    try:
        os.startfile(app_name)
        return {"success": True, "message": f"Opened {app_name}."}
    except Exception as e:
        return {"success": False, "message": f"I couldn't find or open the application '{app_name}' on your system."}
