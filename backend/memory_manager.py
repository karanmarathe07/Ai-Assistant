import json
import os
import uuid
from datetime import datetime

MEMORY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "memories.json")

class MemoryManager:
    """Persistent memory system for EDITH. Stores facts/preferences as JSON."""

    def __init__(self, file_path=None):
        self.file_path = file_path or MEMORY_FILE
        self.memories = self._load()

    def _load(self):
        """Load memories from disk."""
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                print(f"[MEMORY] Warning: Could not read {self.file_path}, starting fresh.")
                return []
        return []

    def _save(self):
        """Persist memories to disk."""
        try:
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(self.memories, f, indent=2, ensure_ascii=False)
        except IOError as e:
            print(f"[MEMORY] Error saving memories: {e}")

    def add_memory(self, text, category="general"):
        """Save a new memory. Returns the created memory object."""
        memory = {
            "id": str(uuid.uuid4())[:8],
            "text": text.strip(),
            "category": category.strip().lower() if category else "general",
            "timestamp": datetime.now().isoformat()
        }
        self.memories.append(memory)
        self._save()
        print(f"[MEMORY] Saved: [{memory['category']}] {memory['text']}")
        return memory

    def delete_memory(self, memory_id):
        """Delete a memory by its ID. Returns True if found and deleted."""
        before = len(self.memories)
        self.memories = [m for m in self.memories if m["id"] != memory_id]
        if len(self.memories) < before:
            self._save()
            print(f"[MEMORY] Deleted memory: {memory_id}")
            return True
        print(f"[MEMORY] Memory not found: {memory_id}")
        return False

    def get_all_memories(self):
        """Return all memories."""
        return self.memories

    def get_memory_context(self):
        """Format all memories into a context string for injection into the AI session."""
        if not self.memories:
            return ""

        lines = ["Here are your saved permanent memories. Use these to personalize responses:\n"]
        for m in self.memories:
            lines.append(f"- [{m['category']}] {m['text']} (id: {m['id']})")

        return "\n".join(lines)
