#!/bin/bash
# Post-edit: warns when hardcoded colors or wrong Tailwind palette tokens are used in TSX files
# Exit 0 = advisory only (never blocks)

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Only check TSX files in src/
if ! echo "$FILE" | grep -qE 'src/.*\.tsx$'; then
  exit 0
fi

[ -f "$FILE" ] || exit 0

WARNINGS=""

# Check for hardcoded hex colors
if grep -qE '#[0-9a-fA-F]{3,8}' "$FILE" 2>/dev/null; then
  WARNINGS="$WARNINGS\n  - Hardcoded hex colors found. Use shell-*/brand-* Tailwind tokens instead."
fi

# Check for default Tailwind palette (should use shell-* instead)
if grep -qE 'bg-(gray|zinc|slate|neutral)-|text-(gray|zinc|slate|neutral)-|border-(gray|zinc|slate|neutral)-' "$FILE" 2>/dev/null; then
  WARNINGS="$WARNINGS\n  - Default Tailwind palette (gray/zinc/slate/neutral) detected. Use shell-* tokens instead."
fi

if [ -n "$WARNINGS" ]; then
  echo "⚠ Color token warnings in $FILE:$WARNINGS" >&2
fi

exit 0
