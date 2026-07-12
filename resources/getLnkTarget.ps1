param (
    [Parameter(Mandatory=$true, ValueFromRemainingArguments=$true)]
    [string[]]$Files
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$shell = New-Object -ComObject WScript.Shell
$results = @()

foreach ($file in $Files) {
    if ($file -like "*.lnk") {
        try {
            $Shortcut = $shell.CreateShortcut($file)

            $results += $Shortcut.TargetPath
        } catch {
            $results += $file
        }
    } else {
           $results += $file
    }
}

Write-Output (ConvertTo-Json -InputObject $results)