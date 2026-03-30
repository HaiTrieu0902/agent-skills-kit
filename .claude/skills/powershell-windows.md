---
name: powershell-windows
description: PowerShell Windows patterns and critical pitfalls. Use when writing PowerShell scripts, automating Windows tasks, or debugging PowerShell errors.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# PowerShell Windows Patterns

> Critical patterns and pitfalls for Windows PowerShell.

## CRITICAL: Parentheses Required for Logical Operators

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `if (Test-Path "a" -or Test-Path "b")` | `if ((Test-Path "a") -or (Test-Path "b"))` |
| `if (Get-Item $x -and $y -eq 5)` | `if ((Get-Item $x) -and ($y -eq 5))` |

**Rule:** Each cmdlet call MUST be in parentheses when combined with logical operators.

## CRITICAL: No Unicode/Emoji in Scripts

| Purpose | ❌ Don't Use | ✅ Use |
|---------|-------------|--------|
| Success | ✅ ✓ | [OK] [+] |
| Error | ❌ ✗ 🔴 | [!] [X] |
| Warning | ⚠️ | [*] [WARN] |
| Info | ℹ️ | [i] [INFO] |
| Progress | ⏳ | [...] |

**Rule:** ASCII characters only in PowerShell scripts.

## Null Check Patterns

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `$array.Count -gt 0` | `$array -and $array.Count -gt 0` |
| `$text.Length` | `if ($text) { $text.Length }` |

## String Interpolation

For complex expressions, store in variable first:
```powershell
# ❌ Risky
"Value: $($obj.prop.sub)"

# ✅ Safe
$value = $obj.prop.sub
Write-Output "Value: $value"
```

## Error Handling

| ErrorActionPreference | Use |
|----------------------|-----|
| Stop | Development (fail fast) |
| Continue | Production scripts |
| SilentlyContinue | When errors are expected |

- Don't return inside try block
- Use finally for cleanup
- Return after try/catch

## File Paths

| Pattern | Use |
|---------|-----|
| Literal | `C:\Users\User\file.txt` |
| Variable | `Join-Path $env:USERPROFILE "file.txt"` |
| Relative | `Join-Path $ScriptDir "data"` |

**Rule:** Use `Join-Path` for safety.

## JSON Operations

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `ConvertTo-Json` | `ConvertTo-Json -Depth 10` |

Always specify `-Depth` for nested objects.

```powershell
# Read
Get-Content "file.json" -Raw | ConvertFrom-Json

# Write
$data | ConvertTo-Json -Depth 10 | Out-File "file.json" -Encoding UTF8
```

## Array Operations

| Operation | Syntax |
|-----------|--------|
| Empty array | `$array = @()` |
| Add item | `$array += $item` |
| ArrayList add | `$list.Add($item) \| Out-Null` |

## Common Error → Fix

| Error | Cause | Fix |
|-------|-------|-----|
| "parameter 'or'" | Missing parentheses | Wrap cmdlets in `()` |
| "Unexpected token" | Unicode character | Use ASCII only |
| "Cannot find property" | Null object | Check null first |
| "Cannot convert" | Type mismatch | Use `.ToString()` |

## Script Template

```powershell
Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

try {
    # Logic here
    Write-Output "[OK] Done"
    exit 0
}
catch {
    Write-Warning "Error: $_"
    exit 1
}
```
