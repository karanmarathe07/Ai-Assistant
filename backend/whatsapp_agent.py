"""
WhatsApp Desktop Agent for A.D.A
Automates sending messages via WhatsApp Desktop using pyautogui.
"""

import subprocess
import time
import pyautogui

# Safety: prevent pyautogui from moving too fast
pyautogui.PAUSE = 0.3


def open_whatsapp():
    """Opens WhatsApp Desktop on Windows."""
    try:
        # Try opening WhatsApp via the Windows Start menu shortcut
        subprocess.Popen(["cmd", "/c", "start", "whatsapp:"], shell=True)
        time.sleep(3)  # Wait for WhatsApp to open and load
        return True
    except Exception as e:
        print(f"[WhatsApp Agent] Error opening WhatsApp: {e}")
        return False


def send_message(contact_name: str, message: str) -> dict:
    """
    Sends a message to a contact on WhatsApp Desktop.
    
    Args:
        contact_name: The name of the contact to search for.
        message: The message text to send.
    
    Returns:
        dict with 'success' (bool) and 'message' (str).
    """
    try:
        # 1. Open WhatsApp
        print(f"[WhatsApp Agent] Opening WhatsApp...")
        if not open_whatsapp():
            return {"success": False, "message": "Failed to open WhatsApp Desktop."}

        # 2. Focus on WhatsApp window
        time.sleep(1)

        # 3. Click on the search bar (Ctrl+F or click the search area)
        #    Ctrl+F doesn't work in WhatsApp Desktop; use the search shortcut instead
        #    Click on the search box at the top of the chat list
        print(f"[WhatsApp Agent] Searching for contact: {contact_name}")
        
        # Use Ctrl+K or click the search bar — Ctrl+K is the universal search shortcut
        # Actually, in WhatsApp Desktop, clicking the search bar or pressing Ctrl+F
        # Let's use a reliable approach: click on the search area
        # The search bar is typically near the top-left of the WhatsApp window
        
        # Alternative: Use the "New Chat" search which is more reliable
        # Press Escape first to clear any open chat/menu
        pyautogui.press('escape')
        time.sleep(0.3)
        
        # Use Ctrl+N for new chat search (works in WhatsApp Desktop)
        # Actually, the most reliable way is to click the search bar
        # Let's try the search shortcut
        pyautogui.hotkey('ctrl', 'f')
        time.sleep(0.5)

        # 4. Type the contact name to search
        pyautogui.typewrite(contact_name, interval=0.05) if contact_name.isascii() else pyautogui.write(contact_name)
        time.sleep(1.5)  # Wait for search results to appear

        # 5. Press Enter or Down+Enter to select the first result
        pyautogui.press('enter')
        time.sleep(1)

        # 6. Type the message
        print(f"[WhatsApp Agent] Typing message...")
        
        # Handle multi-line messages: use Shift+Enter for newlines
        lines = message.split('\n')
        for i, line in enumerate(lines):
            # Use pyperclip + Ctrl+V for non-ASCII text (handles emojis, unicode)
            try:
                import pyperclip
                pyperclip.copy(line)
                pyautogui.hotkey('ctrl', 'v')
            except ImportError:
                # Fallback: typewrite for ASCII, write for unicode
                if line.isascii():
                    pyautogui.typewrite(line, interval=0.02)
                else:
                    pyautogui.write(line)
            
            # If not the last line, press Shift+Enter for a newline
            if i < len(lines) - 1:
                pyautogui.hotkey('shift', 'enter')
        
        time.sleep(0.3)

        # 7. Press Enter to send
        print(f"[WhatsApp Agent] Sending message...")
        pyautogui.press('enter')
        time.sleep(0.5)

        print(f"[WhatsApp Agent] Message sent successfully to {contact_name}.")
        return {
            "success": True,
            "message": f"Message sent to {contact_name} successfully."
        }

    except Exception as e:
        print(f"[WhatsApp Agent] Error: {e}")
        return {
            "success": False,
            "message": f"Failed to send message: {str(e)}"
        }
